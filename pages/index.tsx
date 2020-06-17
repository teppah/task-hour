import Head from "next/head";
import SummaryView from "components/SummaryView";
import DetailedTaskView from "components/DetailedTaskView";
import CalendarView from "components/CalendarView";
const Index = () => {
  return (
    <div className="content">
      <Head>
        <title>Task Hour</title>
      </Head>
      <div className="vertical-bar">
        <div>
          <CalendarView />
        </div>
        <div>TaskListView</div>
      </div>
      <div id="summary">
        <SummaryView />
      </div>
      <div className="vertical-bar">
        <div>ButtonArray</div>
        <div>PomordoTimer</div>
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
          @apply w-full h-full;
        }
      `}</style>
    </div>
  );
};
export default Index;
