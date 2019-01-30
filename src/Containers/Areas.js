import React from 'react';
import {bindActionCreators } from 'redux';
import * as actions from '../_actions/actions.areas';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {Card, Grid, Form, Button, Icon, Portal, Segment, Header} from 'semantic-ui-react';
import OLC from "../core/OLC";

class Areas extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleChange = this.handleChange.bind(this);
		this.getAreas = this.getAreas.bind(this);
		this.state = {
			hasErrors: false,
			niceName: "Create Area",
			areaId: 0,
			areas: [{
				name: "My First Area",
				starting_vnum: "",
				id: 0
			}],
			area: { 
				name: "",
				starting_vnum: "",
				id: 0
			}
		}
	}

	getAreas() {
		let self = this;
		OLC.get('/areas', [], function (response) {
			if( response.data.success === true ) {
				self.setState({ areas: response.data.results });
			}
		});
	}

	componentDidMount(nextProps) {
		this.getAreas();

		if( typeof this.props.match.params.areaId !== "undefined" ) {
			this.setState({ areaId: this.props.match.params.areaId, niceName: "Update Area" });
			this.getArea(this.props.match.params.areaId);
		}

		document.title = this.state.niceName;
	}


	componentWillReceiveProps () {
		console.log(this.props.match.params.areaId);
		this.getAreas();

		if( typeof this.props.match.params.areaId !== "undefined" ) {
			this.setState({ areaId: this.props.match.params.areaId, niceName: "Update Area" });
			this.getArea(this.props.match.params.areaId);
		}

		document.title = this.state.niceName;
	}

	getArea( areaId ) {
		let self = this;
		OLC.get("/areas/" + areaId, [], function(response) {
			if( response.data.success === true ) {
				self.setState({ area: response.data.results });
			} else {
				self.setState({ hasErrors: true, message: response.data.message });
			}
		});
	}

	handleChange(e) {
		const { name, value } = e.target;

		this.setState(
			prevState => ({
				area: {
					...prevState.area,
					[name]: value
				}
			})	
		);
	}

	handleSubmit = () => {
		this.setState({ hasErrors: false, message: "" });

		if( this.state.area.name === "") {
			this.setState({ hasErrors: true, message: "You must provide an area name." });
		}

		if( this.state.area.created_by === "") {
			this.setState({ hasErrors: true, message: "You need to provide a name so we can credit the right person." });
		}

		// Don't save anything if there are errors
		if( this.state.hasErrors === true )
			return false;

		if( this.state.areaId === 0 ) {
			this.createArea();
		}
		else 
			this.updateArea();
	}

	createArea() {
		let self = this;
		OLC.post("/areas", { name: this.state.area.name, starting_vnum: this.state.area.starting_vnum }, function(response) {
			if( response.data.success === true ) {
				self.setState({ areas: response.data.results, message: response.data.message });
			} else {
				self.setState({ hasErrors: true, message: response.data.message });
			}
		});
	}

	updateArea() {
		let self = this;
		OLC.put("/areas/" + this.state.areaId, { name: this.state.area.name, starting_vnum: this.state.area.starting_vnum }, function(response) {
			if( response.data.success === true ) {
				self.setState({ areas: response.data.results, message: response.data.message });
			} else {
				self.setState({ hasErrors: true, message: response.data.message });
			}
		});
	}
	
	setNewActiveArea = () => this.props.actions.setActiveArea(this.state.areaId);

	render() {
		return (
			<div className="wrap fade-in">
				<Grid celled columns={2} textAlign='center'>
					<Grid.Row stretched verticalAlign='top'>
						<Grid.Column className="area-list" mobile={16} tablet={8} computer={3}>
							<div id="areas-list" className="fade-in">
								{this.state.areas.map((area, i) => (
									<Card key={"area-"+area.ID}>
										<Card.Content>
											<Card.Header><Link to={"/areas/" + area.ID + "/"}> {area.name}</Link></Card.Header>
											<Card.Meta>{this.props.user.username}</Card.Meta>
										</Card.Content>
									</Card>
								))}
								<div id="view-header-section">
									<Button color='orange' as={Link} to={'/areas/'} className="view-create-new">
										<Icon name="plus" /> Create New
									</Button>
								</div>
							</div>
						</Grid.Column>
						<Grid.Column mobile={16} tablet={8} computer={13}>
							<div id="area-form" className="fade-in">
								<Form>
									<Form.Group widths='equal'>
										<Form.Input fluid name="name" label='Area Name' placeholder='Area Name Here' value={this.state.area.name} onChange={this.handleChange} />
										<Form.Input fluid name="starting_vnum" label='Starting VNUM' value={this.state.area.starting_vnum} onChange={this.handleChange} />
									</Form.Group>
									<Form.Group widths="equal">
										<Form.Button onClick={this.handleSubmit} color="black" content={this.state.niceName} />
										{this.state.areaId !== 0 &&
											 <Form.Button color="green" onClick={this.setNewActiveArea}>Open {this.state.area.name} for Building</Form.Button>
										}
									</Form.Group>
								</Form>
							</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				{this.state.hasErrors === true &&
					<Portal open={true}>
						<Segment style={{ backgroundColor: 'red', right: '5%', bottom: '5%', position: 'fixed', zIndex: 1000 }}>
							<Header style={{ color: '#fff' }}>{this.state.message}</Header>
						</Segment>
					</Portal>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions,dispatch)
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Areas));