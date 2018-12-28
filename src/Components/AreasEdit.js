import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form, Message } from 'semantic-ui-react';
import config from '../constants/config';
import OLC from '../core/OLC';

class AreasEdit extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            errors: [],
            niceName: "Create Area",
            areaId: 0,
            name: "",
            created_by: "",
        };

        this.getArea = this.getArea.bind(this);
        this.createArea = this.createArea.bind(this);
        this.updateArea = this.updateArea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if( typeof this.props.match.params.areaId !== "undefined" ) {
            this.setState({ areaId: this.props.match.params.areaId, niceName: "Update Area" });
            this.getArea(this.props.match.params.areaId);
        }
        this.forceUpdate();
        document.title = this.state.niceName;
    }

    getArea( areaId ) {
        let self = this;
        var db = openDatabase(config.dbName, config.dbVersion, config.dbDescription, config.dbSize);
        db.transaction(function(tx){
            
            tx.executeSql("SELECT * FROM areas WHERE rowid = '" + areaId + "'", [], function(tx, rs) {
                if( rs.rows.length ) {
                    self.setState({
                        name: rs.rows[0].name,
                        created_by: rs.rows[0].created_by
                    });
                }
            }, function(error) {
                console.log(error);
            });
        });
    }

    handleChange(e) {
        const { name, value } = e.target;
        
        this.setState({[name]: value});
        this.setState({unsaved: true});
    }

    handleSubmit = () => {
        let self = this;
        if( this.state.name === "") {
            this.setState({ errors: [{field: "name", message: "You must provide an area name."}] });
        }

        if( this.state.created_by === "") {
            this.setState({ errors: [{field: "created_by", message: "You need to provide a name so we can credit the right person."}] });
        }

        // Don't save anything if there are errors
        if( this.state.errors.length > 0 )
            return false;

        if( this.state.areaId === 0 ) {
            var db = openDatabase( config.dbName, config.dbVersion, config.dbDescription, config.dbSize);

            db.transaction(function (tx) {
                tx.executeSql("INSERT INTO areas (name, created_by) VALUES (?, ?)", [self.state.name, self.state.created_by], function(tx, res){
                    self.props.history.push("/areas/"+res.insertId+"/");
                }, function(ts, error) {
                    console.log(error);
                });
            });
        }
        else 
            this.updateArea();

        //this.props.history.push("/areas/" + areaId + "/");
    }

    createArea() {
        let self = this;
        var db = openDatabase(config.dbName, config.dbVersion, config.dbDescription, config.dbSize);
        db.transaction(function (tx) {
            tx.executeSql("INSERT INTO areas (name, created_by) VALUES (?, ?)", [self.state.name, self.state.created_by], function(tx, res){
                
            }, function(ts, error) {
                console.log(error);
            });
        });
    }

    updateArea() {
        let self = this;
        var db = openDatabase(config.dbName, config.dbVersion, config.dbDescription, config.dbSize);
        db.transaction(function (tx) {
            tx.executeSql("UPDATE areas SET name = ?, created_by = ? WHERE rowid = ?", [self.state.name, self.state.created_by, self.state.areaId], function(tx, res){
                self.props.history.push("/areas/"+self.state.areaId+"/");
            }, function(ts, error) {
                console.log(error);
            });
        });
    }

    render() {
        return (
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
                        <Form.Input fluid name="name" label='Area Name' placeholder='Area Name Here' value={this.state.name} onChange={this.handleChange} />
                        <Form.Input fluid name="created_by" label='Created By' placeholder='Your Name Here' value={this.state.created_by} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Button content={this.state.niceName} />
                </Form>
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
)(AreasEdit));