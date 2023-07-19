import {View} from "react-native";
import {PokedexList} from "../components/lists/PokedexList";
import {Header} from "../components/header/Header";
import {ListBulletIcon} from 'react-native-heroicons/solid'


function Pokedex() {

    return <View style={{backgroundColor: 'white', flex: 1, paddingTop: 48}}>
        <View style={{flex: 1}}>
            <Header
                title={'Pokedex'}
                actions={[
                    {
                        position: 'right',
                        onPress: () => {},
                        icon: (props) => <ListBulletIcon {...props}/>
                    }
                ]}
            />
            <View style={{flex: 1, marginTop: -32}}>
                <PokedexList/>
            </View>

        </View>
    </View>
}


export {Pokedex}
