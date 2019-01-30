import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import * as actions from "./_actions/actions.authentication";
import {bindActionCreators} from "redux";
import './App.css';
import Sidebar from './Containers/Sidebar';
import Mobs from './Containers/Mobs';
import Areas from './Containers/Areas';
import Objects from './Containers/Objects';
import Dashboard from './Containers/Dashboard';
import Rooms from './Containers/Rooms';
import Login from './Containers/Login';

const history = createBrowserHistory();

class App extends Component {

  componentWillMount() {
    let token = localStorage.getItem("marcoPromoToken");

    if ( token !== null ) {
      this.props.actions.checkToken(token);
    } else {
      history.push('/login/');
    }
  }

  render() {
    let newClassName = (this.props.user.id !== 0) ? "logged-in" : "logged-out";

    return (
      <div className={newClassName + " marcopromo-app-container"}>
        <Router history={history}>
          <div>
            {this.props.user.id === 0 &&
              <div id="login">
                <Route exact path="/login" niceName="" component={Login} />
              </div>
            }

            {this.props.user.id > 0 &&
              <div className="content">
                <Sidebar></Sidebar>
                <div id="content_bin">
                    <Route exact path="/" niceName="Welcome" component={Dashboard} />
                    <Route exact path="/areas/:areaId/" niceName="Areas" component={Areas} />
                    <Route exact path="/areas/" niceName="Areas" component={Areas} />
                    <Route exact path="/mobs/" niceName="Mobs" component={Mobs} />
                    <Route exact path="/mobs/:mobId/" niceName="Edit Mob" component={Mobs} />
                    <Route exact path="/objects/" nameName="Create Object" component={Objects} />
                    <Route exact path="/objects/:objectId/" nameName="Update Object" component={Objects} />
                    <Route exact path="/rooms/" nameName="Create Room" component={Rooms} />
                    <Route exact path="/rooms/:roomId/" nameName="Update Room" component={Rooms} />
                    <Route exact path="/login/" nameName="Login to OLC" component={Login} />
                </div>
              </div>
            }
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);