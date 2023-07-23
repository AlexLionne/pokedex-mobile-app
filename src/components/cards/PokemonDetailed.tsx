import {TouchableOpacity, useWindowDimensions, View} from "react-native";
import React, {useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";
import Animated, {
    Easing,
    FadeIn,
    FadeOut, SlideInRight,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming, ZoomIn, ZoomInRotate, ZoomOut
} from "react-native-reanimated";
import {useDispatch, useSelector} from "react-redux";
import {Portal} from "@gorhom/portal";
import {setPokemonFavourite, setSelectedCarouselPokemon, setSelectedPokemon} from "../../redux/actions";
import {BackIcon} from "../../assets/BackIcon";
import {HeartIcon} from 'react-native-heroicons/outline'
import {Text} from "../Text/Text";
import {Pokemon, PokemonType} from "pokedex-promise-v2";
import {IPokemonReducerStore} from "../../redux/reducers/pokemons";
import {DEFAULT_LANGUAGE} from "../../constants/constants";

interface IPokemonDetailedProps {
    elementPosition: any
    totalPokemons: number
    selectedCarouselPokemon: Pokemon | null
}

interface ITypesListProps {
    pokemonName: string
    pokemonTypes: any
}

interface ITagProps {
    typeName: string
    index: number
    children: any
    tagKey: string
}
interface IPokemonFavouriteProps {
    selectedCarouselPokemon: Pokemon
}

const PokemonFavourite = React.memo(({selectedCarouselPokemon}: IPokemonFavouriteProps) => {
    const dispatch = useDispatch()
    const {
        favouritePokemons
    } = useSelector((state: IPokemonReducerStore) => state.pokemons)
    const [isFavourite, setFavourite] = useState(favouritePokemons.includes(selectedCarouselPokemon.id))

    useEffect(() => {
        setFavourite(favouritePokemons.includes(selectedCarouselPokemon.id))
    }, [selectedCarouselPokemon.id])

    return <View
        style={{position: 'absolute', right: 24, top: 112, zIndex: 4}}>
        <TouchableOpacity onPress={() => {
            setFavourite(!isFavourite)
            dispatch(setPokemonFavourite(selectedCarouselPokemon.id))
        }}>
            <HeartIcon color={'white'} size={25} fill={isFavourite ? 'white' : 'transparent'}/>
        </TouchableOpacity>
    </View>
}, (p, n) => {
    const shouldUpdate = p.selectedCarouselPokemon.id !== n.selectedCarouselPokemon.id

    return !shouldUpdate
})
const TypesList = React.memo(({pokemonTypes, pokemonName}: ITypesListProps) => {
    const [tags, setTags] = useState<any>({})
    const tagsRef = useRef<any>({})

    useEffect(() => {
        for (const index of Object.keys(tagsRef.current)) {
            if (!index) continue
            // animate tag
            if (tagsRef.current[index] !== null && tags[parseInt(index) - 1] !== undefined) {
                tagsRef.current[index]?.animate(tags[parseInt(index) - 1].x, tags[parseInt(index) - 1].y)
            }
        }
    }, [tags, tagsRef.current, pokemonTypes])

    return pokemonTypes.map(({name: typeName}: { name: any }, index: number) => (
        <TypeTag typeName={typeName}
                 index={index}
                 tagKey={`${pokemonName}-${typeName}}`}
                 ref={(ref: any) => {
                     tagsRef.current[index] = ref
                 }}
                 key={`${pokemonName}-${typeName}}`}>
            <View
                onLayout={(event) => {
                    const width = event.nativeEvent?.layout?.width
                    setTags((tags: any) => ({
                        ...tags,
                        [index]: {x: width + 8, y: -29}
                    }))
                }}
                style={{
                    alignSelf: 'flex-start',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 22,
                    marginBottom: 8,
                }}>
                <Text color={'white'} size={10}>{typeName}</Text>
            </View>
        </TypeTag>
    ))
}, (p, n) => {
    const shouldUpdate = (p.pokemonName !== n.pokemonName)

    return !shouldUpdate
})
const TypeTag = React.memo(React.forwardRef(({typeName, index, children, tagKey}: ITagProps, ref) => {

    const translateX = useSharedValue<any>(0);
    const translateY = useSharedValue<any>(0);

    useImperativeHandle(ref, () => {
        return {
            animate: (x: number, y: number) => {
                translateX.value = withTiming(x, {duration: 250, easing: Easing.inOut(Easing.ease)})
                translateY.value = withTiming(y, {duration: 500, easing: Easing.inOut(Easing.ease)})
            }
        }
    }, [])
    const animatedStyle = useAnimatedStyle((): {} => ({
        transform: [{translateX: translateX.value || 0}, {translateY: translateY.value}]
    }), [translateX, translateY]);

    return <Animated.View
        entering={FadeIn.duration(500).easing(Easing.inOut(Easing.ease))}
        exiting={FadeOut.duration(500).easing(Easing.inOut(Easing.ease))}
        key={`${typeName}-${tagKey}`} style={[animatedStyle]}>
        {children}
    </Animated.View>
}), (p, n) => {
    // has the tag changed through the Pokemon ?
    const shouldUpdate = (p.tagKey !== n.tagKey)

    return !shouldUpdate
})

const PokemonDetailed = React.memo(({
                                        elementPosition,
                                        totalPokemons,
                                        selectedCarouselPokemon
                                    }: IPokemonDetailedProps) => {

    if (!elementPosition) return null
    if (!selectedCarouselPokemon) return null

    const {
        pokemonsNames,
        pokemonsTypes: storePokemonTypes,
    } = useSelector((state: IPokemonReducerStore) => state.pokemons)


    const selectedTranslations = useMemo(() => pokemonsNames.find((name: any) => {
        const [pokemonKey] = Object.keys(name)
        return pokemonKey === selectedCarouselPokemon.name
    }), [pokemonsNames, selectedCarouselPokemon.name])

    const selectedPokemonName = useMemo(() => selectedTranslations[selectedCarouselPokemon.name].names[DEFAULT_LANGUAGE], [selectedTranslations, selectedCarouselPokemon.name])
    const selectedPokemonGenus = useMemo(() => selectedTranslations[selectedCarouselPokemon.name].genus[DEFAULT_LANGUAGE], [selectedTranslations, selectedCarouselPokemon.name])
    const selectedPokemonTypes = useMemo<any[]>((): any => {
        let pokemonFullTypes = storePokemonTypes.filter((type: any) => selectedCarouselPokemon.types.map((pokemonType: PokemonType) => pokemonType.type.name).includes(type.name))
        return pokemonFullTypes.map((pokemonFullType: any) => {

            const [translatedType] = pokemonFullType.names.filter((name: Array<{ language: string, type: string }>) => {
                const [languageKey] = Object.keys(name)
                return languageKey === DEFAULT_LANGUAGE
            })
            return ({
                slot: selectedCarouselPokemon.types.find(type => type.type.name === pokemonFullType.name)?.slot,
                name: translatedType[DEFAULT_LANGUAGE]
            })
        }).sort((primaryType: any, secondaryType: any): any => (secondaryType.slot - primaryType.slot))
    }, [selectedCarouselPokemon, storePokemonTypes])
    const selectedPokemonId = useMemo(() => {
        const digitsToAppend = Array(Array(totalPokemons.toString().length).fill('0').length - selectedCarouselPokemon.id.toString().length)
        return (digitsToAppend.fill('0') + selectedCarouselPokemon.id.toString()).replaceAll(',', '')
    }, [selectedCarouselPokemon, totalPokemons])


    const dispatch = useDispatch()
    const {width} = useWindowDimensions()
    const {pageX, pageY} = elementPosition['stats']
    const [targetX, targetY] = [24, 164]
    const scaleAnimation = useSharedValue<any>(1);
    const translateGenusX = useSharedValue<any>(-width / 2);
    const translateIdX = useSharedValue<any>(-width / 2);
    const translateX = useSharedValue<any>(pageX);
    const translateY = useSharedValue<any>(pageY);

    useEffect(() => {
        scaleAnimation.value = withTiming(2.5, {duration: 500, easing: Easing.inOut(Easing.ease)})
        translateX.value = withTiming(targetX, {duration: 500, easing: Easing.inOut(Easing.ease)})
        translateY.value = withTiming(targetY, {duration: 500, easing: Easing.inOut(Easing.ease)})
        translateGenusX.value = withTiming(24, {duration: 500, easing: Easing.inOut(Easing.ease)})
        translateIdX.value = withDelay(100, withTiming(24, {duration: 500, easing: Easing.inOut(Easing.ease)}))
    }, [])


    /* ANIMATIONS STYLES*/
    const animatedPokemonNameStyles = useAnimatedStyle((): {} => ({
        transform: [{scale: scaleAnimation.value}, {translateX: 50}]
    }), []);

    const animatedPokemonIdStyles = useAnimatedStyle((): {} => ({
        right: translateIdX.value
    }), [translateIdX.value]);

    const animatedPokemonGenusStyles = useAnimatedStyle((): {} => ({
        right: translateGenusX.value
    }), [translateGenusX.value]);

    const animatedStyles = useAnimatedStyle((): {} => {
        // enter
        return {
            top: translateY.value,
            left: translateX.value,
        };
    }, [targetX, targetY]);


    return <Portal hostName={"PokemonDetailBackgroundHost"}>
        <Animated.View
            style={{position: 'absolute', left: 24, top: 112, zIndex: 4}}>
            <TouchableOpacity onPress={() => {
                dispatch(setSelectedPokemon(null))
                dispatch(setSelectedCarouselPokemon(null))
            }}>
                <BackIcon color={'white'} width={44 / 1.5} height={28 / 1.5}/>
            </TouchableOpacity>
        </Animated.View>
        <PokemonFavourite selectedCarouselPokemon={selectedCarouselPokemon}/>
        <Animated.View
            key={`pokemon-id-${selectedCarouselPokemon.name}`}
            entering={SlideInRight.duration(500).easing(Easing.inOut(Easing.ease))}
            exiting={FadeOut.duration(500).easing(Easing.inOut(Easing.ease))}
            style={[{
                flex: 1,
                position: 'absolute',
                right: 0,
                top: 148,
                zIndex: 5
            }, animatedPokemonIdStyles]}>
            <Text size={22} color={'white'} bold>{`#${selectedPokemonId}`}</Text>
        </Animated.View>
        <Animated.View
            key={`pokemon-genus-${selectedCarouselPokemon.name}`}
            entering={SlideInRight.duration(500).delay(250).easing(Easing.inOut(Easing.ease))}
            exiting={FadeOut.duration(500).delay(250).easing(Easing.inOut(Easing.ease))}
            style={[{
                width,
                position: 'absolute',
                right: -width / 2,
                top: 198,
                zIndex: 5
            }, animatedPokemonGenusStyles]}>
            <View style={{flex: 0, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <Text size={14} color={'white'}>{`${selectedPokemonGenus}`}</Text>
            </View>
        </Animated.View>
        <Animated.View

            style={[{
                position: 'absolute',
                left: elementPosition.asset.pageX,
                top: elementPosition.asset.pageY,
                width: (width / 2) - 30,
                height: 120,
                zIndex: 5
            }, animatedStyles]}>
            <Animated.View style={animatedPokemonNameStyles}
                           key={`pokemon-name-${selectedCarouselPokemon.name}`}
            >
                <Text size={15} color={'white'} style={{marginBottom: 14}}>{selectedPokemonName}</Text>
            </Animated.View>

            <TypesList pokemonTypes={selectedPokemonTypes} pokemonName={selectedCarouselPokemon.name}/>
        </Animated.View>
    </Portal>
}, (p, n) => {
    // Pokemon has not been selected before ?
    const pokemonHasBeenSelected = (p.selectedCarouselPokemon === null && n.selectedCarouselPokemon !== null)
    // is Pokemon list ok ?
    const totalPokemonsReceived = (n.totalPokemons > 0)
    // layout has been calculated initially ?
    const layoutHasBeenCalculated = (p.elementPosition === null && n.elementPosition !== null) || (p.elementPosition !== null && n.elementPosition !== null)
    // selected Pokemon has changed ?
    const pokemonHasChanged = (p.selectedCarouselPokemon !== null && n.selectedCarouselPokemon !== null) && (p.selectedCarouselPokemon.id !== n.selectedCarouselPokemon.id)
    // element has been recalculated between re renders ?
    const elementPositionHasChanged = (p?.elementPosition?.stats?.pageY !== n?.elementPosition?.stats?.pageY) || (p?.elementPosition?.stats?.pageX !== n?.elementPosition?.stats?.pageX)
    // user leaved details screen ?
    const screenLeaved = (p.selectedCarouselPokemon !== null && n.selectedCarouselPokemon === null)
    // should we update ?
    const shouldUpdate = (totalPokemonsReceived && layoutHasBeenCalculated && elementPositionHasChanged && pokemonHasBeenSelected) || (pokemonHasChanged || screenLeaved)
    /*console.log('')
    console.log('pokemonHasBeenSelected', pokemonHasBeenSelected)
    console.log('totalPokemonsReceived', totalPokemonsReceived)
    console.log('layoutHasBeenCalculated', layoutHasBeenCalculated)
    console.log('elementPositionHasChanged', elementPositionHasChanged)
    console.log('pokemonHasChanged', pokemonHasChanged)
    console.log('screenLeaved', screenLeaved)
    console.log('shouldUpdate', shouldUpdate)
*/

    return !shouldUpdate
})


export {PokemonDetailed}
