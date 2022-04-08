const todosContainer = document.querySelector('[data-todo="todos-container"]')
const formAdd = document.querySelector('[data-form-add="form-add"]')
const formSearch = document.querySelector('[data-form-search="form-search"]')

formSearch.addEventListener('input', event => {
   const inputValue = event.target.value.toLowerCase().trim()

   Array.from(todosContainer.children)
      .forEach(todo => {
         if (!todo.textContent.toLowerCase().includes(inputValue)) {
            todo.classList.add('hidden')
            return
         }
         todo.classList.remove('hidden')
      })
})

formAdd.addEventListener('submit', event => {
   event.preventDefault()

   const inputValue = event.target.add.value.trim()

   if (inputValue.length) {
      todosContainer.innerHTML += `
      <li class="todo__item">
         <span>${inputValue}</span>
         <i class="ri-delete-bin-line delete__icon"></i>
      </li>`
      event.target.reset()
   }
})

todosContainer.addEventListener('click', event => {
   const clickedElement = event.target

   if (Array.from(clickedElement.classList).includes('delete__icon')) {
      clickedElement.parentElement.remove()
   }
})