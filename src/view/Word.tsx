import React from 'react';
import { useSearchParams } from 'react-router-dom'

function Word() {
    const [searchParams, setSearchParams] = useSearchParams();

    return(
        <div className="my-word">
            <h1>{searchParams.get("wordString")}</h1>
        </div>
    )
}

export default Word;

