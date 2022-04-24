import React, { Component } from 'react'
import Item from '../Item'
import './index.css'

export default class List extends Component {
  render() {
    // 從 props 取東西，解構 todosxxx
    const {todosxxx} = this.props;
    // 從 props 取東西，解構 updateTodoxxx
    const {updateTodoxxx} = this.props;

    return (
        <ul className="todo-main">
          {
            todosxxx.map((todo) => {
              // return <Item key={todo.id} id={todo.id} name="todo.name" done="todo.done" />;
              // 錯誤的: updateTodoxxx 不需要加 this.
              // 正確的: 
              return <Item key={todo.id} {...todo} updateTodoyyy={updateTodoxxx} />;
              
            })
          }
        </ul>
    )
  }
}
