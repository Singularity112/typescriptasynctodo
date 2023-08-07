import { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchTodos } from "./TodoSlice";

const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const todos = useAppSelector((state) => state.todos.list);
  const loadingStatus = useAppSelector((state) => state.todos.status);

  return (
    <div>
      {loadingStatus === "loading"
        ? "loading..."
        : todos.map((item) => <TodoItem key={item.id} todo={item} />)}
    </div>
  );
};

export default TodoList;
