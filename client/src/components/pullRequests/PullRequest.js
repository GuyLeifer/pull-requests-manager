import React from 'react';
import './PullRequest.css';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        fontSize: '70%',
        backgroundColor: red[500],
    },
}));

function PullRequest({ pullRequest }) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="pull-request">
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {pullRequest.number}
                        </Avatar>
                    }
                    action={
                        pullRequest.draft ?
                            <Tooltip title="Status: Draft">
                                <IconButton aria-label="settings">
                                    <DraftsIcon />
                                </IconButton>
                            </Tooltip>
                            : pullRequest.state === 'open' ?
                                <Tooltip title="Status: Open">
                                    <IconButton aria-label="settings">
                                        <LockOpenIcon />
                                    </IconButton>
                                </Tooltip>
                                : pullRequest.state === 'closed' ?
                                    <Tooltip title="Status: Closed">
                                        <IconButton aria-label="settings">
                                            <CheckCircleOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                    : null
                    }

                    title={pullRequest.title}
                    subheader={pullRequest.created_at.replace('T', ' ').slice(0, 19)}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Author: {pullRequest.user.login}
                    </Typography>
                </CardContent>
                <CardMedia
                    className={classes.media}
                    image={pullRequest.user.avatar_url}
                    title="Paella dish"
                />
                <CardActions disableSpacing>
                    <div>
                        {pullRequest.labels.map((label) => <Chip key={label.name} label={label.name} style={{ margin: '1%', backgroundColor: red[500] }} />)}
                    </div>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        title="Description"
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Description:</Typography>
                        <Typography paragraph>
                            {pullRequest.body}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}

export default PullRequest
