
import {Text as RNText} from 'react-native'
import {JSX} from "react";


interface TextProps {
    size?: number
    color?: string
    children: string | JSX.Element
    bold?: boolean
    style?: {}
}
export const Text = ({size = 12, color = 'black', children: text, bold, style}: TextProps) => {
    return <RNText style={{fontSize: size, fontFamily: bold ? 'CircularStd-Bold' : 'CircularStd-Medium', color: color, ...style}}>{text}</RNText>
}

