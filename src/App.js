import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
//import {withRouter} from "react-router";
import * as actions from "./_actions/index";
import {bindActionCreators} from "redux";
import './App.css';
import Sidebar from './Containers/Sidebar';
import Mobs from './Containers/Mobs';
import Areas from './Containers/Areas';
import Objects from './Containers/Objects';
import OLC from './core/OLC';

const history = createBrowserHistory();

class App extends Component {

    componentDidMount() {
        if( localStorage.getItem('dbVersion') !== "1.1" ) {
            OLC.createDatabases();
        }
    }

    render() {
        return (
            <div className={"marcopromo-app-container"}>
                <Router history={history}>
                    <div id="" className="content">
                        <Sidebar></Sidebar>
                        <div id="content_bin">
                            <Route exact path="/areas/" niceName="Areas" component={Areas} />
                            <Route exact path="/areas/:areaId/" niceName="Areas" component={Areas} />
                            <Route exact path="/mobs/" niceName="Mobs" component={Mobs} />
                            <Route exact path="/mobs/:mobId/" niceName="Edit Mob" component={Mobs} />
                            <Route exact path="/objects/" nameName="Create Object" component={Objects} />
                            <Route exact path="/objects/:objectId/" nameName="Update Object" component={Objects} />
                        </div>
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

//<Route exact path="/mobs/create" component={MobsCopy} />
//<Route exact path="/mobs/:copyId/" component={MobsEdit} />
//<Route exact path="/user/logout/" component={LogoutPage} />
//<Route exact path="/login/" component={Login} />
//<Route exact path="/objects/" component={ObjectsList} />
//<Route exact path="/objects/create/" component={ObjectCreate} />
//<Route exact path="/objects/edit/:listenerId/" component={ObjectsList} />
//<Route exact path="/rooms/" component={RoomsList} />
//<Route exact path="/rooms/create/" component={RoomsCreate} />
//<Route exact path="/rooms/edit/:listenerId/" component={RoomsList} />