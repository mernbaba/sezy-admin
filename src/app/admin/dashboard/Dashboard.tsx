"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  PieChart,
  Pie,
  Label,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface chartData1 {
  month: string;
  volume: number;
}

interface chartData2 {
  label: string;
  students: number;
  fill: string;
}

const Dashboard = ({
  chartData1,
  chartData2,
  totalStudents,
}: {
  chartData1: chartData1[];
  chartData2: chartData2[];
  totalStudents: number;
}) => {
  const chartConfig1 = {
    volume: {
      label: "volume",
      color: "rgb(0 40 92)",
    },
  } satisfies ChartConfig;

  const chartConfig2 = {
    students: {
      label: "Students",
    },
  } satisfies ChartConfig;

  return (
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
          <CardDescription>Origin Breakup</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig2}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData2}
                dataKey="students"
                nameKey="label"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalStudents?.toString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Students
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
