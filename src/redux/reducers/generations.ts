import {
    SET_GENERATIONS
} from "../constants";
import {Generation} from "pokedex-promise-v2";

export interface IGenerationsReducerStore {
    generations: IGenerationsStore
}
export interface IGenerationsStore {
    generations: Generation[] | []
}

const initialState: IGenerationsStore = {generations: []};


const generationReducer = (state: IGenerationsStore = initialState, action: any) => {
    switch (action.type) {
        case SET_GENERATIONS:
            return {
                ...state,
                generations: action.generations
            }
        default:
            return state;
    }
};
export default generationReducer;
