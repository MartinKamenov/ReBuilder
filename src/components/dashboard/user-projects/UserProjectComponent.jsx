import React, { useState } from 'react';
import './UserProjectComponent.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import dateService, {dateFormatTypes} from '../../../service/date.service';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10
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
        backgroundColor: 'white'
    },
    header: {
        fontSize: 15,
        fontWeight: 'bold'
    }
}));

const UserProjectComponent = ({ projectDetails, user }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const lastUpdated = new Date(projectDetails.lastUpdated);
    const hasDescription = !!projectDetails.description;
    let description = projectDetails.description || 'This project has no description';
    description = description.substring(0, 100) + (description.length > 100 ? '...' : '');
    return (
        <Card
            className={classes.card}>
            <CardHeader
                avatar={
                    <Link style={{ textDecoration: 'none' }} to={ `/users/${user.id}` }>
                        <Avatar src={user.imageUrl} aria-label="recipe" className={classes.avatar} />
                    </Link>
                }
                action={
                    <IconButton onClick={handleOpen} aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={projectDetails.name}
                subheader={dateService.formatDate(lastUpdated, dateFormatTypes.Material)}
            />
            <Link style={{ textDecoration: 'none' }} to={ `/projects/${projectDetails.id}` }>
                <CardMedia
                    className={classes.media}
                    image={projectDetails.projectImageUrl}
                    title={projectDetails.name}
                />
            </Link>
            <CardContent>
                <Typography className='project-description-text' variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                { hasDescription ? (
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                ) : null }
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {projectDetails.description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

UserProjectComponent.propTypes = {
    projectDetails: PropTypes.shape({
        projectImageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
};
 
export default UserProjectComponent;