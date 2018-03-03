import React from 'react'
import PropTypes from 'prop-types';
import {withRouter} from 'react-router'
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import ProfileButton from '../ProfileButton';
import LoggedIn from '../LoggedIn'

const drawerWidth = 240;

const styles = theme => ({
    rootWrapper: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column'
    },
    root: {
        flexGrow: 1,
        flexShrink: 0,
        flexBasic: 'auto',
        //height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        /*position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },*/
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerToolbar: {
        ...theme.mixins.toolbar,
        backgroundColor: theme.palette.primary.main,
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        width: 'calc(100% - ' + theme.spacing.unit * 3 * 2 + 'px)',
    },
    flex: {
        flex: 1,
    },
});

class MainWrapper extends React.Component {

    render() {
        const {classes, drawerOpen, setDrawerOpen, children, location, push} = this.props

        const drawer = (
            <div>
                <div className={classes.drawerToolbar}/>
                <Divider/>
                <List>
                    <ListItem button onClick={() => {push('first')}}><ListItemText primary="First"/></ListItem>
                    <ListItem button onClick={() => {push('second')}}><ListItemText primary="Second"/></ListItem>
                    <ListItem button onClick={() => {push('third')}}><ListItemText primary="Third"/></ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button onClick={() => {push('eins')}}><ListItemText primary="Eins"/></ListItem>
                    <ListItem button onClick={() => {push('zwei')}}><ListItemText primary="Zwei"/></ListItem>
                    <ListItem button onClick={() => {push('drei')}}><ListItemText primary="Drei"/></ListItem>
                </List>
            </div>
        )

        return (
            <div className={classes.rootWrapper}>
                <div className={classes.root}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <LoggedIn>
                                <IconButton
                                    color='inherit'
                                    aria-label="open drawer"
                                    onClick={() => {
                                        setDrawerOpen(true)
                                    }}
                                    className={classes.navIconHide}
                                >
                                    <MenuIcon/>
                                </IconButton>
                            </LoggedIn>
                            <Typography variant="title" color="inherit" noWrap className={classes.flex}>
                                FireLine
                            </Typography>
                            <ProfileButton/>
                        </Toolbar>
                    </AppBar>
                    <LoggedIn>
                        <Hidden mdUp>
                            <Drawer
                                variant="temporary"
                                anchor="left"
                                open={drawerOpen}
                                onClose={() => {
                                    setDrawerOpen(false)
                                }}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden smDown implementation="css">
                            <Drawer
                                variant="permanent"
                                open={location.pathname !== '/'}
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </LoggedIn>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        {children}
                    </main>
                </div>
            </div>
        )
    }
}

MainWrapper.propTypes = {
    classes: PropTypes.object.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
    setDrawerOpen: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    children: PropTypes.object,
    push: PropTypes.func.isRequired,
}

export default withRouter(withStyles(styles)(MainWrapper))