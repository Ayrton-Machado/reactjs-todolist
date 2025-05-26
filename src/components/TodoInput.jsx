function TodoInput({ todoValue, setTodoValue, handleAddTodos, priority, setPriority, getPriorityColor }) {
    const handleSubmit = (e) => {
      e.preventDefault()
      if (!todoValue.trim()) return
      handleAddTodos(todoValue)
    }
  
    return (
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
            placeholder="Nova tarefa..."
            style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ 
              backgroundColor: 'transparent',
              padding: '10px',
              border: `2px solid ${getPriorityColor(priority)}`,
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#5f52ef',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add
          </button>
        </div>
      </form>
    )
  }
  
  export default TodoInput