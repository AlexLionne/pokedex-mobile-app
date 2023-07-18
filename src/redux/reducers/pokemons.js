import {
    SET_POKEMON_BY_GENERATIONS,
    SET_POKEMON_TYPES
} from "../constants";
import {Pokemon} from "pokedex-promise-v2";

export interface IPokemonStore {
    pokemons: Pokemon[] | []
    pokemonsTypes: string[]
}

const initialState: IPokemonStore = {pokemons: [], pokemonsTypes: []};

const pokemonsReducer = (state = initialState, action) => {
    switch (action.type) {
        /* POKEMONS */
        case SET_POKEMON_BY_GENERATIONS:
        /* POKEMONS TYPES */
        case SET_POKEMON_TYPES:
            return state
        default:
            return state;
    }
};
export default pokemonsReducer;
