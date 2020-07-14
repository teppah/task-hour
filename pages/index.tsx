import Head from "next/head";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SummaryView from "components/summary/SummaryView";
import DetailedTaskView from "components/DetailedTaskView";
import TaskListView from "components/list/ListView";
import ButtonArray from "components/ButtonArray";
import PomordoTimer from "components/PomordoTimer";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedTaskId } from "lib/redux/slice/taskSlice";
import { GetServerSideProps } from "next";
import { setWeekStart, setSelectedDate } from "lib/redux/slice/dateSlice";
import { startOfWeek, startOfDay } from "date-fns";
const CalendarView = dynamic(() => import("components/CalendarView"));
const Index = ({ a }) => {
  console.log(a);
  const dispatch = useDispatch();
  // deselect on escape
  const handleEscape = (e: KeyboardEvent) => {
    e.preventDefault();
    const escapeCode = 27;
    if (e.keyCode === escapeCode) {
      dispatch(setSelectedTaskId(null));
    }
  };
  useEffect(() => {
    const now = new Date();
    dispatch(setWeekStart(startOfWeek(now)));
    dispatch(setSelectedDate(startOfDay(now)));
  }, []);
  useEffect(() => {
    window.addEventListener("keyup", handleEscape);
    return () => window.removeEventListener("keyup", handleEscape);
  });
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="content">
        <Head>
          <title>Task Hour</title>
        </Head>
        <div className="nav"></div>
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
        </div>
        <style jsx>{`
          .content {
            @apply flex flex-row;
            @apply flex-wrap;
          }
          .nav {
            @apply w-screen;
            @apply h-12;
            @apply bg-red-300;
          }
          #summary {
            @apply flex-grow;
            height: calc(100vh - 3rem);
            @apply overflow-y-auto;
          }
          .vertical-bar {
            @apply flex flex-col;
            width: 18rem;
          }
        `}</style>
        <style jsx global>{`
          body {
            @apply bg-gray-200;
          }
        `}</style>
      </div>
    </DndProvider>
  );
};

// EXPERIMENT: try always SSR instead of SSG to see if it fixes date issue
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      a: "hi",
    },
  };
};

export default Index;
