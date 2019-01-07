import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Logo from '../assets/images/Logo.svg';
import '../assets/css/Sidebar.css';

class Sidebar extends Component {

    constructor(props, context) {
        super(props, context);
        
        var selectedArea = localStorage.getItem('selectedArea');
        if (selectedArea === null) { selectedArea = 0; }

        this.state = {
            opened: true,
            selectedArea: selectedArea
        };
    }

    render() {
        return (
            <div className="Sidebar">
                <header className="App-header">
                    <Image src={Logo} alt="The Death of Cain: Online Area Builder" title="The Death of Cain: Online Area Builder" />
                    <nav>
                        <Menu text vertical>
                            <Menu.Item as={Link} to='/areas/'>Areas</Menu.Item>
                            {this.state.selectedArea !== 0 && 
                            <span>
                            <Menu.Item as={Link} to='/rooms/'>Rooms</Menu.Item>
                            <Menu.Item as={Link} to='/mobs/'>Mobs</Menu.Item>
                            <Menu.Item as={Link} to='/objects/'>Objects</Menu.Item>
                            </span>
                            }
                        </Menu>
                    </nav>
                </header>
            </div>
        );
    }
}

export default Sidebar;