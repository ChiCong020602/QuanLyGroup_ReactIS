import React from 'react';
import './Chartjs.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const Chart = () =>{
  return(
    <div id='div'>
      <div className='div1'><Bar options={options} data={data} /></div>
      <div className='div2'>
        <ul>
          <li><p className='values_name'>{labels[0]}</p> <p className='values_one'><span className='values_pink'></span></p> <p className='values_one'><span className='values_blue'></span></p></li>
          <li><p className='values_name'>{labels[1]}</p> <p className='values_one'><span className='values_pink'></span></p> <p className='values_one'><span className='values_blue'></span></p></li>
          <li><p className='values_name'>{labels[2]}</p> <p className='values_one'><span className='values_pink'></span></p> <p className='values_one'><span className='values_blue'></span></p></li>
          <li><p className='values_name'>{labels[3]}</p> <p className='values_one'><span className='values_pink'></span></p> <p className='values_one'><span className='values_blue'></span></p></li>
          <li><p className='values_name'>{labels[4]}</p> <p className='values_one'><span className='values_pink'></span></p> <p className='values_one'><span className='values_blue'></span></p></li>
          <li><p className='values_name'>{labels[5]}</p> <p className='values_one'><span className='values_pink'></span></p> <p className='values_one'><span className='values_blue'></span></p></li>
          <li><p className='values_name'>{labels[6]}</p> <p className='values_one'><span className='values_pink'></span></p> <p className='values_one'><span className='values_blue'></span></p></li>
        </ul>
      </div>
    </div>
  );
}
