import React from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import {lighten} from 'material-ui/styles/colorManipulator';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon'
import Tooltip from 'material-ui/Tooltip';
import TextField from 'material-ui/TextField'
import {InputAdornment} from 'material-ui/Input'

const styles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.main, 0.85),
            } : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
        marginRight: theme.spacing.unit,
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    toRight: {
        float: 'right',
    }
})

class EnhancedTableToolbar extends React.Component {
    render() {
        const {numSelected, classes, title, onDelete, onRefresh, onSearchChange} = this.props;

        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography color='inherit' variant='subheading'>
                            {numSelected} selected
                        </Typography>
                    ) : (
                        <Typography variant='title'>{title}</Typography>
                    )}
                </div>
                <div className={classes.spacer}>
                    <TextField
                        className={classes.toRight}
                        onChange={(e) => {onSearchChange(e.target.value)}}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <Icon>search</Icon>
                                </InputAdornment>)
                        }}

                        //label='Search'
                    />
                </div>
                <div className={classes.action}>
                    {numSelected > 0 ? (
                        <Tooltip title='Delete'>
                            <IconButton arial-label='Delete' onClick={onDelete}>
                                <Icon>delete</Icon>
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <div>
                            <Tooltip title='Refresh'>
                                <IconButton aria-label='Refresh' onClick={onRefresh}>
                                    <Icon>refresh</Icon>
                                </IconButton>
                            </Tooltip>
                            {/* TODO: implement search/filter */}
                        </div>
                    )}
                </div>
            </Toolbar>
        )
    }
}

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    title: PropTypes.string,
    onDelete: PropTypes.func,
    onRefresh: PropTypes.func,
}

export default withStyles(styles)(EnhancedTableToolbar)