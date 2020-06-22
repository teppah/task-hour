import Head from "next/head";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SummaryView from "components/SummaryView";
import DetailedTaskView from "components/DetailedTaskView";
import CalendarView from "components/CalendarView";
import TaskListView from "components/ListView";
import ButtonArray from "components/ButtonArray";
import PomordoTimer from "components/PomordoTimer";
const Index = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="content">
        <Head>
          <title>Task Hour</title>
        </Head>
        <div className="vertical-bar">
          <div>
            <CalendarView />
          </div>
          <div>
            <TaskListView />
          </div>
        </div>
        <div id="summary">
          <SummaryView />
        </div>
        <div className="vertical-bar">
          <div>
            <ButtonArray />
          </div>
          <div>
            <PomordoTimer />
          </div>
          <div>
            <DetailedTaskView />
          </div>
        </div>
        <style jsx>{`
          div {
            @apply border-dotted border border-red-400;
          }
          .content {
            @apply flex flex-row;
            @apply border-purple-800 border-2;
          }
          .content > * {
            @apply h-screen;
          }
          #summary {
            @apply flex-grow;
          }
          .vertical-bar {
            @apply flex flex-col w-1/5;
          }
          .vertical-bar > * {
            @apply flex-1;
          }
        `}</style>
      </div>
    </DndProvider>
  );
};
export default Index;
