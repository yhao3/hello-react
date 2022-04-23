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
    
    render() {
        const {todos} = this.state;
        return(
            <div className="todo-container">
                <div className="todo-wrap">
                <Header />
                <List todos={todos} /> {/* 傳遞 todos */}
                <Footer />
                </div>
            </div>
        )
    }
}