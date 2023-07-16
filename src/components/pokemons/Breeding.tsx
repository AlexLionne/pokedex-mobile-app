import React, {JSX} from "react";

interface IBreeding{}

const Breeding = React.memo(({}: IBreeding ): JSX.Element => {
    return <></>
}, (p, n) => true)

export {Breeding}
