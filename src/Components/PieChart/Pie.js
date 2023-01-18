/* eslint-disable no-unused-vars */
import React from 'react'
import './pie.css'
import { Pie } from 'react-chartjs-2';
import {Chart as chartJS} from 'chart.js/auto'
const PieChart = (props) => {
  return (
    <div className='piechart-container'>
        <p><strong>{props.heading}</strong></p>
        <br/>
        <Pie data={props.data}/>
    </div>
  )
}

export default PieChart;