import Svg, {Path} from "react-native-svg";

interface IGenderMale {
    width: number,
    height: number,
    color: string
}

export const GenderMale = ({width = 11, height = 11, color = '#6C79DB'}: IGenderMale) => {
    return <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
        <Path opacity="0.8" d="M10.4219 0.176636H8.26172C7.96094 0.176636 7.82422 0.532104 8.01562 0.750854L8.48047 1.2157L6.26562 3.43054C5.66406 3.04773 4.95312 2.80164 4.1875 2.80164C2 2.80164 0.25 4.57898 0.25 6.73914C0.25 8.92664 2 10.6766 4.1875 10.6766C6.34766 10.6766 8.125 8.92664 8.125 6.73914C8.125 5.97351 7.87891 5.26257 7.49609 4.66101L9.71094 2.44617L10.1758 2.91101C10.3945 3.12976 10.75 2.9657 10.75 2.66492V0.504761C10.75 0.340698 10.5859 0.176636 10.4219 0.176636ZM4.1875 8.92664C2.95703 8.92664 2 7.9696 2 6.73914C2 5.53601 2.95703 4.55164 4.1875 4.55164C5.39062 4.55164 6.375 5.53601 6.375 6.73914C6.375 7.9696 5.39062 8.92664 4.1875 8.92664Z" fill={color}/>
    </Svg>
}
