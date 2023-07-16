import React, {JSX} from "react";

interface ICharacteristics{}

const Characteristics = React.memo(({}: ICharacteristics ): JSX.Element => {
    return <></>
}, (p, n) => true)

export {Characteristics}
