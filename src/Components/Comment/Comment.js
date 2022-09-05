import { Button } from '@mui/material';
import React from 'react';

const Comment = ({comment,removeComment}) => {
    const currentuser=JSON.parse(localStorage.getItem('blogpost-user'));

    return (
        <div>
            <h3 style={{paddingLeft:'7px',color:'darkblue'}}>{comment?.comment}</h3>
            <p style={{fontSize:'12px',paddingLeft:'7px',fontWeight:'bold'}}>
                by {comment?.displayName}
                <br />
                at {comment?.date} | {comment?.time}
            </p>
            {
                (currentuser?.id===comment.userid) && <Button onClick={()=>removeComment(comment.id)}>Remove</Button>
            }
        </div>
    );
};

export default Comment;