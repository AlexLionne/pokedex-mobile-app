import Svg, {G, Path} from "react-native-svg";

interface IPokeBall {
    width?: number,
    height?: number,
    color: string
    opacity?: number
}

export const SVGPokeBall = ({width = 183, height = 183, color = 'none', opacity = 1}: IPokeBall) => {
    return <Svg width={width} height={width} viewBox={`0 0 ${width} ${height}`} fill="none">
        <G style="mix-blend-mode:screen" opacity={opacity}>
            <Path fillRule="evenodd" clipRule="evenodd" d="M182.394 99H135.068C131.503 120.005 113.218 136 91.197 136C69.1764 136 50.8916 120.005 47.3264 99H0C3.81509 146.026 43.1882 183 91.197 183C139.206 183 178.579 146.026 182.394 99ZM182.307 83H134.886C130.919 62.4891 112.867 47 91.197 47C69.5272 47 51.4751 62.4891 47.5079 83H0.086618C4.37455 36.451 43.529 0 91.197 0C138.865 0 178.02 36.451 182.307 83ZM116.697 91.5C116.697 105.583 105.28 117 91.197 117C77.1138 117 65.697 105.583 65.697 91.5C65.697 77.4167 77.1138 66 91.197 66C105.28 66 116.697 77.4167 116.697 91.5Z" fill={color}/>
        </G>
    </Svg>


}

