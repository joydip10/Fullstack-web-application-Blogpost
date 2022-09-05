import React, { useEffect, useState } from 'react';
import DefaultLayout from './../Components/DefaultLayout/DefaultLayout';
import { Container, CircularProgress, Grid, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import BlogCard from './../Components/BlogCard/BlogCard';
import { toast } from 'react-toastify';

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getUser, getBlogs, deleteBlog } = useAuth();

    useEffect(() => {
        setLoading(true);
        getUser(id)
            .then(res => {
                setUser(res.data());
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    useEffect(() => {
        setLoading(true);
        getBlogs()
            .then(res => {
                console.log(res);
                console.log(id);
                const filteredBlogs = res.filter(blog => blog.creator.id === id);
                setBlogs(filteredBlogs);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [id])

    const removeBlog=(id)=>{
        setLoading(true);
        deleteBlog(id)
        .then(res=>{
            const filteredBlogs = blogs.filter(blog => blog.id !== id);
            setBlogs(filteredBlogs);
            toast.success('A blog has been deleted');
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    return (
        <DefaultLayout>
            <Container>
                {
                    (loading === true) ? <div style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'çenter' }}>
                        <CircularProgress />
                    </div>
                        :
                        <div>
                            <div className="profile-section">
                                <h2 style={{ backgroundColor: 'skyblue', padding: '10px', color: 'darkbue' }}>Profile Section</h2>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <div>
                                        <h1 style={{ backgroundColor: 'gray', color: 'whitesmoke', padding: '50px', borderRadius: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>{user?.displayName.split(' ')[0]}</h1>
                                    </div>
                                    <div>
                                        <h3>Name: {user?.displayName}</h3>
                                        <h3>Email: {user?.email}</h3>
                                        <h3>No. of posts: {blogs?.length}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="my-blogs">
                                <h2 style={{ backgroundColor: 'skyblue', padding: '10px', color: 'darkbue' }}>My Blogs</h2>
                                {
                                    (blogs?.length < 1) ? <h1>No blogs created yet!</h1>
                                        :
                                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                            {
                                                blogs.map(blog => <BlogCard key={blog.id} blog={blog}>
                                                    <Button sx={{ fontSize: '18px' }} color="primary" onClick={()=>removeBlog(blog?.id)}>
                                                        Delete this blog
                                                    </Button>
                                                </BlogCard>)
                                            }
                                        </Grid>
                                }
                            </div>
                        </div>
                }
            </Container>
        </DefaultLayout>
    );
};

export default Profile;