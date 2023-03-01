import React,{ useEffect, useCallback, useState  } from 'react'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip,Area, Label, Legend } from 'recharts';
import { useHttp } from '../../hooks/http.hook';

const Chart = () => {
    const {request}= useHttp();
    const [dateRoute, setDateRoute] = useState('');
    const getdateRoute = useCallback( async () => {
        try {
          const dataRoute = await request('/api/routes/getallchart', 'GET', null)
          setDateRoute(dataRoute);
        } catch (error) {}
      },[request])

      useEffect(() => {
        getdateRoute()
      }, [getdateRoute]);
  return (
   
    <AreaChart width={750} height={250} data={dateRoute}
  margin={{ top: 15, right: 0, left: 0, bottom: 5 }}>
  <defs>
    <linearGradient id="colorPr" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="name"/>
  <YAxis type="number" domain={[0, dataMax=>(dataMax*5)]} />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorPr)" />
</AreaChart>
)
}

export default Chart
