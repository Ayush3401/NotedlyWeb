import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import routes
import Home from './home'
import MyNotes from './mynotes'
import Favourites from './favourites'
// define routes
const Pages = () => (
    <Router>
        <Routes>
            <Home/>
            <Route exact path="/" component={<Home/>}/>
            <Route exact path="/mynotes" component={<MyNotes/>}/>
            <Route exact path="/favourites" component={<Favourites/>}/>
        </Routes>
    </Router>
)


export default Pages
