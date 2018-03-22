import React from 'react'
import PropTypes from 'prop-types'
import ProfileIcon from '../ProfileIcon'
import Button from 'material-ui/Button'
import LoginPopup from '../LoginPopup';

class ProfileButton extends React.Component {

    render() {
        const {loggedIn, openPopup} = this.props

        return (
            <div>
                {loggedIn ?
                    <ProfileIcon/> :
                    <div>
                        <Button color='inherit' onClick={() => {
                            openPopup();
                        }}>
                            Login
                        </Button>
                        <LoginPopup />
                    </div>
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