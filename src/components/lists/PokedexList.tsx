import React, {JSX, useMemo} from "react";
import {useSelector} from "react-redux";
import {PokemonCard} from "../cards/PokemonCard";
import {DEFAULT_POKEMONS_COLUMNS} from "../../constants/constants";
import {FlatList} from 'react-native'
import {IApplicationReducerStore} from "../../redux/reducers/application";
import {IPokemonReducerStore} from "../../redux/reducers/pokemons";
import {Generation, Pokemon, PokemonSpecies} from "pokedex-promise-v2";
import {IGenerationsReducerStore} from "../../redux/reducers/generations";
import {ISelectionReducerStore, ISelectionStore} from "../../redux/reducers/selection";

interface IPokedexList {}

const PokedexList = React.memo(({}: IPokedexList): JSX.Element => {

    const {generations}: any = useSelector((state: IGenerationsReducerStore) => state.generations)
    const {pokemons}: any = useSelector((state: IPokemonReducerStore) => state.pokemons)
    const {filterPokemonsGeneration}: any = useSelector((state: ISelectionReducerStore) => state.selection)

    const selectedGeneration = useMemo(() => {
        return generations.find((generation: Generation) => generation.name === filterPokemonsGeneration)
    }, [generations, filterPokemonsGeneration])

    const filteredPokemons = useMemo<Pokemon[]>(() => pokemons?.filter((pokemon: Pokemon) => {
        return selectedGeneration?.pokemon_species?.some((pokemonSpecie: PokemonSpecies) => pokemonSpecie.name === pokemon.name)
    }), [pokemons, selectedGeneration])

    return <FlatList
        contentContainerStyle={{paddingHorizontal: 24}}
        scrollEventThrottle={32} numColumns={DEFAULT_POKEMONS_COLUMNS} data={filteredPokemons}
        renderItem={({item: pokemon, index}) => <PokemonCard index={index} pokemon={pokemon}
                                                             totalPokemons={filteredPokemons.length}/>}
    />
}, (p, n) => false)

export {PokedexList}
