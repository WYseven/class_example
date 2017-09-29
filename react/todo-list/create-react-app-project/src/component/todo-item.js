import React from 'react';

class TodoItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      editing:false,
      editText: this.props.title
    }
  }
  checkedHandle (ev) {
   this.props.toggleChecked(this.props.id)
  }

  edtorTodo () {
    this.setState({
      editing: true
    },()=>{
      this.input.focus();
      this.input.setSelectionRange(this.input.value.length, this.input.value.length);
    })
  }

  editDone(){
    this.setState({
      editing: false
    })
  }

  editingHandle(){

  }

  render () {

    let completed = this.props.selected ? 'completed' : '';
    let editing = this.state.editing ? 'editing' : '';
    let classArr = [completed,editing]

    return <li className={classArr.join(' ')}>
        <div className="view">
            <input 
              className="toggle" 
              type="checkbox" 
              checked={this.props.selected} 
              onChange={this.checkedHandle.bind(this)}
            />
            <label onDoubleClick={this.edtorTodo.bind(this)}>{this.props.title}</label>
            <button className="destroy"></button>
        </div>
        <input 
          className="edit" 
          ref={(input) => {this.input=input}}
          value={this.state.editText}
          onChange = {this.editingHandle.bind(this)}
          onBlur={this.editDone.bind(this)}
        />
    </li>
  }
}


export default TodoItem;