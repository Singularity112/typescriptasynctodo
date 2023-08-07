import RButton from "./RButton";
import { Todo, deleteTodo, toggleTodo } from "./TodoSlice";
import { useAppDispatch } from "./hooks";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { id, title, completed } = todo;
  const dispatch = useAppDispatch();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleTodo(id))}
      />
      {title}
      <RButton
        onClick={() => {
          dispatch(deleteTodo(id));
        }}
      >
        delete todo
      </RButton>
    </div>
  );
};

export default TodoItem;
