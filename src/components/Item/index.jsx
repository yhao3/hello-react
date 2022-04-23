import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {

  // 初始化 state: 
  // isMouseEnter: 該 <li> 是否被鼠標指到，用來控制 <li> 之背景色及是否顯示[刪除]按鈕。預設為 false
  state = { isMouseEnter: false }

  /**
   * onMouseEnter 及 onMouseLeave 兩事件的 callback function
   * 1. 當鼠標移入觸發 onMouseEnter 事件，會傳入 true 參數，修改 Item 的 isMouseEnter 狀態，以控制 <li> 之背景色及是否顯示[刪除]按鈕
   * 2. 當鼠標移出觸發 onMouseLeave 事件，會傳入 false 參數，修改 Item 的 isMouseEnter 狀態，以控制 <li> 之背景色及是否顯示[刪除]按鈕
   * @param {*} true_or_false 
   * @returns 
   */
  handleMouse = (true_or_false) => {
    return () => {
      this.setState( {isMouseEnter: true_or_false} )
    }
  }

  render() {
    const {name, done} = this.props;
    const {isMouseEnter} = this.state;

    return (
        <li style={ {backgroundColor: isMouseEnter ? '#ddd' : 'white'} } onMouseEnter={ this.handleMouse(true) } onMouseLeave={ this.handleMouse(false) } > {/* <-- 添加樣式，並綁定鼠標移入移出事件 */}
            <label>
                {/* <input type="checkbox" checked={done} /> 這樣寫會變成 read-only */}
                <input type="checkbox" defaultChecked={done} />
                <span>{name}</span>
            </label>
            <button className="btn btn-danger" style={ {display: isMouseEnter ? 'block' : 'none'} }>刪除</button>
        </li>
    )
  }
}
