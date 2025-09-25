import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from '../components/carousel';
import CardBar from '../components/CardBar';
import { ScrollView } from 'react-native-gesture-handler';
import { Bar } from '../types/bar';
import axiosService from '../service/axiosService';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    const [bar, setBar] = useState<Bar[]>([]);

    const fetchBars = async () => {
        try {
            const response = await axiosService.get<Bar[]>('/bars');
            setBar(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des bars:', error);
        }
    };

    useEffect(() => {
        fetchBars();
    }, []);

    return (
        <LinearGradient
            colors={['#1A1A2E', '#545494']}
            locations={[0.6, 1]}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text testID='home-title' style={styles.pageTitle}>BahBar</Text>
                <View style={styles.highlightedBars}>
                    <Text testID="carousel-title" style={styles.highlightedBarsTitle}>Les soirées en avant</Text>
                    <Carousel />
                </View>
                <View style={styles.highlightedBars}>
                    <Text testID="bars-title" style={styles.highlightedBarsTitle}>Choisis un bar !</Text>
                    {bar.map((bar, index) => {
                        return (
                            <CardBar
                                key={bar._id}
                                bar={bar}
                                onPress={() => navigation.navigate('BarDetail', { barId: bar._id })}
                                testID={`cardbar-${index}`}
                            />
                        )
                    })}
                </View>
            </ScrollView>
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    pageTitle: {
        color: "#FFFFFF",
        fontSize: 38,
        fontWeight: 600,
        marginBottom: 18
    },
    highlightedBars: {
        width: "100%",
        alignItems: 'center',
        marginBottom: 30
    },
    highlightedBarsTitle: {
        color: "#FFFFFF",
        fontSize: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        width: "85%",
        paddingVertical: 6,
        textAlign: 'center',
        fontWeight: 500,
        borderRadius: 8,
        marginBottom: 14
    }
});