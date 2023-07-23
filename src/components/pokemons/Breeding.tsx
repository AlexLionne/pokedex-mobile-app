import React, {JSX, useMemo} from "react";
import {useWindowDimensions, View} from "react-native";
import {Text} from "../Text/Text";
import {GenderMale} from "../../assets/GenderMale";
import {GenderFemale} from "../../assets/GenderFemale";

interface IBreeding {
    genderRates: { male: number, female: number }
}

const Breeding = React.memo(({genderRates}: IBreeding): JSX.Element => {
    const {width} = useWindowDimensions()

    const male = useMemo(() => genderRates.male > 100 || genderRates.male < 0 ? '-' : genderRates.male + '%', [genderRates.male])
    const female = useMemo(() => genderRates.female > 100 || genderRates.female < 0 ? '-' : genderRates.female + '%', [genderRates.female])
    const breeding: any = {
        ['Genres']: (
            <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 8}}>
                    <GenderMale/>
                    <Text style={{marginLeft: 8}}>{male}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <GenderFemale/>
                    <Text style={{marginLeft: 8}}>{female}</Text>
                </View>
            </View>
        ),
        ['Groupes d\'oeufs']: <View></View>,
        ['Cycle d\'oeufs']: <View></View>
    }
    return <View style={{marginTop: 24}}>
        <Text size={17} style={{marginBottom: 8}}>Reproduction</Text>
        <View>
            {Object.keys(breeding).map((component: any, index: number) => (
                <View key={`breeding-${index}`}
                      style={{marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Text style={{width: width / 3}} size={14} color={'rgba(0,0,0,.3)'}>{component}</Text>
                    {breeding[component]}
                </View>))}
        </View>
    </View>
}, (p, n) => {
    const shouldUpdate = (p.genderRates.male === n.genderRates.male) && (p.genderRates.female === n.genderRates.female)

    return !shouldUpdate
})

export {Breeding}
