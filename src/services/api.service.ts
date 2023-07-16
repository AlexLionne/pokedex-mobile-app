import {Generation, Pokemon} from "pokedex-promise-v2";
import {useQuery} from "react-query";
import {
    FETCH_ALL_GENERATIONS_KEY,
    FETCH_ALL_POKEMONS_BY_GENERATION_KEY,
    FETCH_POKEMONS_BY_GENERATION_KEY, FETCH_POKEMONS_TYPES
} from "../constants/constants";


const ApiService = (): any => {
    const baseUrl = process.env.API_ENDPOINT
    /**
     *
     *
     */
    async function fetchAllGenerations(): Promise<Generation[]> {
        try {

        } catch (e) {

        }
        return []
    }
    async function fetchAllPokemonsTypes(): Promise<Pokemon[]> {
        try {

        } catch (e) {

        }
        return []
    }

    /**
     * Loops trough pages to fetch all pokemons from a given generation
     * @param generation generation to fetch
     * @param startPage where to start query pokemons
     */
    async function fetchAllPokemonsByGeneration(generation: string, startPage: number = 0): Promise<Pokemon[]> {
        try {

        } catch (e) {

        }
        return []
    }

    /**
     * fetch paginated pokemons from a given generation
     * @param generation generation to fetch
     * @param page where to query pokemons
     */
    async function fetchPokemonsByGeneration(generation: string, page: number = 0): Promise<Pokemon[]> {
        try {

        } catch (e) {

        }
        return []
    }

    const useAllPokemonsByGeneration = (generation: string) => useQuery([FETCH_ALL_POKEMONS_BY_GENERATION_KEY], () => fetchAllPokemonsByGeneration(generation,0));
    const usePokemonsByGeneration = (generation: string) => useQuery([FETCH_POKEMONS_BY_GENERATION_KEY], () => fetchPokemonsByGeneration(generation,0));
    const useGenerations = () => useQuery([FETCH_ALL_GENERATIONS_KEY], fetchAllGenerations);
    const usePokemonsTypes = () => useQuery([FETCH_POKEMONS_TYPES], fetchAllPokemonsTypes);

    return {
        usePokemonsByGeneration,
        useAllPokemonsByGeneration,
        useGenerations,
        usePokemonsTypes
    }
}
