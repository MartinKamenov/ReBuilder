import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './CardComponent.css';

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

const CardComponent = ({
    children,
    header = {},
    cardMedia = {},
    cardContent = {},
    collapse = {},
    hasDescription,
    hasCardContent
}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card
            className={classes.card}>
            {children}
            <CardHeader
                avatar={
                    header.src ? (
                        <Link style={{ textDecoration: 'none' }} to={header.link}>
                            <Avatar src={header.src} aria-label="avatar-src" className={classes.header} />
                        </Link> ) : null
                }
                action={
                    header.onSettingsClick ? (
                        <IconButton onClick={header.onSettingsClick} aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    ) : null
                }
                title={header.name || ''}
                subheader={header.subheader || ''}
            />
            {cardMedia.imageUrl ? (<Link style={{ textDecoration: 'none' }} to={cardMedia.link}>
                <CardMedia
                    className={classes.media}
                    image={cardMedia.imageUrl}
                    title={cardMedia.title}
                />
            </Link>) : (
                <CardContent>
                    {cardMedia}
                </CardContent>
            )}
            {hasCardContent ? (
            <>
            <CardContent>
                <Typography className='project-description-text' variant="body2" color="textSecondary" component="p">
                    {cardContent.description}
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
                        {collapse.description}
                    </Typography>
                </CardContent>
            </Collapse>
            </>) : null}
            
        </Card>
    );
};

CardComponent.propTypes = {
    header: PropTypes.shape({
        src: PropTypes.string,
        link: PropTypes.string,
        name: PropTypes.string,
        onSettingsClick: PropTypes.func,
        subheader: PropTypes.string
    }).isRequired,
    cardMedia: PropTypes.oneOfType([PropTypes.object, PropTypes.shape({
        imageUrl: PropTypes.string,
        title: PropTypes.string,
        link: PropTypes.string
    })]),
    cardContent: PropTypes.shape({
        description: PropTypes.string
    }),
    collapse: PropTypes.shape({
        description: PropTypes.string
    })
};

export default CardComponent;