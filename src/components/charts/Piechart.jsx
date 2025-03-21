import React from 'react'
import { Pie, PieChart } from 'recharts';

const Piechart = () => {

    const data01 = [
        {
            "name": "Group A",
            "value": 400,
            "fill": " #3d3d5c "


        },
        {
            "name": "Group B",
            "value": 300,
            "fill": " #3d3d5c "
        },
        {
            "name": "Group C",
            "value": 300,
            "fill": " #3d3d5c "
        },
        {
            "name": "Group D",
            "value": 200,
            "fill": " #3d3d5c "
        },
        {
            "name": "Group E",
            "value": 278,
            "fill": " #3d3d5c "
        },
        {
            "name": "Group F",
            "value": 189,
            "fill": " #3d3d5c "
        }
    ];

    const data02 = [
        {
            "name": "Group D",
            "value": 9800,
            "fill": "#ed1a1a"
        },
        {
            "name": "Group E",
            "value": 3908,
            "fill": "#193bfc"
        },
        {
            "name": "Group F",
            "value": 4800,
            "fill": "#5bd343"
        }
    ];

    return (
        <div className='flex w-full justify-center'>
            <PieChart width={730} height={250}>
                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
            </PieChart>
        </div>
    )
}

export default Piechart