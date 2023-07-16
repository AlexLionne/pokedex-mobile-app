import React, {JSX} from "react";

interface ITabItem {}

const TabItem = React.memo(({}: ITabItem ): JSX.Element => {
    return <></>
}, (p, n) => true)

export {TabItem}
