import { View, StyleSheet, Pressable, Text, Image, Dimensions } from 'react-native';
import { Bar } from '../types/bar';

interface CardBarProps {
	bar: Bar,
	onPress: () => void,
	testID?: string
};

export default function CardBar({ bar, onPress, testID }: CardBarProps) {
	// const imageUri = 'https://images.unsplash.com/photo-1724452588657-9ab0f8865a2e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D%3D';
	
	return (
		<Pressable style={styles.card} onPress={onPress}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={{ uri: bar.image }}
					resizeMode="cover"
				/>
			</View>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{bar.name || bar.nameBar}</Text>
			</View>
			<View style={styles.bandeau}>
				<Text style={styles.adresseText}>{bar.openingHours}</Text>
				<Text style={styles.adresseText}>{bar.address}</Text>
			</View>
		</Pressable>
	)
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#D9D9D9',
		borderRadius: 10,
		width: (screenWidth * 0.85),
		height: 150,
		marginBottom: 20,
		overflow: 'hidden',
	},
	imageContainer: {
		width: '100%',
		height: 100,
		position: 'relative',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	titleContainer: {
		width: '100%',
		height: 40,
		position: 'absolute',
		top: 0,
		display: "flex",
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center'
	},
	title: {
		backgroundColor: 'rgba(0,0,0,0.6)',
		color: 'white',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
		fontWeight: 'bold',
		fontSize: 14,
		alignSelf: 'center',
	},
	bandeau: {
		backgroundColor: '#F4F4F4',
		padding: 6,
		flex: 1,
		justifyContent: 'center',
	},
	adresseText: {
		fontSize: 13,
	},
});
