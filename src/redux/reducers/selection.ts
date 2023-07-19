import {DEFAULT_POKEMON_FILTER_TYPE, DEFAULT_POKEMON_GENERATION} from "../../constants/constants";
import {SET_FILTER_POKEMON_GENERATION, SET_FILTER_POKEMON_TYPES, SET_SELECTED_POKEMON} from "../constants";
import {Pokemon} from "pokedex-promise-v2";

export interface ISelectionReducerStore {
    selection: ISelectionStore
}
export interface ISelectionStore {
    filterPokemonsType: string /* won't do an enum if new types are release */
    filterPokemonsGeneration: string /* won't do an enum if new generations are release */
    selectedPokemon: Pokemon | null
}

const initialState: ISelectionStore = {
    filterPokemonsType: DEFAULT_POKEMON_FILTER_TYPE,
    filterPokemonsGeneration: DEFAULT_POKEMON_GENERATION,
    selectedPokemon: null
}
const applicationReducer = (state: ISelectionStore = initialState, action: any) => {
    switch (action.type) {
        case SET_FILTER_POKEMON_GENERATION:
            return {
                ...state,
                filterPokemonsGeneration: action.filterPokemonsGeneration
            }
        case SET_SELECTED_POKEMON:
            return {
                ...state,
                selectedPokemon: action.pokemon
            }
        case SET_FILTER_POKEMON_TYPES:
            return state
        default:
            return state;
    }
}
export default applicationReducer
