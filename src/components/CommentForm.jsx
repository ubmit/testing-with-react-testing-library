import React, { Component } from 'react';
import axios from 'axios';

export default class CommentForm extends Component {
  initialState = {
    comment: '',
    author: ''
  };

  state = this.initialState;

  handleOnChange = ({ target: { name, value } }) => {
    this.setState(_prevState => ({
      [name]: value
    }));
  };

  hasInvalidFields = () => {
    const { comment, author } = this.state;

    if (comment.trim() !== '' && author.trim() !== '') {
      return false;
    }

    return true;
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const newComment = this.state;
    this.createComment(newComment);
  };

  createComment = newComment => {
    console.log('createComment', newComment);
    axios
      .post('/comments', newComment)
      .then(({ data }) => {
        this.props.addComment(data);
        this.clearForm();
      })
      .catch(console.error);
  };

  clearForm = () => this.setState(_prevState => this.initialState);

  render() {
    const { comment, author } = this.state;
    const isDisabled = this.hasInvalidFields() ? true : null;

    return (
      <form onSubmit={this.handleOnSubmit} style={styles.form}>
        <div>
          <textarea
            style={styles.commentBox}
            onChange={this.handleOnChange}
            placeholder="Write something..."
            name="comment"
            value={comment}
          />
        </div>
        <div>
          <label htmlFor="author" aria-labelledby="author">
            Your Name
          </label>
          <input
            style={styles.inputField}
            onChange={this.handleOnChange}
            id="author"
            type="text"
            name="author"
            value={author}
          />
        </div>
        <button style={styles.button} disabled={isDisabled}>
          Add Comment
        </button>
      </form>
    );
  }
}
const styles = {
  form: {
    margin: 'auto',
    padding: '0px',
    width: '500px'
  },
  commentBox: {
    width: '494px',
    height: '80px',
    marginBottom: '12px'
  },
  inputField: {
    width: '360px',
    float: 'right'
  },
  button: {
    marginTop: '12px',
    width: '500px',
    color: '#ffffff',
    backgroundColor: '#767676',
    padding: '6px',
    borderRadius: '8px'
  }
};
