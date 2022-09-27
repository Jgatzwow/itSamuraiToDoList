import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar";
import { Container, Grid, Paper } from "@mui/material";

export type ObjectType = {
  title: string;
  filter: FilterValuesType;
  tasks: Array<TasksType>;
  students: Array<string>;
};
export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  // let todolistId1 = v1();
  // let todolistId2 = v1();
  //
  // let [todolists, setTodolists] = useState<Array<TodolistType>>([
  //     {id: todolistId1, title: "What to learn", filter: "all"},
  //     {id: todolistId2, title: "What to buy", filter: "all"}
  // ])
  //
  // let [tasks, setTasks] = useState<TasksStateType>({
  //     [todolistId1]: [
  //         {id: v1(), title: "HTML&CSS", isDone: true},
  //         {id: v1(), title: "JS", isDone: true}
  //     ],
  //     [todolistId2]: [
  //         {id: v1(), title: "Milk", isDone: true},
  //         {id: v1(), title: "React Book", isDone: true}
  //     ]
  // });

  const [todo, setTodo] = useState<Array<ObjectType>>([
    {
      title: "What to learn",
      filter: "all",
      tasks: [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
      ],
      students: [
        "Rick Kane",
        "Finnlay Bentley",
        "Samia North",
        "Isaac Morton",
        "Lily-Ann Clifford",
        "Thalia Park",
        "Sapphire Cruz",
        "Cieran Vazquez",
        "Anya Estes",
        "Dominika Field",
        "Rosanna Chung",
        "Safiyah Davey",
        "Ryley Beasley",
        "Kalvin Trejo",
        "Evie-Mae Farrell",
        "Juliet Valencia",
        "Astrid Austin",
        "Lyle Montgomery",
        "Nisha Mora",
        "Kylie Callaghan",
        "Star Wilks",
        "Marissa Colley",
        "Asa Fuller",
        "Leigh Kemp",
        "Avleen Dawson",
        "Sammy Bonilla",
        "Acacia Becker",
        "Coral Shepherd",
        "Melina Molina",
        "Kiran Bailey",
        "Clara Escobar",
        "Alexandru Horn",
        "Brandon-Lee Mercado",
        "Elouise Weston",
        "King Long",
        "Kerri Searle",
        "Kanye Hamer",
        "Elwood Benitez",
        "Mikail Whitaker",
        "Bobby Hardy",
        "Talha Ferry",
        "Priscilla Landry",
        "Olivia-Grace Cain",
        "Kiaan Wallace",
        "Wesley Padilla90",
        "Ella-Grace Wooten91",
        "Kaif Molloy92",
        "Kamal Broadhurst93",
        "Bianca Ferrell94",
        "Micheal Talbot95",
      ],
    },
    {
      title: "What to do",
      filter: "all",
      tasks: [
        { id: v1(), title: "HTML&CSS2", isDone: true },
        { id: v1(), title: "JS2", isDone: true },
      ],
      students: [
        "Jago Wormald1",
        "Saul Milne2",
        "Aariz Hester3",
        "Dion Reeve4",
        "Anisa Ortega5",
        "Blade Cisneros6",
        "Malaikah Phelps7",
        "Zeeshan Gallagher8",
        "Isobella Vo9",
        "Rizwan Mathis10",
        "Menaal Leach11",
        "Kian Walton12",
        "Orion Lamb13",
        "Faizah Huynh14",
        "Crystal Vaughan15",
        "Vivien Hickman16",
        "Stuart Lu17",
        "Karol Davison18",
        "Dario Burns19",
        "Chloe Rich20",
        "Martyna Felix",
        "Nida Glass",
        "Maeve Miles",
        "Hasnain Puckett",
        "Ayman Cano",
        "Safwan Perry",
        "Fox Kelly",
        "Louise Barlow",
        "Malaki Mcgill",
        "Leanna Cline",
        "Willard Hodge",
        "Amelia Dorsey",
        "Kiah Porter",
        "Jeanne Daly",
        "Mohsin Armstrong",
        "Laurie Rangel",
        "Princess Tierney",
        "Kasim Kendall",
        "Darryl Cope",
        "Elysha Ray",
        "Liyana Harris",
        "Kashif Blackburn",
        "Atif Zimmerman",
        "Sila Hartley",
        "Ralphie Hebert",
      ],
    },
  ]);

  function removeTask(id: string, todolistId: number) {
    setTodo(
      todo.map((tdl, index) =>
        index === todolistId
          ? { ...tdl, tasks: tdl.tasks.filter((t) => t.id !== id) }
          : tdl
      )
    );
  }

  function addTask(todolistId: number, title: string) {
    let task = { id: v1(), title: title, isDone: false };
    setTodo(
      todo.map((tdl, idx) =>
        idx === todolistId ? { ...tdl, tasks: [task, ...tdl.tasks] } : tdl
      )
    );
  }

  function changeStatus(id: string, isDone: boolean, todolistId: number) {
    setTodo(
      todo.map((tdl, idx) =>
        idx === todolistId
          ? {
              ...tdl,
              tasks: tdl.tasks.map((t) => (t.id === id ? { ...t, isDone } : t)),
            }
          : tdl
      )
    );
  }

  function changeFilter(value: FilterValuesType, todolistId: number) {
    setTodo(
      todo.map((tdl, idx) =>
        idx === todolistId ? { ...tdl, filter: value } : tdl
      )
    );
  }

  function removeTodolist(id: number) {
    setTodo(todo.filter((tdl, idx) => idx !== id));
  }

  const changeTaskTitle = (id: string, newTitle: string, tlId: number) => {
    setTodo(
      todo.map((tdl, idx) =>
        idx === tlId
          ? {
              ...tdl,
              tasks: tdl.tasks.map((t) =>
                t.id === id ? { ...t, title: newTitle } : t
              ),
            }
          : tdl
      )
    );
  };
  const addTodoList = (newTitle: string) => {
    const newTodo: ObjectType = {
      title: newTitle,
      filter: "all",
      tasks: [],
      students: [],
    };
    setTodo([newTodo, ...todo]);
  };

  const changeTLTitle = (tlId: number, newTitle: string) => {
    setTodo(
      todo.map((tdl, idx) => (idx === tlId ? { ...tdl, title: newTitle } : tdl))
    );
  };
  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm callback={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todo.map((tl, index) => {
            let allTodolistTasks = tl.tasks;

            let tasksForTodolist = allTodolistTasks;

            if (tl.filter === "active") {
              tasksForTodolist = allTodolistTasks.filter((t) => !t.isDone);
            }
            if (tl.filter === "completed") {
              tasksForTodolist = allTodolistTasks.filter((t) => t.isDone);
            }

            return (
              <Grid item>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    key={index}
                    id={index}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTLTitle={changeTLTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
