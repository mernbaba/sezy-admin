import prisma from "@/lib/prisma";
import { SidebarTrigger } from "@/components/ui/sidebar";
import StudentTable from "./student-table";

export const dynamicParams = true;

const Page = async () => {
  const students = await prisma.student.findMany({
    include: {
      Agent: {
        select: { firstName: true, lastName: true },
      },
    },
  });

  return (
    <div>
      <div className="sticky top-0 z-10 flex gap-4 items-center bg-white p-3">
        <SidebarTrigger className="aspect-square p-2 hover:bg-stone-100" />
        <h1 className="text-xl">All Students</h1>
      </div>

      <div className="bg-white m-4 overflow-auto rounded-lg">
        <StudentTable studentData={students} />
      </div>
    </div>
  );
};

export default Page;
