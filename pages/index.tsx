import Head from "next/head";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SummaryView from "components/SummaryView";
import DetailedTaskView from "components/DetailedTaskView";
import TaskListView from "components/ListView";
import ButtonArray from "components/ButtonArray";
import PomordoTimer from "components/PomordoTimer";
import dynamic from "next/dynamic";
const CalendarView = dynamic(() => import("components/CalendarView"));
const Index = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="content">
        <Head>
          <title>Task Hour</title>
        </Head>
        <div className="vertical-bar">
          <div className="calendar">
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
          .content {
            @apply flex flex-row;
          }
          .content > * {
            @apply h-screen;
          }
          #summary {
            @apply flex-grow;
          }
          .vertical-bar {
            @apply flex flex-col;
            width: 18rem;
          }
          .vertical-bar > * {
            @apply flex-1;
          }
          .vertical-bar > .calendar {
            @apply flex-none;
          }
        `}</style>
      </div>
    </DndProvider>
  );
};
export default Index;
