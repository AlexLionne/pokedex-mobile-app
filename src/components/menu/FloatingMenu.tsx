import React, {JSX} from "react";

interface IFloatingMenu {
    options: Array<{
        name: string,
        icon: string,
        callback: Function
    }>
}

const FloatingMenu = React.memo(({}: IFloatingMenu ): JSX.Element => {
    return <></>
}, (p, n) => true)

export {FloatingMenu}
