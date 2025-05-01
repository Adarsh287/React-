import React, { useState, useEffect } from 'react';
import './App.css';
import { firestore } from './firebase-config'; // Assuming the correct Firebase config is used

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
  const [tasks, setTasks] = useState<{ name: string; id: string }[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const snapshot = await firestore.collection('tasks').get();
      setTasks(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchTasks();
  }, []); 

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<{ name: string; id: string }[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    const fetchTasks = async () => {
      const snapshot = await firestore.collection('tasks').get();
      setTasks(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask) {
      await firestore.collection('tasks').add({ name: newTask });
      setNewTask('');
    }
  };

  const deleteTask = async (taskId: string) => {
    await firestore.collection('tasks').doc(taskId).delete();
  };

  const updateTask = async (taskId: string, updatedName: string) => {
    await firestore.collection('tasks').doc(taskId).update({ name: updatedName });
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
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}
            <button onClick={() => updateTask(task.id, 'Updated Task')}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
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
