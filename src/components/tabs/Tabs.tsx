import React, {JSX} from "react";

interface ITabs {}

const Tabs = React.memo(({}: ITabs ): JSX.Element => {
    return <></>
}, (p, n) => true)


export {Tabs}
