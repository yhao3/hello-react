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
