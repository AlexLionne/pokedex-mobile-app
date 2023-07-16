import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {Text} from "react-native";


function Init() {
    const [page, setPage] = useState()
    const dispatch = useDispatch()

    // fetch generations / pokemons / pokemons types
    useEffect(() => {

    }, [])

    return <Text>Pokedex App</Text>
}

export default Init
