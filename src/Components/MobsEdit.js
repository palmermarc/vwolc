import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form, Dropdown, Message } from 'semantic-ui-react';

class MobsEdit extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            errors: [],
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
            ],
            mob: {
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
            },
        };

        this.getMob = this.getMob.bind(this);
    }

    componentDidMount() {
        // Call API
        this.getMob();
    }

    handleChange(e) {
        const { name, value } = e.target;
        
        let errors = [];

        if( name === "ac" && value < 0 ) {
            errors.push({field: "ac", message: "Armor must be a positive number."});
        }
        
        if( name === "ac" && value > 10000 ) {
            errors.push({field: "ac", message: "Armor cannot go higher than 10,000. This gives the mob a 95% damage reduction. Maybe you should make it stance to make it even stronger?"});
        }

        if( name === "hp" && value < 500 ) {
            errors.push({field: "hp", message: "You cannot set the hp value to less than 500." });
        }

        if( name === "hp" && value > 250000 ) {
            errors.push({field: "hp", message: "You cannot set the hp value to more than 250000. Might we suggest increasing the remort level to make it tougher to kill?" });
        }

        if( name === "gender" && (value !== 0 && value !== 1 && value !== 2)) {
            errors.push({ field: "gender", message: "Please select an appropriate gender."});
        }

        if( name === "name" && value.length === 0) {
            errors.push({ field: "name", message: "Name cannot be blank."});
        }

        if( name === "short_description" && value.length === 0) {
            errors.push({ field: "short_description", message: "Short Description cannot be blank."});
        }

        if( name === "long_description" && value.length === 0) {
            errors.push({ field: "long_description", message: "Long Description cannot be blank."});
        }

        if( name === "description" && value.length === 0) {
            errors.push({ field: "description", message: "Description cannot be blank."});
        }

        if( name === "alignment" && ( value > 1000 || value < -1000 ) ) {
            errors.push({ field: "alignment", message: "Alignment must be between 1000 and -1000" });
        }

        if( name === "level" && value <= 0 ) {
            errors.push({field: "level", message: "Mob level must be greater than 0." });
        }

        if( name === "level" && value > 250000 ) {
            errors.push({field: "level", message: "Mob level cannot be greater than 250,000." });
        }

        if( name === "exp_level" && value <= 0 ) {
            errors.push({field: "exp_level", message: "EXP level must be greater than 0." });
        }

        if( name === "exp_level" && value > 250000 ) {
            errors.push({field: "exp_level", message: "EXP level cannot be greater than 250,000." });
        }

        if( name === "hitroll" && value <= 0 ) {
            errors.push({field: "hitroll", message: "Hitroll must be greater than 0." });
        }

        if( name === "hitroll" && value > 7500 ) {
            errors.push({field: "hitroll", message: "Hitroll cannot be greater than 7,500." });
        }

        if( name === "damroll" && value <= 0 ) {
            errors.push({field: "damroll", message: "Damroll must be greater than 0." });
        }

        if( name === "damroll" && value > 7500 ) {
            errors.push({field: "damroll", message: "Damroll cannot be greater than 7,500." });
        }

        this.setState( { errors: errors } );

        if( errors.length > 0 ) {
            return false;
        }
        
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

    getMob() {
        
        
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
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid name="name" label='Name' placeholder='name' />
                        <Form.Input fluid name="short_description" label='Short Desc' placeholder='Short desc' />
                    </Form.Group>
                    <Form.Input fluid name="long_description" label='Long Desc' placeholder='' />
                    <Form.TextArea name="description" label='Look' placeholder='The mob looks back at you!' />
                    <Form.Group widths="equal">
                        <Form.Input fluid name="alignment" label='Alignment' placeholder='0' value={this.state.mob.alignment} onChange={this.handleChange}  />
                        <Form.Input fluid name="level" label='Level' placeholder='0' value={this.state.mob.level} onChange={this.handleChange}  />
                        <Form.Input fluid name="exp_level" label='EXP Level' placeholder='0' value={this.state.mob.exp_level} onChange={this.handleChange}  />
                        <Form.Input fluid name="gold" label='Gold' placeholder='0' value={this.state.mob.gold} onChange={this.handleChange}  />
                        <Form.Select fluid name="sex" label='Gender' options={this.state.genders} placeholder='Gender' />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input fluid name="hp" label='HP' placeholder='0' value={this.state.mob.hp} onChange={this.handleChange}  />
                        <Form.Input fluid name="hitroll" label='Hitroll' placeholder='0' value={this.state.mob.hitroll} onChange={this.handleChange}  />
                        <Form.Input fluid name="damroll" label='Damroll' placeholder='0' value={this.state.mob.damroll} onChange={this.handleChange}  />
                        <Form.Input fluid name="ac" label='Armor' placeholder='0' value={this.state.mob.ac} onChange={this.handleChange}  />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Dropdown label='Affects'placeholder='Affects' name="affected_by" fluid multiple selection options={this.state.affects} />
                    </Form.Group>
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
)(MobsEdit));