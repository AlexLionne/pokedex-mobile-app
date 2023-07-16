import React, {JSX} from "react";

interface IDefensesType{}

const DefensesType = React.memo(({}: IDefensesType ): JSX.Element => {
    return <></>
}, (p, n) => true)

export {DefensesType}
