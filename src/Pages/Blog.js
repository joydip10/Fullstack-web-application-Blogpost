import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from './../Hooks/useAuth';
import DefaultLayout from './../Components/DefaultLayout/DefaultLayout';
import { Container } from '@mui/system';
import { CardActions, CircularProgress, Button, TextareaAutosize } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ForumIcon from '@mui/icons-material/Forum';
import "./Blog.css";
import { toast } from 'react-toastify';
import Comment from '../Components/Comment/Comment';

const Blog = () => {
    const [blog, setBlog] = useState();
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');

    const { id } = useParams();

    const { getBlog, updateBlog } = useAuth();
    const currentUser = JSON.parse(localStorage.getItem('blogpost-user'));

    var ID = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    useEffect(() => {
        setLoading(true);
        getBlog(id)
            .then(res => {
                setBlog(res.data())
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    const isLiked = () => {
        const anyUser = blog?.likes.find(like => like.email === currentUser.email);
        if (anyUser) return 'blue'
        else return 'gray'
    }

    const likeOrDislike = () => {
        setLoading(true);

        let updatedLikes;

        const currentUser = JSON.parse(localStorage.getItem('social-bugg-user'));

        const userPrevious = blog.likes.find(like => like.email === currentUser.email);

        if (userPrevious?.email) {
            const remainingLikes = blog.likes.filter(like => like.email !== currentUser.email);
            blog.likes = remainingLikes;
            updatedLikes = blog.likes

            const updated = { ...blog, likes: updatedLikes };

            updateBlog(id, updated)
                .then(res => {
                    toast.success('Unliked the post');
                    const updatedBlog = res?.data();
                    setBlog((updatedBlog) => updatedBlog);
                    setLoading(false);
                });
        }
        else {
            blog.likes.push({
                id: currentUser?.id,
                email: currentUser?.email,
                displayName: currentUser?.displayName
            })
            updatedLikes = blog.likes;
            const updated = { ...blog, likes: updatedLikes };

            const name = currentUser?.displayName;
            updateBlog(id, updated, name)
                .then(res => {
                    toast.success('Liked the blog!');
                    const updatedBlog = res?.data();
                    setBlog((updatedBlog) => updatedBlog);
                    setLoading(false);
                });
        }
    }

    const addComment = (comment) => {
        setLoading(true);
        let updatedComments;
        blog.comments.push({
            id: ID(),
            userid: currentUser?.id,
            email: currentUser?.email,
            displayName: currentUser?.displayName,
            comment: comment,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        })
        updatedComments = blog.comments;
        const updated = { ...blog, comments: updatedComments };
        updateBlog(id, updated)
            .then(res => {
                toast.success('A comment has been added!');
                const updatedBlog = res?.data();
                setBlog((updatedBlog) => updatedBlog);
                setComment("");
                setLoading(false);
            });
    }

    const removeComment = (id) => {
        setLoading(true);
        const othercomments = blog.comments.filter(cmt => cmt.id !== id);
        blog.comments = othercomments;

        const updatedComments = blog.comments;
        const updated = { ...blog, comments: updatedComments };

        updateBlog(id, updated)
            .then(res => {
                toast.success('Removed a comment');
                const updatedBlog = res?.data();
                setBlog((updatedBlog) => updatedBlog);
                setLoading(false);
            });
    }



    return (
        <DefaultLayout>
            <Container sx={{ mt: 5 }}>
                {
                    (loading === true) ? <div style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'çenter' }}>
                        <CircularProgress />
                    </div>
                        : <Card sx={{ maxWidth: "100%" }}>
                            <CardActionArea>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img src={blog?.image} alt={blog?.title} style={{ borderRadius: '50%' }} />
                                </div>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        <span style={{ color: 'darkblue', fontWeight: 'bold' }}>{blog?.title}</span>
                                    </Typography>
                                    <Typography gutterBottom variant="p" component="div">
                                        <span style={{ color: 'gray', fontWeight: 'bold' }}>{blog?.date}</span>
                                    </Typography>
                                    <Typography gutterBottom variant="p" component="div">
                                        <span style={{ color: 'gray', fontWeight: 'bold' }}>{blog?.time}</span>
                                    </Typography>
                                    <Typography sx={{ textAlign: 'justify' }} variant="h6" color="text.secondary">
                                        {blog?.blog}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <ThumbUpIcon sx={{ m: 1, cursor: 'pointer' }} onClick={likeOrDislike} />{blog?.likes.length}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <ForumIcon sx={{ m: 1, cursor: 'pointer' }} /> {blog?.comments.length}
                                </div>
                            </CardActions>
                            <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <TextareaAutosize
                                    maxRows={10}
                                    placeholder="Write comment"
                                    style={{ width: "100%", height: '100px', fontSize: '15px', border: 'line', borderColor: 'gray' }}
                                    onChange={(e) => setComment(e.target.value.trim())}
                                />
                                <div style={{ display: 'flex' }}>
                                    <Button variant="contained" sx={{ color: 'white', backgroundColor: 'gray' }}onClick={()=>addComment(comment)}>Post</Button>
                                </div>
                            </CardActions>
                            <CardActions>
                                <div sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
                                {
                                    (blog.comments) &&
                                    <>
                                        {
                                            blog.comments.map(comment => <Comment key={comment.id} removeComment={removeComment} comment={comment}></Comment>)
                                        }
                                    </>
                                }
                                </div>
                            </CardActions>
                        </Card>
                }
            </Container>
        </DefaultLayout>
    );
};

export default Blog;