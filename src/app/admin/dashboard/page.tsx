import { SidebarTrigger } from "@/components/ui/sidebar";
import { MdAttachMoney } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoPeople, IoPerson } from "react-icons/io5";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Dashboard from "./Dashboard";

const Page = async () => {
  const totalStudents = await prisma.student.count();
  const totalAgents = await prisma.agent.count();
  const totalTransactions = await prisma.transaction.count();
  const totalTransactionsVolume = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
  });

  const totalTransactionsVolumeAgrregate = await prisma.transaction.groupBy({
    by: ["createdAt"],
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
      },
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let formattedTransactionsVolume = Array(12)
    .fill(0)
    .map((_, index) => ({
      month: monthNames[index],
      volume: 0,
    }));

  totalTransactionsVolumeAgrregate.forEach(({ _sum, createdAt }) => {
    const month = new Date(createdAt).getMonth();
    formattedTransactionsVolume[month].volume += _sum.amount || 0;
  });

  formattedTransactionsVolume = formattedTransactionsVolume.filter(
    (val) => val.volume != 0
  );

  const studentsViaAgent = await prisma.student.count({
    where: {
      agentId: {
        not: "0088fb14-7265-465c-bf57-112fe1309bdd",
      },
    },
  });

  const chartData2 = [
    {
      label: "via Agent",
      students: studentsViaAgent,
      fill: "powderblue",
    },
    {
      label: "Direct",
      students: totalStudents - studentsViaAgent,
      fill: "rgb(0 40 92)",
    },
  ];

  return (
    <div>
      <div className="sticky top-0 z-10 flex gap-4 items-center bg-white p-3">
        <SidebarTrigger className="aspect-square p-2 hover:bg-stone-100" />
        <h1 className="text-xl">Dashboard</h1>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800/50">
                  <IoPerson className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-white">
                    Total Students
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">{totalStudents}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800/50">
                  <IoPeople className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-white">
                    Total Agents
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">{totalAgents}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800/50">
                  <AiOutlineTransaction className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-white">
                    Total Transactions
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">{totalTransactions}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800/50">
                  <MdAttachMoney className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-white">
                    Total Revenue
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">
                {totalTransactionsVolume?._sum?.amount || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        <Dashboard
          chartData1={formattedTransactionsVolume}
          chartData2={chartData2}
          totalStudents={totalStudents}
        />
      </div>
    </div>
  );
};

export default Page;
