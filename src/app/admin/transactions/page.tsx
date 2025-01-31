import prisma from "@/lib/prisma";
import TransactionPage from "./TransactionPage";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const dynamicParams = true;
export const revalidate = 0;

const Page = async () => {
  const transactions = await prisma.transaction.findMany({
    include: {
      Currency: true,
      Student: true,
    },
    orderBy: [
      {
        status: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  const currencies = await prisma.currency.findMany();

  return (
    <div className="space-y-4 bg-white">
      <div className="sticky top-0 z-10 flex gap-4 items-center bg-white p-3">
        <SidebarTrigger className="aspect-square p-2 hover:bg-stone-100" />
        <h1 className="text-xl">Transactions</h1>
      </div>

      <TransactionPage transactions={transactions} currencies={currencies} />
    </div>
  );
};

export default Page;
