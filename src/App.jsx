// 創建 "外殼" 元件 App
import React, {Component} from 'react';
import Hello from './components/Hello/Hello'

// 「創建」並「導出」 App 元件
// class App extends React.Component {
// import {Component} 後，就可簡寫成: 
// 注意: import {Xxx} 並非「解構」語法，而是 ES6 新的 import 方式，這種語法意味著使用了「分別導出」ex: export class Component {...}
export default class App extends Component {
    render() {
        return(
            <div>
                <Hello />
            </div>
        )
    }
}