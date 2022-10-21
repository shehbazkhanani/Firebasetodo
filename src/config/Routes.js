import {BrowserRouter, Route, Router, Routes } from "react-router-dom"
import LoginIn from "../screen/Login"
import SignIn from "../screen/Signin"
import Todo from "../screen/Todo"

function routesApp () {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginIn/> } />
                <Route path="Sigin" element={<SignIn />} />
                <Route path="Todo" element={<Todo/>} />
            </Routes>
        </BrowserRouter>
        </>
    )
}
export default routesApp