# 03_TodoList project
## 3.1 STEP
1. 拆分結構
2. 拆分樣式
3. 設計 state 的位置
    - 單一任務 state 要放哪裡?
        - 思考: 有誰要用? -> Header 跟 List 都會用
        - 但 Header 跟 List 兩元件彼此是兄弟關係
        - 所以若把 單一任務 state 放在其中一方，該 state 是無法共享的
        - 因此可以把它放在兩者的父元件 - App 中
4. coding
## 3.2 動態初始列表展示
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
- `List` 接收名為 todosxxx 的 props，並將其遍歷
    `List`
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
## 3.3 `新增「添加一筆任務(todo)」功能`
### `Header`
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
3. GOAL: 將 `Header` 元件中的 input value 塞到 `List` 元件中
    - 思路: `Header(子)` ⮕ `App(父)` ⮕ `List(子)`
    - `Header` (子)元件中使用者輸入的 input value，要影響 `App` (父)元件中維護的 todos 此 state（讓 `App` 元件更新狀態）
        - 子元件 要怎麼和 父元件 溝通？ 涉及到「元件的通信」，參考筆記: 
            https://www.notion.so/React-94e2318f68f4471f87bba28019cfa64b
            1. (父) 通過「props」，傳給(子)一個「函式」
            2. (子) 在適當時機，也就是當(子)元件想傳數據給(父)元件時，就調用該函式
        - `App.jsx`
            1. (父)定義 addTodo function
            ```jsx
            /**
             * addTodo 用於添加一個任務(todo)，接收的參數是欲添加的 todo 物件，並將原 todos 狀態更新
             * @param todo object
             * @returns undefined
             */
            addTodo = (todoObj) => {
                // step1: 獲取原 todos
                const {todos} = this.state;
                // step2: 在既有的 todos 上追加新的 todo
                const newTodos = [todoObj, ...todos];
                // step3: update state
                this.setState({ todos: newTodos });
            }
            ```
            1. (父) 通過「props」，將「函式」傳給(子)`Header`
            ```jsx
            <Header addTodoxxx={this.addTodo} />
            ```
        - `Header`
            1. 再按下 [Enter] 後，添加以下邏輯: 
                ```jsx
                handleKeyUp = (event) => { 
                    ...
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
                ```
            2. 註: 在此使用到 sweetalert2 套件: 
               - 安裝方式: 
                ```
                npm install --save sweetalert2 sweetalert2-react-content
                ```
               - import: 
                ```jsx
                import Swal from 'sweetalert2';
                ```
    - `App` (父)元件將 todos 此 state 傳給 `List` (子)元件遍歷，實現動態更新: 已完成，參考 [## 3.2 動態初始列表展示]
    - 整體邏輯如下: 
      - `App` 存了所有任務state ⮕ 給 `List`
      - `App` 傳給 `Header` 一個函式
      - 該函式接收一個欲新增的 todoObj，當想傳數據給(父)元件 `App` 時，就調用該函式，將原 todos 狀態更新
      - `App` 狀態更新後，就會呼叫 `App` 中的 render() 函式，由於 `List` 是其子元件，故也導致子元件重新渲染，達成按下 [Enter] 後將列表重新渲染的需求

## 3.4 鼠標移入時 更改 <li> 背景色 並 顯示[刪除]按鈕效果
### `Item`
1. 將 <li> 標籤添加css樣式，並綁定鼠標移入移出事件
2. 宣告 並 初始化 state: 
   isMouseEnter: 該 <li> 是否被鼠標指到，用來控制 <li> 之背景色及是否顯示[刪除]按鈕。預設為 false
   ```jsx
   state = { isMouseEnter: false }
   ```
3. 宣告 onMouseEnter 及 onMouseLeave 兩事件的 callback function
   ```jsx
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
    ```
4. [刪除]按鈕添加css樣式，根據 isMouseEnter 狀態決定是否顯示

## 3.5 (孫子)勾選 或 取消勾選 時，同時更新 (祖父)App.jsx 中的 todos 狀態（更精準的講法是 同時更新 todos 狀態中的 done 屬性）
### 分析: 
1. 要將 `Item` (孫子)元件中 <li> 標籤的 checked 屬性 傳給 `App` (祖父)元件，當作其 done 狀態的新值 
2. 思考: 孫子元件 要怎麼和 祖父元件 溝通？ 同子傳父，只是中間多了父，父只當作媒介傳遞函式，不呼叫該函式
### `Item`
1. checkbox 綁定 onChange 事件
2. 宣告 勾選、取消勾選某一個 todo 的 callback function
    ```jsx
    /**
     * 勾選、取消勾選某一個 todo 的 callback function
     * @param {int} id 
     * @returns 
     */
     handleCheck = (id) => {
        return (event) => {
            // console.log(id, event.target.checked);
            // TODO
        }
     }
    ```
### `App.jsx`
1. 宣告 供(孫子)元件 Item 調用的 updateTodo() 
    ```jsx
    /**
     * 供(孫子)元件 Item 調用，傳入某一個 todo 之 id 及其 checkbox 的 checked 屬性值，
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
    ```
2. 將 updateTodo() 先傳給 (子)List ，再傳給 (孫子)Item
    - `App.jsx`
        ```jsx
        <List todosxxx={todos} updateTodoxxx={this.updateTodo} />
        ```
    - `List`
        ```jsx
        <Item key={todo.id} {...todo} updateTodoyyy={updateTodoxxx} />
        ```
    - `Item` 在 handleCheck callback 中呼叫該函式
        ```jsx
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
        ```
3. 如此一來，當某 Item 元件 勾選 或 取消勾選 時，就會調用 handleCheck ，在函式中又會呼叫從 (祖父)App.jsx 傳來的 updateTodoyyy() 來更新 todos 狀態，`App` 狀態更新後，就會呼叫 `App` 中的 render() 函式，由於 `List` 是其子元件，故也導致子元件重新渲染，達成 (孫子)勾選 或 取消勾選 時，同時更新 (祖父)App.jsx 中的 todos 狀態的需求

### 結論: 「狀態」在哪裡，「操作狀態的方法」就宣告在哪裡
