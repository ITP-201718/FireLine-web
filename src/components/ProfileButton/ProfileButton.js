import React from 'react'
import PropTypes from 'prop-types'
import ProfileIcon from '../ProfileIcon'
import Button from 'material-ui/Button'

class ProfileButton extends React.Component {

    render() {
        const {loggedIn, setLoggedIn} = this.props

        return (
            <div>
                {loggedIn ?
                    <ProfileIcon/> :
                    <Button color='inherit' onClick={() => {
                        setLoggedIn(true)
                    }}>
                        Login
                    </Button>
                }
            </div>
        )
    }
}

ProfileButton.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    setLoggedIn: PropTypes.func.isRequired,
}

export default ProfileButton