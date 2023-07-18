
import {Text as RNText} from 'react-native'
import {JSX} from "react";


interface TextProps {
    size?: number
    color?: string
    children: string | JSX.Element
    style?: {}
}
export const Text = ({size = 12, color = 'black', children: text, style}: TextProps) => {
    return <RNText style={{fontSize: size, fontFamily: 'CircularStd-Medium', color: color, ...style}}>{text}</RNText>
}

