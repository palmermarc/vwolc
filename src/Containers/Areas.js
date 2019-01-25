import React from 'react';
import {bindActionCreators } from 'redux';
import * as actions from '../_actions/actions.areas';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, Grid, Form, Message, List, Button, Icon } from 'semantic-ui-react';
import config from '../constants/config';

class Areas extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleChange = this.handleChange.bind(this);
		this.getAreas = this.getAreas.bind(this);
		this.state = {
			errors: [],
			niceName: "Create Area",
			areaId: 0,
			areas: [{
				name: "My First Area",
				created_by: "Your Name Here",
				id: 0
			}],
			area: { 
				name: "", 
				created_by: "", 
				id: 0
			}
		}
	}

	getAreas() {
		var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
		let self = this;
		let savedAreas = [];
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM areas LIMIT 10000", [], function(tx, rs) {
				if( rs.rows.length >= 1 ) {
					for( var i=0; i<rs.rows.length; i++ ) {
						savedAreas.push({
							id: rs.rows[i].id,
							name: rs.rows[i].name,
							created_by: rs.rows[i].created_by
						});
					}
				} else {
					savedAreas = [{
						id: 0,
						name: "My First Area",
						created_by: "Your Name Here"
					}]
				}
				self.setState({areas: savedAreas});
			})
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
		this.getAreas();

		if( typeof this.props.match.params.areaId !== "undefined" ) {
			this.setState({ areaId: this.props.match.params.areaId, niceName: "Update Area" });
			this.getArea(this.props.match.params.areaId);
		}

		document.title = this.state.niceName;
	}

	getArea( areaId ) {
		let self = this;
		var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
		db.transaction(function(tx){
			
			tx.executeSql("SELECT * FROM areas WHERE id = '" + areaId + "'", [], function(tx, rs) {
				if( rs.rows.length ) {
					self.setState({ 
						area: {
							id: rs.rows[0].id,
							name: rs.rows[0].name,
							created_by: rs.rows[0].created_by
						}
					});
				}
			}, function(error) {
				console.log(error);
			});
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
		if( this.state.area.name === "") {
			this.setState({ errors: [{field: "name", message: "You must provide an area name."}] });
		}

		if( this.state.area.created_by === "") {
			this.setState({ errors: [{field: "created_by", message: "You need to provide a name so we can credit the right person."}] });
		}

		// Don't save anything if there are errors
		if( this.state.errors.length > 0 )
			return false;

		if( this.state.areaId === 0 ) {
			this.createArea();
		}
		else 
			this.updateArea();
	}

	createArea() {
		let self = this;
		var db = openDatabase( config.database.name, config.database.version, config.database.description, config.database.size);

		db.transaction(function (tx) {
			tx.executeSql("INSERT INTO areas (name, created_by) VALUES (?, ?)", [self.state.area.name, self.state.area.created_by], function(tx, res){
				self.props.history.push("/areas/"+res.insertId+"/");
			}, function(ts, error) {
				console.log(error);
			});
		});
	}

	updateArea() {
		let self = this;
		var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
		db.transaction(function (tx) {
			tx.executeSql("UPDATE areas SET name = ?, created_by = ? WHERE rowid = ?", [self.state.area.name, self.state.area.created_by, self.state.areaId], function(tx, res){
				self.getAreas();
			}, function(ts, error) {
				console.log(error);
			});
		});
	}
	
	setNewActiveArea = () => this.props.actions.setActiveArea(this.state.areaId);

	render() {
		return (
			<div className="wrap fade-in">
				<Grid celled columns={2} stackable textAlign='center'>
					<Grid.Row verticalAlign='top'>
						<Grid.Column className="area-list" mobile={16} tablet={8} computer={4}>
							<div id="areas-list" className="fade-in">
									{this.state.areas.map((area) => (
												<Card key={area.id}>
													<Card.Content>
														<Card.Header><Link to={"/areas/" + area.id + "/"}> {area.name}</Link></Card.Header>
														<Card.Meta>{area.created_by}</Card.Meta>
													</Card.Content>
												</Card>

									))}
								<div id="view-header-section">
									<Button as={Link} to={'/areas/'} className="view-create-new">
										<Icon name="plus" />
										Create New
									</Button>
								</div>
							</div>
						</Grid.Column>
						<Grid.Column  mobile={16} tablet={8} computer={12}>
							<div id="mob-stats" className="fade-in">
								{this.state.errors.length > 0  &&
									<Message negative>
										<Message.Header>Please fix the following errors:</Message.Header>
										{this.state.errors.map((error) => (
											<p>{error.message}</p>
										))}
									</Message>
								}
								<Form>
									<Form.Group widths='equal'>
										<Form.Input fluid name="name" label='Area Name' placeholder='Area Name Here' value={this.state.area.name} onChange={this.handleChange} />
										<Form.Input fluid name="created_by" label='Created By' placeholder='Your Name Here' value={this.state.area.created_by} onChange={this.handleChange} />
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