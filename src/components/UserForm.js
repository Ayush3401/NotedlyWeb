import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from './Button'

const Wrapper = styled.div`
    border: 1px solid #f5f4f0;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`
const Form = styled.form`
    label,
    input {
        display: block;
        line-height: 2em;
    }
    input {
        width: 100%;
        margin-bottom: 1em;
    }
`

const UserForm = ({ formType, action }) => {
    const [values, setValues] = useState({})

    const onChange = (e) => {
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <Wrapper>
            {formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
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
                {formType === 'signup' && (
                    <label htmlFor="username">
                        Username:
                        <input
                            required
                            type="text"
                            id="username"
                            name="username"
                            placeholder="username"
                            onChange={onChange}
                        />
                    </label>
                )}
                <label htmlFor="email">
                    Email:
                    <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={onChange}
                    />
                </label>

                <label htmlFor="password">
                    Password:
                    <input
                        required
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={onChange}
                    />
                </label>

                <Button type="submit">Submit</Button>
            </Form>
        </Wrapper>
    )
}

UserForm.propTypes = {
    formType: PropTypes.string,
    action: PropTypes.func,
}

UserForm.defaultProps = {
    formType: '',
    action: () => {},
}

export default UserForm
