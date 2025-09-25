import { Dimensions, FlatList, StyleSheet, View, Text } from "react-native";
import SliderItem from "./SliderItem";
import { useEffect, useRef, useState } from "react";
import axiosService from "../service/axiosService";
import { Bar } from "../types/bar";

const { width } = Dimensions.get("screen");
const CARD_WIDTH = width * 0.85;
const SIDE_MARGIN = (width - CARD_WIDTH) / 2;
const ITEM_WIDTH = CARD_WIDTH + SIDE_MARGIN * 2;

type SliderData = {
    id: string;
    title: string;
    schedule: string;
    image: string;
    event?: string;
};

const eventsMockTitles = [ " Karaoké", " Quizz", " Concert", " Afterwork", " Stand-up", " Années 80"];

const buildMockData = (): SliderData[] =>
    eventsMockTitles.map((title, index) => ({
        id: `mock-${index}`,
        title,
        schedule: "",
        image: "https://picsum.photos/980/600",
        event: title,
    }));

export default function Carousel() {
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [data, setData] = useState<SliderData[]>([]);

    const fetchBars = async () => {
        try {
            const response = await axiosService.get<Bar[]>("/bars");
            const items: SliderData[] = response.data.map((bar, index) => ({
                id: bar._id,
                title: (bar as any).name || (bar as any).nameBar || "Bar",
                schedule: bar.openingHours || "",
                image: (bar as any).image || "https://picsum.photos/980/600",
                event: eventsMockTitles[index % eventsMockTitles.length],
            }));
            if (items.length === 0) {
                setData(buildMockData());
            } else {
                setData(items);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des bars (carousel):", error);
            setData(buildMockData());
        }
    };

    useEffect(() => {
        fetchBars();
    }, []);

    const goToSlide = (index: number) => {
        if (index >= 0 && index < data.length) {
        flatListRef.current?.scrollToIndex({ index, animated: true });
        setCurrentIndex(index);
        }
    };

    const goNext = () => goToSlide(currentIndex + 1);
    const goPrev = () => goToSlide(currentIndex - 1);

    return (
        <View style={styles.container}>
            <FlatList
                testID="carousel-flatlist"
                ref={flatListRef}
                data={data}
                renderItem={({ item, index }) => (
                    <SliderItem item={item} index={index} onNext={goNext} onPrev={goPrev} />
                )}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={{ alignItems: 'center' }}
                getItemLayout={(data, index) => ({
                    length: ITEM_WIDTH,
                    offset: ITEM_WIDTH * index,
                    index,
                })}
                onMomentumScrollEnd={(e) => {
                    const offsetX = e.nativeEvent.contentOffset.x;
                    const newIndex = Math.round(offsetX / CARD_WIDTH);
                    setCurrentIndex(newIndex);
                }}
            />
            <View style={styles.dotsContainer}>
                {data.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index && styles.activeDot
                        ]}
                    />
                ))}
            </View>
        </View>
    )
}; 

const styles = StyleSheet.create({
    container: {
        height: 170,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        width: 10,
        height: 10,
        borderRadius: 6,
        backgroundColor: '#9A5CD0',
    },
});