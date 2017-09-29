import React from 'react';
import TodoItem from './todo-item';

class TodoContent extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      isCheckedAll: this.props.isCheckedAll
    }
  }
  toggleChecked (id) {
    this.props.toggleChecked(id);
  }
  checkedAllHandle(ev){
    this.setState({
      isCheckedAll: !this.state.isCheckedAll
    })
    this.props.toggleAll(!this.state.isCheckedAll)

  }
  render () {
    console.log(this.state.isCheckedAll,this.props.isCheckedAll)
    return <section className="main">
              <input 
                className="toggle-all" 
                type="checkbox" 
                checked={this.props.isCheckedAll} 
                onChange= {this.checkedAllHandle.bind(this)}
              />
              <ul className="todo-list">
                  {
                    this.props.list.map((item,index) => {
                      return <TodoItem 
                                key={index} 
                                {...item}
                                toggleChecked={this.toggleChecked.bind(this)} 
                              />
                    })
                  }
              </ul>
          </section>
  }
}


export default TodoContent;