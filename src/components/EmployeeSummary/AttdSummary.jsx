import React from 'react'
import { useParams } from 'react-router-dom'
import { SummaryCard } from '../SummaryCard'
import Radialchart from '../charts/Radialchart'
import Piechart from '../charts/Piechart'
import Lablechart from '../charts/lablechart'
import { useSelector } from 'react-redux'
import { postRequest } from '../../utils/APICall'

const EmpSummary = () => {
  const { id } = useParams()
  const {empl} = useSelector(state=>state.employee)
  console.log(empl)
  const month = 5
  console.log(month)
  if(month <= 6 ){
    console.log(new Date().getFullYear() - 1)
  }else{
    console.log(new Date().getFullYear())
  }
  // console.log(new Date().getFullYear())
  const handleSubmit = async() =>{
    try {
      // const obj = {
      //   empid:empl.ID,
      //   fromdate:,
      //   todate:empl.SYS_DATE
      // }
      const response = await postRequest()
    } catch (error) {
      
    }
  }
  return (
    <div>
      <span className='w-full text-2xl font-bold py-8 flex justify-center'>{empl.NAME}</span>
      <span >
        <span className='flex w-full'> 
          <span className='w-1/2 flex justify-center'>
          <Piechart />
          </span>
          <span className='w-1/2 flex justify-center'>
          <Radialchart />
          </span>
        </span>
        <SummaryCard />
        {/* <Lablechart/> */}

      </span>
    </div>
  )
}

export default EmpSummary