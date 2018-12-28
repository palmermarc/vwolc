import React from 'react';
import {bindActionCreators } from 'redux';
import * as actions from '../_actions/actions.areas';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid } from 'semantic-ui-react';
import AreasList from '../Components/AreasList';
import AreasEdit from '../Components/AreasEdit';

class Areas extends React.Component {

    render() {
        return (
            <div className="wrap fade-in">
                <Grid columns={2} stackable textAlign='center'>
                    <Grid.Row verticalAlign='top'>
                        <Grid.Column>
                            <AreasList />
                        </Grid.Column>
                        <Grid.Column>
                            <AreasEdit />
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
    return {
        actions: bindActionCreators(actions,dispatch)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Areas));