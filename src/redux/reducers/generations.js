import {
    GET_GENERATIONS
} from "../constants";
import {Generation} from "pokedex-promise-v2";

interface IGenerationsStore {
    generations: Generation[] | []
}

const initialState: IGenerationsStore = {generations: []};


const generationReducer = (state: IGenerationsStore = initialState, action) => {
    switch (action.type) {
        case GET_GENERATIONS:
            return state
        default:
            return state;
    }
};
export default generationReducer;
