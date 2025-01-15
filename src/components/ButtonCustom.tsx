import { type FC } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Colors from '../styles/Colors.ts';

interface ButtonCustomProps {
    onPress: () => void;
    title: string;
    disabled?: boolean;
    style?: ViewStyle;
}

const ButtonCustom: FC<ButtonCustomProps> = ({
    onPress,
    title,
    disabled,
    style,
}): React.JSX.Element => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={[styles.container, style]}
        >
            <Text style={[styles.text, disabled && { opacity: 0.5 }]}>
                {title}
            </Text>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        backgroundColor: Colors.background,
        paddingVertical: 14,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: '600',
    },
});
export default ButtonCustom;
