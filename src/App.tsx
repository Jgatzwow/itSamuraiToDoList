import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });


    function removeTask(id: string, tlId: string) {
        setTasks({...tasks, [tlId]: tasks[tlId].filter(t => t.id !== id)})

    }

    function addTask(title: string, tLId: string) {
              let task = {id: v1(), title: title, isDone: false};
              setTasks({...tasks, [tLId]: [task, ...tasks[tLId]]})
    }

    function changeStatus(taskId: string, isDone: boolean, tLId: string) {
        /*      let task = tasks.find(t => t.id === taskId);
              if (task) {
                  task.isDone = isDone;
              }

              setTasks([...tasks]);*/
        setTasks({...tasks, [tLId]: tasks[tLId].map( t => t.id === taskId ? {...t, isDone} : t)})
    }


    function changeFilter(value: FilterValuesType, tLId: string) {
        setTodoLists(todoLists.map(tl => tl.id === tLId ? {...tl, filter: value} : tl))
    }


    return (
        <div className="App">
            {todoLists.map(tl => {
                let tasksForTodolist = tasks[tl.id];
                if (tl.filter === 'active') {
                    tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                }

                return <Todolist key={tl.id}
                                 title={tl.title}
                                 tLId={tl.id}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeStatus}
                                 filter={tl.filter}
                />
            })}

        </div>
    );
}

export default App;
