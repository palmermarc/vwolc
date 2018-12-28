import React from 'react';
import {bindActionCreators } from 'redux';
import * as actions from '../_actions/actions.areas';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, List, Icon } from 'semantic-ui-react';
import config from '../constants/config';
import OLC from '../core/OLC';

class AreasList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            areas: [{
                id:	1,
                name: "new_area",
                created_by: "author"
            }],
        };

        this.getAreas = this.getAreas.bind(this);
        this.setNewActiveArea = this.setNewActiveArea.bind(this);
    }

    componentDidMount() {
        // Call API
        this.getAreas();
    }

    setNewActiveArea(areaId) {
        this.props.actions.setActiveArea(areaId);
        this.forceUpdate();
        //this.props.history.push("/areas/"+res.insertId+"/");
    }

    getAreas() {
        let self = this;
        var db = openDatabase(config.dbName, config.dbVersion, config.dbDescription, config.dbSize);

        let areas = [];
        db.transaction(function(tx){
            tx.executeSql("CREATE TABLE IF NOT EXISTS areas (name TEXT, created_by TEXT)");

            tx.executeSql("SELECT rowid, name, created_by FROM areas LIMIT 10000", [], function(tx, rs) {
                let areas = [];
                for( var i=0; i<rs.rows.length; i++ ) {
                    areas.push({
                        id: rs.rows[i].rowid,
                        name: rs.rows[i].name,
                        created_by: rs.rows[i].created_by
                    });
                }
                self.setState({areas: areas});
            })
        });
    }

    render() {
        return (
            <div id="mobs-list" className="fade-in">
                {this.state.areas.map((area) => (
                    <List key={area.id} divided relaxed>
                        <Link to={"/areas/" + area.id + "/"} onClick={() => this.setNewActiveArea(area.id)}>
                            <List.Item>
                                <List.Content>
                                    <List.Header>({area.id}) {area.name}</List.Header>
                                    <List.Description>{area.created_by}</List.Description>
                                </List.Content>
                            </List.Item>
                        </Link>
                    </List>
                ))}
                <div id="view-header-section">
                    <Button as={Link} to={'/mobs/create'} className="view-create-new">
                        <Icon name="plus" />
                        Create New
                    </Button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions,dispatch)
    };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AreasList));