import React from 'react';
import {apiURL} from "../../constants";
import {NavLink} from "react-router-dom";
import textIcon from "../../assets/images/text-icon.png";


const PostListItem = props => {
    return (
        <div className="post box">
            <NavLink to={`posts/${props.id}`} className="post-img">
                {props.image
                    ? <img src={`${apiURL}/uploads/${props.image}`} alt={props.title}/>
                    : <img src={textIcon} alt="no images"/>
                }
            </NavLink>
            <div className="post-text">
                <h4 className="mb-2"><NavLink to={`posts/${props.id}`}>{props.title}</NavLink></h4>
                <div><span className="text-muted">published at:</span> {props.datetime}</div>
                <div><span className="text-muted">author:</span> {props.user.username}</div>
            </div>
        </div>
    );
};



export default PostListItem;
