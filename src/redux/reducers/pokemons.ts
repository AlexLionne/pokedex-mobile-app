import {SET_LOADING_PROGRESS, SET_POKEMON_BY_GENERATIONS, SET_POKEMON_NAMES, SET_POKEMON_TYPES} from "../constants";
import {Pokemon, PokemonType} from "pokedex-promise-v2";

export interface IPokemonReducerStore {
    pokemons: IPokemonStore
}

export interface IPokemonStore {
    pokemons: Pokemon[] | []
    pokemonsTypes: PokemonType[] | []
    pokemonsNames: any
}

const initialState: IPokemonStore = {pokemons: [], pokemonsTypes: [], pokemonsNames: {}};

const pokemonsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        /* POKEMONS */
        case SET_POKEMON_BY_GENERATIONS:
            return {
                ...state,
                pokemons: action.pokemons
            }
        /* POKEMONS NAMES*/
        case SET_POKEMON_NAMES:
            return {
                ...state,
                pokemonsNames: action.pokemonsNames
            }
        /* POKEMONS TYPES */
        case SET_POKEMON_TYPES:
            return {
                ...state,
                pokemonsTypes: action.pokemonsTypes
            }
        default:
            return state;
    }
};
export default pokemonsReducer;
