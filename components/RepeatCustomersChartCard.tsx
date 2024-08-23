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
import { RepeatCustomersChartCardDaily, RepeatCustomersChartCardMonthly,RepeatCustomerBarChartYearly } from './ui/RepeatCustomersChart';
  type RangeOption = "day" | "month" | "year";

const RepeatCustomerChartCard = () => {
    const[range,setRange]= useState<RangeOption>('day');
    const handleSelectChange = (value: RangeOption) => {
        setRange(value);
      };
  return (
    <div className='w-[520px]'>
       
        
        {range ==="day" && (
            <RepeatCustomersChartCardDaily onRangeChange={handleSelectChange} />
        )}
        {range ==="month" && (
            <RepeatCustomersChartCardMonthly onRangeChange={handleSelectChange} />
        )}
        {range ==="year" && (
            <RepeatCustomerBarChartYearly onRangeChange={handleSelectChange} />
        )}

    </div>
  )
}

export default RepeatCustomerChartCard