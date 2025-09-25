import { StyleSheet, Pressable } from 'react-native';
import Popover from 'react-native-popover-view';
import { AntDesign } from '@expo/vector-icons';
import { GestureHandlerRootView} from 'react-native-gesture-handler';

export default function AddingButton(){
    return (
        <Pressable style={styles.button} onPress={() => console.log("Bouton cliqué !")}>
            <AntDesign name="plus" size={24} color="black"/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
})