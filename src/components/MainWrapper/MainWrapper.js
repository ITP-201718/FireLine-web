import React from 'react'
import PropTypes from 'prop-types';
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

const styles = theme => {
    return {
        rootWrapper: {
            display: 'flex',
                minHeight: '100vh',
                flexDirection: 'column'
        },
        root: {
            flexGrow: 1,
                flexShrink: 0,
                flexBasic: 'auto',
                zIndex: 1,
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                width: '100%',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
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
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing.unit * 2,
            paddingRight: theme.spacing.unit * 2,
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
            "@media (min-width:0px) and (orientation: landscape)": {
                height: 'calc(100vh - ' + (theme.spacing.unit * 3 * 2 + theme.mixins.toolbar["@media (min-width:0px) and (orientation: landscape)"].minHeight) + 'px)',
                marginTop: theme.mixins.toolbar["@media (min-width:0px) and (orientation: landscape)"].minHeight,
            },
            [theme.breakpoints.up('sm')]: {
                height: 'calc(100vh - ' + (theme.spacing.unit * 3 * 2 + theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight) + 'px)',
                marginTop: theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight,
            },
            width: 'calc(100% - ' + theme.spacing.unit * 3 * 2 + 'px)',
            height: 'calc(100vh - ' + (theme.spacing.unit * 3 * 2 + theme.mixins.toolbar.minHeight) + 'px)',
            marginTop: theme.mixins.toolbar.minHeight,
            overflowY: 'auto',
        },
        title: {
            flex: 1,
                cursor: 'pointer',
        },
        drawerItemsWrapper: {
            "@media (min-width:0px) and (orientation: landscape)": {
                height: 'calc(100vh - ' + (theme.mixins.toolbar["@media (min-width:0px) and (orientation: landscape)"].minHeight) + 'px)',
            },
            [theme.breakpoints.up('sm')]: {
                height: 'calc(100vh - ' + (theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight) + 'px)',
            },
            height: 'calc(100vh - ' + (theme.mixins.toolbar.minHeight) + 'px)',
            overflowY: 'auto',
        },
        whiteColor: {
            color: '#fff',
        }
    }
};

class MainWrapper extends React.Component {

    render() {
        const {classes, drawerOpen, setDrawerOpen, children, push} = this.props

        const drawer = (
            <div>
                <div className={classes.drawerToolbar}>
                    <Typography
                        variant="title" color="default" noWrap className={classes.title}
                        classes={{root: classes.whiteColor}}
                    >
                        FireLine
                    </Typography>
                </div>
                <div className={classes.drawerItemsWrapper}>
                    <Divider/>
                    <List>
                        <ListItem button onClick={() => {
                            push('first')
                        }}><ListItemText primary="First"/></ListItem>
                        <ListItem button onClick={() => {
                            push('second')
                        }}><ListItemText primary="Second"/></ListItem>
                        <ListItem button onClick={() => {
                            push('third')
                        }}><ListItemText primary="Third"/></ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button onClick={() => {
                            push('eins')
                        }}><ListItemText primary="Eins"/></ListItem>
                        <ListItem button onClick={() => {
                            push('zwei')
                        }}><ListItemText primary="Zwei"/></ListItem>
                        <ListItem button onClick={() => {
                            push('drei')
                        }}><ListItemText primary="Drei"/></ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button onClick={() => {
                            push('uno')
                        }}><ListItemText primary="Uno"/></ListItem>
                        <ListItem button onClick={() => {
                            push('dos')
                        }}><ListItemText primary="Dos"/></ListItem>
                        <ListItem button onClick={() => {
                            push('tres')
                        }}><ListItemText primary="Tres"/></ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button onClick={() => {
                            push('un')
                        }}><ListItemText primary="Un"/></ListItem>
                        <ListItem button onClick={() => {
                            push('deux')
                        }}><ListItemText primary="Deux"/></ListItem>
                        <ListItem button onClick={() => {
                            push('trois')
                        }}><ListItemText primary="Trois"/></ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button onClick={() => {
                            push('uno')
                        }}><ListItemText primary="Uno"/></ListItem>
                        <ListItem button onClick={() => {
                            push('due')
                        }}><ListItemText primary="Due"/></ListItem>
                        <ListItem button onClick={() => {
                            push('tre')
                        }}><ListItemText primary="Tre"/></ListItem>
                    </List>
                </div>
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
                            <Typography variant="title" color="inherit" noWrap className={classes.title}
                                        onClick={() => {push('/')}}>
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
                                open
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </LoggedIn>
                    <main className={classes.content}>
                        {/*<div className={classes.toolbar}/>*/}
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
    children: PropTypes.object,
    push: PropTypes.func.isRequired,
}

export default withStyles(styles)(MainWrapper)