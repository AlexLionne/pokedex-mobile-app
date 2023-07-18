import {Generation, GenerationName, Pokemon, PokemonType} from "pokedex-promise-v2";
import {useQuery} from "react-query";
import {
    DEFAULT_LANGUAGE,
    FETCH_ALL_GENERATIONS_KEY,
    FETCH_ALL_POKEMONS_BY_GENERATION_KEY,
    FETCH_POKEMONS_BY_GENERATION_KEY,
    FETCH_POKEMONS_TYPES
} from "../constants/constants";
import axios from "axios";


const ApiService = (): any => {
    const baseUrl = 'http://localhost:4000'

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
     * @param updateProgress
     */
    async function fetchAllPokemonsByGenerationPage(generation: Generation, page: number = 0, updateProgress: Function) {
        const totalGenerationPokemons = generation.pokemon_species.length

        let generationName: string = generation.names.find((generationName: GenerationName) => generationName.language.name as string === DEFAULT_LANGUAGE).name

        const {data: {next, results: pokemons}} = await axios.get(`${baseUrl}/pokemons/${generation.name}/${page}`,
            {
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        );


        if (next !== null) {
            // in between progress
            updateProgress(generationName, parseInt((pokemons.length / totalGenerationPokemons * 100).toFixed(0)))

            // fetch next page of generation
            const {data: {next: nextPage, results: newPokemons}} = await fetchAllPokemonsByGenerationPage(generation, next, updateProgress)
            const pokemonFetched = [...pokemons, ...newPokemons].sort((pA, pB) => pA.id - pB.id)

            // late progress
            updateProgress(generationName, parseInt((pokemonFetched.length / totalGenerationPokemons * 100).toFixed(0)))

            return {data: {next: nextPage, results: pokemonFetched}}
        } else {
            // final progress end of generation
            updateProgress(generationName, parseInt((pokemons.length / totalGenerationPokemons * 100).toFixed(0)))

            return {data: {next, results: pokemons}}
        }
    }

    /**
     * Loops trough pages to fetch all pokemons from a given generation
     * @param generations generations to fetch
     * @param updateProgress
     */
    async function fetchAllPokemonsByGeneration(generations: Generation[], updateProgress: Function): Promise<Pokemon[]> {
        let pokemons = []
        try {
            for (const generation of generations) {
                const {data: {results: allPokemons}} = await fetchAllPokemonsByGenerationPage(generation, 0, updateProgress)
                pokemons = [...pokemons, ...allPokemons]
            }
            return pokemons
        } catch (e) {
            console.error(e)
            return []
        }
    }


    const useGenerations = () => useQuery([FETCH_ALL_GENERATIONS_KEY], fetchAllGenerations);
    const usePokemonsTypes = () => useQuery([FETCH_POKEMONS_TYPES], fetchAllPokemonsTypes);

    return {
        // requests
        fetchAllPokemonsByGeneration,
        fetchAllGenerations,
        fetchAllPokemonTypes,
        // react-query
        useGenerations,
        usePokemonsTypes
    }
}

export {ApiService}
