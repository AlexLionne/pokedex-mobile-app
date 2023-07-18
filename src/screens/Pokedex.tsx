import {useSelector} from "react-redux";
import {IGenerationsStore} from "../redux/reducers/generations";
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
import {Generation} from "pokedex-promise-v2";

function Pokedex() {
    return <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View style={{ flex: 1}}>
            <Text size={30} style={{marginLeft: 24}}>Pokedex</Text>
            <PokedexList/>
        </View>
    </SafeAreaView>
}


export {Pokedex}
