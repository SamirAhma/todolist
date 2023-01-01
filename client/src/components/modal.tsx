import React, { useState, useReducer } from "react";
import { reducer, initialState } from "../redux/todoSlicer";
import styles from "./Modal.module.css";
import axios from "axios";
import { baseUrl } from "../../lib/constant";
const Modal = ({ setIsOpen, data }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [task, setTask] = useState(data.todo);
  const [completed, setCompleted] = useState(data.completed);
  const [todoData, setTodoData] = useState(data);
  const handleChange = (e: any) => {
    setTask(e.target.value);
  };
  const handleCheck = () => {
    setCompleted(!completed);
  };
  const onDelete = (ab: string) => {
    const deleteTask = async () => {
      try {
        await axios.delete(`${baseUrl}/${ab}`);
        dispatch({
          type: "ON_DUMMY",
        });
        setIsOpen({
          type: "ON_DUMMY",
        });
        setIsOpen({
          type: "OPEN_MODAL",
          payload: { open: false },
        });
      } catch (err) {
        console.log(err);
      }
    };
    deleteTask();
  };
  const handleSubmit = () => {
    const edit = async () => {
      try {
        await axios.put(`${baseUrl}/${data._id}`, {
          todo: task,
          completed: completed,
        });
        setIsOpen({
          type: "ON_DUMMY",
        });
        setIsOpen({
          type: "OPEN_MODAL",
          payload: { open: false },
        });
      } catch (err) {
        console.log(err);
      }
    };
    edit();
  };
  return (
    <>
      <div
        className={styles.darkBG}
        onClick={() =>
          setIsOpen({
            type: "OPEN_MODAL",
            payload: { open: false },
          })
        }
      />

      <div
        className={`${styles.centered} max-w-md p-6 bg-white border border-gray-200 rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700`}
      >
        <button
          className={styles.closeBtn}
          onClick={() =>
            setIsOpen({
              type: "OPEN_MODAL",
              payload: { open: false },
            })
          }
        >
          x
        </button>
        <form className="mb-3 font-normal text-gray-500  w-80 h-40">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-6"
            placeholder={task}
            value={task}
            onChange={handleChange}
            required
          />

          <div className="flex justify-between">
            <div className="flex items-center mb-6">
              <input
                id="checked-checkbox"
                type="checkbox"
                checked={completed}
                onChange={handleCheck}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-50"
              />
              <label
                htmlFor="checked-checkbox"
                className="ml-2 text-sm font-medium text-gray-400 "
              >
                Completed
              </label>
            </div>
            <button
              onClick={handleSubmit}
              type="button"
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-5 py-2.5 "
            >
              Submit
            </button>
          </div>
        </form>{" "}
        <div className="flex justify-center">
          <button onClick={() => onDelete(data._id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              height="18"
              width="18"
            >
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
