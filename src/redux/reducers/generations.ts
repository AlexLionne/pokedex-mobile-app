import {
    SET_GENERATIONS
} from "../constants";
import {Generation} from "pokedex-promise-v2";

export interface IGenerationsStore {
    generations: Generation[] | []
}

const initialState: IGenerationsStore = {generations: []};


const generationReducer = (state: IGenerationsStore = initialState, action: any) => {
    switch (action.type) {
        case SET_GENERATIONS:
            return {
                ...state,
                generation: action.generation
            }
        default:
            return state;
    }
};
export default generationReducer;
