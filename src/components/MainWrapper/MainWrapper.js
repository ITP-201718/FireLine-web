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
import UserMessage from '../UserMessage'

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
            "@media (min-width:0px) and (orientation: landscape)": {
                height: 'calc(100vh - ' + (theme.spacing.unit * 3 * 2 + theme.mixins.toolbar["@media (min-width:0px) and (orientation: landscape)"].minHeight) + 'px)',
                marginTop: theme.mixins.toolbar["@media (min-width:0px) and (orientation: landscape)"].minHeight,
            },
            [theme.breakpoints.up('sm')]: {
                height: 'calc(100vh - ' + (theme.spacing.unit * 3 * 2 + theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight) + 'px)',
                marginTop: theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight,
                padding: theme.spacing.unit * 3,
            },
            width: 'calc(100% - ' + theme.spacing.unit * 3 * 2 + 'px)',
            height: 'calc(100vh - ' + (theme.spacing.unit * 3 * 2 + theme.mixins.toolbar.minHeight) + 'px)',
            marginTop: theme.mixins.toolbar.minHeight,
            padding: theme.spacing.unit,
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

    drawerPush = (target) => {
        const {setDrawerOpen, push} = this.props
        return () => {
            setDrawerOpen(false)
            push(target)
        }
    }

    render() {
        const {classes, drawerOpen, setDrawerOpen, children, push} = this.props

        const drawer = (
            <div>
                <div className={classes.drawerToolbar}>
                    <Typography
                        variant="title" color="default" noWrap className={classes.title}
                        classes={{root: classes.whiteColor}}
                        onClick={this.drawerPush('/')}
                    >
                        FireLine
                    </Typography>
                </div>
                <div className={classes.drawerItemsWrapper}>
                    <Divider/>
                    <List>
                        <ListItem button onClick={this.drawerPush('/ausbildung')}><ListItemText primary='Ausbildungen'/></ListItem>
                        <ListItem button onClick={this.drawerPush('/rang')}><ListItemText primary='Ränge'/></ListItem>
                        <ListItem button onClick={this.drawerPush('/mitglied')}><ListItemText primary='Mitglieder'/></ListItem>
                        <ListItem button onClick={this.drawerPush('/aktivitaet')}><ListItemText primary='Aktivitäten'/></ListItem>
                        <ListItem button onClick={this.drawerPush('/berechtigung')}><ListItemText primary='Berechtigungen'/></ListItem>
                        <ListItem button onClick={this.drawerPush('/freigabe')}><ListItemText primary='Freigaben'/></ListItem>
                        <ListItem button onClick={this.drawerPush('/zbereich')}><ListItemText primary='Zuständigkeitsbereiche'/></ListItem>
                        <ListItem button onClick={this.drawerPush('/einsatz')}><ListItemText primary='Einsätze'/></ListItem>
                        <ListItem button onClick={this.drawerPush('/geraetegrp')}><ListItemText primary='Gerätegruppen'/></ListItem>
                        <ListItem button onClick={this.drawerPush('/fahrzeug')}><ListItemText primary='Fahrzeuge'/></ListItem>
                    </List>
                    <Divider/>
                </div>
            </div>
        )

        return (
            <div className={classes.rootWrapper}>
                <UserMessage/>
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