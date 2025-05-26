import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput.jsx"
import TodoList from "./components/TodoList.jsx"

function App() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')
  const [priority, setPriority] = useState('medium')

  // Função para gerar IDs únicos
  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2)

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function handleAddTodos(newTodo) {
    const newTodoItem = {
      id: generateId(), // Adiciona ID único
      text: newTodo,
      completed: false,
      priority: priority,
      createdAt: new Date().toISOString()
    }
    const newTodoList = [...todos, newTodoItem]
    persistData(newTodoList)
    setTodos(newTodoList)
    setTodoValue('')
    setPriority('medium')
  }

  function handleDeleteTodo(id) { // Agora recebe ID ao invés de index
    const newTodoList = todos.filter(todo => todo.id !== id)
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(id) { // Agora recebe ID ao invés de index
    const todoToEdit = todos.find(todo => todo.id === id)
    setTodoValue(todoToEdit.text)
    setPriority(todoToEdit.priority)
    handleDeleteTodo(id)
  }

  function toggleComplete(id) { // Agora recebe ID ao invés de index
    const newTodoList = todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    )
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem('todos'))?.todos || []
    // Garante que todos os itens salvos tenham ID
    const todosWithIds = localTodos.map(todo => ({
      ...todo,
      id: todo.id || generateId() // Gera ID se não existir
    }))
    setTodos(todosWithIds)
  }, [])

  // Função auxiliar para cores
  const getPriorityColor = (priority) => {
    const colors = {
      high: '#cc0000',
      medium: '#ff8c00',
      low: '#fff3a0'
    }
    return colors[priority] || '#e0e0e0'
  }

  const getSortedTodos = () => {
    const priorityWeights = { high: 3, medium: 2, low: 1 }
    return [...todos].sort((a, b) => {
      return priorityWeights[b.priority] - priorityWeights[a.priority]
    })
  }

  return (
    <div style={{ width: '98vw', margin: '20px auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#5f52ef', marginBottom: '2vh', textAlign: 'center' }}>Tarefas Diárias</h1>
      
      <TodoInput 
        todoValue={todoValue} 
        setTodoValue={setTodoValue} 
        handleAddTodos={handleAddTodos} 
        priority={priority}
        setPriority={setPriority}
        getPriorityColor={getPriorityColor}
      />
      
      <TodoList 
        handleEditTodo={handleEditTodo} 
        handleDeleteTodo={handleDeleteTodo} 
        todos={getSortedTodos()}
        toggleComplete={toggleComplete}
        getPriorityColor={getPriorityColor}
      />
    </div>
  )
}

export default App