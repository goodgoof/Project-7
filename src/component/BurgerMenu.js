import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu'
import App from "./src/App.js";

export default class BurgerMenu extends React.Component {
  state ={
    showMenu: true
  }
  toggleOpen =() => {
    let toggleButton =document.getElementById('toggle-button').classList
    let menu =document.getElementById('menu-wrap').classList
      toggleButton.toggle('open');
      menu.toggle('menu-open');

    if(document.body.classList.contains('open'))
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    let switch = this.state.showMenu ? "block" : "hidden";

    return (
      <div>
        <button id="toggle-button" className="toggle-wrapper" onClick={this.toggleOpen}>
           <span className="toggle-button">
             <div className="menu-bar bar-top"></div>
             <div className="menu-bar bar-middle"></div>
             <div className="menu-bar bar-bottom"></div>
          </span>
        </button>

        <div className="menu-wrap" style={display: switch}>
            <div className="menu-sidebar">
                <ul className="menu">
                  <li><a href="#">Los Tacos</a></li>
                    <li><a href="#">Rocco's Tacos</a></li>
                    <li><a href="#">Tacos El Bronco</a></li>
                    <li><a href="#">Otto's Tacos </a></li>
                    <li><a href="#">Times Square Tacos</a></li>
                </ul>
            </div>
        </div>

      </div>
    );
  }
}
