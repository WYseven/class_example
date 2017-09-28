import React from 'react';
import TodoHeader from './component/todo-header.js'
import TodoContent from './component/todo-content.js'
import TodoFooter from './component/todo-footer.js'



class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: this.props.list
    }
  }
  addTodoHandleParent(value){
    let arr = this.props.list;
    arr.push({
      id: Date.now(),
      title: value,
      selected: false
    })

    this.setState({
      list: arr
    })
  }

  toggleChecked (id) {
    let arr = this.props.list;
    let item = arr.filter((item) => {
      return item.id == id
    })
    item[0].selected = !item[0].selected;
    this.setState({
      list: arr
    }) 
  }

  toggleAll(bl){
    let arr = this.props.list;
    arr.forEach((item) => {
      item.selected = bl
    })
    this.setState({
      list: arr
    })
  }

  render () {

    let list = this.props.list,content,footer;

    // 是否全部选中
    let n = 0;

    n = list.reduce((n,item) => {
      return item.selected ? ++n : n;
    },n)
    

    if(list.length){
      content = <TodoContent 
                  list={list} 
                  toggleChecked={this.toggleChecked.bind(this)}
                  isCheckedAll = {n === list.length}
                  toggleAll={this.toggleAll.bind(this)}
                />;
      footer = <TodoFooter />
    }

    return <section className="todoapp">
            <TodoHeader addTodoHandleParent={this.addTodoHandleParent.bind(this)} />
            { content }
            { footer }
          </section>
  }
}


export default App;