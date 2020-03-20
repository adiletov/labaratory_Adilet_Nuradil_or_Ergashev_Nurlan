import React from 'react';
import {apiURL} from "../../constants";

const PostItem = props => (
    <div className="full-post mb-5">
        <h3 className="mb-4 text-center">{props.title}</h3>
        {props.image
            ? <img src={`${apiURL}/uploads/${props.image}`} className="full-post-img" alt={props.title}/>
            : null
        }
        {props.description
            ? <p>{props.description}</p>
            : null
        }
        <div className="my-3">
            <div><span className="text-muted">published at: </span>{props.published_at}</div>
            <div><span className="text-muted">author: </span>{props.user}</div>
        </div>
    </div>
);


export default PostItem;
