import {SafeAreaView, View} from "react-native";
import {ApiService} from "../services/api.service";
import {PokeBall, EPokeBallAnimations} from "../components/placeholder/PokeBall";
import {Text} from "../components/Text/Text";
import {useCallback, useEffect, useMemo, useState} from "react";
import {
    setGenerations,
    setPokemonsByGeneration,
    setPokemonsTypes,
    setFilterGeneration, setPokemonsNames
} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {Pokedex} from "./Pokedex";
import {IGenerationsStore} from "../redux/reducers/generations";

interface LoadingViewProps {
    message: string
}
const LoadingView = ({message}: LoadingViewProps) => {

    return <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
            <Text size={25} style={{zIndex: 1}}>Pokedex App</Text>
            <View style={{flex: 0, alignItems: 'center', justifyContent: 'center', zIndex: 2}}>
                <PokeBall animated={true} height={183} width={183}
                          animation={EPokeBallAnimations.CATCH}
                          color={"#F4F5F4"}
                />
            </View>
            <View style={{alignItems: 'center', zIndex: 1}}>
                <Text size={15}>Chargement du Pokédex</Text>
                <Text style={{marginTop: 8}} color={'rgba(0,0,0,.35)'}>{message}</Text>
            </View>
        </View>
    </SafeAreaView>
}

function Init() {
    const {
        useGenerations,
        fetchAllPokemonTypes,
        fetchAllPokemonsByGeneration,
        fetchAllPokemonsNamesByGeneration
    } = ApiService()

    const dispatch = useDispatch()

    const [loadingMessage, setLoadingMessage] = useState<string>('Chargement des Types de Pokemons')
    const [isPokedexLoaded, setIsPokedexLoaded] = useState<boolean>(false)

    /* TODO
        - we can generate an match an MD5 from server to check if pokemons / types / generations are complete
          if not, we can download missing entries
          we can also add an option in the settings to allow the user to download missing entries
        - we can store our trust on pokemon generation, when a new gen is released, download pokemons and types with
    * */

    const {generations: storeGenerations}: any = useSelector<IGenerationsStore>(state => state.generations)

    const {data: generationsData, isLoading: loadingGeneration, error: errorGeneration} = useGenerations()

    const hasNewGenerationReleased: boolean = useMemo(() => storeGenerations?.length !== generationsData?.length, [storeGenerations, generationsData])
    /**
     *
     */
    const getAllPokemonsTypes = useCallback(async () => {
        setLoadingMessage('Chargement des Pokémons...')

        /*
        * TODO
        * hasNewGenerationReleased or hadIncompleteData
        * -> get the diff to isolate generation(s) to fetch
        * -> append results to pokemons store
        * */

        if (hasNewGenerationReleased) {
            const pokemonsTypes = await fetchAllPokemonTypes()
            //
            dispatch(setPokemonsTypes(pokemonsTypes))
        }
    }, [hasNewGenerationReleased])

    /**
     *
     */
    const getAllPokemons = useCallback(async () => {
        if (hasNewGenerationReleased) {
            setLoadingMessage(`Capture des Pokémons ...`)
            const pokemons = await fetchAllPokemonsByGeneration(generationsData)
            dispatch(setPokemonsByGeneration(pokemons))
        }
    }, [generationsData, hasNewGenerationReleased])
    /**
     *
     */
    const getAllPokemonsNames = useCallback(async () => {
        setLoadingMessage('Traduction des Pokémons...')
        if (hasNewGenerationReleased) {
            const pokemonsNames = await fetchAllPokemonsNamesByGeneration(generationsData)
            dispatch(setPokemonsNames(pokemonsNames))
        }
    }, [generationsData, hasNewGenerationReleased])
    /**
     *
     */
    useEffect(() => {
        if (!!generationsData?.length && !loadingGeneration && !errorGeneration) {
            const fetchTypesAndPokemons = async () => {
                await getAllPokemonsNames()
                await getAllPokemonsTypes()
                await getAllPokemons()
            }
            const [firstGeneration] = generationsData
            //
            dispatch(setGenerations(generationsData))
            dispatch(setFilterGeneration(firstGeneration.name))
            fetchTypesAndPokemons().then(() => setIsPokedexLoaded(true))
        }
    }, [loadingGeneration, generationsData])


    if (!isPokedexLoaded) {
        return <LoadingView message={loadingMessage} />
    }

    return <Pokedex/>
}

export default Init
