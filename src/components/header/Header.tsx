import React, {JSX} from "react";
import Animated from "react-native-reanimated";
import {View} from "react-native";
import {PokeBall} from "../placeholder/PokeBall";
import {Text} from "../Text/Text";

interface IHeaderAction {
    icon: (props: any) => JSX.Element
    onPress: () => void
    position: 'left' | 'right'
}

interface IHeader {
    style?: Record<string, unknown>
    title: string
    actions?: IHeaderAction[]
}


const Header = React.memo(({title, actions, style}: IHeader): JSX.Element => {

    return <View style={{...style,  paddingBottom: 72}}>
        <Animated.View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 92,
            justifyContent: 'space-between',
            position: 'relative',
        }}>
            {actions !== undefined && actions.map((action, index): any => {
                const Icon: any = () => action.icon({
                    onPress: action.onPress,
                    fill: 'black',
                    stroke: 'black',
                    size: 25,
                })
                return <View key={`action-icon-${index}`}
                             style={{
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 flex: 0,
                                 position: 'absolute',
                                 top: 64,
                                 [action.position]: 48,
                                 zIndex: 2,
                             }}>
                    <View style={{
                        flex: 0,
                        position: 'absolute'
                    }}>
                        <PokeBall animated={false} width={320} height={320} color={'#F4F5F4'}/>
                    </View>
                    <View style={{
                        flex: 0,
                        position: 'absolute'
                    }}>
                        <Icon/>
                    </View>
                </View>
            })}
        </Animated.View>
        <Text size={35} bold style={{marginLeft: 24}}>{title}</Text>
    </View>
}, (p, n) => true)

export {Header}
