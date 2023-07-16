




import React, {JSX} from "react";

interface IAnimatedHeader{}

const AnimatedHeader = React.memo(({}: IAnimatedHeader ): JSX.Element => {
    return <></>
}, (p, n) => true)

export {AnimatedHeader}
