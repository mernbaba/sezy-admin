"use client";

import { CartesianGrid, Line, LineChart, XAxis, Bar, BarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { MdAttachMoney } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoPeople, IoPerson } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  const chartData1 = [
    { month: "January", volume: 186 },
    { month: "February", volume: 305 },
    { month: "March", volume: 237 },
    { month: "April", volume: 73 },
    { month: "May", volume: 209 },
    { month: "June", volume: 214 },
    { month: "July", volume: 214 },
    { month: "August", volume: 214 },
    { month: "September", volume: 214 },
    { month: "October", volume: 214 },
    { month: "November", volume: 214 },
    { month: "December", volume: 214 },
  ];

  const chartConfig1 = {
    volume: {
      label: "volume",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const chartData2 = [
    { month: "January", direct: 186, viaAgent: 80 },
    { month: "February", direct: 305, viaAgent: 200 },
    { month: "March", direct: 237, viaAgent: 120 },
    { month: "April", direct: 73, viaAgent: 190 },
    { month: "May", direct: 209, viaAgent: 130 },
    { month: "June", direct: 214, viaAgent: 140 },
  ];
  const chartConfig2 = {
    direct: {
      label: "direct",
      color: "hsl(var(--chart-1))",
    },
    viaAgent: {
      label: "via agent",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

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
              <p className="text-4xl">46</p>
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
              <p className="text-4xl">20</p>
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
              <p className="text-4xl">63</p>
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
              <p className="text-4xl">72,500</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Volume</CardTitle>
              <CardDescription>Last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig1}>
                <LineChart
                  accessibilityLayer
                  data={chartData1}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="volume"
                    type="natural"
                    stroke="var(--color-volume)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>Last 6 Months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig2}>
                <BarChart accessibilityLayer data={chartData2}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar dataKey="direct" fill="var(--color-direct)" radius={4} />
                  <Bar
                    dataKey="viaAgent"
                    fill="var(--color-viaAgent)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
