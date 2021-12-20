import React, { useEffect } from 'react'

const Favorites = () => {
    useEffect(() => {
        document.title = 'Favorites — Notedly'
    })
    return (
        <div>
            <h1>Notedly</h1>
            <p>These are my favorites</p>
        </div>
    )
}
export default Favorites
