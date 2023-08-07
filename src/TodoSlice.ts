import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodosState = {
  list: Todo[];
  status: string;
  error: string;
};

const initialState: TodosState = {
  list: [],
  status: "idle",
  error: "",
};

export const fetchTodos = createAsyncThunk<
  Todo[],
  void,
  { rejectValue: string }
>("todos/fetchTodos", async (_, { rejectWithValue }) => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );

  if (!response.ok) {
    rejectWithValue("smth went wrong");
  }

  const data = await response.json();

  return data;
});

export const addTodo = createAsyncThunk<Todo, string, { rejectValue: string }>(
  "todos/addTodo",
  async (title, { rejectWithValue }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      rejectWithValue("smth went wrong");
    }

    const data = await response.json();

    return data;
  }
);

export const toggleTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todos/toggleTodo", async (id, { rejectWithValue }) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    method: "PUT",
    body: JSON.stringify({
      id,
    }),
  });

  if (!response.ok) {
    rejectWithValue("smth went wrong");
  }

  return id;
});

export const deleteTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todos/deleteTodo", async (id, { rejectWithValue }) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    method: "DELETE",
    body: JSON.stringify({
      id,
    }),
  });

  if (!response.ok) {
    rejectWithValue("smth went wrong");
  }

  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = "idle";
        state.error = "something went wrong";
      })
      .addCase(addTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "idle";
        state.list.push({
          id: new Date().toISOString(),
          title: action.payload.title,
          completed: false,
        });
      })
      .addCase(toggleTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.status = "idle";

        state.list = state.list.map((item) => {
          if (item.id !== action.payload) return item;

          item = {
            ...item,
            completed: !item.completed,
          };

          return item;
        });
      })
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "idle";

        state.list = state.list.filter((item) => item.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
