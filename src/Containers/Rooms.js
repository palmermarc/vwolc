import React from 'react';
import {bindActionCreators } from 'redux';
import * as actions from '../_actions/actions.areas';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Segment, Divider, Grid, Form, Message, List, Button, Icon } from 'semantic-ui-react';
import config from '../constants/config';


class Areas extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.config = config;
        
        this.state = {
            errors: [],
            niceName: "Create Room",
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
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.getRooms = this.getRooms.bind(this);
        this.getRoom = this.getRoom.bind(this);
    }

    getAreas() {
        var db = openDatabase(this.config.dbName, this.config.dbVersion, this.config.dbDescription, this.config.dbSize);
        let self = this;
        let Rooms = [];
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM areas LIMIT 10000", [], function(tx, rs) {
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
            this.getArea(this.props.match.params.roomId);
        }

        document.title = this.state.niceName;
    }

    componentWillReceiveProps () {
        this.getRooms();

        if( typeof this.props.match.params.roomId !== "undefined" ) {
            this.setState({ roomId: this.props.match.params.roomId, niceName: "Update Room" });
            this.getArea(this.props.match.params.roomId);
        }

        document.title = this.state.niceName;
    }

    getRoom( roomId ) {
        let self = this;
        var db = openDatabase(config.dbName, config.dbVersion, config.dbDescription, config.dbSize);
        db.transaction(function(tx){
            
            tx.executeSql("SELECT * FROM rooms WHERE id = '" + roomId + "'", [], function(tx, rs) {
                if( rs.rows.length ) {
                    self.setState({ 
                        room: {
                            id: rs.rows[0].id,
                            name: rs.rows[0].name,
                            description: rs.rows[0].description,
                            room_flags: rs.rows[0].room_flags,
                            sector_type: rs.rows[0].sector_type,
                            exits: rs.rows[0].exits,
                            extra_descr_data: rs.rows[0].extra_descr_data,
                            roomtext_data: rs.rows[0].roomtext_data
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
                room: {
                    ...prevState.area,
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

        if( this.state.areaId === 0 ) {
            this.createRoom();
        }
        else 
            this.udpdateRoom();
    }

    createRoom() {
        let self = this;
        var db = openDatabase( this.config.dbName, this.config.dbVersion, this.config.dbDescription, this.config.dbSize);

        db.transaction(function (tx) {
            tx.executeSql("INSERT INTO areas (name, created_by) VALUES (?, ?)", [self.state.area.name, self.state.area.created_by], function(tx, res){
                self.props.history.push("/areas/"+res.insertId+"/");
            }, function(ts, error) {
                console.log(error);
            });
        });
    }

    updateRoom() {
        let self = this;
        var db = openDatabase(this.config.dbName, this.config.dbVersion, this.config.dbDescription, this.config.dbSize);
        db.transaction(function (tx) {
            tx.executeSql("UPDATE areas SET name = ?, created_by = ? WHERE rowid = ?", [self.state.area.name, self.state.area.created_by, self.state.areaId], function(tx, res){
                self.getAreas();
            }, function(ts, error) {
                console.log(error);
            });
        });
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
                                            <List.Item key={"room-"+area.id}>
                                                <List.Content>
                                                    <Link to={"/rooms/" + area.id + "/"}>
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