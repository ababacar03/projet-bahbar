import { Pressable, StyleSheet, Text } from "react-native";

type FilterTagProps = {
    label : string;
    onPress: () => void;
};
export default function FilterTag({ label = "Tag", onPress }: FilterTagProps) {
    return (
        <Pressable 
            onPress={onPress}
            style={({ pressed }) => [
                styles.tag,
                pressed && styles.tagPressed
            ]}
        >
            <Text style={styles.tagText}>{label}</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    tag: {
        backgroundColor: "#e3e1e3",
        width: 70,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 24,
        marginLeft: 8,
    },
    tagPressed: {
        backgroundColor: "#c2c2c2"
    },
    tagText: {
        fontSize: 14,
        textAlign: "center",
    },
});