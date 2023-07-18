import React, {JSX} from "react";
import {useSelector} from "react-redux";
import {IPokemonStore} from "../../redux/reducers/pokemons";
import {IGenerationsStore} from "../../redux/reducers/generations";
import {FlatList} from "react-native";
import {PokemonCard} from "../cards/PokemonCard";
import {DEFAULT_POKEMONS_COLUMNS} from "../../constants/constants";

interface IPokedexList{}

const PokedexList = React.memo(({}: any ): JSX.Element => {

    const {pokemons} = useSelector<IPokemonStore>(state => state.pokemons)

    return <FlatList
        contentContainerStyle={{padding: 24}}
        scrollEventThrottle={32} numColumns={DEFAULT_POKEMONS_COLUMNS} data={pokemons} renderItem={({item: pokemon, index}) => <PokemonCard index={index} pokemon={pokemon}/>}/>
}, (p, n) => true)

export {PokedexList}
