import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid, Button, List, Icon, Segment, Divider, Form, Message, Dropdown, Label } from 'semantic-ui-react';
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
            mobId: 0,
            niceName: "Create Mob",
            objects: [{
                "vnum":	0,
                "name":	"first mob areaname",
                "short_description": "my first mob",
                "long_description":	"This is my first mob. Ain't it perty?",
            }],
            object : {
                vnum:   0,
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

        if( typeof this.props.match.params.areaId !== "undefined" ) {
            this.setState({ objectId: this.props.match.params.objectId, niceName: "Update Object" });
            this.getObject(this.props.match.params.objectId);        }

        document.title = this.state.niceName;
    }

    componentWillReceiveProps () {
        // Call API
        this.getObjects();

        if( typeof this.props.match.params.areaId !== "undefined" ) {
            this.setState({ objectId: this.props.match.params.objectId, niceName: "Update Object" });
            this.getObject(this.props.match.params.objectId);
        }

        document.title = this.state.niceName;
    }

    getObjects() {
        let objectsJson = localStorage.getItem('objects');
        if( objectsJson != null ) {
            this.setState({
                objects: JSON.parse(objectsJson) || this.state.objects
            })
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState(
            prevState => ({
                object: {
                    ...prevState.object,
                    [name]: value
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
            "long_description": "",
            "description":  "",
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
            tx.executeSql("SELECT * FROM objects WHERE area_id = '" + self.state.selectedArea + "' AND vnum = '" + objectId + "'", [], function(tx, rs) {
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
            if( this.state.mobId === 0 ) {
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
            tx.executeSql("INSERT INTO objects (vnum, name, short_description, long_description, description, act, affected_by, alignment, level, exp_level, hitroll, damroll, ac, hp, gold, sex, area_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [self.state.mob.vnum, self.state.mob.name, self.state.mob.short_description, self.state.mob.long_description, self.state.mob.description, self.state.mob.act, self.state.mob.affected_by, self.state.mob.alignment, self.state.mob.level, self.state.mob.exp_level, self.state.mob.hitroll, self.state.mob.damroll, self.state.mob.ac, self.state.mob.hp, self.state.mob.gold, self.state.mob.sex, self.state.selectedArea], function(tx, rs) {
                self.props.history.push("/objects/"+rs.insertId+"/");
            }, function(error) {
                console.log(error);
            });
        });
    }

    updateObject() {

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
                                        <List key={object.vnum} divided relaxed>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header>
                                                        <Link to={"/objects/"+object.vnum+"/"}>({object.vnum}) {object.name}</Link>
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
                                            <Form.Input fluid name="name" label='Name' value={this.state.object.name} placeholder='name' onChange={this.handleChange} />
                                            <Form.Input fluid name="short_description" value={this.state.object.short_description} label='Short Desc' placeholder='Short desc' onChange={this.handleChange} />
                                        </Form.Group>
                                        <Form.Input fluid name="long_description" label='Long Desc' placeholder='' value={this.state.object.long_description} onChange={this.handleChange} />
                                        <Form.TextArea name="description" label='Look' placeholder='The mob looks back at you!' value={this.state.object.description} onChange={this.handleChange} />
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
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Objects));