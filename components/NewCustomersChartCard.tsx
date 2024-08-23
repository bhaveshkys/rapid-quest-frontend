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
import { NewCustomerBarChartYearly, NewCustomersChartCardDaily, NewCustomersChartCardMonthly } from './ui/NewCustomersChart'
  type RangeOption = "day" | "month" | "year";

const NewCustomerChartCard = () => {
    const[range,setRange]= useState<RangeOption>('day');
    const handleSelectChange = (value: RangeOption) => {
        setRange(value);
      };
  return (
    <div className='w-[520px]'>
       
        
        {range ==="day" && (
            <NewCustomersChartCardDaily onRangeChange={handleSelectChange} />
        )}
        {range ==="month" && (
            <NewCustomersChartCardMonthly onRangeChange={handleSelectChange} />
        )}
        {range ==="year" && (
            <NewCustomerBarChartYearly onRangeChange={handleSelectChange} />
        )}

    </div>
  )
}

export default NewCustomerChartCard