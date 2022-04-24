import React, { Component } from 'react';
import Swal from 'sweetalert2';
import './index.css';


export default class Header extends Component {



  handleKeyUp = (event) => { // event 說明: 「綁定節點」跟「想要拿到值的節點」相同 ⮕ 直接傳入 event 物件即可，不需用 Ref

    // 解構賦值獲取 keyCode, target
    const {keyCode, target} = event;
    // 使用原生 keyCode 判斷按下的按鍵是否是 [Enter]。  註: Enter's keyCode value = 13
    if (event.keyCode !== 13) {
      return;
    }

    // 錯誤驗證: input value 不得為空
    if (target.value.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: '請輸入文字'
      })
      return;
    }
    // 準備好一個 todo 物件
    const todoObj = {id: Date.now(), name:target.value, done: false};
    // 將欲添加的 todoObj 傳遞給 App
    this.props.addTodoxxx( todoObj );
    console.log(target.value, keyCode);
    // 成功添加後清空輸入欄
    target.value = '';
    Swal.fire({
      icon: 'success',
      title: '任務添加成功',
      timer: 2000
    })
  }

  render() {
    return (
        <div className="todo-header">
            <input onKeyUp={this.handleKeyUp} type="text" placeholder="請輸入你的任務名稱，按下[Enter]確認"/>
        </div>
    )
  }
}
