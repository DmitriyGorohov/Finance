import { useScrollToTop } from '@react-navigation/native';
import { type Edge, useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useRef, useState } from 'react';
import {
  type FlexStyle,
  KeyboardAvoidingView,
  type KeyboardAvoidingViewProps,
  type LayoutChangeEvent,
  ScrollView,
  type StatusBarProps,
  StatusBar,
  type ScrollViewProps,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';
import { isIOS } from '../../helpers/platformHelpers.ts';
import Colors from '../../styles/Colors.ts';

type ExtendedEdge = Edge | 'start' | 'end';

const edgeInsetMap: Record<string, Edge> = {
  start: 'left',
  end: 'right',
};

const propertySuffixMap = {
  top: 'Top',
  bottom: 'Bottom',
  left: 'Start',
  right: 'End',
  start: 'Start',
  end: 'End',
};

export function useSafeAreaInsetsStyle(
  safeAreaEdges: ExtendedEdge[] = [],
  property: 'padding' | 'margin' = 'padding'
): Pick<
  FlexStyle,
  | 'marginBottom'
  | 'marginEnd'
  | 'marginStart'
  | 'marginTop'
  | 'paddingBottom'
  | 'paddingEnd'
  | 'paddingStart'
  | 'paddingTop'
> {
  const insets = useSafeAreaInsets();

  return safeAreaEdges.reduce((acc, e) => {
    const value = edgeInsetMap[e] ?? e;
    return { ...acc, [`${property}${propertySuffixMap[e]}`]: insets[value] };
  }, {});
}

interface BaseScreenProps {
  /**
   * Children компоненты
   */
  children?: React.ReactNode;
  /**
   * Стиль внешнего контейнера содержимого, полезный для заполнения и полей.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Стиль внутреннего контейнера содержимого, полезный для заполнения и полей.
   */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Переопределите края по умолчанию для безопасной области
   */
  safeAreaEdges?: ExtendedEdge[];
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * Настройка statusBar. По умолчанию dark-content.
   */
  statusBarStyle?: 'light-content' | 'dark-content';
  /**
   * Насколько нам следует сместить клавиатуру? По умолчанию 0.
   */
  keyboardOffset?: number;
  /**
   * Props StatusBar component
   */
  StatusBarProps?: StatusBarProps;
  /**
   * Передайте любые дополнительные реквизиты непосредственно в компонент KeyboardAvoidingView.
   */
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
}

interface FixedScreenProps extends BaseScreenProps {
  preset?: 'fixed';
}

interface ScrollScreenProps extends BaseScreenProps {
  preset?: 'scroll';
  /**
   * Должна ли клавиатура сохраняться при касании экрана? По умолчанию handled.
   * Применяется только к preset scroll.
   */
  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never';
  /**
   * Передайте любые дополнительные реквизиты непосредственно в компонент ScrollView.
   */
  ScrollViewProps?: ScrollViewProps;
}

interface AutoScreenProps extends Omit<ScrollScreenProps, 'preset'> {
  preset?: 'auto';
  /**
   * Порог для запуска автоматического отключения/включения возможности прокрутки.
   * Defaults to `{ percent: 0.92 }`.
   */
  scrollEnabledToggleThreshold?: { percent?: number; point?: number };
}

export type ScreenProps =
  | ScrollScreenProps
  | FixedScreenProps
  | AutoScreenProps;

export type AutoPresetType = {
  scrollEnabled: boolean;
  onContentSizeChange: (w: number, h: number) => void;
  onLayout: (e: LayoutChangeEvent) => void;
};

const isNonScrolling = (preset?: ScreenProps['preset']): boolean =>
  !preset || preset === 'fixed';

const useAutoPreset = (props: AutoScreenProps): AutoPresetType => {
  const { preset, scrollEnabledToggleThreshold } = props;
  const { percent = 0.92, point = 0 } = scrollEnabledToggleThreshold ?? {};

  const scrollViewHeight = useRef<null | number>(null);
  const scrollViewContentHeight = useRef<null | number>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const updateScrollState = (): void => {
    if (
      scrollViewHeight.current === null ||
      scrollViewContentHeight.current === null
    )
      return;

    // TODO: проверьте, помещается ли контент на экране, затем переключите состояние прокрутки в соответствии с ним
    const contentFitsScreen = (() => {
      if (point) {
        return (
          scrollViewContentHeight.current < scrollViewHeight.current - point
        );
      }

      return (
        scrollViewContentHeight.current < scrollViewHeight.current * percent
      );
    })();

    // TODO: контент меньше размера экрана, поэтому мы можем отключить прокрутку
    if (scrollEnabled && contentFitsScreen) setScrollEnabled(false);

    // TODO: содержимое больше размера экрана, поэтому давайте включим прокрутку
    if (!scrollEnabled && !contentFitsScreen) setScrollEnabled(true);
  };

  const onContentSizeChange = (w: number, h: number): void => {
    // TODO: обновить высоту содержимого при прокрутке
    scrollViewContentHeight.current = h;
    updateScrollState();
  };

  const onLayout = (e: LayoutChangeEvent): void => {
    const { height } = e.nativeEvent.layout;
    // TODO: обновить высоту прокрутки
    scrollViewHeight.current = height;
    updateScrollState();
  };

  // TODO: обновлять состояние прокрутки при каждом рендеринге
  if (preset === 'auto') updateScrollState();

  return {
    scrollEnabled: preset === 'auto' ? scrollEnabled : true,
    onContentSizeChange,
    onLayout,
  };
};

const ScreenWithoutScrolling = (props: ScreenProps): React.JSX.Element => {
  const { style, contentContainerStyle, children } = props;
  return (
    <View style={[outerStyle, style]}>
      <View style={[innerStyle, contentContainerStyle]}>{children}</View>
    </View>
  );
};

const ScreenWithScrolling = (props: ScreenProps): React.JSX.Element => {
  const {
    children,
    keyboardShouldPersistTaps = 'handled',
    contentContainerStyle,
    ScrollViewProps,
    style,
  } = props as ScrollScreenProps;

  const ref = useRef<ScrollView>(null);

  const { scrollEnabled, onContentSizeChange, onLayout } = useAutoPreset(
    props as AutoScreenProps
  );

  // TODO: Добавьте собственное поведение при нажатии активной вкладки для прокрутки к началу содержимого.
  // TODO: More info at: https://reactnavigation.org/docs/use-scroll-to-top/
  useScrollToTop(ref);

  return (
    <ScrollView
      {...{ keyboardShouldPersistTaps, scrollEnabled, ref }}
      {...ScrollViewProps}
      onLayout={(e) => {
        onLayout(e);
        ScrollViewProps?.onLayout?.(e);
      }}
      onContentSizeChange={(w: number, h: number) => {
        onContentSizeChange(w, h);
        ScrollViewProps?.onContentSizeChange?.(w, h);
      }}
      style={[outerStyle, ScrollViewProps?.style, style]}
      contentContainerStyle={[
        innerStyle,
        ScrollViewProps?.contentContainerStyle,
        contentContainerStyle,
      ]}
    >
      {children}
    </ScrollView>
  );
};

export const Screen = (props: ScreenProps): React.JSX.Element => {
  const {
    backgroundColor = Colors.white,
    KeyboardAvoidingViewProps,
    keyboardOffset = 0,
    safeAreaEdges,
    StatusBarProps,
    statusBarStyle = 'dark-content',
  } = props;

  const containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  return (
    <View style={[containerStyle, { backgroundColor }, containerInsets]}>
      <StatusBar barStyle={statusBarStyle} {...StatusBarProps} />

      <KeyboardAvoidingView
        behavior={isIOS ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardOffset}
        {...KeyboardAvoidingViewProps}
        style={[keyboardAvoidingViewStyle, KeyboardAvoidingViewProps?.style]}
      >
        {isNonScrolling(props.preset) ? (
          <ScreenWithoutScrolling {...props} />
        ) : (
          <ScreenWithScrolling {...props} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const containerStyle: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
};

const keyboardAvoidingViewStyle: ViewStyle = {
  flex: 1,
};

const outerStyle: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
};

const innerStyle: ViewStyle = {
  justifyContent: 'flex-start',
  alignItems: 'stretch',
};
