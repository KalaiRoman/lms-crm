import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Pagenotfound, Signin, Signup } from '../pages/Pages';
function Routing() {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Signin />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/*" element={<Pagenotfound />} />
            </Routes>
        </div>
    )
}

export default Routing
