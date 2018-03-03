import React from 'react'
import PropTypes from 'prop-types'

class LoggedIn extends React.Component {

    render() {
        const { not, loggedIn } = this.props

        if(loggedIn !== not) {
            return (
                <div>
                    {this.props.children}
                </div>
            )
        }
        return null
    }
}

LoggedIn.defaultProps = {not: false}

LoggedIn.propTypes = {
    not: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
}

export default LoggedIn