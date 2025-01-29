import { SidebarTrigger } from "@/components/ui/sidebar";

const Page = () => {
  return (
    <div>
      <div className="sticky top-0 z-10 flex gap-4 items-center bg-white p-3">
        <SidebarTrigger className="aspect-square p-2 hover:bg-stone-100" />
        <h1 className="text-xl">Transactions</h1>
      </div>

      <div className="bg-white m-4 overflow-auto rounded-lg p-4">
        Coming Soon
      </div>
    </div>
  );
};

export default Page;
