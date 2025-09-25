import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import axiosService from '../service/axiosService';
import { Bar } from "../types/bar";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps';
import { useAuth } from "../contexts/AuthContext";

export default function BarScreen({ route }: any) {
    const { barId } = route.params;
    const [bar, setBar] = useState<Bar>();
	const imageUri = 'https://images.unsplash.com/photo-1724452588657-9ab0f8865a2e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D%3D';
    const imageSource = bar?.image || imageUri;
    const [isFavorite, setIsFavorite] = useState(false);
    const { token } = useAuth();

    useEffect(() => {
        getBar();
        fetchAndSetIsFavorite();
    }, [token]);

    const getBar = async () => {
        try {
            const res = await axiosService.get(`/bars/${barId}`);
            setBar(res.data as Bar);
        } catch (error) {
            console.error("Erreur lors de la récupération du bar :", error);
        }
    };

    const fetchAndSetIsFavorite = async () => {
        if (!token) {
            console.log('Aucun token, utilisateur non connecté');
            return;
        }
        try {
            const res = await axiosService.get<{ favorites: any[] }>(`/users/favorites`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const favorites = res.data?.favorites ?? [];
            const found = favorites.some((f: any) => (f?._id || f) === barId);
            console.log('isFavorite?', found);
            setIsFavorite(found);
        } catch (e: any) {
            console.log('Erreur:', e?.response?.status, e?.response?.data || e?.message);
        }
    };

    const toggleFavorite = async () => {
        if (!token) {
            console.log('Impossible de modifier, pas de token');
            return;
        }
        try {
            if (isFavorite) {
                console.log(`DELETE /users/favorites/${barId}`);
                await axiosService.delete(`/users/favorites/${barId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsFavorite(false);
            } else {
                console.log(`POST /users/favorites/${barId}`);
                await axiosService.post(`/users/favorites/${barId}`, undefined, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsFavorite(true);
            }
        } catch (e: any) {
            console.log('Erreur toggle:', e?.response?.status, e?.response?.data || e?.message);
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const decimal = rating % 1;
        const hasHalfStar = decimal >= 0.25 && decimal < 0.75;
        const hasFullStar = decimal >= 0.75;
        
        // Étoiles pleines
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Icon key={i} name="star" size={18} color="#FFD700" />
            );
        }
        
        // Demi-étoile ou étoile pleine selon la décimale
        if (hasHalfStar) {
            stars.push(
                <Icon key="half" name="star-half" size={18} color="#FFD700" />
            );
        } else if (hasFullStar) {
            stars.push(
                <Icon key="extra" name="star" size={18} color="#FFD700" />
            );
        }
        
        // Étoiles vides pour compléter les 5
        const totalFilledStars = fullStars + (hasHalfStar || hasFullStar ? 1 : 0);
        const emptyStars = 5 - totalFilledStars;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Icon key={`empty-${i}`} name="star-border" size={18} color="#666666" />
            );
        }
        
        return stars;
    };

    return (
        <LinearGradient
            colors={['#1A1A2E', '#545494']}
            locations={[0.75, 1]}
            style={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: imageSource }}
                        resizeMode="cover"
                        onError={e => console.log('Erreur chargement image', e.nativeEvent.error)}
                    /> 
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.barName}>{bar?.nameBar || bar?.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rate}>{bar?.rate + "/5"}</Text>
                        <View style={styles.starsContainer}>
                            {bar?.rate ? renderStars(bar.rate) : null}
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={[styles.button]} 
                        onPress={toggleFavorite}
                    >
                        <Text style={styles.buttonText}>
                            {isFavorite ? 
                            <Icon name="favorite" size={16} color="red" />
                            :
                            <Icon name="favorite-border" size={16} color="white" />
                            }
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.barDescription}>{bar?.description}</Text>
                    <View style={styles.infoContainer}>
                        <View style={[styles.infoItem, styles.infoItemAdress]}>
                            <Text style={styles.infoItemContent}>{bar?.phone}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoItemContent}>{bar?.address}</Text>
                        </View>
                    </View>
                    {bar?.latitude && bar?.longitude && (
                        <MapView
                            style={styles.map}
                            region={{
                                latitude: bar.latitude,
                                longitude: bar.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                        }}>
                            <Marker
                                coordinate={{ latitude: bar.latitude, longitude: bar.longitude }}
                                title={bar.nameBar}
                                description={bar.address}
                            />
                        </MapView>
                    )}
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        width: "100%",
        height: 300,
    },
    contentContainer: {
        marginTop: 325,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    barName: {
        color: "#FFFFFF",
        fontSize: 38,
        fontWeight: 600,
        marginBottom: 16,
    },
    ratingContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    rate: {
        color: "white",
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: 1
    },
    starsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    barDescription: {
        color: "white",
        maxWidth: "70%",
        textAlign: 'center',
    },
    buttonContainer: {
        width: 160,
    },
	image: {
		width: '100%',
		height: '100%',
	},
    infoContainer: {
        width: 400,
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20,
        borderBottomWidth: 0.5,
        borderColor: 'white',
    }, 
    infoItem: {
        width: "50%",
        height: "70%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    infoItemContent: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    infoItemAdress: {
        borderRightWidth: 1,
        borderColor: 'white',
    },
    infoItemRanking: {
        borderRightWidth: 1,
        borderColor: 'white',
        display: 'flex',
        flexDirection: 'column'
    },
    map: {
        width: 430,
        height: 300,
    },
    button: {
        backgroundColor: '#545494',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    }
});


{/* <View style={styles.buttonContainer}>
    <Button 
        label="Uploader le menu" 
        onPress={handleUpload} 
    />
</View> */}