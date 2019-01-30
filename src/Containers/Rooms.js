import React from 'react';
import {bindActionCreators } from 'redux';
import * as actions from '../_actions/actions.areas';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Segment, Divider, Grid, Form, Message, List, Button, Icon, Header, Container, Input, Dropdown } from 'semantic-ui-react';
import config from '../constants/config';
import OLC from "../core/OLC";

class Areas extends React.Component {
	constructor(props, context) {
		super(props, context);
		
		this.state = {
			errors: [],
			niceName: "Create Room",
			roomId: 0,
			rooms: [],
			room: { 
				id: 0,
				name: "",
				description: "",
				room_flags: [],
				sector_type: 0,
				exits: [
					{ keywords: "", description: "", exit_info: [], vnum: 0, door: 0, key: 0 },
					{ keywords: "", description: "", exit_info: [], vnum: 0, door: 1, key: 0 },
					{ keywords: "", description: "", exit_info: [], vnum: 0, door: 2, key: 0 },
					{ keywords: "", description: "", exit_info: [], vnum: 0, door: 3, key: 0 },
					{ keywords: "", description: "", exit_info: [], vnum: 0, door: 4, key: 0 },
					{ keywords: "", description: "", exit_info: [], vnum: 0, door: 5, key: 0 },
				],
				extra_descr_data: [],
				roomtext_data: []
			},
			directions: ["up", "down", "north", "east", "south", "west" ],
			exitRooms: []
		}

		this.handleChange = this.handleChange.bind(this);
		this.getRooms = this.getRooms.bind(this);
		this.getRoom = this.getRoom.bind(this);
		this.addNewExtras = this.addNewExtras.bind(this);
		this.addNewExits = this.addNewExits.bind(this);
	}

	getRooms() {
		let self = this;
		let Rooms = [];
		let exitRooms = [];

		OLC.get("/rooms/", {area_id : this.state.areaId}, function(response) {
			console.log(response);
			if( response.data.success === true ) {

				Rooms.push({
					id: response.data.results.id,
					name: response.data.results.name,
					description: response.data.results.description,
					room_flags: response.data.results.room_flags,
					sector_type: response.data.results.sector_type,
					exits: response.data.results.exits,
					extra_descr_data: response.data.results.extra_descr_data,
					roomtext_data: response.data.results.roomtext_data
				});

				self.setState({ rooms: Rooms });
			} else {
				self.setState({ hasErrors: true, message: response.data.message });
			}
		});
	}

	componentDidMount(nextProps) {
		this.getRooms();

		if( typeof this.props.match.params.roomId !== "undefined" ) {
			this.setState({ roomId: this.props.match.params.roomId, niceName: "Update Room" });
			this.getRoom(this.props.match.params.roomId);
		}

		document.title = this.state.niceName;
	}

	componentWillReceiveProps () {
		this.getRooms();

		if( typeof this.props.match.params.roomId !== "undefined" ) {
			this.setState({ roomId: this.props.match.params.roomId, niceName: "Update Room" });
			this.getRoom(this.props.match.params.roomId);
		}

		document.title = this.state.niceName;
	}

	getRoom( roomId ) {
		let self = this;
		OLC.get("/rooms/" + roomId, {area_id : this.state.areaId}, function(response) {
			console.log(response);
			if( response.data.success === true ) {
				self.setState({ room: response.data.results });
			} else {
				self.setState({ hasErrors: true, message: response.data.message });
			}
		});
	}

	handleChange = (e, {name, value}) => {
		this.setState(
			prevState => ({
				room: {
					...prevState.room,
					[name]: value
				}
			})	
		);
	}

	handleSubmit = () => {
		// Add in the form handling here

		// Don't save anything if there are errors
		if( this.state.errors.length > 0 )
			return false;

		if( this.state.roomId === 0 )
			this.createRoom();
		else 
			this.updateRoom();
	}

	createRoom() {
		let self = this;
		var db = openDatabase( config.database.name, config.database.version, config.database.description, config.database.size);

		db.transaction(function (tx) {
			tx.executeSql(
				"INSERT INTO rooms () VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
				[self.state.room.name, self.state.room.description, JSON.stringify(self.state.room.room_flags), self.state.room.sector_type, JSON.stringify(self.state.room.exits), JSON.stringify(self.state.room.extra_descr_data), JSON.stringify(self.state.room.roomtext_data), self.props.areas.activeArea], 
				function(tx, res){
					console.log(tx);
					console.log(res);
					self.props.history.push("/rooms/"+res.insertId+"/");
				}, function(ts, error) {
					console.log(error);
				}
			);
		});
	}
	
	updateRoom() {
		let self = this;
		var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
		
		db.transaction(function (tx) {
			tx.executeSql(
				"UPDATE rooms SET name = ?, description = ?, room_flags = ?, sector_type = ?, exits = ?, extra_descr_data = ?, roomtext_data = ? WHERE id = ?", 
				[self.state.room.name, self.state.room.description, JSON.stringify(self.state.room.room_flags), self.state.room.sector_type, JSON.stringify(self.state.room.exits), JSON.stringify(self.state.room.extra_descr_data), JSON.stringify(self.state.room.roomtext_data), self.state.roomId], 
				function(tx, res){
					this.getRooms();
				}, function(ts, error) {
					console.log(error);
				}
			);
		});
	}
	
	addNewExtras() {
		this.setState(
			prevState => ({
				room: {
					...prevState.room,
					extra_descr_data: this.state.room.extra_descr_data.concat([{ keywords: '', description: '' }])
				}
			})	
		);
	}
	
	handleExtrasChange = (idx, fieldName) => (evt) => {
		const newExtras = this.state.room.extra_descr_data.map((extra, sidx) => {
			if (idx !== sidx) return extra;
			return { ...extra, [fieldName]: evt.target.value };
		});

		this.setState(
			prevState => ({
				room: {
					...prevState.room,
					extra_descr_data: newExtras
				}
			})
		);
	}
	
	addNewExits() {
		this.setState(
			prevState => ({
				room: {
					...prevState.room,
					exits: this.state.room.exits.concat([{ door: 0, vnum: 0, description: "", keyword: "", key: 0, exit_info: 0 }])
				}
			})	
		);
	}
	
	handleExitsChange = (idx, fieldName) => (evt) => {
		const newExits = this.state.room.exits.map((exit, sidx) => {
			if (idx !== sidx) return exit;
			return { ...exit, [fieldName]: evt.target.value };
		});

		this.setState(
			prevState => ({
				room: {
					...prevState.room,
					exits: newExits
				}
			})
		);
	}
	
	render() {
		return (
			<div className="wrap fade-in">
				<Segment placeholder>
					<Grid columns={2} stackable textAlign='center'>
						<Divider vertical></Divider>
						<Grid.Row verticalAlign='top'>
							<Grid.Column>
								<div id="areas-list" className="fade-in">
									<List divided relaxed>
										{this.state.rooms.map((room) => (
											<List.Item key={"room-"+room.id}>
												<List.Content>
													<Link to={"/rooms/" + room.id + "/"}>
														<List.Header>({room.id}) {room.name}</List.Header>
													</Link>
													<List.Description>{room.created_by}</List.Description>
												</List.Content>
											</List.Item>
										))}
									</List>
									<div id="view-header-section">
										<Button as={Link} to={'/rooms/'} className="view-create-new">
											<Icon name="plus" />
											Create New
										</Button>
									</div>
								</div>
							</Grid.Column>
							<Grid.Column>
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
										<Form.Input fluid name="name" value={this.state.room.name} label="Room Name" placeholder="Room Name Here" onChange={this.handleChange} />
										<Form.TextArea name="description" label='Look' placeholder='The mob looks back at you!' value={this.state.room.description} onChange={this.handleChange} />
										<Form.Dropdown label="Room Flags" name="room_flags" fluid multiple selection options={config.rooms.flags} value={this.state.room.room_flags} onChange={(e,{value}) => this.setState(prevState => ({room: {...prevState.room, room_flags: [...value]}}))}   />
										<Form.Dropdown label="Room Sector" name="sector_type" fluid selection options={config.rooms.sectors} value={this.state.room.sector_type} onChange={this.handleChange}   />
										<Container>
											<Header as="h3">
												<Button onClick={this.addNewExtras}><Icon name="plus circle" />Add New</Button>
												Extra Room Descriptions
											</Header>
											{this.state.room.extra_descr_data.map((extra, i) => (
												<Form.Group key={i}>
													<Form.Input fluid name="keywords" value={this.state.room.extra_descr_data[i].keywords} label="Keywords" placeholder="keyword" onChange={this.handleExtrasChange(i, "keywords")} />
													<Form.TextArea rows={1} name="description" label="Description" placeholder="What shows up when someone looks at the keyword?" value={this.state.room.extra_descr_data[i].description} onChange={this.handleExtrasChange(i, "description")} />
												</Form.Group>
											))}
										</Container>
										
										<Container>
											<Header as="h3">
												<Button onClick={this.addNewExits}><Icon name="plus circle" /> Add New</Button>
												Exits
											</Header>
											<Segment.Group raised>
												{this.state.directions.map((direction, i) => (
													<Segment className="exit" key={"exit-"+i}>
														<Header as='h3' block>{direction}</Header>
														<Form.Group>
															<Form.Field width={6}>
																<label>Exit Room</label>
																<Dropdown selection options={this.state.exitRooms} value={this.state.room.exits[i].vnum} />
															</Form.Field>
															<Form.Field width={10}>
																<label>&nbsp;</label>
																<Dropdown selection multiple value={this.state.room.exits[i].exit_info} options={config.rooms.exit_info_flags} />
															</Form.Field>
														</Form.Group>
														<Form.Group>
															<Form.Field width={4}>
																<label>Keywords</label>
																<Input name="keywords" value={this.state.room.exits[i].keywords} />
															</Form.Field>
															<Form.Field width={12}>
																<label>Description</label>
																<Input name="description" value={this.state.room.exits[i].description} />
															</Form.Field>
														</Form.Group>
													</Segment>
												))}
											</Segment.Group>
											
										</Container>
										
										<Form.Button onClick={this.handleSubmit} color="black" content={this.state.niceName} />
									</Form>
								</div>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
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