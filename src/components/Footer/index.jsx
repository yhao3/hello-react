import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {

  /**
   * 全選的 callback function
   */
  handleCheckAll = (event) => {
    // TODO...
    this.props.checkAllTodoxxx(event.target.checked);
  }

  /**
   * 清除所有已完成任務的 callback function
   */
  handleClearAllDone = () => {
    this.props.clearAllDonexxx();
  }
  
  render() {

    // 從 props 取東西，解構 todosxxx
    const {todosxxx} = this.props;

    // 已完成的個數
    const doneCount = todosxxx.reduce( (preTodo, currentTodo) => {
      if (currentTodo.done === true) {
        return preTodo + 1;
      } else {
        return preTodo;
      }
    }, 0)
    // 總數
    const total = todosxxx.length;

    return (
        <div className="todo-footer">
            <label>

              {/* 若 doneCount === total 且排除 0 等於 0 等狀況時，全選框就要勾起 */}
              {/* 這裡不能使用 defaultChecked ，因為只對第一次有用 */}
              {/* 故只能使用 checked ，但務必要綁定 onChange 事件，避免寫死無法更改的狀況 */}
              <input type="checkbox" onChange={ this.handleCheckAll } checked={doneCount === total && total !== 0 ? true : false} /> 

            </label>
            <span>
              <span>已完成{doneCount}</span> / 全部{total}
            </span>
            <button onClick={ this.handleClearAllDone } className="btn btn-danger">清除已完成任務</button>
        </div>
    )
  }
}
