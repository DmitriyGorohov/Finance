import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    type StyleProp,
    StyleSheet,
    View,
    type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IKeyboardViewProps {
    children: React.JSX.Element[] | React.JSX.Element;
    isScroll?: boolean;
    bounce?: boolean;
    scrollViewStyle?: StyleProp<ViewStyle>;
    scrollViewRef?: React.RefObject<ScrollView>;
}

export const KeyboardView = ({
    children,
    isScroll = false,
    scrollViewStyle,
    scrollViewRef,
    bounce,
}: IKeyboardViewProps): React.JSX.Element => {
    const insets = useSafeAreaInsets();

    if (isScroll) {
        if (Platform.OS === 'android') {
            return (
                <ScrollView
                    ref={scrollViewRef}
                    bounces={bounce}
                    contentContainerStyle={[styles.scrollView, scrollViewStyle]}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            );
        }

        return (
            <KeyboardAvoidingView
                style={styles.containerScroll}
                keyboardVerticalOffset={0}
                behavior="padding"
            >
                <ScrollView
                    ref={scrollViewRef}
                    bounces={bounce}
                    contentContainerStyle={[styles.scrollView, scrollViewStyle]}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

    if (Platform.OS === 'android') {
        return (
            <View
                style={[
                    styles.container,
                    {
                        marginBottom: 16 + insets.bottom,
                    },
                ]}
            >
                {children}
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={insets.top + (StatusBar.currentHeight ?? 0)}
            behavior="padding"
            style={[styles.container, { marginBottom: 16 + insets.bottom }]}
        >
            {children}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    containerScroll: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
    },
});
