import { useSelector, useDispatch } from "react-redux";
import { useFormik, FormikContext } from "formik";
import {
  selectSelectedTaskId,
  selectTasks,
  updateTaskIfExist,
} from "data/redux/slice/taskSlice";
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
          id: selectedTaskId,
          title: newTitle,
          description: newDescription,
        })
      );
    },
    enableReinitialize: true,
  });
  if (!selectedTask) {
    return (
      <section>
        <h1>nothing selected</h1>
      </section>
    );
  }

  return (
    <section>
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
        <input type="submit" value="Update" />
      </form>
      <style jsx>{`
        section {
          @apply p-3;
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