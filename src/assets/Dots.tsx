import Svg, {Circle, G} from "react-native-svg";

interface IDots{
    width?: number,
    height?: number,
    color?: string
}
export const Dots = ({width = 57, height = 31, color = 'white'}: IDots) => {
    return <Svg width={width} height={height} viewBox={`0 0 57 31`} fill="none">
        <G style="mix-blend-mode:screen" opacity="0.4">
            <Circle cx="2.5" cy="2.5" r="2.5" fill={color}/>
            <Circle cx="15.5" cy="2.5" r="2.5" fill={color}/>
            <Circle cx="28.5" cy="2.5" r="2.5" fill={color}/>
            <Circle cx="41.5" cy="2.5" r="2.5" fill={color}/>
            <Circle cx="54.5" cy="2.5" r="2.5" fill={color}/>
            <Circle cx="2.5" cy="15.5" r="2.5" fill={color}/>
            <Circle cx="15.5" cy="15.5" r="2.5" fill={color}/>
            <Circle cx="28.5" cy="15.5" r="2.5" fill={color}/>
            <Circle cx="41.5" cy="15.5" r="2.5" fill={color}/>
            <Circle cx="54.5" cy="15.5" r="2.5" fill={color}/>
            <Circle cx="2.5" cy="28.5" r="2.5" fill={color}/>
            <Circle cx="15.5" cy="28.5" r="2.5" fill={color}/>
            <Circle cx="28.5" cy="28.5" r="2.5" fill={color}/>
            <Circle cx="41.5" cy="28.5" r="2.5" fill={color}/>
            <Circle cx="54.5" cy="28.5" r="2.5" fill={color}/>
        </G>
    </Svg>
}
