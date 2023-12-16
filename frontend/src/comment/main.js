import React, { Component } from 'react';
import CommentBox from './commentbox';
import CommentList from './commentlist';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      commentValue: '',
      commentLine: [{ commentId: '', text: '' }],
    };
  }

  setCommentLine = () => {
    this.setState({
      commentLine: [
        ...this.state.commentLine,
        { commentId: commentCounter++, text: this.state.commentValue },
      ],
      commentValue: '',
    });
  };

  submitCommentLine = (e) => {
    e.preventDefault();
    this.setCommentLine();
  };

  enterCommentLine = (e) => {
    if (e.charCode === 13) {
      this.setCommentLine();
    }
  };

  render() {
    return (
      <div>
        <h1>Main Component</h1>
        <CommentBox
          commentValue={this.state.commentValue}
          handleCommentValue={(e) => this.setState({ commentValue: e.target.value })}
          enterCommentLine={this.enterCommentLine}
          submitCommentLine={this.submitCommentLine}
        />
        <CommentList commentLine={this.state.commentLine} />
      </div>
    );
  }
}

let commentCounter = 1;

export default Main;
