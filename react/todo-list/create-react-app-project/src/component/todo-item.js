import React from 'react';

class TodoItem extends React.Component {
  checkedHandle (ev) {
   this.props.toggleChecked(this.props.id)
  }
  render () {

    let completed = this.props.selected ? 'completed' : '';

    return <li className={completed}>
        <div className="view">
            <input 
              className="toggle" 
              type="checkbox" 
              checked={this.props.selected} 
              onChange={this.checkedHandle.bind(this)}
            />
            <label>{this.props.title}</label>
            <button className="destroy"></button>
        </div>
        <input className="edit" />
    </li>
  }
}


export default TodoItem;