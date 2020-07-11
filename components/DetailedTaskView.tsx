import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  selectSelectedTaskId,
  setSelectedTaskId,
} from "lib/redux/slice/taskSlice";
import btnStyles from "css/Button.module.css";
import containerStyles from "css/Container.module.css";
import { useState } from "react";
import useTask from "lib/hooks/use-task";

const DetailedTaskView = () => {
  const selectedTaskId = useSelector(selectSelectedTaskId);
  const { task: selectedTask, isLoading, isError, mutate } = useTask(
    selectedTaskId
  );
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: selectedTask?.title,
      description: selectedTask?.description,
      isComplete: selectedTask?.isComplete,
    },
    onSubmit: (values, helper) => {
      const initialValues = formik.initialValues;
      const { title, description } = values;
      const newTitle = title !== initialValues.title ? title : null;
      const newDescription =
        description !== initialValues.description ? description : null;
      // update local, but don't revalidate
      mutate(
        {
          taskId: selectedTaskId,
          title: newTitle,
          description: newDescription,
          isComplete: values.isComplete,
          startDate: selectedTask.startDate,
          endDate: selectedTask.endDate,
        },
        false
      );
      // update
      fetch(`/api/task?taskId=${selectedTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          isComplete: values.isComplete,
        }),
        // then revalidate
      }).then((r) => mutate());
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
  const handleDelete = async () => {
    fetch(`/api/task?taskId=${selectedTaskId}`, {
      method: "DELETE",
    });
    mutate(undefined);
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
        <span>
          <input
            type="checkbox"
            name="isComplete"
            checked={formik.values.isComplete}
            onChange={formik.handleChange}
          />
          <h1>Complete</h1>
        </span>
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
        label {
          @apply flex flex-col items-stretch;
          @apply my-1;
        }
        label > textarea,
        label > input {
          @apply border rounded border-blue-500;
          @apply px-1;
          @apply flex-1;
        }
        span {
          @apply flex flex-row justify-center items-center;
        }
        span > input {
          @apply mx-1;
        }
      `}</style>
    </section>
  );
};
export default DetailedTaskView;
