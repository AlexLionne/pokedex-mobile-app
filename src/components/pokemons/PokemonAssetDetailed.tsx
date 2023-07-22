import React, {JSX, useEffect, useMemo, useRef, useState} from "react";
import {Generation, Pokemon, PokemonSpecies} from "pokedex-promise-v2";
import {useWindowDimensions, View} from "react-native";
import {useSelector} from "react-redux";
import {IGenerationsReducerStore} from "../../redux/reducers/generations";
import {IPokemonReducerStore} from "../../redux/reducers/pokemons";
import {ISelectionReducerStore} from "../../redux/reducers/selection";
import Animated, {Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {Portal} from "@gorhom/portal";
import Carousel, {getInputRangeFromIndexes} from "react-native-snap-carousel";
import FastImage from "react-native-fast-image";
import {Ornament} from "../../assets/Ornament";
import {Dots} from "../../assets/Dots";


interface IPokemonAssetDetailedProps {
    pokemon: Pokemon,
    selectedPokemon: Pokemon | null,
    elementPosition: any,
    onPokemonChanged: (pokemon: Pokemon) => void
}
const PokemonAssetDetailed = ({
                                  pokemon,
                                  elementPosition,
                                  onPokemonChanged,
                                  selectedPokemon,
                              }: IPokemonAssetDetailedProps) => {


    if (!(selectedPokemon && selectedPokemon.name === pokemon.name && elementPosition)) return null

    const {width, height} = useWindowDimensions()

    const {generations}: any = useSelector((state: IGenerationsReducerStore) => state.generations)
    const {pokemons}: any = useSelector((state: IPokemonReducerStore) => state.pokemons)
    const {filterPokemonsGeneration}: any = useSelector((state: ISelectionReducerStore) => state.selection)

    const selectedGeneration = useMemo(() => {
        return generations.find((generation: Generation) => generation.name === 'generation-iii')
    }, [generations, filterPokemonsGeneration])
    //
    const filteredPokemons = useMemo<Pokemon[]>(() => pokemons?.filter((pokemon: Pokemon) => {
        return selectedGeneration?.pokemon_species?.some((pokemonSpecie: PokemonSpecies) => pokemonSpecie.name === pokemon.name)
    }), [pokemons, selectedGeneration])
    //
    const pokemonPreviews = useMemo<Array<{ id: number, preview: string }>>((): Array<{
        id: number,
        preview: string
    }> => {
        // @ts-ignore - index by official artwork
        return filteredPokemons.map((pokemon: Pokemon, index) => ({
            index,
            id: pokemon.id,
            preview: pokemon.sprites.other["official-artwork"]?.front_default
        }))
    }, [pokemons])

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
                {scale: scaleAnimation.value}
            ],
        };

    }, [targetX, targetY]);

    useEffect(() => {
        scaleAnimation.value = withTiming(3, {duration: 484, easing: Easing.inOut(Easing.linear)}, onAnimationEnd)
        translateX.value = withTiming(targetX - (80 / 2), {duration: 500, easing: Easing.inOut(Easing.linear)})
        translateY.value = withTiming(targetY + (80 * 2) + 50, {
            duration: 500,
            easing: Easing.inOut(Easing.linear)
        })
    }, [])

    const [hidePreview, setHidePreview] = useState(false)
    const hidePreviewInterval = useRef<NodeJS.Timeout | number>(0)
    const [itemsVisible, setItemVisible] = useState(false)

    useEffect(() => {
        clearInterval(hidePreviewInterval.current)
        if (itemsVisible) {
            hidePreviewInterval.current = setTimeout(() => {
                setHidePreview(true)
            }, 100)
        }
    }, [itemsVisible])
    const onAnimationEnd = () => {
        'worklet'
        runOnJS(setItemVisible)(true)
    }

    const initialIndex = useMemo(() => null ?? filteredPokemons.findIndex((pokemon: Pokemon) => pokemon.name === selectedPokemon.name), [filteredPokemons, selectedPokemon])
    const selectedPokemonPreview = useMemo(() => selectedPokemon?.sprites.other["official-artwork"]?.front_default as string, [selectedPokemon])


    return <Portal hostName={"PokemonDetailBackgroundHost"}>
        <Animated.View
            style={[{
                position: 'absolute',
                left: hidePreview ? 0 : elementPosition.asset.pageX,
                top: elementPosition.asset.pageY,
                width: hidePreview ? width : 90,
                right: 0,
                bottom: 0,
                zIndex: 5
            }, animatedStyles]}>
            <View style={{flex: 0, position: 'relative'}}>
                {!hidePreview && <FastImage
                    style={{width: 90, height: 80, position: 'absolute'}}
                    source={{
                        uri: selectedPokemonPreview,
                        priority: FastImage.priority.low,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />}
                {(itemsVisible && initialIndex !== null) &&
                    <View style={{height: 80, position: 'absolute', left: 0, right: 0}}>
                        <Carousel
                            apparitionDelay={50}
                            initialScrollIndex={initialIndex}
                            firstItem={initialIndex}
                            sliderWidth={width}
                            sliderHeight={80}
                            itemWidth={70}
                            itemHeight={80}
                            inactiveSlideOpacity={.15}
                            inactiveSlideScale={.5}
                            activeSlideOffset={20}
                            centerContent={true}
                            inactiveSlideShift={10}
                            scrollInterpolator={(index, carouselProps): any => {
                                const range = [1, 0, -1];
                                const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
                                const outputRange = range;

                                return {inputRange, outputRange};
                            }}
                            slideInterpolatedStyle={(index, animatedValue, carouselProps): any => {

                                return {
                                    opacity: animatedValue.interpolate({
                                        inputRange: [-1, 0, 1],
                                        outputRange: [.2, 1, .2],
                                    }),
                                    transform: [
                                        {
                                            scale: animatedValue.interpolate({
                                                inputRange: [-1, 0, 1],
                                                outputRange: [.5, 1, .5],
                                            })
                                        },
                                        {
                                            translateX: animatedValue.interpolate({
                                                inputRange: [-1, 0, 1],
                                                outputRange: [30, 0, -30],
                                            })
                                        }]
                                };
                            }}
                            containerCustomStyle={{marginLeft: -60, height: 80}}
                            getItemLayout={(data, index) => (
                                {length: 70, offset: 70 * index, index}
                            )}
                            onSnapToItem={(index) => {
                                const nextPokemon: Pokemon = filteredPokemons[index]
                                if (nextPokemon) {
                                    onPokemonChanged(nextPokemon)
                                }
                            }}
                            renderItem={({item, index}) => (
                                <FastImage
                                    //fallback={item.id !== selectedPokemon.id}
                                    //tintColor={item.id !== selectedPokemon.id ? 'black' : undefined}
                                    style={{width: 90, height: 80}}
                                    source={{
                                        uri: item.preview,
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            )}
                            data={pokemonPreviews}/>
                    </View>
                }
            </View>
        </Animated.View>
        <View style={{position: 'absolute', top: 0, left: 0, zIndex: 3}}>
            <Ornament/>
        </View>
        <View style={{position: 'absolute', top: 0, right: width / 4, zIndex: 3}}>
            <Dots/>
        </View>
    </Portal>
}
export {PokemonAssetDetailed}
