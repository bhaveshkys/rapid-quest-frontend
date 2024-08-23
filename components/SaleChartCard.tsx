'use client'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {SalesLineChartCardDaily,SalesLineChartCardMonthly, SalesLineChartCardYearly } from './ui/TotalSalesLineChart';
type RangeOption = "day" | "month" | "year";

const SaleChartCard = () => {
    const[range,setRange]= useState<RangeOption>('day');
    const handleSelectChange = (value: RangeOption) => {
        setRange(value);
      };
  return (
    <div className='w-[400px]'>
        
        
        {range ==="day" && (
            <SalesLineChartCardDaily onRangeChange={handleSelectChange} />
        )}
        {range ==="month" && (
            <SalesLineChartCardMonthly onRangeChange={handleSelectChange} />
        )}
        {range ==="year" && (
            <SalesLineChartCardYearly onRangeChange={handleSelectChange} />
        )}

    </div>
  )
}

export default SaleChartCard