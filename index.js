const form = document.getElementById("todo-input-form")
const checkbox = document.getElementById("checkbox")
const todo = document.getElementById("todo-input")
const template = document.getElementById("todo-template")
const todolist = document.getElementById('todo-list-section')

const allBtn = document.getElementById("all")
const activeBtn = document.getElementById("active")
const completedBtn = document.getElementById("completed")
const clearBtn = document.getElementById("clear")
let todos = []
if (!localStorage.getItem('todos')) {
    localStorage.setItem('todos', JSON.stringify(todos))
}
else{
    todos = JSON.parse(localStorage.getItem('todos'))
}
renderTodo(todos)

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let todoId = 0
    if (todos.length > 0) {
        todoId = todos[todos.length - 1].id + 1
    }
    todos.push({
        id: todoId,
        todo: todo.value,
        isCompleted: checkbox.checked
    })
    localStorage.setItem('todos', JSON.stringify(todos))

    // console.log(todos);
    checkbox.checked = false;
    todo.value = '';

    renderTodo(todos)
})

function renderTodo(todos) {
    const todoitems = document.querySelectorAll(".todo-item")
    todoitems.forEach(e => e.remove())
    console.table(todos)
    let todosNew = [...todos].reverse()
    todosNew.forEach((e) => {
        const todoItem = document.createElement('div')
        todoItem.classList = ['todo-item input']
        todoItem.id = e.id
        const checkbox = document.createElement("input")
        checkbox.type = 'checkbox'
        checkbox.classList = ['checkbox checkbox1']
        const todoItemText = document.createElement('p')
        todoItemText.className = 'todo-list-item'
        if (e.isCompleted) {
            todoItemText.classList.add("done")
        }
        checkbox.checked = e.isCompleted
        todoItemText.textContent = e.todo
        todoItem.appendChild(checkbox)
        todoItem.appendChild(todoItemText)
        todolist.appendChild(todoItem)
    })
    const checkbox1 = document.querySelectorAll(".checkbox1")

    checkbox1.forEach(e => {
        e.addEventListener('click', () => {
            todos[e.parentElement.id].isCompleted = !todos[e.parentElement.id].isCompleted
            localStorage.setItem('todos', JSON.stringify(todos))
            // console.log(todos[e.parentElement.id])
            renderTodo(todos)

        })
    })

}

allBtn.addEventListener('click', e => {
    renderTodo([...todos])
})
activeBtn.addEventListener('click', e => {
    renderTodo(todos.filter(todo => todo.isCompleted == false))
})
completedBtn.addEventListener('click', e => {
    renderTodo(todos.filter(todo => todo.isCompleted == true))
})
clearBtn.addEventListener('click', e => {
    todos = todos.filter(todo => todo.isCompleted == false)
    renderTodo(todos)
})

