import React from 'react'

class CreateUser extends React.Component {

    render = () => {
        return (
            <h1>Create User</h1>
        )
    }
}

export const page_register = (conf) => {
    return {
        url: 'create',
        component: 'this',
    }
}

export default CreateUser