import React, {JSX} from "react";
import { View, useWindowDimensions } from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Text} from "../Text/Text";
import {About} from "./about/About";
import {Statistics} from "./stats/Statistics";
import {EvolutionChain} from "../pokemons/EvolutionChain";
import {Moves} from "../pokemons/Moves";
import {useSelector} from "react-redux";
import {ISelectionReducerStore} from "../../redux/reducers/selection";
import {IPokemonReducerStore} from "../../redux/reducers/pokemons";

interface ITabs {}

const Tabs = ({}: ITabs ): JSX.Element => {
    const layout = useWindowDimensions();

    const {selectedCarouselPokemon} = useSelector((state: ISelectionReducerStore) => state.selection)

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'about', title: 'À props' },
        { key: 'stats', title: 'Stats de base' },
        { key: 'evolution', title: 'Évolution' },
        { key: 'moves', title: 'Compétences' },
    ]);

    const renderScene = SceneMap({
        about: () => <About selectedCarouselPokemon={selectedCarouselPokemon}/>,
        stats: Statistics,
        evolution: EvolutionChain,
        moves: Moves,
    });
    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            renderLabel={({ route, focused }: any) => (
                <Text color={focused ? 'black' : 'rgba(0,0,0,.3)'}>
                    {route.title}
                </Text>
            )}
            indicatorStyle={{ height:4, borderRadius: 2, backgroundColor: '#6C79DB', width: 50, marginLeft: (layout.width / 8) - 25 }}
            style={{ backgroundColor: 'white' }}
        />
    );

    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}


export {Tabs}
