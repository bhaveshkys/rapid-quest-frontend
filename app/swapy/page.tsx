'use client'
import { useEffect } from 'react'
import { createSwapy } from 'swapy'
import { GrowthRateBarChart } from '@/components/ui/GrowthRateBarChart'
import SaleChartCard from '@/components/SaleChartCard'

const DEFAULT = {
  '1': 'a',
  '3': 'c',
  '4': 'd',
  '2': null
}


function A() {
  return (
    <>
      <div className="item a" data-swapy-item="a">
        
        <div className='w-[500px]'>
            <GrowthRateBarChart/>
        </div>
        
      </div>
    </>
  )
}

function C() {
  return (
    <>
      <div className="item c" data-swapy-item="c">
        <div><SaleChartCard/></div>
      </div>
    </>
  )
}

function D() {
  return (
    <>
      <div className="item d" data-swapy-item="d">
        <div>D</div>
      </div>
    </>
  )
}

function getItemById(itemId: 'a' | 'c' | 'd' | null) {
  switch (itemId) {
    case 'a':
      return <A />
    case 'c':
      return <C />
    case 'd':
      return <D />
  }
}


function App() {
  const slotItems: Record<string, 'a' | 'c' | 'd' | null> = localStorage.getItem('slotItem') ? JSON.parse(localStorage.getItem('slotItem')!) : DEFAULT
  useEffect(() => {
    const container = document.querySelector('.container')!
    const swapy = createSwapy(container)
    swapy.onSwap(({ data }) => {
      localStorage.setItem('slotItem', JSON.stringify(data.object))
    })
  }, [])
  return (
    <>
      <div className="container w-fill-available flex gap-2">
        <div className="slot a w-fill-available border" data-swapy-slot="1">
          {getItemById(slotItems['1'])}
          1
        </div>
        <div className="second-row h-fill-available">
          <div className="slot b w-fill-available border" data-swapy-slot="2">
            {getItemById(slotItems['2'])}
            2
          </div>
          <div className="slot c w-fill-available border" data-swapy-slot="3">
            {getItemById(slotItems['3'])}
            3
          </div>
        </div>
        <div className="slot d w-fill-available border" data-swapy-slot="4">
          {getItemById(slotItems['4'])}
          4
        </div>
      </div>
    </>
  )
}

export default App