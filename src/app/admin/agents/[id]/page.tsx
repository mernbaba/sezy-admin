import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import getS3URL from "@/utils/getS3URL";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props?.params;

  const agent = await prisma.agent.findUnique({
    where: { agentId: id },
  });

  return (
    <div>
      <div className="sticky top-0 z-10 flex gap-4 items-center bg-white p-3">
        <SidebarTrigger className="aspect-square p-2 hover:bg-stone-100" />
        <h1 className="text-xl">
          Agent {`/`} {agent?.firstName} {agent?.middleName} {agent?.lastName}
        </h1>
      </div>

      <div className="p-4 space-y-4 overflow-auto">
        <div className="flex gap-8 bg-white p-4 rounded-lg shadow-md">
          <div>
            <Image
              src={agent?.image || getS3URL({ fileName: "avatar.png" })}
              width={200}
              height={200}
              alt={agent?.firstName ?? ""}
              className="rounded-full"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-medium">
              {agent?.firstName} {agent?.middleName} {agent?.lastName}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div>Email:</div>
              <div className="col-span-2">{agent?.email}</div>
              <div>Phone:</div>
              <div className="col-span-2">{agent?.phone}</div>
              <div>Postal Address:</div>
              <div className="col-span-2">{agent?.postalAddress}</div>
              <div>Physical Address:</div>
              <div className="col-span-2">{agent?.physicalAddress}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md grid grid-cols-3 gap-2">
          <span className="mx-auto">Agent ID: {agent?.agentId}</span>
          <span className="mx-auto">
            Status:{" "}
            {agent?.status ? (
              <Badge variant="success">Active</Badge>
            ) : (
              <Badge variant="destructive">Inactive</Badge>
            )}
          </span>
          <span className="mx-auto">
            Registered On:{" "}
            {new Date(agent?.createdAt ?? "").toLocaleDateString()}
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-4 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-medium">Business Details</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>Business Name:</div>
                <div className="col-span-2">{agent?.businessName}</div>
                <div>Business Document Number:</div>
                <div className="col-span-2">
                  {agent?.businessDocumentNumber}
                  <Link href={agent?.businessDocument ?? "/"} target="_blank">
                    <Badge className="ml-2">View</Badge>
                  </Link>
                </div>
                <div>Business Document Type:</div>
                <div className="col-span-2">{agent?.businessDocumentType}</div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-medium">Documents</h2>

            <div className="grid grid-cols-3 gap-4">
              <div>Image:</div>
              <div className="col-span-2">
                <Link href={agent?.image ?? "/"} target="_blank">
                  <Badge className="ml-2">View</Badge>
                </Link>
              </div>
              <div>National ID:</div>
              <div className="col-span-2">
                <Link href={agent?.nationalId ?? "/"} target="_blank">
                  <Badge className="ml-2">View</Badge>
                </Link>
              </div>
              <div>Business Document:</div>
              <div className="col-span-2">
                <Link href={agent?.businessDocument ?? "/"} target="_blank">
                  <Badge className="ml-2">View</Badge>
                </Link>
              </div>
            </div>
          </div>
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
