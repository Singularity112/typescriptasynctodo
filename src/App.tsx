import AddTodo from "./AddTodo";
import "./App.css";
import TodoList from "./TodoList";
import { useAppSelector } from "./hooks";

function App() {
  const todos = useAppSelector((state) => state.todos.list);

  return (
    <div className="App">
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
