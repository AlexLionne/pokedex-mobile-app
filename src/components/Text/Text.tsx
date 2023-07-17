
import {Text as RNText} from 'react-native'



export const Text = ({size = 12, color = 'black', children: text, style}) => {
    return <RNText style={{fontSize: size, fontFamily: 'CircularStd-Medium', color: color, ...style}}>{text}</RNText>
}

