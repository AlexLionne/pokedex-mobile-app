import React, {JSX} from "react";

interface IStatistic {
    name: string
    value: number | string
}

const Statistic = React.memo(({name, value}: IStatistic): JSX.Element => {
    return <></>
}, (p, n) => p.name === n.name && p.value === n.value)


export {Statistic}
