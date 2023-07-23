import React, {JSX, useMemo} from "react";
import {View} from "react-native";
import {Pokemon, PokemonType} from "pokedex-promise-v2";
import {Description} from "../../pokemons/Description";
import {useSelector} from "react-redux";
import {IPokemonReducerStore} from "../../../redux/reducers/pokemons";
import {Characteristics} from "../../pokemons/Characteristics";
import {Breeding} from "../../pokemons/Breeding";
import {DEFAULT_LANGUAGE} from "../../../constants/constants";

interface IAboutProps {
    selectedCarouselPokemon: Pokemon | null
    pokemonsType?: PokemonType
}

const About = React.memo(({selectedCarouselPokemon, pokemonsType}: IAboutProps): JSX.Element | null => {

    if (!selectedCarouselPokemon) return null

    const {
        pokemonsNames,
        pokemonsTypes: storePokemonTypes
    } = useSelector((state: IPokemonReducerStore) => state.pokemons)


    const translations = useMemo(() => pokemonsNames.find((name: any) => {
        const [pokemonKey] = Object.keys(name)
        return pokemonKey === selectedCarouselPokemon.name
    }), [pokemonsNames, selectedCarouselPokemon.name])

    const genderRates = useMemo(() => translations[selectedCarouselPokemon.name].gender_rate, [translations, selectedCarouselPokemon.name])

    return <View style={{flex: 1, backgroundColor: 'white', padding: 24}}>
        <Description translations={translations[selectedCarouselPokemon.name]}/>
        <Characteristics height={selectedCarouselPokemon.height} weight={selectedCarouselPokemon.weight}/>
        <Breeding genderRates={genderRates}/>
    </View>
}, (p, n) => {
    const shouldUpdate = p?.selectedCarouselPokemon?.id !== n?.selectedCarouselPokemon?.id

    return !shouldUpdate
})

export {About}
