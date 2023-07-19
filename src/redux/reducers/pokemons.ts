import {
    SET_POKEMON_BY_GENERATIONS,
    SET_POKEMON_TYPES, SET_SELECTED_POKEMON
} from "../constants";
import {Pokemon} from "pokedex-promise-v2";

export interface IPokemonReducerStore {
    pokemons: IPokemonStore
}
export interface IPokemonStore {
    pokemons: Pokemon[] | []
    pokemonsTypes: string[]
}

const initialState: IPokemonStore = {pokemons: [], pokemonsTypes: []};

const pokemonsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        /* POKEMONS */
        case SET_POKEMON_BY_GENERATIONS:
            return {
                ...state,
                pokemons: action.pokemons
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
