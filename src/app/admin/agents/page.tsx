import prisma from "@/lib/prisma";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AgentTable from "./agent-table";
export const revalidate = 30;
export const dynamicParams = true;
const Page = async () => {
  const agent = await prisma.agent.findMany();

  return (
    <div>
      <div className="sticky top-0 z-10 flex gap-4 items-center bg-white p-3">
        <SidebarTrigger className="aspect-square p-2 hover:bg-stone-100" />
        <h1 className="text-xl">All Agents</h1>
      </div>

      <div className="bg-white m-4 overflow-auto rounded-lg">
        <AgentTable agentData={agent} />
      </div>
    </div>
  );
};

export default Page;
