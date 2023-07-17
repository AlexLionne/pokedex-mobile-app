import {SafeAreaView, View} from "react-native";
import {ApiService} from "../services/api.service";
import {PokeBall, PokeBallAnimations} from "../components/placeholder/PokeBall";
import {Text} from "../components/Text/Text";
import {useCallback, useEffect, useState} from "react";
import {setGenerations} from "../redux/actions";
import {useDispatch} from "react-redux";


const LoadingView = ({message}) => {

    return <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
            <Text size={25}>Pokedex App</Text>
            <View style={{flex: 0, alignItems: 'center', justifyContent: 'center'}}>
                <PokeBall animated={true} height={183} width={183} animation={PokeBallAnimations.CATCH}/>
            </View>
            <View style={{alignItems: 'center'}}>
                <Text size={15}>Loading Pokedex, please wait</Text>
                <Text style={{marginTop: 8}} color={'rgba(0,0,0,.35)'}>{message}</Text>
            </View>
        </View>
    </SafeAreaView>

}

function Init() {
    const {
        useGenerations,
        //
        fetchAllPokemonsByGeneration
    } = ApiService()

    const dispatch = useDispatch()

    const [loadingMessage, setLoadingMessage] = useState('Loading generations...')
    const {data: generationsData, isLoading: loadingGeneration, error: errorGeneration} = useGenerations()

    useEffect(() => {
        if (!!generationsData?.length && !loadingGeneration && !errorGeneration) {
            dispatch(setGenerations(generationsData))
            fetchAllPokemons()
        }
    }, [loadingGeneration, generationsData])


    const fetchAllPokemons = useCallback(() => {
        setLoadingMessage('Finding pokemons...')
        fetchAllPokemonsByGeneration(generationsData, (generationName: string, progress: number) => setLoadingMessage(`Catching pokemons for ${generationName}... ${progress}%`))

    }, [generationsData, fetchAllPokemonsByGeneration])

    return <LoadingView message={loadingMessage}/>
    //return <Text>Pokedex App</Text>
}

export default Init
