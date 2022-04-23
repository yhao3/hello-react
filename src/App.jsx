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
     * addTodo 用於添加一個任務(todo)，接收的參數是欲添加的 todo 物件，並將原 todos 狀態更新
     * @param todo object
     * @returns 
     */
    addTodo = (todoObj) => {
        // step1: 獲取原 todos
        const {todos} = this.state;
        // step2: 在既有的 todos 上追加新的 todo
        const newTodos = [todoObj, ...todos];
        // step3: update state
        this.setState({ todos: newTodos });
    }
    
    render() {
        const {todos} = this.state;
        return(
            <div className="todo-container">
                <div className="todo-wrap">
                <Header addTodoxxx={this.addTodo} />
                <List todosxxx={todos} /> {/* 傳遞 todos */}
                <Footer />
                </div>
            </div>
        )
    }
}