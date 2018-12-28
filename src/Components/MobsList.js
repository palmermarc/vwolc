import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, List, Icon } from 'semantic-ui-react';

class MobsList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            mobs: [{
                "vnum":	1,
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
            }],
        };

        this.getMobs = this.getMobs.bind(this);
    }

    componentDidMount() {
        // Call API
        this.getMobs();
    }

    getMobs() {
        let mobsJson = localStorage.getItem('mobs');
        if( mobsJson != null ) {
            this.setState({
                mobs: JSON.parse(mobsJson) || this.state.mobs
            })
        }
    }

    render() {
        return (
            <div id="mobs-list" className="fade-in">
                {this.state.mobs.map((mob) => (
                    <List key={mob.vnum} divided relaxed>
                        <List.Item>
                            <List.Content>
                                <List.Header>({mob.vnum}) {mob.name}</List.Header>
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
)(MobsList));