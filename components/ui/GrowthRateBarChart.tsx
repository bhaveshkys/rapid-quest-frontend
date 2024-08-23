"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {useState,useEffect } from "react"
const chartData = [
  { month: "January", visitors: 186 },
  { month: "February", visitors: 205 },
  { month: "March", visitors: -207 },
  { month: "April", visitors: 173 },
  { month: "May", visitors: -209 },
  { month: "June", visitors: 214 },
]

const chartConfig = {
    growthRate: {
    label: "growthRate",
  },
} satisfies ChartConfig
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function GrowthRateBarChart() {
    const [chartData, setChartData] = useState<any[]>([]);
    const [availableYears, setAvailableYears] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://rapid-quest-backend.adaptable.app/api/sales/sales-growth-rate`);
            const data = await response.json();
    
            const dataByYear = data.reduce((acc: any, item: any) => {
              if (!acc[item.year]) {
                acc[item.year] = [];
              }
              acc[item.year].push(item);
              return acc;
            }, {});
    
            const years = Object.keys(dataByYear).map(Number).sort((a, b) => b - a);
    
            setAvailableYears(years);
            const latestYear = years[0];
            setSelectedYear(latestYear);
            setChartData(dataByYear[latestYear] || []);
    
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

      const handleYearChange = (year: number) => {
        setSelectedYear(year);
    
        fetch(`https://rapid-quest-backend.adaptable.app/api/sales/sales-growth-rate`)
          .then(response => response.json())
          .then(data => {
            const filteredData = data.filter((item: any) => item.year === year);
            setChartData(filteredData);
          })
          .catch(error => console.error("Error fetching data:", error));
      };
  return (
    <Card className="w-fill-available h-[394px]">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Growth Rate</CardTitle>
        <div className="flex justify-between">
        <CardDescription>For the Year {selectedYear}</CardDescription>
        <Select onValueChange={(value) => handleYearChange(Number(value))}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="2023" />
  </SelectTrigger>
  <SelectContent>
    {availableYears.map((year) => (
      <SelectItem key={year} value={year.toString()}>
        {year}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
</div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <XAxis tickMargin={10}  axisLine={false} tickLine={false} tickFormatter={(value) => monthNames[value]}/>
            <Bar dataKey="growthRate">
              <LabelList position="top" dataKey="month" fillOpacity={1} />
              {chartData.map((item) => (
                <Cell
                  key={item.month}
                  fill={
                    item.growthRate > 0
                      ? "hsl(var(--chart-1))"
                      : "hsl(var(--chart-2))"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
