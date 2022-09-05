import React from 'react';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from './../Hooks/useAuth';
import { toast } from 'react-toastify';
const Login = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const { loading, signIn } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        signIn(data.email, data.password);
        e.target.reset();
    }

    const handleChange = (e) => {
        const loginData = { ...data };
        const field = e.target.name;
        const value = e.target.value;
        loginData[field] = value;
        setData(loginData);
    }

    return (
        <Container sx={{ mt: 20 }}>
            {
                (loading === true) ?
                    <div style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'çenter' }}>
                        <CircularProgress />
                    </div>
                    :
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src="https://media.istockphoto.com/photos/writing-a-blog-blogger-influencer-reading-text-on-screen-picture-id1198931639?k=20&m=1198931639&s=612x612&w=0&h=1OjzKK3oXsuHkX9Fhro-e_fU-aSgCaV4swBai80HLx0=" alt="" width="70%" height='120%' style={{ borderRadius: "50%" }} />
                        </Grid>
                        <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                            <Typography variant="body1" gutterBottom sx={{ font: 'bold', fontSize: "28px" }}>Login- <span style={{ color: "blue" }}>BlogPost</span></Typography>
                            <form onSubmit={handleLogin} sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                                <TextField
                                    sx={{ width: '100%', m: 1 }}
                                    id="outlined-size-small"
                                    placeholder="Email"
                                    size="small"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                />
                                <br />
                                <TextField
                                    sx={{ width: '100%', m: 1 }}
                                    id="outlined-size-small"
                                    placeholder="Password"
                                    size="small"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    required
                                />
                                <br />
                                <Button sx={{ width: '100%', m: 1 }} type="submit" variant="contained">Login</Button>
                                <Typography variant="body1" gutterBottom sx={{ font: 'bold', fontSize: "18px", m: 1, textAlign: 'center', cursor: 'pointer' }} onClick={() => { navigate('/registration') }}>Not registered?Click Here to Register</Typography>
                            </form>
                        </Grid>
                    </Grid>
            }


        </Container >
    );
};

export default Login;