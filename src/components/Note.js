import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledNote = styled.article`
    max-width: 800px;
    margin: 0 auto;
`

const MetaData = styled.div`
    @media (min-width: 500px) {
        display: flex;
        align-items: centre;
    }
`
const MetaInfo = styled.div`
    padding-right: 1em;
`

const UserActions = styled.div`
    margin-left: auto;
`

const Note = ({ note }) => (
    <StyledNote>
        <MetaData>
            <MetaInfo>
                <img
                    src={note.author.avatar}
                    alt="{note.author.username} avatar"
                    height="50px"
                />
            </MetaInfo>
            <MetaInfo>
                <em>by</em> {` ${note.author.username}`}
                <br />
                {`${new Date(note.createdAt).getDay()}-${new Date(
                    note.createdAt
                ).getMonth()}-${new Date(note.createdAt).getFullYear()}`}
            </MetaInfo>
            <UserActions>Favourites: {note.favouriteCount}</UserActions>
        </MetaData>
        <ReactMarkdown>{note.content}</ReactMarkdown>
    </StyledNote>
)

Note.propTypes = {
    note: PropTypes.shape({
        author: PropTypes.shape({
            username: PropTypes.string,
            avatar: PropTypes.string,
        }),
        createdAt: PropTypes.string,
        content: PropTypes.string,
        favouriteCount: PropTypes.number,
    }),
}

Note.defaultProps = {
    note: {},
}

export default Note
