import {SafeAreaView, View} from "react-native";
import {ApiService} from "../services/api.service";
import {PokeBall, PokeBallAnimations} from "../components/placeholder/PokeBall";
import {Text} from "../components/Text/Text";
import {useCallback, useEffect, useState} from "react";
import {setGenerations, setPokemonsByGeneration, setPokemonsTypes} from "../redux/actions";
import {useDispatch} from "react-redux";
import {Pokedex} from "./Pokedex";

const LoadingView = ({message}) => {

    return <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
            <Text size={25} style={{zIndex: 1}}>Pokedex App</Text>
            <View style={{flex: 0, alignItems: 'center', justifyContent: 'center', zIndex: 2}}>
                <PokeBall animated={true} height={183} width={183}
                          animation={PokeBallAnimations.CATCH}
                />
            </View>
            <View style={{alignItems: 'center', zIndex: 1}}>
                <Text size={15}>Loading Pokedex, please wait</Text>
                <Text style={{marginTop: 8}} color={'rgba(0,0,0,.35)'}>{message}</Text>
            </View>
        </View>
    </SafeAreaView>
}

function Init() {
    const {
        useGenerations,
        fetchAllPokemonTypes,
        fetchAllPokemonsByGeneration
    } = ApiService()

    const dispatch = useDispatch()

    const [loadingMessage, setLoadingMessage] = useState<string>('Loading pokemons types...')

    const [isPokedexLoaded, setIsPokedexLoaded] = useState<boolean>(false)

    const {data: generationsData, isLoading: loadingGeneration, error: errorGeneration} = useGenerations()

    const getAllPokemonsTypes = useCallback(async () => {
        setLoadingMessage('Loading pokemons types...')
        const {data: pokemonsTypes} = await fetchAllPokemonTypes()
        //
        dispatch(setPokemonsTypes(pokemonsTypes))
    }, [])

    const getAllPokemons = useCallback(async () => {
        setLoadingMessage('Finding pokemons...')
        const pokemons = await fetchAllPokemonsByGeneration(generationsData, (generationName: string, progress: number) => setLoadingMessage(`Catching pokemons for ${generationName}... ${progress}%`))
        //
        setIsPokedexLoaded(true)
        dispatch(setPokemonsByGeneration(pokemons))
    }, [generationsData])

    useEffect(() => {
        if (!!generationsData?.length && !loadingGeneration && !errorGeneration) {
            const fetchTypesAndPokemons = async () => {
                await getAllPokemonsTypes()
                await getAllPokemons()
            }
            //
            dispatch(setGenerations(generationsData))
            fetchTypesAndPokemons()
        }
    }, [loadingGeneration, generationsData])


    if (!isPokedexLoaded) {
        return <LoadingView message={loadingMessage} />
    }

    return <Pokedex/>
    //return <Text>Pokedex App</Text>
}

export default Init
