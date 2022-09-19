import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const BlogCard = ( props ) => {
    const blog=props?.blog;

    const navigate=useNavigate();

    return (
        <Grid item xs={4} sm={8} md={4}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={blog?.image}
                        alt="green iguana"
                        sx={{width:'100%'}}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            <span style={{color:'skyblue'}}>{blog?.type}</span>
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                        <span style={{color:'darkblue',fontWeight:'bold'}}>{blog?.title}</span>
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Blog by- {blog?.creator?.displayName}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            {blog?.date} | {blog?.time}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button sx={{fontSize:'18px'}} color="primary" onClick={()=>navigate(`/blog/${blog?.id}`)}>
                        Click to read
                    </Button>
                </CardActions>
                <CardActions>
                    {props.children}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default BlogCard;