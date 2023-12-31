import {DEFAULT_POKEMON_FILTER_TYPE, DEFAULT_POKEMON_GENERATION} from "../../constants/constants";
import {SET_FILTER_POKEMON_GENERATION, SET_FILTER_POKEMON_TYPES} from "../constants";

interface IApplicationStore {
    filterPokemonsType: string // won't do an enum if new types are release
    filterPokemonsGeneration: string // won't do an enum if new generations are release
}

const initialState: IApplicationStore = {
    filterPokemonsType: DEFAULT_POKEMON_FILTER_TYPE,
    filterPokemonsGeneration: DEFAULT_POKEMON_GENERATION
}
const applicationReducer = (state: IApplicationStore = initialState, action) => {
    switch (action.type) {
        case SET_FILTER_POKEMON_GENERATION:
        case SET_FILTER_POKEMON_TYPES:
            return state
        default:
            return state;
    }
}
export default applicationReducer
