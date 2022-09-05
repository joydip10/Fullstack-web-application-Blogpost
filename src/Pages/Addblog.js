import { Button, TextareaAutosize, TextField } from '@mui/material';
import React from 'react';
import DefaultLayout from './../Components/DefaultLayout/DefaultLayout';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useAuth from './../Hooks/useAuth';

const Addblog = () => {
    const [image,setImage]=useState('');
    const [blog,setBlog]=useState('');
    const [title,setTitle]=useState('');
    const [type, setType] = useState('');

    const {addBlog}=useAuth();

    const saveBlog=(image,blog,title,type)=>{
        addBlog(image,blog,title,type);
    }

    const typeSelector=<FormControl sx={{width:"100%", borderColor:'black' }} size="small">
      <InputLabel id="demo-select-small" sx={{fontWeight:'bold',color:'black'}}>Select Blog Type</InputLabel>
      <Select
        id="demo-select-small"
        value={type}
        label="Blog Type"
        placeholder='Select Blog Type'
        onChange={(e)=>setType(e.target.value)}
        sx={{color:'black'}}
      >
        <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
        <MenuItem value={"Technology"}>Technology</MenuItem>
        <MenuItem value={"Community"}>Community</MenuItem>
      </Select>
    </FormControl>

    return (
        <DefaultLayout>
            <div style={{ margin: '10%' }}>
                <h1>Create your <span style={{ color: 'blue' }}>Blog</span></h1>
                <br />
                {typeSelector}
                <br />
                <br />
                <TextareaAutosize
                    maxRows={4}
                    placeholder="Blog Title"
                    style={{ width: "100%", height:'30px', fontSize:'20px', fontWeight:'bold', color:'darkblue', border:'dashed', borderColor:'gray' }}
                    onChange={(e)=>setTitle(e.target.value.trim())}
                />
                <br />
                <TextareaAutosize
                    maxRows={20}
                    placeholder="Write here......."
                    style={{ width: "100%", height:'200px', fontSize:'20px', border:'dashed', borderColor:'gray' }}
                    onChange={(e)=>setBlog(e.target.value.trim())}
                />
                <br />
                <TextField type="file" onChange={(e) => setImage(e.target.files[0])} />
                <br />
                <br />
                {
                    (image) &&
                    <img src={URL.createObjectURL(image)} alt="something" className='my-3 h-52 w-52 rounded-sm' style={{marginTop:'10px',marginBottom:'10px', height:'180px', width:'180px'}} />
                }
                <br />
                <br />
                {
                    (image && blog && title && type) ? <Button variant="contained" sx={{fontSize:'18px'}} onClick={()=>saveBlog(image,blog,title,type)}>Post</Button>
                    : <Button variant="contained" sx={{fontSize:'18px'}} disabled>Post</Button>
                }
            </div>
        </DefaultLayout>
    );
};

export default Addblog;