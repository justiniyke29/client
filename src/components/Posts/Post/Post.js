import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import moment from 'moment';
import { useDispatch} from 'react-redux';
import { deletePost, likePost} from '../../../actions/posts';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const Likes = () => {
    if(post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.decoded?.sub || user?.decoded?._id)) ? (
        <><ThumbUpAltIcon fontSize='small' /> &nbsp; {post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length}  ${post.likes.length > 1 ? 'likes' : 'like'}`} </>
      ) : (
        <><ThumbUpAltOutlined fontSize='small' /> &nbsp;{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'} </>
      );
    }
    return <><ThumbUpAltOutlined fontSize='small' />&nbsp;Like</>;
  };
  const openPost = (_id) => history.push(`/posts/${post._id}`);

  return (
    <Card className={classes.card} raised elevation={6} >
    <ButtonBase className={classes.cardAction} onClick={openPost} >
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      </ButtonBase>
      {(user?.decoded?.sub === post?.creator || user?.decoded?._id === post?.creator ) && ( 
        <div className={classes.overlay2}>
        <Button style={{color: 'white'}} size='small'  onClick={() => setCurrentId(post._id)}><SettingsIcon fontSize='medium'/></Button>
        </div>
      )} 
      <ButtonBase className={classes.cardAction} onClick={openPost} >
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
        <Typography className={classes.title} variant='h5' gutterBottom >{post.title}</Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' >{post.message}</Typography>
      </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' disabled={!user?.decoded} onClick={() => dispatch(likePost(post._id))} >
          <Likes />
          </Button> 
          {(user?.decoded?.sub === post?.creator || user?.decoded?._id === post?.creator ) && ( 
            <Button size='small' color='secondary' onClick={() => dispatch(deletePost(post._id))} ><DeleteIcon fontSize='small' /> Delete </Button>
          )}
      </CardActions>
    </Card>
  )
}

export default Post