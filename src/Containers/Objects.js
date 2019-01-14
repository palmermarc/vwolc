import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid, Button, List, Icon, Segment, Divider, Form, Message, Dropdown, Popup, Input, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import config from '../constants/config';

class Objects extends React.Component {

    constructor(props, context) {
        super(props, context);

        var selectedArea = localStorage.getItem('selectedArea');
        if (selectedArea === null) { selectedArea = 0; }

        this.state = {
            selectedArea: selectedArea,
            errors: [],
            objectId: 0,
            niceName: "Create Object",
            objects: [{
                id:	0,
                name: "first object areaname",
                short_description: "my first object",
                description: "This is my first object. Ain't it perty?",
            }],
            object: {
                id: 0,
                name: "",
                short_description: "",
                description: "",
                item_type:  0,
                extra_flags: [],
                wear_flags: [],
                value0: 0,
                value1: 0,
                value2: 0,
                value3: 0,
                weight: 0,
                cost:   0,
                affect_data: [],
                extra_descr_data: [],
                chpoweron: "",
                chpoweroff: "",
                chpoweruse: "",
                victpoweron: "",
                victpoweroff: "",
                victpoweruse: "",
                spectype: 0,
                specpower: 0
            }
        };

        this.getObject = this.getObject.bind(this);
        this.getObjects = this.getObjects.bind(this);
        this.saveObject = this.saveObject.bind(this);
        this.updateObject = this.updateObject.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
		this.addNewExtras = this.addNewExtras.bind(this);
		this.addNewAffects = this.addNewAffects.bind(this);
    }

    componentDidMount() {
        // Call API
        this.getObjects();

        if( typeof this.props.match.params.objectId !== "undefined" ) {
            this.setState({ objectId: this.props.match.params.objectId, niceName: "Update Object" });
            this.getObject(this.props.match.params.objectId);        }

        document.title = this.state.niceName;
    }

    componentWillReceiveProps () {
        // Call API
        this.getObjects();

        if( typeof this.props.match.params.objectId !== "undefined" ) {
            this.setState({ objectId: this.props.match.params.objectId, niceName: "Update Object" });
            this.getObject(this.props.match.params.objectId);
        }

        document.title = this.state.niceName;
    }

    getObjects() {
        var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
        let self = this;
        let Objects = [];
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM objects WHERE area_id = ? LIMIT 10000", [self.props.areas.activeArea], function(tx, rs) {
                if( rs.rows.length >= 1 ) {
                    for( var i=0; i<rs.rows.length; i++ ) {
                        Objects.push({
                            id: rs.rows[i].id,
                            name: rs.rows[i].name,
                            short_description: rs.rows[i].short_description,
                            description: rs.rows[i].description,
                            item_type: rs.rows[i].item_type,
                            extra_flags: rs.rows[i].extra_flags,
                            wear_flags: rs.rows[i].wear_flags,
                            value0: rs.rows[i].value0,
                            value1: rs.rows[i].value1,
                            value2: rs.rows[i].value2,
                            value3: rs.rows[i].value3,
                            weight: rs.rows[i].weight,
                            cost: rs.rows[i].cost,
                            affect_data: rs.rows[i].affect_data,
                            extra_descr_data: rs.rows[i].extra_descr_data,
                            chpoweron: rs.rows[i].chpoweron,
                            chpoweroff: rs.rows[i].chpoweroff,
                            chpoweruse: rs.rows[i].chpoweruse,
                            victpoweron: rs.rows[i].victpoweron,
                            victpoweroff: rs.rows[i].victpoweroff,
                            victpoweruse: rs.rows[i].victpoweruse,
                            spectype: rs.rows[i].spectype,
                            specpower: rs.rows[i].specpower,
                        });
                    }
                } else {
                    Objects = [{
                        id : 0,
                        name : "first mob areaname",
                        short_description : "my first mob",
                        long_description : "This is my first mob. Ain't it perty?",
                    }]
                }
                self.setState({objects: Objects});
            })
        }); 
    }

    handleChange = ( e, { name, value } ) => {
        this.setState(
            prevState => ({
                object: {
                    ...prevState.object,
                    [name] : value                
                }
            })
        );
           
        this.setState({unsaved: true});
    }

    getObject(objectId) {
        let self = this;
  
        var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM objects WHERE area_id = '" + self.props.areas.activeArea + "' AND id = '" + objectId + "'", [], function(tx, rs) {
                if( rs.rows.length ) {
                    let object = rs.rows[0];
					
					self.setState({
						object: {
							id: object.id,
							name: object.name,
							short_description: object.short_description,
							description: object.description,
							item_type: object.item_type,
							extra_flags: JSON.parse(object.extra_flags),
							wear_flags: JSON.parse(object.wear_flags),
							value0: object.value0,
							value1: object.value1,
							value2: object.value2,
							value3: object.value3,
							weight: object.weight,
							cost: object.cost,
							affect_data: JSON.parse(object.affect_data),
							extra_descr_data: JSON.parse(object.extra_descr_data),
							chpoweron: object.chpoweron,
							chpoweroff: object.chpoweroff,
							chpoweruse: object.chpoweruse,
							victpoweron: object.victpoweron,
							victpoweroff: object.victpoweroff,
							victpoweruse: object.victpoweruse,
							spectype: object.spectype,
							specpower: object.specpower
						}
					});
                }
            }, function(error) {
                console.log(error);
            });
        });
    }

    handleSubmit = () => {
        console.log(this.state.object);
        // let self = this;

        let errors = [];

        this.setState( { errors: errors } );
        
        if( errors.length === 0 ) {
            if( this.state.objectId === 0 ) {
                this.saveObject();
            }
            else {   
                this.updateObject();
            }
        }
    }

    saveObject() {
        let self = this;
        console.log("Trying to save");
        var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
        db.transaction(function(tx){
            tx.executeSql("INSERT INTO objects (name, short_description, description, item_type, extra_flags, wear_flags, value0, value1, value2, value3, weight, cost, affect_data, extra_descr_data, chpoweron, chpoweroff, chpoweruse, victpoweron, victpoweroff, victpoweruse, spectype, specpower, area_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [self.state.object.name, self.state.object.short_description, self.state.object.description, self.state.object.item_type, self.state.object.extra_flags, self.state.object.wear_flags, self.state.object.value0, self.state.object.value1, self.state.object.value2, self.state.object.value3, self.state.object.weight, self.state.object.cost, self.state.object.affect_data, self.state.object.extra_descr_data, self.state.object.chpoweron, self.state.object.chpoweroff, self.state.object.chpoweruse, self.state.object.victpoweron, self.state.object.victpoweroff, self.state.object.victpoweruse, self.state.object.spectype, self.state.object.specpower, self.props.areas.activeArea], function(tx, rs) {
                self.getObjects();
                console.log(tx);
                console.log(rs);
                self.props.history.push("/objects/"+rs.insertId+"/");
            }, function(transaction, error) {
                console.log(error.message);
            });
        });
    }

    updateObject() {
        let self = this;
        console.log("Trying to save");
        var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
        db.transaction(function(tx){
            tx.executeSql("UPDATE objects SET name = ?, short_description = ?, description = ?, item_type = ?, extra_flags = ?, wear_flags = ?, value0 = ?, value1 = ?, value2 = ?, value3 = ?, weight = ?, cost = ?, affect_data = ?, extra_descr_data = ?, chpoweron = ?, chpoweroff = ?, chpoweruse = ?, victpoweron = ?, victpoweroff = ?, victpoweruse = ?, spectype = ?, specpower = ? WHERE id = ?", [self.state.object.name, self.state.object.short_description, self.state.object.description, self.state.object.item_type, self.state.object.extra_flags, self.state.object.wear_flags, self.state.object.value0, self.state.object.value1, self.state.object.value2, self.state.object.value3, self.state.object.weight, self.state.object.cost, self.state.object.affect_data, self.state.object.extra_descr_data, self.state.object.chpoweron, self.state.object.chpoweroff, self.state.object.chpoweruse, self.state.object.victpoweron, self.state.object.victpoweroff, self.state.object.victpoweruse, self.state.object.spectype, self.state.object.specpower, self.state.objectId], function(tx, rs) {                self.getObjects();
            }, function(transaction, error) {
                console.log(error.message);
            });
        });
    }
	
	addNewExtras() {
		this.setState(
			prevState => ({
				object: {
					...prevState.object,
					extra_descr_data: this.state.object.extra_descr_data.concat([{ keywords: '', description: '' }])
				}
			})	
		);
	}
	
	handleExtrasChange = (idx, fieldName) => (evt) => {
		const newExtras = this.state.object.extra_descr_data.map((extra, sidx) => {
			if (idx !== sidx) return extra;
			return { ...extra, [fieldName]: evt.target.value };
		});

		this.setState(
			prevState => ({
				object: {
					...prevState.object,
					extra_descr_data: newExtras
				}
			})
		);
	}
	
	addNewAffects() {
		this.setState(
			prevState => ({
				object: {
					...prevState.object,
					affect_data: this.state.object.affect_data.concat([{ location: 0, modifier: 0 }])
				}
			})	
		);
	}
	
	handleAffectsChange = (idx, fieldName) => (evt) => {
		const newAffects = this.state.object.affect_data.map((affect, sidx) => {
			if (idx !== sidx) return affect;
			return { ...affect, [fieldName]: evt.target.value };
		});

		this.setState(
			prevState => ({
				object: {
					...prevState.object,
					affect_data: newAffects
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
                                <div id="objects-list" className="fade-in">
                                    {this.state.objects.map((object) => (
                                        <List key={object.id} divided relaxed>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header>
                                                        <Link to={"/objects/"+object.id+"/"}>({object.id}) {object.name}</Link>
                                                    </List.Header>
                                                    <List.Description>{object.short_description}</List.Description>
                                                </List.Content>
                                            </List.Item>
                                        </List>
                                    ))}
									<div id="view-header-section">
										<Button as={Link} to={'/objects/'} className="view-create-new">
											<Icon name="plus" />
											Create New
										</Button>
									</div>
								</div>
							</Grid.Column>
							<Grid.Column>
								<div id="object-stats" className="fade-in">
									{this.state.errors.length > 0  &&
										<Message negative>
											<Message.Header>Please fix the following errors:</Message.Header>
											{this.state.errors.map((error) => (
												<p>{error.message}</p>
											))}
										</Message>
									}
									
									<Form>
										<Form.Group>
											<Form.Field width={10}>
												<label>Namelist <Popup trigger={<Button icon='help circle' />} content="This is the list of names that your object can be found under. If you don't add it here, it won't show up on locate. Seperate each keyword by a space - no commas." /></label>
												<Input name="name"  value={this.state.object.name} placeholder='name' onChange={this.handleChange} />
											</Form.Field>
											<Form.Field width={3}>
												<label>Gold Value</label>
												<Input name="gold"  value={this.state.object.gold} placeholder="0" onChange={this.handleChange} />
											</Form.Field>
											<Form.Field width={3}>
												<label>Weight</label>
												<Input name="weight"  value={this.state.object.weight} placeholder="0" onChange={this.handleChange} />
											</Form.Field>
										</Form.Group>
										
										<Form.Field>
											<label>Short Description <Popup trigger={<Button icon='help circle' />} content="The string that shows in someone's inventory." /></label>
											<Input name="short_description"  value={this.state.object.short_description} placeholder="" onChange={this.handleChange} />
										</Form.Field>
										
										<Form.Field>
											<label>Description <Popup trigger={<Button icon='help circle' />} content="The string that shows up when an item is on the ground, or you look at it." /></label>
											<Input name="description"  value={this.state.object.description} placeholder="" onChange={this.handleChange} />
										</Form.Field>
										
										<Container>
											<Header as="h3">Item Type & Stats</Header>
											<Form.Field>
												<label>Item Type</label>
												<Dropdown selection name="item_type" options={config.object.item_types} value={this.state.object.item_type} onChange={this.handleChange} />
											</Form.Field>
											{
												/** Light **/
												this.state.object.item_type === 1 &&
												<Form.Group>
													<Form.Field>
														<label>Hours</label>
														<Input name="value2" value={this.state.object.value2} onChange={this.handleChange} />
													</Form.Field>
												</Form.Group>
											}
											
											{
												/**
												 * Potion, Pill, Scroll
												 */( this.state.object.item_type === 2 || this.state.object.item_type === 10 || this.state.object.item_type === 26 ) && 
												<Form.Group>
													<Form.Field>
														<label>Spell Level</label>
														<Input name="value0" value={this.state.object.value0} onChange={this.handleChange} />
													</Form.Field>
													<Form.Field>
														<label>Spell 1</label>
														<Dropdown selection name="value1" value={this.state.object.value1} onChange={this.handleChange} options={config.object.spells} />
													</Form.Field>
													<Form.Field>
														<label>Spell 2</label>
														<Dropdown selection name="value2" value={this.state.object.value2} onChange={this.handleChange} options={config.object.spells} />
													</Form.Field>
													<Form.Field>
														<label>Spell 3</label>
														<Dropdown selection name="value3" value={this.state.object.value3} onChange={this.handleChange} options={config.object.spells} />
													</Form.Field>
												</Form.Group>
											}
											
											{
												/**
												 * Weapon
												 */
												(this.state.object.item_type === 3 || this.state.object.item_type === 4) && 
												<Form.Group>
													<Form.Field>
														<label>Level</label>
														<Input name="value0" value={this.state.object.value0} onChange={this.handleChange} />
													</Form.Field>
													<Form.Field>
														<label>Max Charges</label>
														<Input name="value1" value={this.state.object.value1} onChange={this.handleChange} />
													</Form.Field>
													<Form.Field>
														<label>Current Charges</label>
														<Input name="value2" value={this.state.object.value2} onChange={this.handleChange} />
													</Form.Field>
													<Form.Field>
														<label>Spell</label>
														<Dropdown selection name="value3" value={this.state.object.value3} onChange={this.handleChange} options={config.object.spells} />
													</Form.Field>
												</Form.Group>
											}
											
											{
												/**
												 * Weapon
												 */
												this.state.object.item_type === 5 && 
												<Form.Group>
													<Form.Field>
														<label>Spell</label>
														<Dropdown selection name="value0" value={this.state.object.value0} onChange={this.handleChange} options={config.object.spells} />
													</Form.Field>
													<Form.Field>
														<label>Weapon Type</label>
														<Dropdown selection name="value3" value={this.state.object.value3} onChange={this.handleChange} options={config.object.weapon_types} />
													</Form.Field>
												</Form.Group>
											}
											
											{
												/**
												 * Armor
												 */
												this.state.object.item_type === 9 && 
												<Form.Group>
													<Form.Field>
														<label>Spell</label>
														<Dropdown selection name="value3" value={this.state.object.value3} onChange={this.handleChange} options={config.object.spells} />
													</Form.Field>
												</Form.Group>
											}
											
											{
												/**
												 * Container
												 */
												this.state.object.item_type === 15 && 
												<Form.Group>
													<Form.Field width={2}>
														<label>Weight</label>
														<Input name="value0" value={this.state.object.value0} onChange={this.handleChange} />
													</Form.Field>
													<Form.Field width={6}>
														<label>Key</label>
														<Input name="value2" value={this.state.object.value2} onChange={this.handleChange} />
													</Form.Field>
													<Form.Field>
														<label>Flags</label>
														<Dropdown multiple selection name="value1" onChange={this.handleChange} options={[{ value : 1, text: "Closable", key: 1 },{ value : 4, text: "Closed", key: 2 },{ value : 8, text: "Locked", key: 3 },{ value : 2, text: "Pickproof", key: 4 }]} value={this.state.object.value1} />
													</Form.Field>
												</Form.Group>
											}
											
											{
												/**
												 * Drink Container
												 */
												this.state.object.item_type === 17 && 
												<Form.Group>
													<Form.Field width={2}>
														<label>Max Amount</label>
														<Input name="value0" value={this.state.object.value0} onChange={this.handleChange} />
													</Form.Field>
													<Form.Field width={6}>
														<label>Current Amount</label>
														<Input name="value1" value={this.state.object.value1} onChange={this.handleChange} />
													</Form.Field>
													<Form.Field>
														<label>Liquid</label>
														<Dropdown selection name="value2" onChange={this.handleChange} options={config.object.liquids} value={this.state.object.value2} />
													</Form.Field>
												</Form.Group>
											}
											
											{
												/**
												 * Food
												 */
												this.state.object.item_type === 19 && 
												<Form.Group>
													<Form.Field>
														<label>Hours Full</label>
														<Input name="value0" value={this.state.object.value0} onChange={this.handleChange} />
													</Form.Field>
												</Form.Group>
											}
											
											{
												/**
												 * Gold
												 */
												this.state.object.item_type === 20 && 
												<Form.Group>
													<Form.Field>
														<label>Gold</label>
														<Input name="value0" value={this.state.object.value0} onChange={this.handleChange} />
													</Form.Field>
												</Form.Group>
											}
											
											{
												/**
												 * Portal
												 */
												this.state.object.item_type === 27 && 
												<Form.Group>
													<Form.Field>
														<label>Destination VNum</label>
														<Input name="value0" value={this.state.object.value0} onChange={this.handleChange} />
													</Form.Field>
													<Form.Field>
														<label>Current Value</label>
														<Input name="value1" value={this.state.object.value1} onChange={this.handleChange} />
													</Form.Field>
													<Form.Field>
														<label>Max Value</label>
														<Input name="value2" value={this.state.object.value2} onChange={this.handleChange} />
													</Form.Field>
													<Form.Field>
														<label>Original VNum</label>
														<Input name="value3" value={this.state.object.value3} onChange={this.handleChange} />
													</Form.Field>
												</Form.Group>
											}
										</Container>
										
										<Form.Field>
											<label>Extra Flags</label>
											<Dropdown label='Extra Flags' name="extra_flags" fluid multiple selection options={config.object.extra_flags} value={this.state.object.extra_flags} />
										</Form.Field>
										
										<Form.Field>
											<label>Wear Flags <Popup trigger={<Button icon='help circle' />} content="If you do not select Take as an option, you will not be able to pick this up no matter what other option you select." /></label>
											<Dropdown name="wear_flags" fluid multiple selection options={config.object.wear_flags} value={this.state.object.wear_flags} /> />
										</Form.Field>
										
											
										<Container>
											<Header as="h3">
												<Button onClick={this.addNewExtras}><Icon name="plus circle" />Add New</Button>
												Extra Descriptions
											</Header>
											{this.state.object.extra_descr_data.map((extra, i) => (
												<Form.Group key={i}>
													<Form.Input fluid name="keywords" value={this.state.object.extra_descr_data[i].keywords} label="Keywords" placeholder="keyword" onChange={this.handleExtrasChange(i, "keywords")} />
													<Form.TextArea rows={1} name="description" label="Description" placeholder="What shows up when someone looks at the keyword?" value={this.state.object.extra_descr_data[i].description} onChange={this.handleExtrasChange(i, "description")} />
												</Form.Group>
											))}
										</Container>
										
										<Container>
											<Header as="h3">
												<Button onClick={this.addNewAffects}><Icon name="plus circle" />Add New</Button> 
												Affects
											</Header>
											{this.state.object.affect_data.map((extra, i) => (
												<Form.Group key={i}>
													<Form.Field>
														<label>Attribute</label>
														<Dropdown name="location" fluid selection options={config.object.affects} value={this.state.object.affect_data[i].location} onChange={this.handleAffectsChange(i, "location")} />
													</Form.Field>
													<Form.Input fluid name="modifier" value={this.state.object.affect_data[i].modifier} label="Amount" placeholder="0" onChange={this.handleExtrasChange(i, "modifier")} />
												</Form.Group>
											))}
										</Container>
										
										<Form.Button onClick={this.handleSubmit} content={this.state.niceName} />
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
    return {};
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Objects));