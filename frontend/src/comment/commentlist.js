import React from 'react';
import './commentlist.css';

const CommentList = ({ commentLine }) => {
  return (
    <div>
      <h2>Comments</h2>
      <ul className={`comments-list ${commentLine.length > 0 ? 'show' : 'hide'}`}>
        {commentLine.map((val) => (
          <li className="each-comment" key={val.commentId}>
            {val.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
