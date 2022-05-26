const dateTitleContainer = document.querySelector('[data-js="weekday"]')
const monthNameContainer = document.querySelector('[data-js="month-name"]')
const totalTasks = document.querySelector('[data-total-tasks="total-tasks"]')
const todosContainer = document.querySelector('[data-todo="todos-container"]')
const inputAddTodo = document.querySelector('[data-form-add="form-add"]')
const inputSearchTodo = document.querySelector('[data-form-search="form-search"]')

const span = document.createElement('span')

const updatePresentDate = () => {
   const present = new Date()
   const weekday = present.toLocaleDateString('en-US', { weekday: 'long' })
   const monthDay = `${present.getDate()}th`
   const monthName = present.toLocaleDateString('en-US', { month: 'long' })

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
      updateTotalTasks()
   }
}

inputAddTodo.addEventListener('submit', addTodo)
inputSearchTodo.addEventListener('input', searchTodo)
todosContainer.addEventListener('click', removeTodo)

updatePresentDate()
updateTotalTasks()
