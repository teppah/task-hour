import useUser from "lib/client/hooks/use-user";
import Link from "next/link";
import PageLayout from "components/PageLayout";
const Index = () => {
  return (
    <PageLayout>
      <section>
        <h1>TaskHour</h1>
        <blockquote>ultra pre-alpha v0.1 or whatever</blockquote>
      </section>
      <style jsx>{`
        section {
          @apply h-full w-full;
          @apply flex flex-col items-center;
          @apply pt-20;
        }
        h1 {
          @apply font-bold;
          @apply text-6xl;
        }
        blockquote {
          @apply text-gray-600 italic;
          @apply border-gray-500 rounded-sm border-l-2;
          @apply pl-2;
        }
      `}</style>
    </PageLayout>
  );
};
export default Index;
