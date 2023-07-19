import {View} from "react-native";
import {PokedexList} from "../components/lists/PokedexList";
import {Header} from "../components/header/Header";
import {ListBulletIcon} from 'react-native-heroicons/solid'
import {PokemonDetail} from "../components/tabs/PokemonDetail";
import {PortalHost, PortalProvider} from "@gorhom/portal";
import React from "react";


function Pokedex() {

    return <PortalProvider>
        <PokemonDetail/>
        <PortalHost name="PokemonDetailBackgroundHost"/>

        <View style={{backgroundColor: 'white', flex: 1, paddingTop: 48}}>
            <View style={{flex: 1}}>
                <Header
                    title={'Pokedex'}
                    actions={[
                        {
                            position: 'right',
                            onPress: () => {
                            },
                            icon: (props) => <ListBulletIcon {...props}/>
                        }
                    ]}
                />
                <View style={{flex: 1, marginTop: -32}}>
                    <PokedexList/>
                </View>
            </View>
        </View>
    </PortalProvider>
}


export {Pokedex}
