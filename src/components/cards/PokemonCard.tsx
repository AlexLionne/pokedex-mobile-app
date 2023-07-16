import React, {JSX} from "react";
import {Pokemon} from "pokedex-promise-v2";

interface IPokemonCard {pokemon: Pokemon}

const PokemonCard = React.memo(({pokemon}: IPokemonCard ): JSX.Element => {
    return <></>
}, (p, n) => p.pokemon.id === n.pokemon.id)

export {PokemonCard}
