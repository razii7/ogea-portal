import { ClipboardMinus } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { totalBatchwiseData, chartConfig } from "@/lib/graphdata"

const MainGraph = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={totalBatchwiseData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="batch"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="points" fill="black" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Batchwise report <ClipboardMinus className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total points for each batch
        </div>
      </CardFooter>
    </Card>
  )
}

export default MainGraph