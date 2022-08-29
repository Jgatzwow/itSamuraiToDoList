import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValueType = 'All' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {


    const [tasks1, setTasks1] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])

    const deleteTask = (taskId: string) => {
        setTasks1(tasks1.filter(t => t.id !== taskId))
    }

    const addTask = (taskName: string) => {
        setTasks1([{id: v1(), title: taskName, isDone: false}, ...tasks1])

    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks1}
                deleteTask={deleteTask}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
