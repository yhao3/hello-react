import React, { Component } from 'react'
import Item from '../Item'
import './index.css'

export default class List extends Component {
  render() {
    // 從 props 取東西，解構 todos
    const {todos} = this.props;
    return (
        <ul className="todo-main">
          {
            todos.map((todo) => {
              // return <Item key={todo.id} id={todo.id} name="todo.name" done="todo.done" />;
              return <Item key={todo.id} {...todo} />;
              
            })
          }
        </ul>
    )
  }
}
