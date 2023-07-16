import React, {JSX} from "react";

interface IAbout{}

const About = React.memo(({}: IAbout ): JSX.Element => {
    return <></>
}, (p, n) => true)

export {About}
