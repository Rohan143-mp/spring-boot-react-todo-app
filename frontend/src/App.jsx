import { useEffect, useState } from 'react'
import { getTodos, createTodo, updateTodo, deleteTodo } from './api'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadTodos = async () => {
    try {
      setLoading(true)
      const data = await getTodos()
      setTodos(data)
      setError(null)
    } catch (err) {
      setError('Could not reach the backend. Is it running on port 8080?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTodos()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const newTodo = await createTodo(title.trim())
    setTodos((prev) => [...prev, newTodo])
    setTitle('')
  }

  const handleToggle = async (todo) => {
    const updated = await updateTodo(todo.id, { ...todo, completed: !todo.completed })
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
  }

  const handleDelete = async (id) => {
    await deleteTodo(id)
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="app">
      <h1>Todo App</h1>
      <p className="subtitle">Spring Boot + React</p>

      <form onSubmit={handleAdd} className="add-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
              />
              <span>{todo.title}</span>
            </label>
            <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      {!loading && !error && todos.length === 0 && <p>No todos yet. Add one above!</p>}
    </div>
  )
}

export default App
