import React, {JSX, useEffect, useMemo} from "react";
import {SVGPokeBall} from '../../assets/Pokeball'
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

export enum EPokeBallAnimations {
    CATCH = 'CATCH',
    LINEAR = 'LINEAR',
    ZOOM_IN = 'ZOOM_IN'
}

interface IPokeBall {
    animation?: EPokeBallAnimations
    rotation?: number
    animated: boolean
    width: number
    height: number
    color: string
}

/*
* TODO handle exit animation that is currently not working with RNReanimated ...
* https://github.com/software-mansion/react-native-reanimated/issues/4108
* https://github.com/software-mansion/react-native-reanimated/issues/4534
*
* */
const PokeBall = ({animated, width, height, animation, color, rotation}: IPokeBall): JSX.Element => {

    const offset = useSharedValue<any>(animated ? 0 : rotation);

    const animatedStyles = useAnimatedStyle((): {} => {
        return {
            transform: [
                {rotateZ: `${offset.value}deg`},
                {scale: animation === EPokeBallAnimations.ZOOM_IN ? interpolate(parseInt(offset.value), [0, -360, -180, -45, 180], [1, 1, 1, 1, 20]) : 1}
            ],
        };
    }, [offset.value]);


    const pokeballAnimation = withRepeat(
        withSequence(
            withTiming(-360 + 'deg', {duration: 250, easing: Easing.inOut(Easing.linear)}),
            withTiming(-180 + 'deg', {duration: 250, easing: Easing.inOut(Easing.linear)}),
            withTiming(-90 + 'deg', {duration: 750, easing: Easing.inOut(Easing.linear)}),
            withTiming(-45 + 'deg', {duration: 250, easing: Easing.inOut(Easing.linear)}),
            withTiming(0 + 'deg', {duration: 100, easing: Easing.inOut(Easing.linear)}),
            withTiming(20 + 'deg', {duration: 50, easing: Easing.inOut(Easing.linear)}),
            withTiming(0 + 'deg', {duration: 250, easing: Easing.inOut(Easing.linear)}),
            withTiming(-20 + 'deg', {duration: 100, easing: Easing.inOut(Easing.linear)}),
            withTiming(-0 + 'deg', {duration: 400, easing: Easing.inOut(Easing.linear)}),
        ), -1)

    const linearAnimation = withRepeat(
        withSequence(
            withTiming(0 + 'deg', {duration: 0, easing: Easing.inOut(Easing.linear)}),
            withTiming(360 + 'deg', {duration: 3000, easing: Easing.inOut(Easing.linear)}),
        ), -1)

    const zoomInAnimation = withSequence(
        withTiming(-360 + 'deg', {duration: 250, easing: Easing.inOut(Easing.linear)}),
        withTiming(-180 + 'deg', {duration: 250, easing: Easing.inOut(Easing.linear)}),
        withTiming(-90 + 'deg', {duration: 750, easing: Easing.inOut(Easing.linear)}),
        withTiming(-45 + 'deg', {duration: 250, easing: Easing.inOut(Easing.linear)}),
        withTiming(180 + 'deg', {duration: 250, easing: Easing.inOut(Easing.linear)}),
    )

    const animationStyle = useMemo<string>(() => {
        if (animation === EPokeBallAnimations.CATCH) return pokeballAnimation
        if (animation === EPokeBallAnimations.LINEAR) return linearAnimation
        if (animation === EPokeBallAnimations.ZOOM_IN) return zoomInAnimation

        return linearAnimation
    }, [animation])

    useEffect(() => {
        if (animated) {
            offset.value = animationStyle
        }
    }, [animated, animationStyle])

    return <Animated.View style={[animatedStyles]}>
        <SVGPokeBall color={color} opacity={1} width={width} height={height}/>
    </Animated.View>
}


export {PokeBall}
