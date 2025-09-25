import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, Pressable } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

interface SliderItemProps {
    item: {
        id: string;
        title: string;
        schedule: string;
        image: string;
        event?: string;
    };
    index: number;
    onNext: () => void;
    onPrev: () => void;
}

const { width } = Dimensions.get('screen');
const CARD_WIDTH = width * 0.85;

export default function SliderItem({ item, index, onPrev, onNext }: SliderItemProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View testID={`slider-item-${index}`} style={styles.itemContainer}>
        <ImageBackground
            testID="image-background"
            source={{ uri: item.image }}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
            resizeMode="cover"
        >
            <View style={styles.sliderButtonsArea}>
                <Pressable
                    testID={`slider-prev-${index}`}
                    onPress={onPrev}
                    style={[styles.buttonSize, styles.sliderButton]}
                >
                    <BlurView intensity={150} tint="light" style={styles.buttonSize}>
                        <MaterialIcons name="navigate-before" size={30} color="rgb(154, 92, 208)" />
                    </BlurView>
                </Pressable>

                <Pressable
                    testID={`slider-next-${index}`}
                    onPress={onNext}
                    style={[styles.buttonSize, styles.sliderButton]}
                >
                    <BlurView intensity={150} tint="light" style={styles.buttonSize}>
                        <MaterialIcons name="navigate-next" size={30} color="rgb(190, 116, 255)" />
                    </BlurView>
                </Pressable>
            </View>

            <ExpoLinearGradient
                colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
                locations={[0, 1]} 
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.informations}
            >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.schedule}>{item.schedule}</Text>
            </ExpoLinearGradient>

            <BlurView intensity={10} tint="light" style={styles.event}>
                <Text style={styles.eventText}>
                    Soirée 
                    {item.event ?? ''}
                </Text>
            </BlurView>

            <View style={styles.moreButtonArea}>
                <Pressable
                    onPress={() => navigation.navigate('BarDetail', { barId: item.id })}
                    style={({ pressed }) => [
                    styles.moreButton,
                    pressed && styles.moreButtonPressed,
                    ]}
                >
                    <Text style={styles.moreButtonText}>En savoir plus</Text>
                </Pressable>
            </View>
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    itemContainer: {
        width: CARD_WIDTH,
        height: 150,
        marginHorizontal: (width - CARD_WIDTH) / 2,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        overflow: 'hidden',
        borderRadius: 16,
    },
    imageStyle: {
        borderRadius: 16,
    },
    informations: {
        position: 'absolute',
        top: 0,
        height: '50%',
        width: '100%',
        alignItems: 'center',
        padding: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    schedule: {
        fontSize: 14,
        color: '#ddd',
        marginTop: 4,
        fontWeight: '600',
    },
    sliderButtonsArea: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonSize: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderButton: {
        borderRadius: 50,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
    moreButtonArea: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 14,
    },
    moreButton: {
        backgroundColor: 'rgba(220, 220, 220, 0.5)',
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 5,
    },
    moreButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    moreButtonPressed: {
        opacity: 0.7
    },
    event: {
        position: "absolute",
        alignSelf: 'center',
        top: '50%',
        transform: [{ translateY: -10 }],
        padding: 8,
        // borderColor: "white",
        // borderWidth: 1
    },
    eventText: {
        color: "white",
        fontWeight: 600
    }
});