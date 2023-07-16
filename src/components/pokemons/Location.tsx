import React, {JSX} from "react";

interface ILocation{}

const Location = React.memo(({}: ILocation ): JSX.Element => {
    return <></>
}, (p, n) => true)


export {Location}
