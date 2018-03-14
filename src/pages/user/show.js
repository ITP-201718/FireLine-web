import React from 'react'

class ShowUser extends React.Component {

    render = () => {
        return (
            <h1>Show User: {this.props.params.id}</h1>
        )
    }
}

export const page_register = (conf) => {
    return {
        url: ':id/show',
        component: 'this',
    }
}

export default ShowUser