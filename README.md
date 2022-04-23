# TodoList project
## STEP
1. 拆分結構
2. 拆分樣式
3. 設計 state 的位置
    - 單一任務 state 要放哪裡?
        - 思考: 有誰要用? -> Header 跟 List 都會用
        - 但 Header 跟 List 兩元件彼此是兄弟關係
        - 所以若把 單一任務 state 放在其中一方，該 state 是無法共享的
        - 因此可以把它放在兩者的父元件 - App 中
4. coding
## 動態初始列表展示
- 將 todos 該 state 放在 App 元件中
- `App.jsx` 傳入 todos 該 state 給 `List` 子元件當作 props，供其使用
    `App.jsx`
    ```jsx
    // 新增 state(1): todos 
    state = { todos: [
        {id: '001', name: '吃飯', done: true},
        {id: '002', name: '睡覺', done: true},
        {id: '003', name: '寫code', done: false}
    ] }
    ...
    render() {
        const {todos} = this.state;
        return(
            <div className="todo-container">
                <div className="todo-wrap">
                <Header />
                <List todosxxx={todos} /> {/* 傳遞 todos */}
                <Footer />
                </div>
            </div>
        )
    }
    ```
- `List.jsx` 接收名為 todosxxx 的 props，並將其遍歷
    `List.jsx`
    ```jsx
    export default class List extends Component {
        render() {
            // 從 props 取東西，解構 todosxxx
            const {todosxxx} = this.props;
            return (
                <ul className="todo-main">
                {
                    todosxxx.map((todo) => {
                        // return <Item key={todo.id} id={todo.id} name="todo.name" done="todo.done" />;
                        return <Item key={todo.id} {...todo} />;
                    })
                }
                </ul>
            )
        }
    }
    ```
## 新增「添加一筆任務(todo)」功能
### Header.jsx
1. 將input標籤綁定 onKeyUp event
2. 定義事件 callback function: handleKeyUp()
    ```jsx
    handleKeyUp = (event) => { // event 說明: 「綁定節點」跟「想要拿到值的節點」相同 ⮕ 直接傳入 event 物件即可，不需用 Ref
        const {keyCode, target} = event;
        // 使用原生 keyCode 判斷按下的按鍵是否是 [Enter]。  註: Enter's keyCode value = 13
        if (event.keyCode !== 13) {
            return;
        } else {
            // TODO ...
        }
    }
    ```
3. 將 `Header` 元件中的 input value 塞到 `List` 元件中
    - 思路: `Header(子)` ⮕ `App(父)` ⮕ `List(子)`
    - `Header` (子)元件中使用者輸入的 input value，要影響 `App` (父)元件中維護的 todos 此 state（讓 `App` 元件更新狀態）
        - 子元件 要怎麼和 父元件 溝通？ 涉及到「元件的通信」，參考筆記: 
            https://www.notion.so/React-94e2318f68f4471f87bba28019cfa64b
            1. (父) 通過「props」，傳給(子)一個「函式」
            2. (子) 在適當時機，也就是當(子)元件想傳數據給(父)元件時，就調用該函式
        - `App.jsx`
          ```jsx
          
          ```
        - `List.jsx`
    - `App` (父)元件將 todos 此 state 傳給 `List` (子)元件遍歷，實現動態更新