import { Container } from '@mui/system';
import React from 'react';
import DefaultLayout from '../Components/DefaultLayout/DefaultLayout';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuth from './../Hooks/useAuth';
import { Grid, CircularProgress, ButtonGroup, Button } from '@mui/material';
import BlogCard from '../Components/BlogCard/BlogCard';
import AssistantDirectionTwoToneIcon from '@mui/icons-material/AssistantDirectionTwoTone';
import { TextField } from '@mui/material';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [displayBlogs, setDisplay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState('all');

    const { getBlogs } = useAuth();


    useEffect(() => {
        setLoading(true);
        getBlogs()
            .then(res => {
                setBlogs(res);
                setDisplay(res);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    const setDisplayTypes = (type) => {
        if (type !== 'all') {
            const filteredBlogs = blogs.filter(blog => blog.type === type);
            setDisplay(filteredBlogs);
        }
        else {
            setDisplay(blogs);
        }
    }

    const searchBtn = (searchText) => {
        setType('all');
        setDisplay(blogs);
        if (searchText.trim().length > 0) {
            const filteredBlogs = blogs.filter(blog => blog?.title?.toLocaleLowerCase()?.includes(searchText.trim().toLocaleLowerCase()));
            setDisplay(filteredBlogs);
        }
    }

    return (
        <DefaultLayout>
            <Container>
                <h1 style={{ color: 'white', backgroundColor: 'lightslategrey', padding: '20px' }}>Read our <span style={{ color: 'darkblue' }}>"BLOGS"</span> and empower <span style={{ color: 'darkblue' }}>"YOURSELF"</span></h1>
                <TextField sx={{ width: '100%', mb: '5' }} id="outlined-basic" label="Search Blogs" variant="outlined" onChange={(e) => { searchBtn(e.target.value) }} />
                <br />
                <br />
                <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                    <Grid item xs={12} md={4} sx={{ color: 'skyblue', fontWeight: 'bold', fontSize: '18px', display: 'flex', justifyContent: 'flex-start' }}>
                        <AssistantDirectionTwoToneIcon sx={{ fontSize: '28px' }} /> {type.toLocaleUpperCase()}
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <ButtonGroup variant="outlined" aria-label="outlined button group" fullWidth>
                            <Button sx={{ fontSize: "12px" }} onClick={() => {
                                setType('all');
                                setDisplayTypes('all');
                            }}>All</Button>
                            <Button sx={{ fontSize: "11px" }} onClick={() => {
                                setType('Entertainment');
                                setDisplayTypes('Entertainment');
                            }}>Entertainment</Button>
                            <Button sx={{ fontSize: "12px" }} onClick={() => {
                                setType('Technology');
                                setDisplayTypes('Technology');
                            }}>Tech</Button>
                            <Button sx={{ fontSize: "12px" }} onClick={() => {
                                setType('Community');
                                setDisplayTypes('Community');
                            }}>Community</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                {
                    (loading === true) ? <div style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'çenter' }}>
                        <CircularProgress />
                    </div>
                        :
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {
                                displayBlogs?.map(blg => <BlogCard key={blg.id} blog={blg}></BlogCard>)
                            }
                        </Grid>
                }
            </Container>
        </DefaultLayout>
    );
};

export default Home;