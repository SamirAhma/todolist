import React, { useEffect, useReducer } from "react";
import { reducer, initialState } from "./redux/todoSlicer.js";
import axios from "axios";
import Modal from "./components/modal";
import BackgroundImage from "./assets/sunset.jpg";
import "./App.css";
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const sendData = async () => {
      try {
        await axios.post("http://localhost:5000/api/add", {
          todo: state.todo,
        });
        dispatch({
          type: "ON_CLEAR",
        });
        dispatch({
          type: "ON_DUMMY",
        });
      } catch (err) {
        console.log(err);
      }
    };
    sendData();
  };

  const onDelete = (ab: string) => {
    const deleteTask = async () => {
      try {
        await axios.delete(`http://localhost:5000/api/todo/${ab}`);
        dispatch({
          type: "ON_DUMMY",
        });
      } catch (err) {
        console.log(err);
      }
    };
    deleteTask();
  };

  useEffect(() => {
    const initFetch = async () => {
      try {
        const req = await axios.get("http://localhost:5000/api/");
        console.log(req.data);
        dispatch({
          type: "UPDATE",
          payload: req.data,
        });
      } catch (err) {
        console.log(err);
      }
    };
    initFetch();
  }, [state.dummy]);
  console.log(state);
  return (
    <div
      className="flex justify-center h-screen"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="w-4/5 lg:w-3/5">
        <h1 className="text-3xl	text-neutral-50 mt-10 mb-5">To Do</h1>

        <div className="flex justify-between flex-col body-todo">
          <ul className="">
            {state.todos.map((t: any) => (
              <li
                key={t._id}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-1"
                onClick={() =>
                  dispatch({
                    type: "OPEN_MODAL",
                    payload: { open: true, data: t },
                  })
                }
              >
                <p
                  style={{ textDecoration: t.completed ? "line-through" : "" }}
                >
                  {t.todo}
                </p>

                <div className="">
                  {/* <button
                    onClick={() =>
                      dispatch({
                        type: "OPEN_MODAL",
                        payload: { open: true, data: t },
                      })
                    }
                  >
                    edit
                  </button>
                  <button onClick={() => onDelete(t._id)}>delete</button> */}
                </div>
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit} className="">
            {/* <input
              type="text"
              onChange={(e) => {
                dispatch({ type: "ON_CHANGE", payload: e.target.value });
              }}
              value={state.todo}
            /> */}
            <input
              id="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              type="text"
              placeholder="Add a task"
              onChange={(e) => {
                dispatch({ type: "ON_CHANGE", payload: e.target.value });
              }}
              value={state.todo}
            />
            {/* <input type="submit" value="submit" /> */}
          </form>
        </div>
        {state.modal.open && (
          <Modal setIsOpen={dispatch} data={state.modal.data} />
        )}
      </div>
    </div>
  );
};

export default App;
