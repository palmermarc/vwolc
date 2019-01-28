import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as actions from '../_actions/actions.authentication';
import Logo from '../assets/images/Logo.svg';
import { Link } from 'react-router-dom';
import '../assets/css/Login.css';
import { Message, Form, Button, Grid, Header, Image, Segment } from 'semantic-ui-react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      submitted: false,
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({submitted: true});
    const {username, password} = this.state;
    if (username && password) {
      this.props.actions.authenticateUser(username, password);
    }
  }

  render() {
    let user = this.props.user;

    return (
      <div className='login-form'>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                <Image src={Logo} /> Log-in to your account
              </Header>
              <Form size='large'>
                <Segment stacked>
                  <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                  <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' />

                  <Button color='teal' fluid size='large'> Login</Button>
                </Segment>
              </Form>
              <Message> New to us? <Link to={'/register/'}>Sign Up</Link> </Message>
            </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);