import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu'

export default class BurgerMenu extends React.Component {

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
    return (
      <div>
        <button id="toggle-button" className="toggle-wrapper" onClick={this.props.toggleOpen}>
           <span className="toggle-button">
             <div className="menu-bar bar-top"></div>
             <div className="menu-bar bar-middle"></div>
             <div className="menu-bar bar-bottom"></div>
          </span>
        </button>

        <div className="menu-wrap">
            <div className="menu-sidebar">
                <ul className="menu">
                  <li><a href="#"><i className="material-icons">account_circle</i>Los Tacos</a></li>
                    <li><a href="#"><i className="material-icons">add_shopping_cart</i>Rocco's Tacos</a></li>
                    <li><a href="#"><i className="material-icons">assignment</i>Tacos El Bronco</a></li>
                    <li><a href="#"><i className="material-icons">favorite_border</i>Otto's Tacos </a></li>
                    <li><a href="#"><i className="material-icons">settings</i>Times Square Tacos</a></li>
                </ul>
            </div>
        </div>

      </div>
    );
  }
}
