import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { monthwiseData, chartConfig } from "@/lib/graphdata"

const GraphCard = ({ month }) => {
  // Get data for the selected month
  const chartData = monthwiseData[month] || []

  // Calculate total points for this month
  const totalPoints = chartData.reduce((sum, item) => sum + item.points, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{month}</CardTitle>
        <CardDescription>Batch Performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 20,
              right: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="batch"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              padding={{ left: 20, right: 20 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="points"
              type="natural"
              stroke="black"
              strokeWidth={2}
              dot={{
                fill: "black",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total: {totalPoints} points
        </div>
        <div className="text-muted-foreground leading-none">
          Showing batch points for {month}
        </div>
      </CardFooter>
    </Card>
  )
}

export default GraphCard