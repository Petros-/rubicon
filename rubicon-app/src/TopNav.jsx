import React from "react";
import { Link } from 'react-router-dom';

function TopNav () {

    // top nav goes here

    return (
        <>
        <div>
            <Link to="/">Home</Link>
            <Link to="/new">Add</Link>
        </div>
        </>
    )

}

export default TopNav;