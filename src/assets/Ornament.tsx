import Svg, {Defs, G, LinearGradient, Rect, Stop} from "react-native-svg";

interface IOrnament {
    width?: number,
    height?: number
    gradient?: Array<{ stopColor: string, stopOpacity: number, offset: number }>
}

export const Ornament = ({
                             width = 150,
                             height = 150,
                             gradient = [
                                 {
                                     stopColor: 'white', stopOpacity: 1, offset: 0
                                 },
                                 {
                                     offset: 0.796391,
                                     stopColor: 'white',
                                     stopOpacity: 0
                                 }]
                         }: IOrnament) => {
    return <Svg width={width} height={height} viewBox={`0 0 110 110`} fill="none">
        <G style="mix-blend-mode:screen" opacity="0.3">
            <Rect x="77.0197" y="-61" width="143.924" height="143.924" rx="24" transform="rotate(75 77.0197 -61)"
                  fill="url(#paint0_linear_0_6)"/>
        </G>
        <Defs>
            <LinearGradient id="paint0_linear_0_6" x1="125.394" y1="-9.71262" x2="298.852" y2="-25.3512"
                            gradientUnits="userSpaceOnUse">
                {gradient.map((stop, index) => <Stop key={`stop-${index}`} {...stop}/>)}
            </LinearGradient>
        </Defs>
    </Svg>
}
