import { StyleSheet, TextInput, View, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import FilterTag from "./FilterTag";
import { useState } from "react";

type Props = {
    onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
    const [query, setQuery] = useState("");

    const handleChange = (text: string) => {
        setQuery(text);
        onSearch(text);
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <Pressable>
                    {({ pressed }) => (
                        <Ionicons 
                            name="search" 
                            size={29} 
                            color="#9A5CD0" 
                            style={[styles.icon, pressed && styles.iconPressed]}
                        />
                    )}
                </Pressable>
                <TextInput 
                    style={styles.input}
                    placeholder="Rechercher un bar, un lieu, etc..."
                    placeholderTextColor="#666"
                    value={query}
                    onChangeText={handleChange}
                    />
            </View>
            {/* <View style={styles.filtersContainer}> 
                <FilterTag label="Thème" onPress={() => {}} />
                <FilterTag label="Lieu" onPress={() => {}} />
                <FilterTag label="Note" onPress={() => {}} />
                <FilterTag label="Prix" onPress={() => {}} />
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "90%",
        marginBottom: 40
    },
    searchBarContainer: {
        backgroundColor: "#e3e3e3",
        paddingHorizontal: 16,
        paddingVertical: 8,
        width: "100%",
        borderRadius: 50,
        display: "flex",
        flexDirection: "row",
        marginBottom: 10
    },
    input: {
        fontSize: 16,
        fontWeight: "500"
    },
    icon: {
        marginRight: 10
    },
    iconPressed: {
        transform: [{ scale: 1.3 }],
    },
    filtersContainer: {
        display: "flex",
        flexDirection: "row"
    }
});
