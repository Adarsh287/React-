import React, { useState, useEffect } from 'react';
import './App.css'; 

const AppLayout: React.FC = () => {
  return (
    <div className="app">
      <header className="header">
        <h1>Welcome to My Website</h1>
      </header>

      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <main className="main-content">
        <h2>Welcome to the site!</h2>
        <p>This is a simple webpage built with Vite and React.</p>
      </main>

      <footer className="footer">
        <p>&copy; 2025 My Website. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const JokeCard: React.FC = () => {
  const [joke, setJoke] = useState<{ setup: string; punchline: string } | null>(null);

  useEffect(() => {
    const fetchJoke = async () => {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await response.json();
      setJoke(data);
    };
    fetchJoke();
  }, []);

  const handleNewJoke = () => {
    fetch('https://official-joke-api.appspot.com/random_joke')
      .then(res => res.json())
      .then(data => setJoke(data));
  };

  return (
    <div className="card">
      <h2>Joke</h2>
      {joke && (
        <div>
          <p><strong>{joke.setup}</strong></p>
          <p>{joke.punchline}</p>
        </div>
      )}
      <button onClick={handleNewJoke}>Get Another Joke</button>
    </div>
  );
};

const CounterApp: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    console.log(`Counter value is: ${counter}`);
  }, [counter]);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>
      <button onClick={() => setCounter(0)}>Reset</button>
    </div>
  );
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const fetchTasks = () => {
      const tasksData = [
        { name: 'Task 1' },
        { name: 'Task 2' },
        { name: 'Task 3' }
      ];
      setTasks(tasksData);
    };
    fetchTasks();
  }, []); 

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<{ name: string }[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, { name: newTask }]);
      setNewTask('');
    }
  };

  const deleteTask = (taskName: string) => {
    setTasks(tasks.filter(task => task.name !== taskName));
  };

  const updateTask = (taskName: string, updatedName: string) => {
    setTasks(tasks.map(task =>
      task.name === taskName ? { ...task, name: updatedName } : task
    ));
  };

  return (
    <div>
      <h1>Task Management</h1>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.name}
            <button onClick={() => updateTask(task.name, 'Updated Task')}>Edit</button>
            <button onClick={() => deleteTask(task.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AppContainer: React.FC = () => {
  return (
    <div>
      <AppLayout />
      <JokeCard />
      <CounterApp />
      <TaskList />
      <TaskManagement />
    </div>
  );
}

export default AppContainer;
