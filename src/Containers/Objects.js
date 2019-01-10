import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid, Button, List, Icon, Segment, Divider, Form, Message, Dropdown, Label } from 'semantic-ui-react';
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
            object : {
                id:   0,
                name:   "",
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
                affect_data:    [],
                extra_descr_data:   [],
                chpoweron:  "",
                chpoweroff: "",
                chpoweruse: "",
                victpoweron:    "",
                victpoweroff:   "",
                victpoweruse:   "",
                spectype:   0,
                specpower: 0
            },
            extra_flags : [
                {key: "1", text: "Glow", value: "1" },
                {key: "2", text: "Hum", value: "2" },
                {key: "4", text: "Throw", value:"4" },
                {key: "8", text: "Keep", value: "8" },
                {key: "16", text: "Vanish", value: "16" },
                {key: "32", text: "Invis", value: "32" },
                {key: "64", text: "Magic", value:"64" },
                {key: "128", text: "No Drop", value:"128" },
                {key: "256", text: "Bless", value:"256" },
                {key: "512", text: "Anti-Good", value:"512" },
                {key: "1024", text: "Anti-Evil", value:"1024" },
                {key: "2048", text: "Anti-Neutral", value: "2048" },
                {key: "4096", text: "No Remove", value: "4096" },
                {key: "8192", text: "Inventory", value: "8192" },
                {key: "16384", text: "Loyal", value: "16384" },
                {key: "32768", text: "Shadowplane", value: "32768" },
                {key: "65536", text: "Silver", value: "65536" },
                {key: "131072", text: "No Quest Card", value: "131072" },
                {key: "262144", text: "Quest Item", value : "262144" },
                {key: "524288", text: "Clan Iotem", value : "524288" },
                {key: "1048576", text: "Auto Claim", value : "1048576" },
                {key: "2097152", text: "Silent Vanish", value : "2097152" },
            ],
            wear_flags: [
                { key: 1, text : "Take", value : 1 },
                { key: 2, text : "Finger", value : 2 },
                { key: 4, text : "Neck", value : 4 },
                { key: 8, text : "Body", value : 8 },
                { key: 16, text : "Head", value : 16 },
                { key: 32, text : "Legs", value : 32 },
                { key: 64, text : "Feet", value : 64 },
                { key: 128, text: "Hands", value : 128 },
                { key: 256, text : "Arms", value : 256 },
                { key: 512, text : "Shield", value : 512 },
                { key: 1024, text : "About", value : 1024 },
                { key: 2048, text : "Waist", value : 2048 },
                { key: 4096, text : "Wrist", value : 4096 },
                { key: 8192, text : "Wield", value : 8192 },
                { key: 16384, text : "Hold", value : 16384 },
                { key: 32768, text : "Wear Face", value : 32768 },
            ],
            specials: [
                { key : 1, text : "Activate", value : "1" },
                { key : 2, text : "Twist", value : "2" },
                { key : 4, text : "Press", value : "4" },
                { key : 8, text : "Pull", value : "8" },
                { key : 16, text : "Target", value : "16" },
                { key : 32, text : "Spell", value : "32" },
                { key : 64, text : "Transporter", value : "64" },
                { key : 128, text : "Teleporter", value : "128" },
                { key : 256, text : "Delay 1", value : "256" },
                { key : 512, text : "Delay 2", value : "512" },
                { key : 1024, text : "Object", value : "1024" }, 
                { key : 2048, text : "Mobile", value : "2048" },
                { key : 4096, text : "Action", value : "4096" },
                { key : 8192, text : "Morph", value : "8192" },
            ]
        };

        this.getObject = this.getObject.bind(this);
        this.getObjects = this.getObjects.bind(this);
        this.saveObject = this.saveObject.bind(this);
        this.updateObject = this.updateObject.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log(objectId);
        let self = this;
        let object = {
            "vnum": 1,
            "name": "",
            "short_description": "",
            "description": "",
            "act":  0,
            "affected_by": 0,
            "alignment": 0,
            "level": 0,
            "exp_level": 0,
            "hitroll":  0,
            "damroll":  0,
            "ac": 0,
            "hp": 100,
            "gold": 10,
            "sex":  0
        };

        var db = openDatabase(config.dbName, config.dbVersion, config.dbDescription, config.dbSize);
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM objects WHERE area_id = '" + self.props.areas.activeArea + "' AND id = '" + objectId + "'", [], function(tx, rs) {
                if( rs.rows.length ) {
                    object = rs.rows[0];
                    self.setState({object: object});
                }
            }, function(error) {
                console.log(error);
            });
        });
 
        console.log(object);
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
                                        <Button as={Link} to={'/objects/create'} className="view-create-new">
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
                                        <Form onSubmit={this.handleSubmit}>
                                            <Form.Group widths='equal'>
                                                <Form.Input fluid name="name" label="Name" value={this.state.object.name} placeholder='name' onChange={this.handleChange} />
                                                <Form.Input fluid name="short_description" value={this.state.object.short_description} label='Short Desc' placeholder='Short desc' onChange={this.handleChange} />
                                            </Form.Group>
                                            <Form.Input fluid name="description" label="Long Desc" placeholder="Long Description" value={this.state.object.description} onChange={this.handleChange} />
                                            <Form.Group>
                                                <Label>Extra Flags</Label>
                                                <Dropdown label='Extra Flags' name="extra_flags" fluid multiple selection options={this.state.extra_flags} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Label>Wear Flags</Label>
                                                <Dropdown name="wear_flags" fluid multiple selection options={this.state.wear_flags} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Label>Specials</Label>
                                                <Dropdown name="specials" fluid multiple selection options={this.state.specials} />
                                            </Form.Group>
                                            <Form.Button content={this.state.niceName} />
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