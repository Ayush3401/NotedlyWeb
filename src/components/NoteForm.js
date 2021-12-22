import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from './Button'

const Wrapper = styled.div`
    height: 100%;
`
const Form = styled.form`
    height: 100%;
`
const TextArea = styled.textarea`
    width: 100%;
    height: 90%;
`

const NoteForm = ({ content, action }) => {
    const [values, setValues] = useState({ content })
    const onChange = (e) => {
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    return (
        <Wrapper>
            <Form
                onSubmit={(e) => {
                    e.preventDefault()
                    action({
                        variables: {
                            ...values,
                        },
                    })
                }}
            >
                <TextArea
                    required
                    type="text"
                    name="content"
                    placeholder="Note content"
                    value={values.content}
                    onChange={onChange}
                />
                <Button type="submit">Save</Button>
            </Form>
        </Wrapper>
    )
}

NoteForm.propTypes = {
    content: PropTypes.string,
    action: PropTypes.func.isRequired,
}

NoteForm.defaultProps = {
    content: '',
}

export default NoteForm
