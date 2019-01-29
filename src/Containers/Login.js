import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as actions from '../_actions/actions.authentication';
import Logo from '../assets/images/Logo.svg';
import { Link } from 'react-router-dom';
import '../assets/css/Login.css';
import { Message, Form, Button, Grid, Header, Image, Segment, Portal } from 'semantic-ui-react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      submitted: false,
      error: false,
      open: false,
    };
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
    return (
      <div className='login-form'>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Image src={Logo} />
            <Header as='h2' color='teal' textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input name="username" fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={this.handleChange} />
                <Form.Input name="password" fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange} />

                <Button color='teal' fluid size='large'> Login</Button>
              </Segment>
            </Form>
            <Message> New to us? <Link to={'/register/'}>Sign Up</Link> </Message>
          </Grid.Column>
        </Grid>
        {this.props.user.loginHasErrors === true &&
          <Portal open={true}>
            <Segment style={{ backgroundColor: 'red', right: '5%', bottom: '5%', position: 'fixed', zIndex: 1000 }}>
              <Header style={{ color: '#fff' }}>{this.props.user.loginError}</Header>
            </Segment>
          </Portal>
        }
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