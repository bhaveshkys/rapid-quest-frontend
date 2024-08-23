"use client"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { Bar, BarChart, Cell, LabelList,  } from "recharts"
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
import { useState,useEffect } from "react"

const chartConfig = {
  count: {
    label: "count",
    color: "red",
  },
} satisfies ChartConfig
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const years = Array.from({ length: 6 }, (_, i) => (2020 + 1).toString());

type RangeOption = "day" | "month" | "year";
interface LineChartCardProps {
    onRangeChange: (value: RangeOption) => void;
  }
  interface DataItem {
    year: number;
    month: number;
    day?: number;
    revenue?: number;
  }
  
  export const NewCustomersChartCardDaily:React.FC<LineChartCardProps> = ({ onRangeChange }) => {
    const[range,setRange]= useState<RangeOption>('day');
    const [chartData, setChartData] = useState<DataItem[]>([]);
    const [availableYears, setAvailableYears] = useState<number[]>([]);
    const [availableMonths, setAvailableMonths] = useState<string[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/customers/new-customers/daily');
            const data: DataItem[] = await response.json();
        
            const dataByYear = data.reduce((acc: { [key: number]: DataItem[] }, item: DataItem) => {
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
        
            const dataForLatestYear = dataByYear[latestYear] || [];
            const months = Array.from(new Set(dataForLatestYear.map((item) => item.month))).sort((a, b) => a - b);
            setAvailableMonths(months.map(month => monthNames[month - 1]));
        
            if (months.length > 0) setSelectedMonth(monthNames[months[0] - 1]);
        
            const initialMonth = months[0];
            setChartData(dataForLatestYear.filter(item => item.month === initialMonth));
        
          } catch (error) {
            console.error("Error fetching data:", error);
          }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedYear !== null && selectedMonth !== null) {
      fetch(`http://localhost:3001/api/customers/new-customers/daily`)
        .then(response => response.json())
        .then(data => {
          const filteredData = data.filter((item: DataItem) => item.year === selectedYear && monthNames[item.month - 1] === selectedMonth);
          setChartData(filteredData);
        })
        .catch(error => console.error("Error fetching data:", error));
    }
  }, [selectedYear, selectedMonth]);

  
  const handleYearChange = (year: string) => {
    setSelectedYear(Number(year));
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };

     
  return (
    <Card className="w-fill-available">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">New Customers Added</CardTitle>
        <div className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <CardDescription>{selectedMonth} {selectedYear}</CardDescription>
        <Select onValueChange={(value)=>onRangeChange(value as RangeOption)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="daily" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="day">daily</SelectItem>
                <SelectItem value="month">monthly</SelectItem>
                <SelectItem value="year">yearly</SelectItem>
            </SelectContent>
        </Select>
        <Select onValueChange={handleYearChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="2021" />
        </SelectTrigger>
        <SelectContent>
          {availableYears.map(year => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={handleMonthChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="January" />
        </SelectTrigger>
        <SelectContent>
          {availableMonths.map((month, index) => (
            <SelectItem key={index} value={month}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => days[value - 1]}
            />
              <YAxis 
                dataKey="count" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={4} 
                tickCount={6}
                allowDecimals={false}
                 />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="count"
              type="natural"
              stroke="red"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}

/* const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 273 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ] */
  

export const NewCustomersChartCardMonthly:React.FC<LineChartCardProps> = ({ onRangeChange }) => {
    const [chartData, setChartData] = useState<DataItem[]>([]);
    const [availableYears, setAvailableYears] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3001/api/customers/new-customers/monthly`);
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
      useEffect(() => {
        if (selectedYear !== null) {
          fetch(`http://localhost:3001/api/customers/new-customers/monthly`)
            .then(response => response.json())
            .then(data => {
              const filteredData = data.filter((item: DataItem) => item.year === selectedYear);
              setChartData(filteredData);
            })
            .catch(error => console.error("Error fetching data:", error));
        }
      }, [selectedYear]);
      const handleYearChange = (year: string) => {
        setSelectedYear(Number(year));
      };
    return (
      <Card>
        <CardHeader className="items-center pb-4">
          <CardTitle className="text-3xl font-bold">New Customers Added</CardTitle>
          <CardDescription>
            Showing New customers added for the {selectedYear}
          </CardDescription>
          <div className="flex gap-2">
          <Select onValueChange={(value)=>onRangeChange(value as RangeOption)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="monthly" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="day">daily</SelectItem>
                <SelectItem value="month">monthly</SelectItem>
                <SelectItem value="year">yearly</SelectItem>
            </SelectContent>
        </Select>
        <Select onValueChange={handleYearChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="2021" />
        </SelectTrigger>
        <SelectContent>
          {availableYears.map(year => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      </div>
        </CardHeader>
        <CardContent className="pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadarChart data={chartData}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="month"
               tickFormatter={(value) => monthNames[value - 1]}
                />
              <PolarGrid />
              <Radar
                dataKey="count"
                fill="red"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  }

  export const NewCustomerBarChartYearly:React.FC<LineChartCardProps> = ({ onRangeChange }) => {
    const [chartData, setChartData] = useState<any[]>([]);
    const [availableYears, setAvailableYears] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3001/api/customers/new-customers/yearly`);
            const data = await response.json();
            setChartData(data);
    
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

  return (
    <Card className="w-fill-available">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Growth Rate</CardTitle>
        <div className="flex justify-start">
        {/* <CardDescription></CardDescription> */}
        <Select onValueChange={(value)=>onRangeChange(value as RangeOption)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="monthly" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="day">daily</SelectItem>
                <SelectItem value="month">monthly</SelectItem>
                <SelectItem value="year">yearly</SelectItem>
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
            <XAxis tickMargin={10}  axisLine={false} tickLine={false}/>
            <YAxis 
                dataKey="count" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={4} 
                tickCount={6}
                 />
            <Bar dataKey="count">
              <LabelList position="top" dataKey="year" fillOpacity={1} />
              {chartData.map((item) => (
                <Cell
                  key={item.year}
                  fill={
                    item.count > 0
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
