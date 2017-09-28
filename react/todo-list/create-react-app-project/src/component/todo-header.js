import React from 'react';

class TodoHeader extends React.Component {
  addTodoHandle (ev) {
    if(ev.keyCode !== 13) return;
    this.props.addTodoHandleParent(ev.target.value);
    ev.target.value = '';
  }
  render () {
    return <header className="header" >
              <h1>todos</h1>
              <input className="new-todo" placeholder="请输入内容" onKeyDown={this.addTodoHandle.bind(this)}  />
          </header>
  }
}


export default TodoHeader;