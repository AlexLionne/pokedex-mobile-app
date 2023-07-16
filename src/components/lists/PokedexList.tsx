import React, {JSX} from "react";

interface IPokedexList{}

const PokedexList = React.memo(({}: any ): JSX.Element => {
    return <></>
}, (p, n) => true)

export {PokedexList}
