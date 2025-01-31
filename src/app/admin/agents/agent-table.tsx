"use client";

import {
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHead,
  TableHeader,
  TableHeaderGroup,
  TableProvider,
  TableRow,
} from "./data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Agent } from "@prisma/client";
import getS3URL from "@/utils/getS3URL";

// const agentData = [
//   {
//     id: "1",
//     name: "John Doe",
//     status: true,
//     country: "USA",
//     owner: {
//       id: "1",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=1",
//       name: "Alice Johnson",
//     },
//     email: "alice.johnson@example.com",
//     phone: "+1-555-0101",
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     status: false,
//     country: "Canada",
//     owner: {
//       id: "2",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=2",
//       name: "Bob Smith",
//     },
//     email: "bob.smith@example.com",
//     phone: "+1-555-0102",
//   },
//   {
//     id: "3",
//     name: "Michael Brown",
//     status: true,
//     country: "UK",
//     owner: {
//       id: "3",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=3",
//       name: "Charlie Brown",
//     },
//     email: "charlie.brown@example.com",
//     phone: "+1-555-0103",
//   },
//   {
//     id: "4",
//     name: "Emily Davis",
//     status: false,
//     country: "Australia",
//     owner: {
//       id: "4",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=4",
//       name: "Diana Prince",
//     },
//     email: "diana.prince@example.com",
//     phone: "+1-555-0104",
//   },
//   {
//     id: "5",
//     name: "Chris Wilson",
//     status: true,
//     country: "Germany",
//     owner: {
//       id: "5",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=5",
//       name: "Ethan Hunt",
//     },
//     email: "ethan.hunt@example.com",
//     phone: "+1-555-0105",
//   },
//   {
//     id: "6",
//     name: "Jessica Taylor",
//     status: false,
//     country: "France",
//     owner: {
//       id: "6",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=6",
//       name: "Fiona Gallagher",
//     },
//     email: "fiona.gallagher@example.com",
//     phone: "+1-555-0106",
//   },
//   {
//     id: "7",
//     name: "David Martinez",
//     status: true,
//     country: "Spain",
//     owner: {
//       id: "7",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=7",
//       name: "George Lucas",
//     },
//     email: "george.lucas@example.com",
//     phone: "+1-555-0107",
//   },
//   {
//     id: "8",
//     name: "Laura Hernandez",
//     status: false,
//     country: "Mexico",
//     owner: {
//       id: "8",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=8",
//       name: "Hannah Montana",
//     },
//     email: "hannah.montana@example.com",
//     phone: "+1-555-0108",
//   },
//   {
//     id: "9",
//     name: "James Lee",
//     status: true,
//     country: "South Korea",
//     owner: {
//       id: "9",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=9",
//       name: "Ian Malcolm",
//     },
//     email: "ian.malcolm@example.com",
//     phone: "+1-555-0109",
//   },
//   {
//     id: "10",
//     name: "Sophia Kim",
//     status: false,
//     country: "Japan",
//     owner: {
//       id: "10",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=10",
//       name: "Julia Roberts",
//     },
//     email: "julia.roberts@example.com",
//     phone: "+1-555-0110",
//   },
//   {
//     id: "11",
//     name: "Daniel Garcia",
//     status: true,
//     country: "Brazil",
//     owner: {
//       id: "11",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=11",
//       name: "Kevin Hart",
//     },
//     email: "kevin.hart@example.com",
//     phone: "+1-555-0111",
//   },
//   {
//     id: "12",
//     name: "Olivia Martinez",
//     status: false,
//     country: "Argentina",
//     owner: {
//       id: "12",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=12",
//       name: "Lara Croft",
//     },
//     email: "lara.croft@example.com",
//     phone: "+1-555-0112",
//   },
//   {
//     id: "13",
//     name: "William Johnson",
//     status: true,
//     country: "Italy",
//     owner: {
//       id: "13",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=13",
//       name: "Michael Scott",
//     },
//     email: "michael.scott@example.com",
//     phone: "+1-555-0113",
//   },
//   {
//     id: "14",
//     name: "Emma Wilson",
//     status: false,
//     country: "Russia",
//     owner: {
//       id: "14",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=14",
//       name: "Natalie Portman",
//     },
//     email: "natalie.portman@example.com",
//     phone: "+1-555-0114",
//   },
//   {
//     id: "15",
//     name: "Lucas Brown",
//     status: true,
//     country: "China",
//     owner: {
//       id: "15",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=15",
//       name: "Oscar Isaac",
//     },
//     email: "oscar.isaac@example.com",
//     phone: "+1-555-0115",
//   },
//   {
//     id: "16",
//     name: "Mia Davis",
//     status: false,
//     country: "India",
//     owner: {
//       id: "16",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=16",
//       name: "Penelope Cruz",
//     },
//     email: "penelope.cruz@example.com",
//     phone: "+1-555-0116",
//   },
//   {
//     id: "17",
//     name: "Ethan Martinez",
//     status: true,
//     country: "South Africa",
//     owner: {
//       id: "17",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=17",
//       name: "Quentin Tarantino",
//     },
//     email: "quentin.tarantino@example.com",
//     phone: "+1-555-0117",
//   },
//   {
//     id: "18",
//     name: "Ava Lee",
//     status: false,
//     country: "New Zealand",
//     owner: {
//       id: "18",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=18",
//       name: "Rachel Green",
//     },
//     email: "rachel.green@example.com",
//     phone: "+1-555-0118",
//   },
//   {
//     id: "19",
//     name: "Benjamin Johnson",
//     status: true,
//     country: "Sweden",
//     owner: {
//       id: "19",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=19",
//       name: "Samuel L. Jackson",
//     },
//     email: "samuel.jackson@example.com",
//     phone: "+1-555-0119",
//   },
//   {
//     id: "20",
//     name: "Charlotte Brown",
//     status: false,
//     country: "Norway",
//     owner: {
//       id: "20",
//       image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=20",
//       name: "Tom Hanks",
//     },
//     email: "tom.hanks@example.com",
//     phone: "+1-555-0120",
//   },
// ];

const AgentTable = ({ agentData }: { agentData: Agent[] }) => {
  const defAvatar = getS3URL({ fileName: "avatar.png" });
  const columns: ColumnDef<(typeof agentData)[number]>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="relative">
            <Image
              src={row.original.image || defAvatar}
              alt={row.original.firstName}
              width={24}
              height={24}
              unoptimized
              className="h-6 w-6 rounded-full"
            />
          </div>
          <div>
            <span className="font-medium">
              {row.original.firstName} {row.original.lastName}
            </span>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <span>Nationality: {row.original.country}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <Badge
          variant={row.original.status ? "success" : "destructive"}
          className="text-xs"
        >
          {row.original.status ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => row.original.email,
    },
    {
      id: "phone",
      accessorFn: (row) => row.phone,
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => row.original.phone,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => (
        <Link href={`/admin/agents/${row.original.agentId}`}>
          <Badge variant="success" size={"small"}>
            View Agent <ChevronRightIcon className="w-5 h-5" />
          </Badge>
        </Link>
      ),
    },
  ];

  return (
    <TableProvider
      columns={columns}
      data={agentData}
      className="border rounded-lg"
    >
      <TableHeader>
        {({ headerGroup }) => (
          <TableHeaderGroup key={headerGroup.id} headerGroup={headerGroup}>
            {({ header }) => <TableHead key={header.id} header={header} />}
          </TableHeaderGroup>
        )}
      </TableHeader>
      <TableBody>
        {({ row }) => (
          <TableRow key={row.id} row={row}>
            {({ cell }) => <TableCell key={cell.id} cell={cell} />}
          </TableRow>
        )}
      </TableBody>
    </TableProvider>
  );
};

export default AgentTable;
