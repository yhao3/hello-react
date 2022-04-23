import React, {Component} from 'react';
// import './Hello.css';
// 樣式模組化，存進 hello 物件中
import hello from './Hello.module.css'

export default class Hello extends Component {
    render() {
        return <h2 className={hello.title}>Hello, React!!</h2>
    }
}