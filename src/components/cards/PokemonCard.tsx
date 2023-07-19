import React, {JSX, useCallback, useEffect, useMemo, useState} from "react";
import {Pokemon, PokemonType} from "pokedex-promise-v2";
import {Text} from "../Text/Text";
import {Pressable, useWindowDimensions, View} from "react-native";
import FastImage from "react-native-fast-image";
import colors from "../../colors/colors";
import {EPokeBallAnimations, PokeBall} from "../placeholder/PokeBall";
import {setSelectedPokemon} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import Animated, {Easing, FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {Portal} from "@gorhom/portal";
import {ISelectionReducerStore} from "../../redux/reducers/selection";


interface IPokemonCard {
    index: number
    pokemon: Pokemon
    totalPokemons: number
}

const PokemonCard = React.memo(({pokemon, index, totalPokemons}: IPokemonCard): JSX.Element => {
    const {width, height} = useWindowDimensions()
    const dispatch = useDispatch()

    const pokemonName = useMemo(() => pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1, pokemon.name.length), [pokemon.name])
    const {selectedPokemon} = useSelector((state: ISelectionReducerStore) => state.selection)
    // track positions for animations
    const [elementPosition, setElementPosition] = useState<any>(null)

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

    const onPress = useCallback((event: any) => {
        // measure initial window position
        event.target.measureInWindow((x: number, y: number) => {
            setElementPosition({
                ...elementPosition,
                ['asset']: {pageX: parseFloat(x.toFixed(1)), pageY: parseFloat(y.toFixed(1))}
            })
        })

        dispatch(setSelectedPokemon(pokemon))
    }, [pokemon])


    const PokemonAssetDetailed = () => {
        if (!(selectedPokemon && selectedPokemon.name === pokemon.name && elementPosition)) return null

        const {pageX, pageY} = elementPosition['asset']

        const targetPosition = [width / 2, height / 3 + 50]
        const [targetX, targetY] = targetPosition


        const scaleAnimation = useSharedValue<any>(1);
        const translateX = useSharedValue<any>(pageX);
        const translateY = useSharedValue<any>(pageY);

        const animatedStyles = useAnimatedStyle((): {} => {
            // enter
            return {
                top: translateY.value,
                left: translateX.value,
                transform: [
                    //{translateX: translateX.value},
                    //{translateY: translateY.value},
                    {scale: scaleAnimation.value}
                ],
            };

        }, [targetX, targetY]);
//
        useEffect(() => {
            scaleAnimation.value = withTiming(3, {duration: 750, easing: Easing.inOut(Easing.linear)})
            translateX.value = withTiming(targetX - (80/2), {duration: 750, easing: Easing.inOut(Easing.linear)})
            translateY.value = withTiming(targetY + (80 * 2) + 50  , {duration: 750, easing: Easing.inOut(Easing.linear)})
        }, [])

        return <Portal hostName={"PokemonDetailBackgroundHost"}>
            <Animated.View
                style={[{
                    position: 'absolute',
                    left: elementPosition.asset.pageX,
                    top: elementPosition.asset.pageY,
                    width: 90,
                    right: 0,
                    bottom: 0,
                    zIndex: 5
                }, animatedStyles]}>
                <FastImage
                    style={{width: 90, height: 80}}
                    source={{
                        uri: pokemonPreview as string,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </Animated.View>
        </Portal>
    }
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
                {/*Selected asset of the pokemon in the portal*/}
                <PokemonAssetDetailed/>
            </View>
        </Pressable>
        {/*POKEMON DETAIL PLACEHOLDER*/}
        <Portal hostName={"PokemonDetailBackgroundHost"}>
            {selectedPokemon && selectedPokemon.name === pokemon.name && (
                <Animated.View entering={FadeIn.duration(500)}
                               exiting={FadeOut.duration(500)}
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
