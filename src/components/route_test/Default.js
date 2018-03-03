import React from 'react'
import Typography from 'material-ui/Typography'

class Default extends  React.Component {

    render() {
        const { params } = this.props
        const { pageName } = params

        return (
            <div>
                <Typography variant='display3'>Page: {pageName}</Typography>
            </div>
        )
    }
}

export default Default