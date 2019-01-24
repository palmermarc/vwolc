
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid, Button, List, Popup, Icon, Input, Segment, Form, Message, Menu, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import config from '../constants/config';
const isNumber = require('is-number');

class Mobs extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			open: false,
			errors: [],
			mobId: 0,
			niceName: "Create Mob",
			mobs: [{
				vnum:	0,
				name:	"first mob areaname",
				short_description: "my first mob",
				long_description:	"This is my first mob. Ain't it perty?",
			}],
			mob: {
				vnum:	0,
				name:	"",
				short_description: "",
				long_description:	"",
				description:	"",
				act:	0,
				affected_by: [],
				alignment: 0,
				level: 0,
				exp_level: 0,
				hitroll:	0,
				damroll:	0,
				ac: 0,
				hp: 100,
				gold:	10,
				sex:	0,
				resets: {
					mobResets: [],
					inventoryResets: [],
					equipmentResets: []
				}
			},
			resets: [{}],
			inventoryResets: [{ arg2: 100, arg3: 0}],
			equipmentResets: [{ arg2: 100, arg3: 0}],
			objects: [{text: "Test Object", key: 0, value: 0}, {text: "Test Object 2", key: 1, value: 1}],
			rooms: [{text: "Test Rooms", key: 0, value: 0}, {text: "Test Rooms", key: 1, value: 1}],
		};

		this.getMob = this.getMob.bind(this);
		this.getMobs = this.getMobs.bind(this);
		this.saveMob = this.saveMob.bind(this);
		this.updateMob = this.updateMob.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getResets = this.getResets.bind(this);
		this.handleResetsChange = this.handleResetsChange.bind(this);
	}

	componentDidMount() {
		// Call API
		this.getMobs();

		if( typeof this.props.match.params.mobId !== "undefined" ) {
			this.setState({ mobId: this.props.match.params.mobId, niceName: "Update Mob" });
			this.getMob(this.props.match.params.mobId);
		}

		document.title = this.state.niceName;
	}

	componentWillReceiveProps () {
		// Call API
		this.getMobs();

		if( typeof this.props.match.params.mobId !== "undefined" ) {
			this.setState({ mobId: this.props.match.params.mobId, niceName: "Update Mob" });
			this.getMob(this.props.match.params.mobId);
		}

		document.title = this.state.niceName;
	}

	getMobs() {
		var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
		let self = this;
		let Mobs = [];

		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM `areas_" + self.props.areas.activeArea + "_mobs` LIMIT 10000", [], function(tx, rs) {
				if( rs.rows.length >= 1 ) {
					for( var i=0; i<rs.rows.length; i++ ) {
						Mobs.push({
							vnum : rs.rows[i].vnum,
							name : rs.rows[i].name,
							short_description : rs.rows[i].short_description,
							long_description : rs.rows[i].long_description,
							description : rs.rows[i].description,
							act : rs.rows[i].act,
							affected_by : rs.rows[i].affected_by,
							alignment : rs.rows[i].alignment,
							level : rs.rows[i].level,
							exp_level : rs.rows[i].exp_level,
							hitroll : rs.rows[i].hitroll,
							damroll : rs.rows[i].damroll,
							ac : rs.rows[i].ac,
							hp : rs.rows[i].hp,
							gold : rs.rows[i].gold,
							sex : rs.rows[i].sex
						});
					}
				} else {
					Mobs = [{
						vnum : 0,
						name : "first mob areaname",
						short_description : "my first mob",
						long_description : "This is my first mob. Ain't it perty?",
					}]
				}
				self.setState({mobs: Mobs});
			})
		}); 
	}

	handleChange(e) {
		const { name, value } = e.target;

		if( ( 
			name === "level" || 
			name === "exp_level" || 
			name === "alignment" || 
			name === "hitroll" || 
			name === "damroll" || 
			name === "ac" ||
			name === "hp" ||
			name === "gold" ||
			name === "sex"
			)
			&& !isNumber(value)) {
				return;
			}
		this.setState(
			prevState => ({
				mob: {
					...prevState.mob,
					[name]: value
				}
			})
		);
		
		this.setState({unsaved: true});
	}

	getMob(mobId) {
		let self = this;
		let mob = {
			vnum: 1,
			name: "",
			short_description: "",
			long_description: "",
			description:  "",
			act:  0,
			affected_by: [],
			alignment: 0,
			level: 0,
			exp_level: 0,
			hitroll:  0,
			damroll:  0,
			ac: 0,
			hp: 100,
			gold: 10,
			sex:  0,
			resets: {
				mobResets: [],
				inventoryResets: [],
				equipmentResets: []
			}
		};

		var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM `areas_" + self.props.areas.activeArea + "_mobs` AND vnum = '" + mobId + "'", [], function(tx, rs) {
				if( rs.rows.length ) {
					mob = rs.rows[0];
					mob.affected_by = JSON.parse(mob.affected_by);
					self.setState({mob: mob});
					
					
				}
			}, function(error) {
				console.log(error);
			});
		});
	}

	getResets() {
		let newResets = [];
		let self = this;

		var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM `areas_" + self.props.areas.activeArea + "_resets` WHERE arg1 = '" + this.state.mobId + "'AND command = 'M'", [], function(tx, rs) {
				if( rs.rows.length ) {
					
				}
			}, function(error) {
				console.log(error);
			});
		});
	}

	handleSubmit = () => {
		let errors = [];

		if( this.state.mob.ac < 0 ) {
			errors.push({field: "ac", message: "Armor must be a positive number."});
		}
		
		if( this.state.mob.ac > 10000 ) {
			errors.push({field: "ac", message: "Armor cannot go higher than 10,000. This gives the mob a 95% damage reduction. Maybe you should make it stance to make it even stronger?"});
		}

		if( this.state.mob.hp < 500 ) {
			errors.push({field: "hp", message: "You cannot set the hp value to less than 500." });
		}

		if( this.state.mob.hp > 250000 ) {
			errors.push({field: "hp", message: "You cannot set the hp value to more than 250000. Might we suggest increasing the remort level to make it tougher to kill?" });
		}

		if( this.state.mob.name.length === 0) {
			errors.push({ field: "name", message: "Name cannot be blank."});
		}

		if( this.state.mob.short_description.length === 0) {
			errors.push({ field: "short_description", message: "Short Description cannot be blank."});
		}

		if( this.state.mob.long_description.length === 0) {
			errors.push({ field: "long_description", message: "Long Description cannot be blank."});
		}

		if( this.state.mob.description.length === 0) {
			errors.push({ field: "description", message: "Description cannot be blank."});
		}

		if( this.state.mob.alignment > 1000 || this.state.mob.alignment < -1000 ) {
			errors.push({ field: "alignment", message: "Alignment must be between 1000 and -1000" });
		}

		if( this.state.mob.level <= 0 ) {
			errors.push({field: "level", message: "Mob level must be greater than 0." });
		}

		if( this.state.mob.level > 250000 ) {
			errors.push({field: "level", message: "Mob level cannot be greater than 250,000." });
		}

		if( this.state.mob.exp_level <= 0 ) {
			errors.push({field: "exp_level", message: "EXP level must be greater than 0." });
		}

		if( this.state.mob.exp_level > 250000 ) {
			errors.push({field: "exp_level", message: "EXP level cannot be greater than 250,000." });
		}

		if( this.state.mob.hitroll <= 0 ) {
			errors.push({field: "hitroll", message: "Hitroll must be greater than 0." });
		}

		if( this.state.mob.hitroll > 7500 ) {
			errors.push({field: "hitroll", message: "Hitroll cannot be greater than 7,500." });
		}

		if( this.state.mob.damroll <= 0 ) {
			errors.push({field: "damroll", message: "Damroll must be greater than 0." });
		}

		if( this.state.mob.damroll > 7500 ) {
			errors.push({field: "damroll", message: "Damroll cannot be greater than 7,500." });
		}

		this.setState( { errors: errors } );
		
		if( errors.length === 0 ) {
			if( this.state.mobId === 0 ) {
				this.saveMob();
			}
			else {   
				this.updateMob();
			}
		}
	}

	saveMob() {
		let self = this;
		var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
		db.transaction(function(tx){
			tx.executeSql("INSERT INTO `areas_" + self.props.areas.activeArea + "_mobs` (name, short_description, long_description, description, act, affected_by, alignment, level, exp_level, hitroll, damroll, ac, hp, gold, sex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [self.state.mob.name, self.state.mob.short_description, self.state.mob.long_description, self.state.mob.description, self.state.mob.act, JSON.stringify(self.state.mob.affected_by), self.state.mob.alignment, self.state.mob.level, self.state.mob.exp_level, self.state.mob.hitroll, self.state.mob.damroll, self.state.mob.ac, self.state.mob.hp, self.state.mob.gold, self.state.mob.sex], function(txs, rs) {
				let newMobId = rs.insertId;
			   
				/* Save Mob Spawn Resets */
				self.state.mob.resets.mobResets.map((reset, i) => (
					tx.executeSql("INSERT INTO `areas_" + self.props.areas.activeArea + "_resets` (arg1, arg2, arg3, command) VALUES (?, ?, ?, ?)", [newMobId, reset.arg2, reset.arg3, "M"])
				));	
				
				/* Save Mob Inventory Resets */
				self.state.mob.resets.inventoryResets.map((reset, i) => (
					tx.executeSql("INSERT INTO `areas_" + self.props.areas.activeArea + "_resets` (arg1, arg2, arg3, command) VALUES (?, ?, ?, ?)", [newMobId, self.state.mob.resets.inventoryResets[i].arg2, self.state.mob.resets.inventoryResets[i].arg3, "E"])
				));

				/* Save Mob Equipment Resets */
				self.state.mob.resets.equipmentResets.map((reset, i) => (
					tx.executeSql("INSERT INTO `areas_" + self.props.areas.activeArea + "_resets` (arg1, arg2, arg3, command) VALUES (?, ?, ?, ?)", [newMobId, self.state.mob.resets.equipmentResets[i].arg2, self.state.mob.resets.equipmentResets[i].arg3, "G"])
				));

				setTimeout(function() {
					self.props.history.push("/mobs/" + newMobId + "/");
				}, 1500);

			}, function(error) {
				console.log(error);
			});
		});
	}

	updateMob() {
		let self = this;
		var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
		db.transaction(function(tx){
			tx.executeSql("UPDATE `areas_" + self.props.areas.activeArea + "_mobs` set name = ?, short_description = ?, long_description = ?, description = ?, act = ?, affected_by = ?,  alignment = ?, level = ?, exp_level = ?, hitroll = ?, damroll = ?, ac = ?, hp = ?, gold = ?, sex = ? WHERE vnum = ?", [self.state.mob.name, self.state.mob.short_description, self.state.mob.long_description, self.state.mob.description, self.state.mob.act, JSON.stringify(self.state.mob.affected_by), self.state.mob.alignment, self.state.mob.level, self.state.mob.exp_level, self.state.mob.hitroll, self.state.mob.damroll, self.state.mob.ac, self.state.mob.hp, self.state.mob.gold, self.state.mob.sex, self.state.mobId], function(tx, rs) {
				self.getMobs();
				
				tx.executeSql("DELETE FROM `areas_" + self.props.areas.activeArea + "_resets` WHERE arg1 = '" + self.state.mobId + "'");
				
				/* Save Mob Spawn Resets */
				self.state.mob.resets.mobResets.map((reset) => (
					tx.executeSql("INSERT INTO `areas_" + self.props.areas.activeArea + "_resets` (arg1, arg2, arg3, command) VALUES (?, ?, ?, ?)", [self.state.mobId, reset.arg2, reset.arg3, "M"])
				));	
				
				/* Save Mob Inventory Resets */
				self.state.mob.resets.inventoryResets.map((reset, i) => (
					tx.executeSql("INSERT INTO `areas_" + self.props.areas.activeArea + "_resets` (arg1, arg2, arg3, command) VALUES (?, ?, ?, ?)", [self.state.mobId, self.state.mob.resets.inventoryResets[i].arg2, self.state.mob.resets.inventoryResets[i].arg3, "E"])
				));

				/* Save Mob Equipment Resets */
				self.state.mob.resets.equipmentResets.map((reset, i) => (
					tx.executeSql("INSERT INTO `areas_" + self.props.areas.activeArea + "_resets` (arg1, arg2, arg3, command) VALUES (?, ?, ?, ?)", [self.state.mobId, self.state.mob.resets.equipmentResets[i].arg2, self.state.mob.resets.equipmentResets[i].arg3, "G"])
				));
				
			}, function(error) {
				console.log(error);
			});
		});
	}

	addNewResets = (resetType) => {
		let self = this;
		switch(resetType) {
			case "mobResets" :
				this.setState(
					prevState => ({
						mob: {
							...prevState.mob,
							resets: {
								...prevState.mob.resets,
								mobResets: this.state.mob.resets.mobResets.concat([{ arg1: self.state.mobId, arg2: 0, arg3: 0, comment: ""}])
							}
						}
					})	
				);
				break;
			case "inventoryResets" :
				this.setState(
					prevState => ({
						mob: {
							...prevState.mob,
							resets: {
								...prevState.mob.resets,
								inventoryResets: this.state.mob.resets.inventoryResets.concat([{ arg1: self.state.mobId, arg2: 0, arg3: 0, comment: ""}])
							}
						}
					})	
				);
				break;
			case "equipmentResets" :
				this.setState(
					prevState => ({
						mob: {
							...prevState.mob,
							resets: {
								...prevState.mob.resets,
								equipmentResets: this.state.mob.resets.equipmentResets.concat([{ arg1: self.state.mobId, arg2: 0, arg3: 0, comment: ""}])
							}
						}
					})	
				);
				break;
		}
	}
	
	handleResetsChange = (idx, resetType, fieldName) => (evt) => {
		switch(resetType) {
			case "mobResets" :
				const newResets = this.state.mob.resets.mobResets.map((reset, sidx) => {
					if (idx !== sidx) return reset;
					return { ...reset, [fieldName]: evt.target.value };
				});

				this.setState(
					prevState => ({
						mob: {
							...prevState.mob,
							resets: {
								...prevState.mob.resets,
								mobResets: newResets
							}
						}
					})
				);
				break;
			case "inventoryResets" :
				break;
			case "equipmentResets" :
				break;
		}
		
	}

	render( ) {
		return (
			<div className="wrap fade-in">
				<Segment placeholder>
					<Grid columns={2} stackable textAlign='center'>
						<Grid.Row verticalAlign='top'>
							<Grid.Column width={6}>
								<div id="mobs-list" className="fade-in">
									<List divided relaxed>
										{this.state.mobs.map((mob) => (
											<List.Item key={"mob" + mob.vnum}>
												<List.Content>
													<List.Header>({mob.vnum}) {mob.short_description}</List.Header>
													<List.Description>
														<Menu text horizontal="true">
															<Menu.Item as={Link} to={'/mobs/' + mob.vnum + '/'}>Edit Mob</Menu.Item>
														</Menu>
													</List.Description>
												</List.Content>
											</List.Item>
										))}
									</List>
									<div id="view-header-section">
										<Button as={Link} to={'/mobs/'} className="view-create-new">
											<Icon name="plus" />
											Create New
										</Button>
									</div>
								</div>
							</Grid.Column>
							<Grid.Column width={10}>
								<div id="mob-stats" className="fade-in">
									{this.state.errors.length > 0  &&
										<Message negative>
											<Message.Header>Please fix the following errors:</Message.Header>
											{this.state.errors.map((error, i) => (
												<p key={"error-"+i}>{error.message}</p>
											))}
										</Message>
									}
									<Form>
										<Form.Group widths='equal'>
											<Form.Field>
												<label>Namelist <Popup trigger={<Button icon='help circle' />} content='This is the list of names that your mob can be found under' /></label>
												<Input name="name"  value={this.state.mob.name} placeholder='name' onChange={this.handleChange} />
											</Form.Field>
											<Form.Input fluid name="short_description" value={this.state.mob.short_description} label='Short Desc' placeholder='Short desc' onChange={this.handleChange} />
										</Form.Group>
										<Form.Input fluid name="long_description" label='Long Desc' placeholder='' value={this.state.mob.long_description} onChange={this.handleChange} />
										<Form.TextArea name="description" label='Look' placeholder='The mob looks back at you!' value={this.state.mob.description} onChange={this.handleChange} />
										<Form.Group widths="equal">
											<Form.Input fluid name="alignment" label='Alignment' placeholder='0' value={this.state.mob.alignment} onChange={this.handleChange}  />
											<Form.Input fluid name="level" label='Level' placeholder='0' value={this.state.mob.level} onChange={this.handleChange}  />
											<Form.Input fluid name="exp_level" label='EXP Level' placeholder='0' value={this.state.mob.exp_level} onChange={this.handleChange}  />
											<Form.Input fluid name="gold" label='Gold' placeholder='0' value={this.state.mob.gold} onChange={this.handleChange}  />
											<Form.Select fluid name="sex" label='Gender' options={config.mobs.genders} placeholder='Gender' onChange={this.handleChange} />
										</Form.Group>
										<Form.Group widths="equal">
											<Form.Input fluid name="hp" label='HP' placeholder='0' value={this.state.mob.hp} onChange={this.handleChange} />
											<Form.Input fluid name="hitroll" label='Hitroll' placeholder='0' value={this.state.mob.hitroll} onChange={this.handleChange}  />
											<Form.Input fluid name="damroll" label='Damroll' placeholder='0' value={this.state.mob.damroll} onChange={this.handleChange}  />
											<Form.Input fluid name="ac" label='Armor' placeholder='0' value={this.state.mob.ac} onChange={this.handleChange}  />
										</Form.Group>
										<Form.Dropdown label='Affects' placeholder='Affects' name="affected_by" fluid multiple selection options={config.mobs.affects} value={this.state.mob.affected_by} onChange={(e,{value}) => this.setState(prevState => ({mob: {...prevState.mob,affected_by: [...value]}}))}   />
										<Container>
											<Header as="h4">Resets</Header>
											{this.state.mob.resets.mobResets.map((reset, i) => (
												<Form.Group key={"mr-"+i}>
													<Form.Field width={2}>
														<Form.Input fluid name="arg2" value={reset.arg2} label="# Spawned" placeholder="0" onChange={this.handleResetsChange(i, "mobResets", "arg2")} />
													</Form.Field>
													<Form.Field width={12}>
														<Form.Dropdown label="Room To Spawn In" name="arg3" fluid selection options={this.state.rooms} value={reset.arg3} onChange={this.handleResetsChange(i, "mobResets", "arg3")} />
													</Form.Field>
													<Form.Field width={1}>
														<label>&nbsp;</label>
														<Button icon><Icon name="minus" /></Button>
													</Form.Field>
													<Form.Field width={1}>
														<label>&nbsp;</label>
														<Button onClick={() => this.addNewResets("mobResets")} icon><Icon name="plus" /></Button>
													</Form.Field>
												</Form.Group>
											))}
											
											<Header as="h4">Inventory</Header>
											{this.state.mob.resets.inventoryResets.map((reset, i) => (
											<Form.Group key={"ir-"+i}>
												<Form.Field width={2}>
													<Form.Input fluid label="Load %" name="arg2" value={this.state.mob.resets.inventoryResets[i].arg2} onChange={this.handleResetsChange(i, "inventoryResets", "arg2")} />
												</Form.Field>
												<Form.Field width={12}>
													<Form.Dropdown label="Objects in Inventory" name="arg3" fluid selection options={this.state.objects} onChange={this.handleResetsChange(i, "mobResets", "arg3")} />
												</Form.Field>
												<Form.Field width={1}>
													<label>&nbsp;</label>
													<Button icon><Icon name="minus" /></Button>
												</Form.Field>
												<Form.Field width={1}>
													<label>&nbsp;</label>
													<Button onClick={() => this.addNewResets("inventoryResets")} icon><Icon name="plus" /></Button>
												</Form.Field>
											</Form.Group>
											))}
													
											<Header as="h4">Equipment</Header>
											{this.state.mob.resets.equipmentResets.map((reset, i) => (
												<Form.Group key={"er-"+i}>
													<Form.Field width={2}>
														<Form.Input fluid label="Load %" name="arg2" value={this.state.mob.resets.equipmentResets[i].arg2} onChange={this.handleResetsChange(i, "equipmentResets", "arg2")} />
													</Form.Field>
													<Form.Field width={12}>
														<Form.Dropdown label="Objects Equipped" name="arg3" fluid selection options={this.state.objects} onChange={this.handleResetsChange(i, "mobResets", "arg3")} />
													</Form.Field>
													<Form.Field width={1}>
														<label>&nbsp;</label>
														<Button icon><Icon name="minus" /></Button>
													</Form.Field>
													<Form.Field width={1}>
														<label>&nbsp;</label>
														<Button onClick={() => this.addNewResets("equipmentResets")} icon><Icon name="plus" /></Button>
													</Form.Field>
												</Form.Group>
											))}

										</Container>
										<Form.Button content={this.state.niceName} onClick={this.handleSubmit} />
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

export default withRouter(connect(
	mapStateToProps
)(Mobs));