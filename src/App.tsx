import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksType = {
    [key: string] : Array<TaskType>
}

function App() {
    const TODOLIST_ID_1 = v1()
    const TODOLIST_ID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<ToDoListType>>([
        {
            id: TODOLIST_ID_1,
            title: 'What to learn',
            filter: 'all',
        },
        {
            id: TODOLIST_ID_2,
            title: 'What to buy',
            filter: 'all'
        }
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [TODOLIST_ID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [TODOLIST_ID_2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Juice', isDone: true},
            {id: v1(), title: 'Meat', isDone: false},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Drinks', isDone: false},
        ],
    })

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id != id);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = [task, ...todoListTasks]

        setTasks({...tasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId]

        let task = todoListTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks({...tasks});
    }


    function changeFilter(id: string, value: FilterValuesType) {
        let todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }

    }


    return (
        <div className="App">

            {todoLists.map(tl => {
                let allTodoListTasks = tasks[tl.id];
                let tasksForTodoList = allTodoListTasks;
                if (tl.filter === 'active') {
                    tasksForTodoList = allTodoListTasks.filter(t => t.isDone === false);
                }
                if (tl.filter === 'completed') {
                    tasksForTodoList = allTodoListTasks.filter(t => t.isDone === true);
                }

                return (
                    <Todolist key={tl.id}
                              title={tl.title}
                              id={tl.id}
                              tasks={tasksForTodoList}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={tl.filter}
                              removeTodoList={removeTodoList}
                    />
                )
            })}

        </div>
    );
}

export default App;
