import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Segment, Header } from 'semantic-ui-react'

class Dashboard extends Component {

	render() {
		return (
			<Segment id="dashboard" placeholder>
				<Header textAlign="center" as="h1">Online Creation Tool for The Death of Caine MUD</Header>
				<p>To begin, click on Areas. This will allow you to create your first area. Once you have created your area, click on the green "Open AREANAME for Building" button. This will allow you start adding in Rooms, Objects, and Mobs.</p>
			</Segment>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard));