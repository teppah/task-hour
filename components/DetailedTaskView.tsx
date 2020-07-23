import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import ky from "ky/umd";
import {
  selectSelectedTaskId,
  setSelectedTaskId,
} from "lib/client/redux/slice/taskSlice";
import btnStyles from "styles/modules/Button.module.css";
import containerStyles from "styles/modules/Container.module.css";
import useTask from "lib/client/hooks/use-task";
import Task from "lib/shared/Task";

type PropType = {
  taskId: string;
};

const DetailedTaskView = ({ taskId }: PropType) => {
  const { task: selectedTask, isLoading, isError, mutate } = useTask(taskId);
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

      (async () => {
        mutate(
          {
            // since useTask extracts task from a JSON response,
            // need to imitate the JSON response by wrapping task inside a "task"
            // property
            task: {
              taskId: taskId,
              // if null, mutate with old values
              title: newTitle ? newTitle : title,
              description: newDescription ? newDescription : description,
              isComplete: values.isComplete,
              // make sure to pass ISO string to swr mutate
              startDate: selectedTask.startDate.toISOString(),
              endDate: selectedTask.endDate.toISOString(),
            },
          },
          false
        );
        const body = {
          title: newTitle,
          description: newDescription,
          isComplete: values.isComplete,
        };
        const response = await ky
          .put(`/api/task?taskId=${taskId}`, { json: body })
          .json<{ task: Task }>();
        // maybe should not re-render one extra time due to setting mutate data
        mutate(response);
      })();
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
  const handleDelete = async () => {
    mutate(null, false);
    ky.delete(`/api/task?taskId=${taskId}`);
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
        section {
          @apply p-0;
          @apply rounded-none;
          @apply shadow-none;
        }
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
