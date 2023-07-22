import {Generation, GenerationName, Pokemon, PokemonType} from "pokedex-promise-v2";
import {useQuery} from "react-query";
import {
    API_ENDPOINT,
    DEFAULT_LANGUAGE,
    FETCH_ALL_GENERATIONS_KEY
} from "../constants/constants";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setLoadingProgress} from "../redux/actions";


const ApiService = (): any => {
    const baseUrl = API_ENDPOINT

    /**
     *
     *
     */
    async function fetchAllGenerations(): Promise<Generation[]> {
        try {
            const {data} = await axios.get(`${baseUrl}/generations`,
                {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                }
            );
            return data as Generation[]
        } catch (e) {
            console.log(e)
        }
        return []
    }

    async function fetchAllPokemonTypes(): Promise<PokemonType[]> {
        try {
            const {data} = await axios.get(`${baseUrl}/pokemons/types`,
                {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                }
            );
            return data as PokemonType[]
        } catch (e) {

        }
        return []
    }

    /**
     *
     * @param generation
     * @param page
     */
    async function fetchAllPokemonsByGenerationPage(generation: Generation, page: number = 0): Promise<{data: {next: number, results: Pokemon[]}}>  {
        const {data: {next, results: pokemons}} = await axios.get(`${baseUrl}/pokemons/${generation.name}/${page}`,
            {
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        );

        if (next !== null) {
            // fetch next page of generation
            const {data: {next: nextPage, results: newPokemons}} = await fetchAllPokemonsByGenerationPage(generation, next)
            const pokemonFetched = [...pokemons, ...newPokemons].sort((pA, pB) => pA.id - pB.id)

            return {data: {next: nextPage, results: pokemonFetched}}
        } else {
            return {data: {next, results: pokemons}}
        }
    }

    /**
     *
     * @param generation
     * @param page
     */
    async function fetchAllPokemonsNamesByGenerationPage(generation: Generation, page: number = 0): Promise<{data: {next: number, results: Pokemon[]}}>  {
        const totalGenerationPokemons = generation.pokemon_species.length

        /* We could use i18n !*/
        // @ts-ignore
        let generationName: string = generation.names.find((generationName: GenerationName) => generationName.language.name as string === DEFAULT_LANGUAGE).name || generation.name

        const {data: {next, results: names}} = await axios.get(`${baseUrl}/pokemons/names/${generation.name}/${page}`,
            {
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        );


        if (next !== null) {
            // fetch next page of generation
            const {data: {next: nextPage, results: newNames}} = await fetchAllPokemonsNamesByGenerationPage(generation, next)
            const namesFetched = [...names, ...newNames].sort((pA, pB) => pA.id - pB.id)

            return {data: {next: nextPage, results: namesFetched}}
        } else {
            return {data: {next, results: names}}
        }
    }

    /**
     * Loops trough pages to fetch all pokemons from a given generation
     * @param generations generations to fetch
     * @param updateProgress
     */
    async function fetchAllPokemonsByGeneration(generations: Generation[], updateProgress: Function): Promise<Pokemon[]> {
        let pokemons: Pokemon[] = []
        try {
            for (const generation of generations) {
                const {data: {results: allPokemons}} = await fetchAllPokemonsByGenerationPage(generation, 0)
                pokemons = [...pokemons, ...allPokemons]
            }
            return pokemons
        } catch (e) {
            console.error(e)
            return []
        }
    }

    /**
     * Loops trough pages to fetch all pokemons from a given generation
     * @param generations generations to fetch
     * @param updateProgress
     */
    async function fetchAllPokemonsNamesByGeneration(generations: Generation[]): Promise<Pokemon[]> {
        let pokemonsNames: Pokemon[] = []
        try {
            for (const generation of generations) {
                const {data: {results: allNames}} = await fetchAllPokemonsNamesByGenerationPage(generation, 0)
                pokemonsNames = [...pokemonsNames, ...allNames]
            }
            return pokemonsNames
        } catch (e) {
            console.error(e)
            return []
        }
    }


    const useGenerations = () => useQuery([FETCH_ALL_GENERATIONS_KEY], fetchAllGenerations);

    return {
        // requests
        fetchAllPokemonsByGeneration,
        fetchAllPokemonsNamesByGeneration,
        fetchAllGenerations,
        fetchAllPokemonTypes,
        // react-query
        useGenerations
    }
}

export {ApiService}
