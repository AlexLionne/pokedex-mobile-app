import React, {JSX, useMemo} from "react";
import {Pokemon, PokemonType} from "pokedex-promise-v2";
import {Text} from "../Text/Text";
import {useWindowDimensions, View} from "react-native";
import FastImage from "react-native-fast-image";
import colors from "../../colors/colors";
import {PokeBall} from "../placeholder/PokeBall";

interface IPokemonCard {
    index: number
    pokemon: Pokemon
    totalPokemons: number
}

const PokemonCard = React.memo(({pokemon, index, totalPokemons}: IPokemonCard): JSX.Element => {
    const {width} = useWindowDimensions()

    const pokemonName = useMemo(() => pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1, pokemon.name.length), [pokemon.name])

    const backgroundColor = useMemo(() => {
        const [pokemonType]: PokemonType[] = pokemon.types
        // @ts-ignore
        return colors.pokemonTypes[pokemonType.type.name].color
    }, [pokemon])

    const pokemonPreview = useMemo<string | null>(() => {
        // @ts-ignore - index by official artwork
        return pokemon.sprites.other["official-artwork"]?.front_default
    }, [pokemon])

    const pokemonId = useMemo(() => {
        const digitsToAppend = Array(Array(totalPokemons.toString().length).fill('0').length - pokemon.id.toString().length)
        // first gen =
        // [0,0,0] + id=1 = 2 : '00' + pokemon.id
        return (digitsToAppend.fill('0') + pokemon.id.toString()).replaceAll(',', '')
    }, [pokemon, totalPokemons])

    return <View style={{
        overflow: 'hidden',
        backgroundColor: backgroundColor,
        marginBottom: 12,
        marginRight: index % 2 ? 0 : 12,
        width: (width / 2) - 30,
        borderRadius: 15,
        paddingHorizontal: 14,
        paddingVertical: 8,
        height: 120,
        position: 'relative',
    }}>
        <View style={{flex: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end'}}>
            <Text size={14} color={'rgba(0,0,0,.5)'} bold>{`#${pokemonId}`}</Text>
        </View>
        <View style={{
            flex: 0,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        }}>
            <View>
                <Text size={15} color={'white'} style={{marginBottom: 8}}>{pokemonName}</Text>
                <View>
                    {pokemon.types.map(({type}, index) => {
                        const typeName = type.name.charAt(0).toUpperCase() + type.name.slice(1, type.name.length)
                        return <View key={`${pokemon.name}-${index}-type`}
                                     style={{
                                         alignSelf: 'flex-start',
                                         backgroundColor: 'rgba(255,255,255,.2)',
                                         paddingHorizontal: 12,
                                         paddingVertical: 4,
                                         borderRadius: 22,
                                         marginBottom: 8
                                     }}>
                            <Text color={'white'} size={10}>{typeName}</Text>
                        </View>
                    })}
                </View>
            </View>


        </View>

        <View style={{
            position: 'absolute',
            width: 90,
            right: -10,
            bottom: -10,
            zIndex: 999,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <PokeBall animated={false} width={90} height={90} color={'rgba(255,255,255,.2)'} rotation={0}/>
        </View>
        <View style={{position: 'absolute', width: 90, right: 0, bottom: 0, zIndex: 999}}>
            <FastImage
                style={{width: 90, height: 80}}
                source={{
                    uri: pokemonPreview as string,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
        </View>
    </View>
}, (p, n) => p.pokemon.id === n.pokemon.id)

export {PokemonCard}
