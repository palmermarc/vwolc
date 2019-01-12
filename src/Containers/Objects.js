import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid, Button, List, Icon, Segment, Divider, Form, Message, Dropdown, Label, Popup, Input, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import config from '../constants/config';

class Objects extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.config = config;

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
            },
            extra_flags : [
                {key: 1, text: "Glow", value: 1 },
                {key: 2, text: "Hum", value: 2 },
                {key: 3, text: "Throw", value: 4 },
                {key: 4, text: "Keep", value: 8 },
                {key: 5, text: "Vanish", value: 16 },
                {key: 6, text: "Invis", value: 32 },
                {key: 7, text: "Magic", value: 64 },
                {key: 8, text: "No Drop", value: 128 },
                {key: 9, text: "Bless", value: 256 },
                {key: 10, text: "Anti-Good", value: 512 },
                {key: 11, text: "Anti-Evil", value: 1024 },
                {key: 12, text: "Anti-Neutral", value: 2048 },
                {key: 13, text: "No Remove", value: 4096 },
                {key: 14, text: "Inventory", value: 8192 },
                {key: 15, text: "Loyal", value: 16384 },
                {key: 16, text: "Shadowplane", value: 32768 },
                {key: 17, text: "Silver", value: 65536 },
                {key: 18, text: "No Quest Card", value: 131072 },
                {key: 19, text: "Quest Item", value : 262144 },
                {key: 20, text: "Clan Iotem", value : 524288 },
                {key: 21, text: "Auto Claim", value : 1048576 },
                {key: 22, text: "Silent Vanish", value : 2097152 },
            ],
            wear_flags: [
                { key: 1, text : "Take", value : 1 },
                { key: 2, text : "Finger", value : 2 },
                { key: 3, text : "Neck", value : 4 },
                { key: 4, text : "Body", value : 8 },
                { key: 5, text : "Head", value : 16 },
                { key: 6, text : "Legs", value : 32 },
                { key: 7, text : "Feet", value : 64 },
                { key: 8, text: "Hands", value : 128 },
                { key: 9, text : "Arms", value : 256 },
                { key: 10, text : "Shield", value : 512 },
                { key: 11, text : "About", value : 1024 },
                { key: 12, text : "Waist", value : 2048 },
                { key: 13, text : "Wrist", value : 4096 },
                { key: 14, text : "Wield", value : 8192 },
                { key: 15, text : "Hold", value : 16384 },
                { key: 16, text : "Wear Face", value : 32768 },
            ],
            specials: [
                { key : 1, text : "Activate", value : 1 },
                { key : 2, text : "Twist", value : 2 },
                { key : 3, text : "Press", value : 4 },
                { key : 4, text : "Pull", value : 8 },
                { key : 5, text : "Target", value : 16 },
                { key : 6, text : "Spell", value : 32 },
                { key : 7, text : "Transporter", value : 64 },
                { key : 8, text : "Teleporter", value : 128 },
                { key : 9, text : "Delay 1", value : 256 },
                { key : 10, text : "Delay 2", value : 512 },
                { key : 11, text : "Object", value : 1024 }, 
                { key : 12, text : "Mobile", value : 2048 },
                { key : 13, text : "Action", value : 4096 },
                { key : 14, text : "Morph", value : 8192 },
            ],
			affects: [
				{ text: "STR", value: 1, key: 1 },
				{ text: "DEX", value: 2, key: 2 },
				{ text: "INT", value: 3, key: 3 },
				{ text: "WIS", value: 4, key: 4 },
				{ text: "CON", value: 5, key: 5 },
				{ text: "Sex", value: 6, key: 6 },
				{ text: "Mana", value: 12, key: 12 },
				{ text: "Hp", value: 13, key: 13 },
				{ text: "Move", value: 14, key: 14 },
				{ text: "Gold", value: 15, key: 15 },
				{ text: "EXP", value: 16, key: 16 },
				{ text: "Armor", value: 17, key: 17 },
				{ text: "Hitroll", value: 18, key: 18 },
				{ text: "Damroll", value: 19, key: 19 },
				{ text: "SAVING_PARA", value: 20, key: 20 },
				{ text: "SAVING_ROD", value: 21, key: 21 },
				{ text: "SAVING_PETRI", value: 22, key: 22 },
				{ text: "SAVING_BREATH", value: 23, key: 23 },
				{ text: "SAVING_SPELL", value: 24, key: 24 }
			]
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
        var db = openDatabase(this.config.dbName, this.config.dbVersion, this.config.dbDescription, this.config.dbSize);
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

    handleChange(e) {
        const { name, value } = e.target;
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
  
        var db = openDatabase(config.dbName, config.dbVersion, config.dbDescription, config.dbSize);
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
        var db = openDatabase(config.dbName, config.dbVersion, config.dbDescription, config.dbSize);
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
        var db = openDatabase(config.dbName, config.dbVersion, config.dbDescription, config.dbSize);
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
        console.log(this.state);
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
										<Form.Group widths='equal'>
											<Form.Field>
												<label>Namelist <Popup trigger={<Button icon='help circle' />} content="This is the list of names that your object can be found under. If you don't add it here, it won't show up on locate." /></label>
												<Input name="name"  value={this.state.object.name} placeholder='name' onChange={this.handleChange} />
											</Form.Field>
											<Form.Field>
												<label>Short Description <Popup trigger={<Button icon='help circle' />} content="The string that shows in someone's inventory." /></label>
												<Input name="short_description"  value={this.state.object.short_description} placeholder="" onChange={this.handleChange} />
											</Form.Field>
										</Form.Group>
										<Form.Field>
											<label>Description <Popup trigger={<Button icon='help circle' />} content="The string that shows up when an item is on the ground, or you look at it." /></label>
											<Input name="description"  value={this.state.object.description} placeholder="" onChange={this.handleChange} />
										</Form.Field>
										<Form.Field>
											<label>Extra Flags</label>
											<Dropdown label='Extra Flags' name="extra_flags" fluid multiple selection options={this.state.extra_flags} />
										</Form.Field>
										<Form.Field>
											<label>Wear Flags <Popup trigger={<Button icon='help circle' />} content="If you do not select Take as an option, you will not be able to pick this up no matter what other option you select." /></label>
											<Dropdown name="wear_flags" fluid multiple selection options={this.state.wear_flags} />
										</Form.Field>
										<Form.Field>
											<label>Specials</label>
											<Dropdown name="specials" fluid multiple selection options={this.state.specials} />
										</Form.Field>
											
										<Container>
											<Header as="h3">Extra Descriptions</Header>
											{this.state.object.extra_descr_data.map((extra, i) => (
												<Form.Group key={i}>
													<Form.Input fluid name="keywords" value={this.state.object.extra_descr_data[i].keywords} label="Keywords" placeholder="keyword" onChange={this.handleExtrasChange(i, "keywords")} />
													<Form.TextArea rows={1} name="description" label="Description" placeholder="What shows up when someone looks at the keyword?" value={this.state.object.extra_descr_data[i].description} onChange={this.handleExtrasChange(i, "description")} />
												</Form.Group>
											))}
											<Button onClick={this.addNewExtras}>Add Extra Desc</Button>
										</Container>
										
										<Container>
											<Header as="h3">Affects</Header>
											{this.state.object.affect_data.map((extra, i) => (
												<Form.Group key={i}>
													<Form.Field>
														<label>Attribute</label>
														<Dropdown name="location" fluid multiple selection options={this.state.affects} value={this.state.object.affect_data[i].location} onChange={this.handleAffectsChange(i, "location")} />
													</Form.Field>
													<Form.Input fluid name="modifier" value={this.state.object.affect_data[i].modifier} label="Amount" placeholder="0" onChange={this.handleExtrasChange(i, "modifier")} />
												</Form.Group>
											))}
											<Button onClick={this.addNewAffects}>Add Affect</Button>
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