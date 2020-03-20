import React from 'react';

const Comment = props => {
    return (
        <div className="box mb-3 p-3">
            <span className="text-muted">{props.user}: </span>
            <span>{props.text}</span>
        </div>
    );
};

export default Comment;
