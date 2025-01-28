import { useEffect, useState } from "react";
import { NewTask } from "../../../../wailsjs/go/tracker/Tasks.js"
import { GetTasks } from "../../../../wailsjs/go/tracker/Tasks.js"
import { UpdateTasks } from "../../../../wailsjs/go/tracker/Tasks.js"
import { SaveTasks } from "../../../../wailsjs/go/tracker/Tasks.js"
import { DeleteTasks } from "../../../../wailsjs/go/tracker/Tasks.js"

type propsTaskTracker = {};

interface Todo {
  Id: number;
  Description: string;
  Status: boolean;
  priorityValue: number;
}

export default function TaskTracker() {
  const [val, setVal] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    GetTodo();
  }, []);

  const addTodo = () => {
    NewTask(input, 1).then((res: string) => {
      const parsedRes = JSON.parse(res);
      setVal(parsedRes.todos);
    });
    setInput("");
  };

  const GetTodo = () => {
    GetTasks().then((res: string) => {
      const parsedRes = JSON.parse(res);
      setVal(parsedRes.todos || []);
    });
  };

  const UpdateTodoStatus = (id: number, status: boolean, priority: number) => {
    UpdateTasks(id, status, priority).then((res: string) => {
      const parsedRes = JSON.parse(res);
      setVal(parsedRes.todos);
    });
  };

  const DeleteTodoJS = (id: number) => {
    DeleteTasks(id).then((res: string) => {
      const parsedRes = JSON.parse(res);
      setVal(parsedRes.todos);
    });
  };

  const SaveTodosToFile = () => {
    SaveTasks();
  };

  //kush : TODO: fix ui 
  return (
    <main>
      <div className="pt-11 flex justify-evenly ">
        <input
          className="text-black"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addTodo}
        >
          Add
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={SaveTodosToFile}
        >
          Save
        </button>
      </div>
      <div>
        <ul>
          <p>Task , status, priority</p>
          <div className="flex items-center flex-col">
            {val.map((todo) => (
              <li
                key={todo.Id}
                className="flex justify-around w-4/5 border-2 border-slate-500 rounded-lg p-4"
              >
                <p>
                  {todo.Description}, Status:{" "}
                  {todo.Status ? "Completed" : "Pending"}, {todo.priorityValue}
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    UpdateTodoStatus(todo.Id, !todo.Status, todo.priorityValue)
                  }
                >
                  Completed
                </button>
                <div className="relative inline-flex">
                  <select
                    value={todo.priorityValue}
                    className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                    onChange={(e) =>
                      UpdateTodoStatus(
                        todo.Id,
                        todo.Status,
                        Number(e.target.value)
                      )
                    }
                  >
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md"
                  onClick={() => DeleteTodoJS(todo.Id)}
                >
                  X
                </button>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </main>
  );
}
