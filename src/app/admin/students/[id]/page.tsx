import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props?.params;

  const student = await prisma.student.findUnique({
    where: { studentId: id },
    include: {
      Agent: true,
    },
  });

  return (
    <div>
      <div className="sticky top-0 z-10 flex gap-4 items-center bg-white p-3">
        <SidebarTrigger className="aspect-square p-2 hover:bg-stone-100" />
        <h1 className="text-xl">
          Student {`/`} {student?.firstName} {student?.middleName}{" "}
          {student?.lastName}
        </h1>
      </div>

      <div className="p-4 space-y-4 overflow-auto">
        <div className="flex gap-8 bg-white p-4 rounded-lg shadow-md">
          <div>
            <Image
              src={student?.image ?? ""}
              width={200}
              height={200}
              alt={student?.firstName ?? ""}
              className="rounded-full"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-medium">
              {student?.firstName} {student?.middleName} {student?.lastName}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div>Email:</div>
              <div className="col-span-2">{student?.email}</div>
              <div>Phone:</div>
              <div className="col-span-2">{student?.phone}</div>
              <div>Gender:</div>
              <div className="col-span-2">{student?.gender}</div>
              <div>DOB:</div>
              <div className="col-span-2">
                {new Date(student?.dob ?? "")?.toLocaleDateString("en-GB")}
              </div>
              <div>Postal Address:</div>
              <div className="col-span-2">{student?.postalAddress}</div>
              <div>Physical Address:</div>
              <div className="col-span-2">{student?.physicalAddress}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md grid grid-cols-4 gap-2">
          <span className="m-auto">Student ID: {student?.studentId}</span>
          <span className="m-auto">
            Status:{" "}
            {student?.status ? (
              <Badge variant="success">Active</Badge>
            ) : (
              <Badge variant="destructive">Inactive</Badge>
            )}
          </span>
          <span className="m-auto mx-auto">
            Registered On:{" "}
            {new Date(student?.createdAt ?? "")?.toLocaleDateString()}
          </span>
          <span className="m-auto">
            Agent:{" "}
            <Button variant={"link"} asChild>
              <Link href={`/admin/agents/${student?.agentId}`}>
                {student?.Agent?.firstName} {student?.Agent?.lastName}
              </Link>
            </Button>
          </span>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
          <h2 className="text-lg font-medium">Transactions</h2>

          <div>Coming Soon</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
