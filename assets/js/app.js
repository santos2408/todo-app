const dateTitleContainer = document.querySelector('[data-js="weekday"]')
const monthNameContainer = document.querySelector('[data-js="month-name"]')
const totalTasks = document.querySelector('[data-total-tasks="total-tasks"]')
const todosContainer = document.querySelector('[data-todo="todos-container"]')
const inputAddTodo = document.querySelector('[data-form-add="form-add"]')
const inputSearchTodo = document.querySelector('[data-form-search="form-search"]')

const span = document.createElement('span')

const setTodosIntoLocalStorage = () => {
   const todos = Array.from(todosContainer.children)
   const todosToObjects = todos.map(todo => ({ todo: todo.innerText }))
   const todosToJSON = JSON.stringify(todosToObjects)

   localStorage.setItem('todos', todosToJSON)
}

const getTodosIntoLocaleStorage = () => {
   const todosFromLocalStorage = localStorage.getItem('todos')
   const todos = JSON.parse(todosFromLocalStorage)
   
   todos.forEach(({ todo }) => {
      todosContainer.innerHTML += `
         <li class="todo__item" data-todo="${todo}">
            <span>${todo}</span>
            <i class="ri-delete-bin-line delete__icon" data-todo-delete="${todo}"></i>
         </li>`
   })
}

const getDate = () => {
   const present = new Date()
   const monthDay = `${present.getDate()}th`
   const weekday = present.toLocaleDateString('en-US', { weekday: 'long' })
   const monthName = present.toLocaleDateString('en-US', { month: 'long' })

   return [monthDay, weekday, monthName]
}

const updatePresentDate = () => {
   const [ monthDay, weekday, monthName ] = getDate()

   dateTitleContainer.textContent = `${weekday}, `
   monthNameContainer.textContent = monthName

   span.setAttribute('class', 'span-title')
   span.textContent = monthDay
   dateTitleContainer.insertAdjacentElement('beforeend', span)
}

const updateTotalTasks = () => {
   let tasksAmount = todosContainer.children.length
   totalTasks.textContent = `${tasksAmount} Tasks`
}

const addTodo = event => {
   event.preventDefault()

   const inputValue = event.target.add.value.trim()
   
   if (inputValue.length) {
      todosContainer.innerHTML += `
         <li class="todo__item" data-todo="${inputValue}">
            <span>${inputValue}</span>
            <i class="ri-delete-bin-line delete__icon" data-todo-delete="${inputValue}"></i>
         </li>`
         
      setTodosIntoLocalStorage()
      updateTotalTasks()
      event.target.reset()
   }
}

const searchTodo = event => {
   const inputValue = event.target.value.toLowerCase().trim()
   const todoChildren = Array.from(todosContainer.children)
   
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

const removeTodo = event => {
   const deleteIconDataset = event.target.dataset.todoDelete
   const todoElement = document.querySelector(`[data-todo="${deleteIconDataset}"]`)

   if (deleteIconDataset) {
      todoElement.remove()
      setTodosIntoLocalStorage()
      updateTotalTasks()
   }
}

inputAddTodo.addEventListener('submit', addTodo)
inputSearchTodo.addEventListener('input', searchTodo)
todosContainer.addEventListener('click', removeTodo)

getTodosIntoLocaleStorage()
updatePresentDate()
updateTotalTasks()
