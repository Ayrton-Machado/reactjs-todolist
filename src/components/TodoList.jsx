function TodoList({ todos, handleEditTodo, handleDeleteTodo, toggleComplete, getPriorityColor }) {
    // Função para renderizar cada coluna de prioridade
    const renderPriorityColumn = (priority, label) => {
      const filteredTodos = todos.filter(todo => todo.priority === priority)
  
      return (
        <div key={priority} style={{ 
          flex: 1,
          marginRight: priority !== 'high' ? '15px' : 0,
          minWidth: '250px',
        }}>
          <h3 style={{
            color: getPriorityColor(priority),
            margin: '0 0 15px 0',
            padding: '5px 10px',
            borderRadius: '4px',
            backgroundColor: `${getPriorityColor(priority)}20`,
            display: 'inline-block'
          }}>
            {label} ({filteredTodos.length})
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, minHeight: '100px' }}>
            {filteredTodos.map((todo) => (
              <li
                key={todo.id} // Usando o ID único como key
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  marginBottom: '10px',
                  backgroundColor: todo.completed ? '#f8f9fa' : 'white',
                  opacity: todo.completed ? 0.7 : 1,
                  borderRadius: '4px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderLeft: `5px solid ${getPriorityColor(priority)}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)} // Passando o ID
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#666' : '#333'
                  }}>
                    {todo.text}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEditTodo(todo.id)} // Passando o ID
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '0.9em'
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)} // Passando o ID
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '0.9em'
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {filteredTodos.length === 0 && (
            <p style={{ color: '#999', fontStyle: 'italic' }}>Nenhuma tarefa aqui</p>
          )}
        </div>
      )
    }
  
    return (
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        {renderPriorityColumn('low', 'Baixa')}
        {renderPriorityColumn('medium', 'Média')}
        {renderPriorityColumn('high', 'Alta')}
      </div>
    )
  }
  
  export default TodoList