import Task from "data/Task";
type Props = {
  task: Task;
};

const TaskView = ({ task }: Props) => {
  const { title, description } = task;
  return (
    <section>
      <h1>{title}</h1>
      <style jsx>{`
        section {
          @apply h-full w-full;
        }
      `}</style>
    </section>
  );
};

export default TaskView;
