import {
  SET_FILTER_POKEMON_GENERATION,
  SET_GENERATIONS,
  SET_POKEMON_BY_GENERATIONS,
  SET_POKEMON_TYPES
} from '../constants'
import {Generation, Pokemon, PokemonType} from "pokedex-promise-v2";

export const setGenerations = (generations: Generation[]) => ({
  type: SET_GENERATIONS,
  generations
})
export const setFilterGeneration = (filterPokemonsGeneration: string) => ({
  type: SET_FILTER_POKEMON_GENERATION,
  filterPokemonsGeneration
})
export const setPokemonsByGeneration = (pokemons: Pokemon[]) => ({
  type: SET_POKEMON_BY_GENERATIONS,
  pokemons
})

export const setPokemonsTypes = (pokemonsTypes: PokemonType[]) => ({
  type: SET_POKEMON_TYPES,
  pokemonsTypes
})

