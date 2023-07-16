import React, {JSX} from "react";

interface ICarousel {}

const Carousel = React.memo(({}: ICarousel ): JSX.Element => {
    return <></>
}, (p, n) => true)

export {Carousel}
