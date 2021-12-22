import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Layout from '../components/Layout'
import Favourites from './favourites'
import Home from './home'
import MyNotes from './mynotes'
import NotePage from './note'
import SignIn from './signin'
import SignUp from './signup'
import Private from '../components/Private'
import NewNote from './newnote'
import UpdateNote from './updatenote'

// define routes
const Pages = () => (
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/mynotes"
                    element={<Private component={<MyNotes />} />}
                />
                <Route
                    path="/favourites"
                    element={<Private component={<Favourites />} />}
                />
                <Route path="/note/:id" element={<NotePage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route
                    path="/note/new"
                    element={<Private component={<NewNote />} />}
                />
                <Route
                    path="/note/:id/edit"
                    element={<Private component={<UpdateNote />} />}
                />
            </Routes>
        </Layout>
    </Router>
)

export default Pages
