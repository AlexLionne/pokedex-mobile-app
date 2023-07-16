import React, {JSX} from "react";

interface IGeneration{}

const Generation = React.memo(({}: IGeneration ): JSX.Element => {
    return <></>
}, (p, n) => true)

export {Generation}
