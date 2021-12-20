import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Layout from '../components/Layout'
import Favourites from './favourites'
import Home from './home'
import MyNotes from './mynotes'
import NotePage from './note'
// define routes
const Pages = () => (
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="mynotes" element={<MyNotes />} />
                <Route path="favourites" element={<Favourites />} />
                <Route path="note/:id" element={<NotePage />} />
            </Routes>
        </Layout>
    </Router>
)

export default Pages
