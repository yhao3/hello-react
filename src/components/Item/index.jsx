import React, { Component } from 'react'
import './index.css';

export default class Item extends Component {


  // 初始化 state: 
  // isMouseEnter: 該 <li> 是否被鼠標指到，用來控制 <li> 之背景色及是否顯示[刪除]按鈕。預設為 false
  state = { isMouseEnter: false }

  // ======================= callback functions =======================

  /**
   * onMouseEnter 及 onMouseLeave 兩事件的 callback function
   * 1. 當鼠標移入觸發 onMouseEnter 事件，會傳入 true 參數，修改 Item 的 isMouseEnter 狀態，以控制 <li> 之背景色及是否顯示[刪除]按鈕
   * 2. 當鼠標移出觸發 onMouseLeave 事件，會傳入 false 參數，修改 Item 的 isMouseEnter 狀態，以控制 <li> 之背景色及是否顯示[刪除]按鈕
   * @param {boolean} true_or_false 
   * @returns 
   */
  handleMouse = (true_or_false) => {
    // 注意: 因為事件綁定此 callback 函式時有加小括號()，所以回傳值必須為「函式」!!
    // 錯誤的: 
    // this.setState( {isMouseEnter: true_or_false} );
    // 正確的: 
    return () => {
      this.setState( {isMouseEnter: true_or_false} );
    }
  }

  /**
   * 勾選、取消勾選某一個 todo 的 callback function
   * @param {int} id 
   * @returns 
   */
  handleCheck = (id) => {
    return (event) => {
      // console.log(id, event.target.checked);
      // TODO...
      this.props.updateTodoyyy(id, event.target.checked);
    }
  }

  /**
   * 刪除一筆任務(todo)的 callback function
   * @param {int} id 
   */
  handleDelete = (id) => {
    if (window.confirm('確定要刪除嗎？')) {
      this.props.deleteTodoyyy(id);
    }
  }

  render() {
    const {id, name, done} = this.props; // <-- 多了 id，讓下面 handleCheck callback 當作參數
    const {isMouseEnter} = this.state;
    

    return (
        <li style={ {backgroundColor: isMouseEnter ? '#ddd' : 'white'} } onMouseEnter={ this.handleMouse(true) } onMouseLeave={ this.handleMouse(false) } > {/* <-- 添加樣式，並綁定鼠標移入移出事件 */}
            <label>
                {/* <input type="checkbox" checked={done} /> 這樣寫會變成 read-only */}
                <input type="checkbox" defaultChecked={done} onChange={ this.handleCheck(id) } />
                <span>{name}</span>
            </label>

            {/* handleDelete 若加小括號要使用到高階函釋回傳「函式」，這裡不使用 高階函式，改用 Currying Function */}
            {/* <button onClick={ this.handleDelete(id) } className="btn btn-danger" style={ {display: isMouseEnter ? 'block' : 'none'} }>刪除</button> */}
            <button onClick={ () => {this.handleDelete(id)} } className="btn btn-danger" style={ {display: isMouseEnter ? 'block' : 'none'} }>刪除</button>
        </li>
    )
  }
}
