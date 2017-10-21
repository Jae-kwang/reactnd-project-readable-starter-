import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPostsComment } from '../actions/post';
import { Container, Header, Icon, Breadcrumb, Comment, Form, Button} from 'semantic-ui-react'

class PostDetail extends Component {

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {

    const { id, getPostsComment } = this.props;

    getPostsComment(id);

  };

  filterPost = (data) => {
    const { id } = this.props;
    return id === data.id;
  };

  render() {

    const { posts, comments } = this.props;

    const post = posts.filter(this.filterPost).pop();

    return (
      <Container>
        <Header size="huge">{post.title}</Header>
        <Breadcrumb>
          <Breadcrumb.Section><Icon name="calendar"/> {new Date(post.timestamp).toLocaleDateString()}</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section><Icon name="user"/> {post.author}</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section><Icon name="tag"/> {post.category}</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section><Icon name="thumbs outline up"/> {post.voteScore}</Breadcrumb.Section>
        </Breadcrumb>
        <p>{post.body}</p>

        <Comment.Group>
          <Header as='h3' dividing>Comments</Header>
          {
            comments.map(function(comment, i) {
              return (
               <Comment key={i}>
                 <Comment.Content>
                   <Comment.Author as='a'>{comment.author}</Comment.Author>
                   <Comment.Metadata>
                     <div>{new Date(comment.timestamp).toLocaleDateString()}</div>
                   </Comment.Metadata>
                   <Comment.Text>{comment.body}</Comment.Text>
                 </Comment.Content>
               </Comment>
              )
            })
          }
          <Form reply>
            <Form.TextArea />
            <Button content='Add Reply' labelPosition='left' icon='edit' primary />
          </Form>
        </Comment.Group>

      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.list,
    comments: state.posts.comments
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostsComment: (id) => {
      return dispatch(getPostsComment(id));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
