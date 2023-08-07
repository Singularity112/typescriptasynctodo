import { useState } from "react";
import { useAppDispatch } from "./hooks";
import RButton from "./RButton";
import { addTodo } from "./TodoSlice";

const AddTodo: React.FC = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      createTodo();
    }
  };

  const createTodo = () => {
    if (value) {
      setValue("");
      dispatch(addTodo(value));
    }
  };

  return (
    <div>
      <input
        autoFocus
        value={value}
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
      />
      <RButton className="test" onClick={createTodo}>
        add Todo
      </RButton>
    </div>
  );
};

export default AddTodo;
