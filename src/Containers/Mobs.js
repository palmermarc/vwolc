import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid, Button, List, Icon, Segment, Divider, Form, Message, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import config from '../constants/config';

class Mobs extends React.Component {

    constructor(props, context) {
        super(props, context);
        
        var selectedArea = localStorage.getItem('selectedArea');
        if (selectedArea === null) { selectedArea = 0; }

        this.state = {
            selectedArea: selectedArea,
            errors: [],
            mobId: 0,
            niceName: "Create Mob",
            mobs: [{
                "vnum":	0,
                "name":	"first mob areaname",
                "short_description": "my first mob",
                "long_description":	"This is my first mob. Ain't it perty?",
            }],
            mob: {
                "vnum":	0,
                "name":	"",
                "short_description": "",
                "long_description":	"",
                "description":	"",
                "act":	0,
                "affected_by": 0,
                "alignment": 0,
                "level": 0,
                "exp_level": 0,
                "hitroll":	0,
                "damroll":	0,
                "ac": 0,
                "hp": 100,
                "gold":	10,
                "sex":	0
            },
            genders: [
                { key: '0', text: 'Unsullied', value: '0' },
                { key: '1', text: 'Male', value: '1' },
                { key: '2', text: 'Female', value: '2' },
            ],
            affects: [
                { key: "0", text: "Invis", value: "2" },
                { key: "1", text: "Detect Invis", value: "8" },
                { key: "2", text: "Detect Hidden", value: "32" },
                { key: "3", text: "Shadow Plane", value: "64" },
                { key: "4", text: "Sanct", value: "128" },
                { key: "5", text: "Faerie Fire", value: "256" },
                { key: "6", text: "Infravision", value: "512" },
                { key: "7", text: "Prot vs Evil", value: "8192" },
                { key: "8", text: "Sneak", value: "32768" },
                { key: "9", text: "Hide", value: "65536" },
                { key: "10", text: "Flying", value: "524288" },
                { key: "11", text: "Pass Door", value: "1048576" },
                { key: "12", text: "Shadow Sight", value: "4194304" },
            ]
        };

        this.getMob = this.getMob.bind(this);
        this.getMobs = this.getMobs.bind(this);
        this.saveMob = this.saveMob.bind(this);
        this.updateMob = this.updateMob.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // Call API
        this.getMobs();

        if( typeof this.props.match.params.areaId !== "undefined" ) {
            this.setState({ mobId: this.props.match.params.mobId, niceName: "Update Mob" });
            this.getMob(this.props.match.params.mobId);        }

        document.title = this.state.niceName;
    }

    componentWillReceiveProps () {
        // Call API
        this.getMobs();

        if( typeof this.props.match.params.areaId !== "undefined" ) {
            this.setState({ mobId: this.props.match.params.mobId, niceName: "Update Mob" });
            this.getMob(this.props.match.params.mobId);
        }

        document.title = this.state.niceName;
    }

    getMobs() {
        let mobsJson = localStorage.getItem('mobs');
        if( mobsJson != null ) {
            this.setState({
                mobs: JSON.parse(mobsJson) || this.state.mobs
            })
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
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
        console.log(mobId);
        let self = this;
        let mob = {
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
            tx.executeSql("SELECT * FROM mobs WHERE area_id = '" + self.state.selectedArea + "' AND vnum = '" + mobId + "'", [], function(tx, rs) {
                if( rs.rows.length ) {
                    mob = rs.rows[0];
                    self.setState({mob: mob});
                }
            }, function(error) {
                console.log(error);
            });
        });
 
        console.log(mob);
    }

    handleSubmit = () => {
        console.log(this.state.mob);

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
        console.log("Trying to save");
        var db = openDatabase(config.dbName, config.dbVersion, config.dbDescription, config.dbSize);
        db.transaction(function(tx){
            tx.executeSql("INSERT INTO mobs (vnum, name, short_description, long_description, description, act, affected_by, alignment, level, exp_level, hitroll, damroll, ac, hp, gold, sex, area_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [self.state.mob.vnum, self.state.mob.name, self.state.mob.short_description, self.state.mob.long_description, self.state.mob.description, self.state.mob.act, self.state.mob.affected_by, self.state.mob.alignment, self.state.mob.level, self.state.mob.exp_level, self.state.mob.hitroll, self.state.mob.damroll, self.state.mob.ac, self.state.mob.hp, self.state.mob.gold, self.state.mob.sex, self.state.selectedArea], function(tx, rs) {
                self.props.history.push("/mobs/"+rs.insertId+"/");
            }, function(error) {
                console.log(error);
            });
        });
    }

    updateMob() {

    }

    render() {
        return (
            <div className="wrap fade-in">
                <Segment placeholder>
                    <Grid columns={2} stackable textAlign='center'>
                        <Divider vertical></Divider>
                        <Grid.Row verticalAlign='top'>
                            <Grid.Column>
                                <div id="mobs-list" className="fade-in">
                                    {this.state.mobs.map((mob) => (
                                        <List key={mob.vnum} divided relaxed>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header>
                                                        <Link to={"/mobs/"+mob.vnum+"/"}>({mob.vnum}) {mob.name}</Link>
                                                    </List.Header>
                                                    <List.Description>{mob.short_description}</List.Description>
                                                </List.Content>
                                            </List.Item>
                                        </List>
                                    ))}
                                    <div id="view-header-section">
                                        <Button as={Link} to={'/mobs/create'} className="view-create-new">
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
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group widths='equal'>
                                            <Form.Input fluid name="name" label='Name' value={this.state.mob.name} placeholder='name' onChange={this.handleChange} />
                                            <Form.Input fluid name="short_description" value={this.state.mob.short_description} label='Short Desc' placeholder='Short desc' onChange={this.handleChange} />
                                        </Form.Group>
                                        <Form.Input fluid name="long_description" label='Long Desc' placeholder='' value={this.state.mob.long_description} onChange={this.handleChange} />
                                        <Form.TextArea name="description" label='Look' placeholder='The mob looks back at you!' value={this.state.mob.description} onChange={this.handleChange} />
                                        <Form.Group widths="equal">
                                            <Form.Input fluid name="alignment" label='Alignment' placeholder='0' value={this.state.mob.alignment} onChange={this.handleChange}  />
                                            <Form.Input fluid name="level" label='Level' placeholder='0' value={this.state.mob.level} onChange={this.handleChange}  />
                                            <Form.Input fluid name="exp_level" label='EXP Level' placeholder='0' value={this.state.mob.exp_level} onChange={this.handleChange}  />
                                            <Form.Input fluid name="gold" label='Gold' placeholder='0' value={this.state.mob.gold} onChange={this.handleChange}  />
                                            <Form.Select fluid name="sex" label='Gender' options={this.state.genders} placeholder='Gender' onChange={this.handleChange} />
                                        </Form.Group>
                                        <Form.Group widths="equal">
                                            <Form.Input fluid name="hp" label='HP' placeholder='0' value={this.state.mob.hp} onChange={this.handleChange} />
                                            <Form.Input fluid name="hitroll" label='Hitroll' placeholder='0' value={this.state.mob.hitroll} onChange={this.handleChange}  />
                                            <Form.Input fluid name="damroll" label='Damroll' placeholder='0' value={this.state.mob.damroll} onChange={this.handleChange}  />
                                            <Form.Input fluid name="ac" label='Armor' placeholder='0' value={this.state.mob.ac} onChange={this.handleChange}  />
                                        </Form.Group>
                                        <Form.Group widths="equal">
                                            <Dropdown label='Affects'placeholder='Affects' name="affected_by" fluid multiple selection options={this.state.affects} />
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
)(Mobs));