import React, {JSX} from "react";

interface IPokemonAsset{}

const PokemonAsset = React.memo(({}: IPokemonAsset ): JSX.Element => {
    return <></>
}, (p, n) => true)

export {PokemonAsset}
