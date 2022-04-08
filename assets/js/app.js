const todosContainer = document.querySelector('[data-todo="todos-container"]')
const inputAddTodo = document.querySelector('[data-form-add="form-add"]')
const inputSearchTodo = document.querySelector('[data-form-search="form-search"]')
const totalTasks = document.querySelector('[data-total-tasks="total-tasks"]')

const updateTotalTasks = () => {
   let tasksAmount = todosContainer.children.length
   totalTasks.textContent = `${tasksAmount} Tasks`
}
updateTotalTasks()

const addTodo = event => {
   event.preventDefault()

   const inputValue = event.target.add.value.trim()

   if (inputValue.length) {
      todosContainer.innerHTML += `
         <li class="todo__item" data-todo="${inputValue}">
            <span>${inputValue}</span>
            <i class="ri-delete-bin-line delete__icon" data-todo-delete="${inputValue}"></i>
         </li>`

      updateTotalTasks()
      event.target.reset()
   }
}

const filterTodo = (todoChildren, inputValue) => {
   todoChildren
      .filter(todo => !todo.textContent.toLowerCase().includes(inputValue))
      .forEach(todo => {
         todo.classList.add('hidden')
      })

   todoChildren
      .filter(todo => todo.textContent.toLowerCase().includes(inputValue))
      .forEach(todo => {
         todo.classList.remove('hidden')
   })
}

const searchTodo = event => {
   const inputValue = event.target.value.toLowerCase().trim()
   const todoChildren = Array.from(todosContainer.children)
   
   filterTodo(todoChildren, inputValue)
}

const removeTodo = event => {
   const deleteIconDataset = event.target.dataset.todoDelete
   const todoElement = document.querySelector(`[data-todo="${deleteIconDataset}"]`)

   if (deleteIconDataset) {
      todoElement.remove()
      updateTotalTasks()
   }
}

inputAddTodo.addEventListener('submit', addTodo)
inputSearchTodo.addEventListener('input', searchTodo)
todosContainer.addEventListener('click', removeTodo)