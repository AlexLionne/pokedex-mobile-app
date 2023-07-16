import React, {JSX} from "react";

interface ISearch{
    target: string
}

const Search = React.memo(({target}: ISearch ): JSX.Element => {
    return <></>
}, (p, n) => p.target === n.target)

export {Search}
