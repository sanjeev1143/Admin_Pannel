import React, { useState } from 'react'
import Index from '.'
import Negativee from './Negcomp';




function Negative() {

    const [pass, setPass] = useState("");
    return (
        <div>
            <Index />
            <ul>
                <li onClick={() => setPass("Angry")}>Anger</li>
                <li onClick={() => setPass("")}> Clear </li>
            </ul>
            {pass ? <Negativee id={pass} /> : null}

        </div>
    )
}

export default Negative
