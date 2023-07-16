
import React, {JSX} from "react";

interface IPokeBall{
    animated: boolean
}

const PokeBall = React.memo(({animated}: IPokeBall ): JSX.Element => {
    return <></>
}, (p, n) => p.animated === n.animated)


export {PokeBall}
