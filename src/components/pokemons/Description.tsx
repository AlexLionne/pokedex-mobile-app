import React, {JSX} from "react";
import {Pokemon} from "pokedex-promise-v2";
import {View} from "react-native";
import {DEFAULT_LANGUAGE} from "../../constants/constants";
import {Text} from "../Text/Text";

interface IDescriptionProps{
    translations: any
}

const Description = React.memo(({translations}: IDescriptionProps ): JSX.Element => {
    return <Text size={14}>{translations.description[DEFAULT_LANGUAGE].flavor_text.replaceAll('\n', ' ')}</Text>
}, (p, n) => true)

export {Description}
