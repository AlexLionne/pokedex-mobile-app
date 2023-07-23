import React, {JSX, useMemo} from "react";
import {Pokemon} from "pokedex-promise-v2";
import {useWindowDimensions, View} from "react-native";
import {DEFAULT_LANGUAGE} from "../../constants/constants";
import {Text} from "../Text/Text";

interface ICharacteristicsProps{
    height: number
    weight: number
}

const Characteristics = React.memo(({height, weight}: ICharacteristicsProps ): JSX.Element => {
    const {width} = useWindowDimensions()

    return <View style={[{padding: 16, marginTop: 16},
        {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 12,
            backgroundColor: 'white',
            shadowColor: 'black',
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: .12,
            shadowRadius: 23,
        }]}>
        <View style={{width: width / 2 - (48 + 24)}}>
            <Text size={16} color={'rgba(0,0,0,.3)'}>Taille</Text>
            <Text size={14}>{`${height * 10} cm`}</Text>
        </View>
        <View style={{width: width / 2 - (48 + 24)}}>
            <Text size={16} color={'rgba(0,0,0,.3)'}>Poids</Text>
            <Text size={14}>{`${weight / 10} kg`}</Text>
        </View>

    </View>
}, (p, n) => true)

export {Characteristics}
