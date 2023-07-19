
import {SafeAreaView, View} from "react-native";
import {PokedexList} from "../components/lists/PokedexList";
import {Text} from "../components/Text/Text";

function Pokedex() {
    return <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View style={{ flex: 1}}>
            <Text size={30} style={{marginLeft: 24}} bold>Pokedex</Text>
            <PokedexList/>
        </View>
    </SafeAreaView>
}


export {Pokedex}
