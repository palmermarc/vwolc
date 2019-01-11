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
                { text: "ROOM_DARK", value: 1, key: 0 },
                { text: "ROOM_SACRED", value: 2, key: 1 },
                { text: "ROOM_NO_MOB", value: 4, key: 2 },
                { text: "ROOM_INDOORS", value: 8, key: 3 },
                { text: "ROOM_QUIET", value: 16, key: 4 },
                { text: "ROOM_NO_SHADOWPLANE", value: 32, key: 5 },
                { text: "ROOM_NO_SPELL", value: 64, key: 6 },
                { text: "ROOM_NO_CLAIMORCALL", value: 128, key: 7 },
                { text: "ROOM_BANK", value: 256, key: 8 },
                { text: "ROOM_PRIVATE", value: 512, key: 9 },
                { text: "ROOM_SAFE", value: 1024, key: 10 },
                { text: "ROOM_SOLITARY", value: 2048, key: 11 },
                { text: "ROOM_NO_RECALL", value: 8192, key: 12 },
                { text: "ROOM_CONE_OF_SILENCE", value: 16384, key: 13 },
                { text: "ROOM_NO_TELEPORT", value: 32768, key: 14 },
                { text: "ROOM_NO_MIST", value: 65536, key: 15 },
                { text: "ROOM_NO_TRANSPORT", value: 131072, key: 16 },
                { text: "ROOM_NO_ESCAPE", value: 262144, key: 17 },
                { text: "ROOM_NO_HOME", value: 524288, key: 18 },
                { text: "ROOM_NO_SUMMON", value: 1048576, key: 19 }
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
            ]
        }

        this.handleChange = this.handleChange.bind(this);
        this.getRooms = this.getRooms.bind(this);
        this.getRoom = this.getRoom.bind(this);
    }

    getRooms() {
        var db = openDatabase(this.config.dbName, this.config.dbVersion, this.config.dbDescription, this.config.dbSize);
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
        var db = openDatabase(config.dbName, config.dbVersion, config.dbDescription, config.dbSize);
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
        var db = openDatabase( this.config.dbName, this.config.dbVersion, this.config.dbDescription, this.config.dbSize);

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
        var db = openDatabase(this.config.dbName, this.config.dbVersion, this.config.dbDescription, this.config.dbSize);
        
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