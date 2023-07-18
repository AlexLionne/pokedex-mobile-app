import {useSelector} from "react-redux";
import {IGenerationsStore} from "../redux/reducers/generations";
import {IPokemonStore} from "../redux/reducers/pokemons";
import Animated, {
    ZoomOut,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from "react-native-reanimated";
import {SafeAreaView, View} from "react-native";
import {PokedexList} from "../components/lists/PokedexList";
import {Text} from "../components/Text/Text";

function Pokedex() {
    const {generations} = useSelector<IGenerationsStore>(state => state.generations)

    return <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View style={{ flex: 1}}>
            <Text size={30} style={{marginLeft: 24}}>Pokedex</Text>
            <PokedexList/>
        </View>
    </SafeAreaView>
}


export {Pokedex}
