import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid } from 'semantic-ui-react';
import MobsList from '../Components/MobsList';
import MobsEdit from '../Components/MobsEdit';


class Mobs extends React.Component {

    render() {
        return (
            <div className="wrap fade-in">
                <Grid columns={2} stackable textAlign='center'>
                    <Grid.Row verticalAlign='top'>
                        <Grid.Column>
                            <MobsList />
                        </Grid.Column>
                        <Grid.Column>
                            <MobsEdit />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
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