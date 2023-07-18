import React, {JSX, useMemo} from "react";
import {Pokemon} from "pokedex-promise-v2";
import {Text} from "../Text/Text";
import {useWindowDimensions, View} from "react-native";
import FastImage from "react-native-fast-image";
import colors from "../../colors/colors";

interface IPokemonCard {
    index: number
    pokemon: Pokemon
}

const PokemonCard = React.memo(({pokemon, index}: IPokemonCard): JSX.Element => {
    const {width, height} = useWindowDimensions()

    const pokemonName = useMemo(() => pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1, pokemon.name.length), [pokemon.name])
    return <View style={{
        backgroundColor: colors.pokemonTypes[pokemon.types[0].type.name].color,
        marginBottom: 12,
        marginRight: index % 2 ? 0 : 12,
        width: (width / 2) - 30,
        borderRadius: 15,
        padding: 8,
        height: 155,
        position: 'relative',
    }}>
        <View style={{flex: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end'}}>
            <Text size={15}>#{pokemon.id}</Text>
        </View>
        <View style={{
            flex: 0,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        }}>
            <View>
                <Text size={17} color={'white'} style={{marginBottom: 8}}>{pokemonName}</Text>
                <View>
                {pokemon.types.map(({type}, index) => {
                    return <View key={`${pokemon.name}-${index}-type`} style={{
                        alignSelf: 'flex-start',
                        backgroundColor: 'rgba(255,255,255,.2)',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 22,
                        marginBottom: 8
                    }}>
                        <Text color={'white'}>{type.name}</Text>
                    </View>
                })}
                </View>
            </View>


        </View>

        <View style={{position: 'absolute', width: 100, right: 0, bottom: 0, zIndex: 999}}>
            <FastImage
                style={{width: 100, minHeight: 120}}
                source={{
                    uri: pokemon.sprites.other["official-artwork"].front_default,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
        </View>
    </View>
}, (p, n) => p.pokemon.id === n.pokemon.id)

export {PokemonCard}
