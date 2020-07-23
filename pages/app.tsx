import Head from "next/head";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SummaryView from "components/summary/SummaryView";
import TaskListView from "components/list/ListView";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedTaskId } from "lib/client/redux/slice/taskSlice";
import { GetServerSideProps } from "next";
import {
  setWeekStart,
  setSelectedDate,
} from "lib/client/redux/slice/dateSlice";
import { startOfWeek, startOfDay } from "date-fns";
import Navbar from "components/Navbar";
import CalendarView from "components/CalendarView";
import useUser from "lib/client/hooks/use-user";
const App = () => {
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

  const { user, mutateUser } = useUser({ redirectUrl: "/signin" });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="content">
        <Head>
          <title>Task Hour</title>
        </Head>
        <div className="nav">
          <Navbar />
        </div>
        <div className="main">
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
        </div>
        <style jsx>{`
          .content {
            @apply flex flex-row;
            @apply flex-wrap;
            @apply h-screen;
          }
          .nav {
            @apply w-screen;
            @apply flex-grow;
            @apply h-12;
          }
          .main {
            @apply flex flex-row;
            @apply flex-grow;
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
// return {
// props: {
// a: "hi",
// },
// };
// };

export default App;
