import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import CardBar from '../components/CardBar';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { Bar } from '../types/bar';
import axiosService from '../service/axiosService';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

type User = {
  idUser: string;
  name: string;
  firstname: string;
  email: string;
  username: string;
};

export default function SearchScreen({ navigation }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Bar[]>([]);
    const [popularBars, setPopularBars] = useState<Bar[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getPopularBars();
    }, []);

    const getPopularBars = async () => {
        setIsLoading(true);
        try {
            const res = await axiosService.get<Bar[]>("/bars");
            const data: Bar[] = res.data;
            setPopularBars(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des bars populaires", error);
            setPopularBars([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async(query: string) => {
        setSearchQuery(query);
        setIsLoading(true);
        try {
            const res = await axiosService.get<Bar[]>("/bars");
            const data: Bar[] = res.data;
            const normalizedQuery = query.trim().toLowerCase();
            const results = data.filter(bar => {
                const name = (bar.nameBar ?? bar.name ?? "").toLowerCase();
                const address = (bar.address ?? "").toLowerCase();
                return name.includes(normalizedQuery) || address.includes(normalizedQuery);
            });
            setSearchResults(results);
        } catch (error) {
            console.error("Erreur lors de la récupération des bars", error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={['#1A1A2E', '#545494']}
            locations={[0.75, 1]}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text testID='home-title' style={styles.pageTitle}>BahBar</Text>
                <SearchBar onSearch={handleSearch} />
                <View>
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (searchQuery.length === 0 ? (
                        popularBars.map((bar, index) => {
                            return (
                                <CardBar
                                    key={bar._id}
                                    bar={bar}
                                    onPress={() => navigation.navigate('BarDetail', { barId: bar._id })}
                                    testID={`cardbar-${index}`}
                                />
                            )
                        })
                    ) : (
                        searchResults.map((bar, index) => {
                            return (
                                <CardBar
                                    key={bar._id}
                                    bar={bar}
                                    onPress={() => navigation.navigate('BarDetail', { barId: bar._id })}
                                    testID={`cardbar-${index}`}
                                />
                            )
                        })
                    ))}
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 80,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 40
    },
    pageTitle: {
        color: "#FFFFFF",
        fontSize: 38,
        fontWeight: 600,
        marginBottom: 30
    }
});