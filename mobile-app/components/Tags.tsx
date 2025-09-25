import { StyleSheet, Text, View } from 'react-native';
import TAG_COLORS from '../constants/tagColors';

type TagProps = {
    label: string;
};

export default function Tag({ label = "tag" }: TagProps) {
    const backgroundColor = TAG_COLORS[label] ?? "red";

    return (
        <View testID="tag-container" style={[styles.tag, { backgroundColor }]}>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tag: {
        minWidth: 65,
        minHeight: 14,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        alignSelf: 'flex-start'
    },
    text: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
});
