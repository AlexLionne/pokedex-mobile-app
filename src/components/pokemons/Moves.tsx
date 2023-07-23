import React, {JSX} from "react";

interface IEvolutionChain{}

const Moves = React.memo(({}: IEvolutionChain ): JSX.Element => {
    return <></>
}, (p, n) => true)

export {Moves}
