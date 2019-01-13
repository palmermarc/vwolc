import React from 'react';
import {bindActionCreators } from 'redux';
import * as actions from '../_actions/actions.areas';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Segment, Divider, Grid, Form, Message, List, Button, Icon, Header, Container } from 'semantic-ui-react';
import config from '../constants/config';


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
				exits: [],
				extra_descr_data: [],
				roomtext_data: []
			}, 
			room_flags: [
				{ text: "Dark", value: 1, key: 0 },
				{ text: "Sacred", value: 2, key: 1 },
				{ text: "No Mob", value: 4, key: 2 },
				{ text: "Indoors", value: 8, key: 3 },
				{ text: "Quiet", value: 16, key: 4 },
				{ text: "No Shadowplane", value: 32, key: 5 },
				{ text: "No Spell", value: 64, key: 6 },
				{ text: "No Claim Or Call", value: 128, key: 7 },
				{ text: "Bank", value: 256, key: 8 },
				{ text: "Private", value: 512, key: 9 },
				{ text: "Safe", value: 1024, key: 10 },
				{ text: "Solitary", value: 2048, key: 11 },
				{ text: "No Recall", value: 8192, key: 12 },
				{ text: "Cone of Silence", value: 16384, key: 13 },
				{ text: "No Teleport", value: 32768, key: 14 },
				{ text: "No Mist", value: 65536, key: 15 },
				{ text: "No Transport", value: 131072, key: 16 },
				{ text: "No Escape", value: 262144, key: 17 },
				{ text: "No Home", value: 524288, key: 18 },
				{ text: "No Summon", value: 1048576, key: 19 }
			],
			room_sectors: [
				{ text: "Inside", value: 0, key: 0 },
				{ text: "City", value: 1, key: 1 },
				{ text: "Field", value: 2, key: 2 },
				{ text: "Forest", value: 3, key: 3 },
				{ text: "Hills", value: 4, key: 4 },
				{ text: "Mountain", value: 5, key: 5 },
				{ text: "Water (Swim)", value: 6, key: 6 },
				{ text: "Water (Noswim)", value: 7, key: 7 },
				{ text: "Air", value: 9, key: 9 },
				{ text: "Desert", value: 10, key: 10 }
			],
			room_directions: [
				{ text: "North", value: 0, key: 0 },
				{ text: "East", value: 1, key: 1 },
				{ text: "South", value: 2, key: 2 },
				{ text: "West", value: 3, key: 3 },
				{ text: "Up", value: 4, key: 4 },
				{ text: "Down", value: 5, key: 5 }
			]
		}

		this.handleChange = this.handleChange.bind(this);
		this.getRooms = this.getRooms.bind(this);
		this.getRoom = this.getRoom.bind(this);
		this.addNewExtras = this.addNewExtras.bind(this);
	}

	getRooms() {
		var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
		let self = this;
		let Rooms = [];
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM rooms LIMIT 10000", [], function(tx, rs) {
				if( rs.rows.length >= 1 ) {
					for( var i=0; i<rs.rows.length; i++ ) {
						Rooms.push({
							id: rs.rows[i].id,
							name: rs.rows[i].name,
							description: rs.rows[i].description,
							room_flags: rs.rows[i].room_flags,
							sector_type: rs.rows[i].sector_type,
							exits: rs.rows[i].exits,
							extra_descr_data: rs.rows[i].extra_descr_data,
							roomtext_data: rs.rows[i].roomtext_data
						});
					}
					self.setState({rooms: Rooms});
				}
			})
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
		var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
		db.transaction(function(tx){
			
			tx.executeSql("SELECT * FROM rooms WHERE id = '" + roomId + "'", [], function(tx, rs) {
				if( rs.rows.length ) {
					self.setState({ 
						room: {
							id: rs.rows[0].id,
							name: rs.rows[0].name,
							description: rs.rows[0].description,
							room_flags: JSON.parse(rs.rows[0].room_flags),
							sector_type: rs.rows[0].sector_type,
							exits: JSON.parse(rs.rows[0].exits),
							extra_descr_data: JSON.parse(rs.rows[0].extra_descr_data),
							roomtext_data: JSON.parse(rs.rows[0].roomtext_data)
						}
					});
				}
			}, function(error) {
				console.log(error);
			});
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
				"INSERT INTO rooms (name, description, room_flags, sector_type, exits, extra_descr_data, roomtext_data, area_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
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
					exits: this.state.room.exits.concat([{ keywords: '', description: '' }])
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
										<Form.Dropdown label="Room Flags" name="room_flags" fluid multiple selection options={this.state.room_flags} value={this.state.room.room_flags} onChange={(e,{value}) => this.setState(prevState => ({room: {...prevState.room, room_flags: [...value]}}))}   />
										<Form.Dropdown label="Room Sector" name="sector_type" fluid selection options={this.state.room_sectors} value={this.state.room.sector_type} onChange={this.handleChange}   />
										<Container>
											<Header as="h3">Extra Room Descriptions</Header>
											{this.state.room.extra_descr_data.map((extra, i) => (
												<Form.Group key={i}>
													<Form.Input fluid name="keywords" value={this.state.room.extra_descr_data[i].keywords} label="Keywords" placeholder="keyword" onChange={this.handleExtrasChange(i, "keywords")} />
													<Form.TextArea rows={1} name="description" label="Description" placeholder="What shows up when someone looks at the keyword?" value={this.state.room.extra_descr_data[i].description} onChange={this.handleExtrasChange(i, "description")} />
												</Form.Group>
											))}
											<Button onClick={this.addNewExtras}>Add New Extra Room Desc</Button>
										</Container>
										<Container>
											<Header as="h3">Exits</Header>
											{this.state.room.exits.map((exit, i) => (
												<Form.Group key={i}>
													<Form.Dropdown label="Direction" name="door" fluid selection options={this.state.room_directions} value={this.state.room.exits[i].door}   />
													<Form.TextArea rows={1} name="description" label="Description" placeholder="What shows up when someone looks at the keyword?" value={this.state.room.extra_descr_data[i].description} onChange={this.handleExtrasChange(i, "description")} />
												</Form.Group>
											))}
											<Button onClick={this.addNewExits}>Add New Extra Room Desc</Button>
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