import React, {JSX, useMemo} from "react";
import {useSelector} from "react-redux";
import {FlatList} from "react-native";
import {PokemonCard} from "../cards/PokemonCard";
import {DEFAULT_POKEMONS_COLUMNS} from "../../constants/constants";

import {IApplicationStore} from "../../redux/reducers/application";
import {IPokemonStore} from "../../redux/reducers/pokemons";
import {Pokemon} from "pokedex-promise-v2";
interface IPokedexList{}

const PokedexList = React.memo(({}: any ): JSX.Element => {

    const {pokemons}: any = useSelector<IPokemonStore>(state => state.pokemons)
    const {filterPokemonsGeneration}: any = useSelector<IApplicationStore>(state => state)

    const filteredPokemons = useMemo<Pokemon[]>(() => pokemons.filter((pokemon: Pokemon) => Object.keys(pokemon.sprites.versions).includes(filterPokemonsGeneration)), [pokemons, filterPokemonsGeneration])

    return <FlatList
        contentContainerStyle={{padding: 24}}
        scrollEventThrottle={32} numColumns={DEFAULT_POKEMONS_COLUMNS} data={filteredPokemons} renderItem={({item: pokemon, index}) => <PokemonCard index={index} pokemon={pokemon}/>}/>
}, (p, n) => true)

export {PokedexList}
