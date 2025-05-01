
import React, { useState, useEffect } from 'react';
import { firestore } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const TaskList = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, 'tasks'));
        const tasksList = snapshot.docs.map(doc => doc.data());
        setTasks(tasksList);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
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

export default TaskList;
