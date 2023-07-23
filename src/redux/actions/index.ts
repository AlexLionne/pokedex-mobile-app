import {
  SET_FILTER_POKEMON_GENERATION,
  SET_GENERATIONS, SET_LOADING_PROGRESS,
  SET_POKEMON_BY_GENERATIONS, SET_POKEMON_FAVOURITE, SET_POKEMON_NAMES,
  SET_POKEMON_TYPES, SET_SELECTED_CAROUSEL_POKEMON, SET_SELECTED_POKEMON
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
export const setPokemonsNames = (pokemonsNames: any[]) => ({
  type: SET_POKEMON_NAMES,
  pokemonsNames
})
export const setLoadingProgress = (generationName: string, progress: number) => ({
  type: SET_LOADING_PROGRESS,
  loadingProgress: {
    generationName,
    progress
  }
})
export const setSelectedPokemon = (pokemon: Pokemon | null) => ({
  type: SET_SELECTED_POKEMON,
  pokemon: pokemon
})

export const setSelectedCarouselPokemon = (pokemon: Pokemon | null) => ({
  type: SET_SELECTED_CAROUSEL_POKEMON,
  pokemon: pokemon
})
export const setPokemonsTypes = (pokemonsTypes: PokemonType[]) => ({
  type: SET_POKEMON_TYPES,
  pokemonsTypes
})

export const setPokemonFavourite = (pokemonId: number) => ({
  type: SET_POKEMON_FAVOURITE,
  pokemonId
})

