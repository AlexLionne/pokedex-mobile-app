import React, {JSX, useCallback, useEffect, useMemo, useState} from "react";
import {Pokemon, PokemonType} from "pokedex-promise-v2";
import {Text} from "../Text/Text";
import {Pressable, useWindowDimensions, View} from "react-native";
import FastImage from "react-native-fast-image";
import colors from "../../colors/colors";
import {EPokeBallAnimations, PokeBall} from "../placeholder/PokeBall";
import {setSelectedCarouselPokemon, setSelectedPokemon} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import {Portal} from "@gorhom/portal";
import {ISelectionReducerStore} from "../../redux/reducers/selection";
import {IPokemonReducerStore} from "../../redux/reducers/pokemons";
import {DEFAULT_LANGUAGE} from "../../constants/constants";
import {PokemonAssetDetailed} from "../pokemons/PokemonAssetDetailed";
import {PokemonDetailed} from "../pokemons/PokemonDetailed";


interface IPokemonCard {
    index: number
    pokemon: Pokemon
    totalPokemons: number
}


const PokemonCard = React.memo(({pokemon, index, totalPokemons}: IPokemonCard): JSX.Element => {
    const {width, height} = useWindowDimensions()
    const dispatch = useDispatch()

    const {selectedPokemon, selectedCarouselPokemon} = useSelector((state: ISelectionReducerStore) => state.selection)
    const {
        pokemonsNames,
        pokemonsTypes: storePokemonTypes
    } = useSelector((state: IPokemonReducerStore) => state.pokemons)

    // track positions for animations
    const [elementPosition, setElementPosition] = useState<any>(null)

    const translations = useMemo(() => pokemonsNames.find((name: any) => {
        const [pokemonKey] = Object.keys(name)
        return pokemonKey === pokemon.name
    }), [pokemonsNames, pokemon.name])

    const pokemonName = useMemo(() => translations[pokemon.name].names[DEFAULT_LANGUAGE], [translations, pokemon.name])
    const pokemonGenus = useMemo(() => translations[pokemon.name].genus[DEFAULT_LANGUAGE], [translations, pokemon.name])

    let backgroundColor = useMemo(() => {
        const [pokemonType]: PokemonType[] = pokemon.types.sort((primaryType: PokemonType, secondaryType: PokemonType): any => (secondaryType.slot - primaryType.slot))
        // @ts-ignore
        return colors.pokemonTypes[pokemonType.type.name].color
    }, [pokemon])

    const selectedBackgroundColor = useMemo(() => {
        if (!selectedCarouselPokemon) return null
        const [pokemonType]: PokemonType[] = selectedCarouselPokemon.types.sort((primaryType: PokemonType, secondaryType: PokemonType): any => (secondaryType.slot - primaryType.slot))
        // @ts-ignore
        return colors.pokemonTypes[pokemonType.type.name].color
    }, [selectedCarouselPokemon])

    // override when selected
    backgroundColor = selectedBackgroundColor ?? backgroundColor

    const pokemonPreview = useMemo<string | null>(() => {
        // @ts-ignore - index by official artwork
        return pokemon.sprites.other["official-artwork"]?.front_default
    }, [pokemon])

    const pokemonTypes = useMemo<any[]>((): any => {
        let pokemonFullTypes = storePokemonTypes.filter((type: any) => pokemon.types.map((pokemonType: PokemonType) => pokemonType.type.name).includes(type.name))
        return pokemonFullTypes.map((pokemonFullType: any) => {

            const [translatedType] = pokemonFullType.names.filter((name: Array<{ language: string, type: string }>) => {
                const [languageKey] = Object.keys(name)
                return languageKey === DEFAULT_LANGUAGE
            })
            return ({
                slot: pokemon.types.find(type => type.type.name === pokemonFullType.name)?.slot,
                name: translatedType[DEFAULT_LANGUAGE]
            })
        }).sort((primaryType: any, secondaryType: any): any => (secondaryType.slot - primaryType.slot))
    }, [pokemon, storePokemonTypes])


    const pokemonId = useMemo(() => {
        const digitsToAppend = Array(Array(totalPokemons.toString().length).fill('0').length - pokemon.id.toString().length)
        // first gen =
        // [0,0,0] + id=1 = 2 : '00' + pokemon.id
        return (digitsToAppend.fill('0') + pokemon.id.toString()).replaceAll(',', '')
    }, [pokemon, totalPokemons])

    const onPress = useCallback((event: any) => {
        // measure initial window position
        event.target.measureInWindow((x: number, y: number) => {
            setElementPosition({
                ...elementPosition,
                ['asset']: {pageX: parseFloat(x.toFixed(1)), pageY: parseFloat(y.toFixed(1))},
                ['stats']: {pageX: parseFloat(x.toFixed(1)), pageY: parseFloat(y.toFixed(1))}
            })
        })

        dispatch(setSelectedPokemon(pokemon))
        dispatch(setSelectedCarouselPokemon(pokemon))
    }, [pokemon])

    /*
    *
    *
    *
    *
    *
    * */
    return <View>
        <Pressable
            onPress={onPress}
            style={{
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
                        {pokemonTypes !== null && pokemonTypes.map(({name: typeName}: any, index: number) => {
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

                {<PokemonDetailed
                    selectedCarouselPokemon={selectedCarouselPokemon}
                    totalPokemons={totalPokemons}
                    elementPosition={elementPosition}
                />}

            </View>
            <View style={{
                position: 'absolute',
                width: 90,
                right: -10,
                bottom: -10,
                zIndex: 2,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <PokeBall animated={false} width={90} height={90} color={'rgba(255,255,255,.2)'} rotation={0}/>
            </View>
            <View style={{position: 'absolute', width: 90, right: 0, bottom: 0, zIndex: 2}}>
                <FastImage
                    style={{width: 90, height: 80, zIndex: 3}}
                    source={{
                        uri: pokemonPreview as string,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                {/*Selected asset of the pokémon in the portal [width / 2, height / 3 + 50]*/}
                {/*pokemons Carousel*/}
                {<PokemonAssetDetailed
                    selectedPokemon={selectedPokemon}
                    onPokemonChanged={(pokemon: Pokemon) => dispatch(setSelectedCarouselPokemon(pokemon))}
                    pokemon={pokemon}
                    elementPosition={elementPosition}/>}
            </View>
        </Pressable>
        {/*POKEMON DETAIL PLACEHOLDER*/}
        <Portal hostName={"PokemonDetailBackgroundHost"}>
            {selectedPokemon && selectedPokemon.name === pokemon.name && (
                <Animated.View entering={FadeIn.duration(350)}
                               exiting={FadeOut.duration(350)}
                               style={[{
                                   flex: 1,
                                   backgroundColor,
                                   position: 'absolute',
                                   width: width,
                                   height: height,
                                   left: 0,
                                   zIndex: 3,
                                   top: 0
                               }]}>
                    <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: height / 3 - 50}}>
                        <PokeBall animated={true} animation={EPokeBallAnimations.LINEAR} width={183} height={183}
                                  color={'rgba(255, 255, 255, .2)'}/>
                    </View>
                </Animated.View>)
            }
        </Portal>
    </View>
}, (p, n) => p.pokemon.id === n.pokemon.id)

export {PokemonCard}
