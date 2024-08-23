
import dynamic from 'next/dynamic';

import NewCustomerChartCard from '@/components/NewCustomersChartCard'
import RepeatCustomerChartCard from '@/components/RepeatCustomersChartCard'
import SaleChartCard from '@/components/SaleChartCard'
import { CLVBarChart } from '@/components/ui/CLVBarChart'
import { GrowthRateBarChart } from '@/components/ui/GrowthRateBarChart'
import React from 'react'

const MapCard = dynamic(() => import('@/components/MapCard'), {
    ssr: false
  });
const page = () => {
  return (
    <div className=' h-screen  '>
    <div className='text-4xl font-bold   border-b-2 p-4' >Analytics Dashboard</div>
    <div className='p-4'>
    <div className='flex flex-wrap w-fill-available p-2 gap-8 justify-center'>
        <div>
            <SaleChartCard />
        </div>
        <div className='w-[400px]'>
            <GrowthRateBarChart/>
        </div>
        <div>
            <NewCustomerChartCard/>
        </div>
        <div>
            <RepeatCustomerChartCard/>
        </div>
        <div className=''>
            <MapCard/>
        </div>
        <div className='w-[400px]'>
            <CLVBarChart/>
        </div>
    </div>
    </div>
    </div>
  )

}

export default page