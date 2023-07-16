import React, {JSX} from "react";

interface ITraining {}

const Training = React.memo(({}: ITraining): JSX.Element => {
    return <></>
}, (p, n) => true)

export {Training}
