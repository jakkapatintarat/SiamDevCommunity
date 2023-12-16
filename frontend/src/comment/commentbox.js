import React, { Component } from 'react';

class CommentBox extends Component {
  render() {
    const { commentValue, handleCommentValue, enterCommentLine, submitCommentLine } = this.props;

    return (
      <div className="comments-box">
        <input
          onKeyPress={enterCommentLine}
          value={commentValue}
          id="comments-input"
          onChange={handleCommentValue}
          type="text"
          placeholder="Add a comment..."
        />
        <button
          onClick={submitCommentLine}
          type="submit"
          className="comments-button"
          disabled={!commentValue}
        >
          Post
        </button>
      </div>
    );
  }
}

export default CommentBox;
