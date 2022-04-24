import React, {Component} from 'react';

import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';

import './App.css';

export default class App extends Component {

    // 新增 state(1): todos 
    state = { todos: [
        {id: '001', name: '吃飯', done: true},
        {id: '002', name: '睡覺', done: true},
        {id: '003', name: '寫code', done: false}
    ] }

    /**
     * addTodo 用於『添加』一個任務(todo)，接收的參數是欲添加的 todo 物件，並將原 todos 狀態更新
     * @param {object} todoObj
     * @returns 
     */
    addTodo = (todoObj) => {
        // step1: 獲取原 todos
        const {todos} = this.state;
        // step2: 在既有的 todos 上追加新的 todo
        const newTodos = [todoObj, ...todos];
        // step3: update state
        this.setState( {todos: newTodos} );
    }

    /**
     * 供(孫子)元件 Item 調用，用於『更新』任務(todo)，傳入某一個 todo 之 id 及其 checkbox 的 checked 屬性值，
     * 並根據參數 id 與 舊todos 中所有 舊todoObj 的 id 比對...
     * 1. 如果匹配成功，就複製該 todoObj，並將其 done 屬性改為 參數(2)checkbox 的 checked 屬性值，最後返回包含這些修改後元素的「新陣列」
     * 2. 如果匹配失敗，就不對 todoObj 做任何操作，最後 map() 返回的新陣列就跟原本一模一樣，
     * 最後將
     * @param {int}     id 
     * @param {boolean} isChecked 
     * @return {Array}  newTodos   [注意: map() 執行結果會返回一個新陣列]
     */
    updateTodo = (id, isChecked) => {
        // step1: 獲取原 todos
        const {todos} = this.state;
        // step2: 配對 並 加工 todoObj。比對新舊 todoObj，
        const newTodos = todos.map((todoObj) => {
            if (todoObj.id === id) {
                return {...todoObj, done: isChecked}; // 注意: todoObj 是 callback 的 return value，map() 則是返回包含這些修改後元素的「新陣列」
            } else {
                return todoObj; // 不對 todoObj 做任何操作
            }
        })
        this.setState( {todos: newTodos} );
    }

    /**
     * 供(孫子)元件 Item 調用，用於『刪除』一個任務(todo)
     * @param {int} id 
     */
    deleteTodo = (id) => {
       // step1: 獲取原 todos
       const {todos} = this.state;
       // step2: 刪除指定id的todo物件
       const newTodos = todos.filter((todoObj) => {
           return todoObj.id !== id;
       })
       // step3: update state
       this.setState( {todos: newTodos} );

    }

    /**
     * 供(子)元件 Footer 調用，用於『全選』或『全不選』所有任務(todo)
     * @param {boolean} isChecked: Footer 調用時要傳入全選框 checked 屬性的值，用來控制「全選」或「全不選」
     */
    checkAllTodo = (isChecked) => {
        // step1: 獲取原 todos
        const {todos} = this.state;
        // step2: 加工數據 - 將所有 todoObj 的 done 屬性都改為 true
        const newTodos = todos.map( (todoObj) => {
            return {...todoObj, done: isChecked};
        } )
        // step3: update state
        this.setState( {todos: newTodos} );
    }

    /**
     * 供(子)元件 Footer 調用，用於『清除所有已完成任務』
     */
    clearAllDone = () => {
        // step1: 獲取原 todos
        const {todos} = this.state;
        // step2: 過濾數據
        const newTodos = todos.filter( (todoObj) => {
            return todoObj.done === false; // 只保留未完成的
        } )
        // step3: update state
        this.setState( {todos: newTodos} );
    }

    
    render() {
        const {todos} = this.state;
        return(
            <div className="todo-container">
                <div className="todo-wrap">
                <Header addTodoxxx={this.addTodo} />
                <List todosxxx={todos} updateTodoxxx={this.updateTodo} deleteTodoxxx={this.deleteTodo} /> {/* 傳遞 todos */}
                <Footer todosxxx={todos} checkAllTodoxxx={this.checkAllTodo} clearAllDonexxx={this.clearAllDone} />
                </div>
            </div>
        )
    }
}