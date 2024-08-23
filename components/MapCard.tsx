'use client'
import React from 'react'
import Map from "./Map"
import {Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/ui/card"
const MapCard = () => {
  return (
    <Card>
        <div className='p-2'>
            <div className='font-bold'>Distribution of Customers</div>
        {"red >50 | orange >20 | yellow>10 | gray=0"}
        <Map/>
        </div>
    </Card>
  )
}

export default MapCard