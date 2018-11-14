import React, {Component} from 'react';

export default class ListItem extends Component {
  render (){
    return (
      <li className='listitem' tabIndex="0" 
        onClick= {() => this.props.handleListItemClick(this.props)}>
        {this.props.name}
        <img src={this.props.categories[0].icon.prefix+"32"+this.props.categories[0].icon.suffix}
        alt={this.props.categories[0].name} />
      </li>

    )
  }
}
