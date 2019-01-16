import React, { Component } from 'react';
import axios from 'axios';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

export default class Comments extends Component {
  state = {
    comments: null
  };

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments() {
    axios
      .get('/comments')
      .then(({ data }) => this.setState({ comments: data }))
      .catch(console.error);
  }

  addComment = comment => {
    this.setState(prevState => ({
      comments: [...prevState.comments, comment]
    }));
  };

  render() {
    const { comments } = this.state;

    return (
      <div>
        <CommentForm addComment={this.addComment} />
        {comments && comments.length ? (
          <CommentList comments={comments} />
        ) : null}
      </div>
    );
  }
}
