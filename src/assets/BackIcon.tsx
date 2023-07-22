import Svg, {G, Path} from "react-native-svg";

interface IPokeBall {
    width?: number,
    height?: number,
    color: string
    opacity?: number
}

export const BackIcon = ({width, height, color = 'none', opacity = 1}: IPokeBall) => {
    return <Svg width={width} height={height} viewBox={`0 0 22 14`} fill="none">
        <Path d="M21.0476 6.0232H3.25135L7.4978 1.66742C7.86982 1.28608 7.86982 0.667465 7.4978 0.286177C7.12578 -0.0953924 6.52266 -0.0953924 6.15119 0.286177L0.279012 6.30927C-0.0930041 6.69061 -0.0930041 7.30928 0.279012 7.69051L6.15119 13.7139C6.33715 13.9047 6.58085 14 6.8245 14C7.06814 14 7.31185 13.9047 7.4978 13.7139C7.86982 13.3325 7.86982 12.7139 7.4978 12.3327L3.25135 7.97669H21.0476C21.5735 7.97669 22 7.53933 22 6.99992C22 6.46051 21.5736 6.0232 21.0476 6.0232Z" fill={color}/>
    </Svg>

}


