import React, {JSX} from "react";

interface IEvolutionChain{}

const EvolutionChain = React.memo(({}: IEvolutionChain ): JSX.Element => {
    return <></>
}, (p, n) => true)

export {EvolutionChain}
