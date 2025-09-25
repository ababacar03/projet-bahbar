import { StyleSheet, Text, Pressable } from 'react-native';

type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function Button({ label = "Bouton", onPress, disabled = false }: ButtonProps) {
    return (
        <Pressable 
            onPress={disabled ? undefined : onPress}
            style={({ pressed }) => [
                styles.button,
                disabled && styles.buttonDisabled,
                pressed && !disabled && styles.buttonPressed
            ]}
        >
            <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#48295C',
        borderRadius: 10,
        width: '100%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#8457AA',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 500,
    },
    buttonPressed: {
        backgroundColor: '#8457AA', 
        borderColor: '#48295C'
    },
    buttonDisabled: {
        backgroundColor: '#666666',
        borderColor: '#888888',
        opacity: 0.6
    },
    buttonTextDisabled: {
        color: '#CCCCCC'
    },
})