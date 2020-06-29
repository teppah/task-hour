import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  selectSelectedTaskId,
  selectTasks,
  updateTaskIfExist,
  deleteTask,
  setSelectedTaskId,
} from "data/redux/slice/taskSlice";
import btnStyles from "css/Button.module.css";
import containerStyles from "css/Container.module.css";
import { useState } from "react";

const DetailedTaskView = () => {
  const selectedTaskId = useSelector(selectSelectedTaskId);
  const selectedTask = useSelector(selectTasks).find(
    (t) => t.taskId === selectedTaskId
  );
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: selectedTask ? selectedTask.title : "",
      description: selectedTask ? selectedTask.description : "",
    },
    onSubmit: (values, helper) => {
      const initialValues = formik.initialValues;
      const { title, description } = values;
      const newTitle = title !== initialValues.title ? title : null;
      const newDescription =
        description !== initialValues.description ? description : null;
      dispatch(
        updateTaskIfExist({
          taskId: selectedTaskId,
          title: newTitle,
          description: newDescription,
        })
      );
    },
    enableReinitialize: true,
  });
  if (!selectedTask) {
    return (
      <section className={containerStyles.container}>
        <h1>nothing selected</h1>
      </section>
    );
  }
  // assume for now that the task that will be deleted is the selected one
  const handleDelete = () => {
    dispatch(deleteTask(selectedTaskId));
    dispatch(setSelectedTaskId(null));
  };

  return (
    <section className={containerStyles.container}>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Title:{" "}
          <input
            type="text"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Description:{" "}
          <textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          ></textarea>
        </label>
        <button className={btnStyles.btn} type="submit">
          Submit
        </button>
        <button className={btnStyles.btn} onClick={() => formik.resetForm()}>
          Reset
        </button>
        <button className={btnStyles.btn} onClick={handleDelete}>
          Delete
        </button>
      </form>
      <style jsx>{`
        form {
        }
        button {
          @apply m-1;
        }
        textarea,
        input {
          @apply border border-black;
          @apply w-full;
        }
      `}</style>
    </section>
  );
};
export default DetailedTaskView;
