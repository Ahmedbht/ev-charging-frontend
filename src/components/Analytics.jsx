import {useState, useEffect} from "react";
import axios from "axios";

import{BarChart, Bar, XAxis, YAxis, Tooltip,ResponsiveContainer} from "recharts";
import{Activity, Zap,XCircle} from "lucide-react"; 

function Analytics(){
    const[analytics, setAnalytics] =useState(null);
    const[loading, setLoading]= useState(true);

    useEffect(() =>{
        axios.get("https://ev-charging-app-production.up.railway.app/stations/analytics")
        .then((response) =>{
            setAnalytics(response.data);
            setLoading(false);
        })
        .catch((error) =>{
            console.log("error fetching analytics:" , error);
            setLoading(false);
        });
    },[]);

    if (loading || !analytics){
        return <p>Loading analytics..</p>;

    }

    //data for tha chart
    const chartData=[
        {
            name:"Total", value: analytics.total_stations},
            {name:"Operational", value: analytics.operational_stations},
            {name :"Non Operational", value: analytics.non_operational_stations},
        ];
        
    return(
        <div className="analytics">
            <h2>Analytics</h2>
            {/*cards stats*/}
            <div className="stats-cards">
            <div className="stat-card">
                <Activity size={24}/>
                <h3>{analytics.total_stations}</h3>
                <p >Total Stations</p>
            </div>
            <div className="stat-card">
                <Zap size={24}/>
                <h3>{analytics.total_charging_points}</h3>
                <p>Total Chargin Points</p>
            </div>
            <div className="stat-card">
                <XCircle size={24}/>
                <h3>{analytics.non_operational_stations}</h3>
                <p>Non Operational</p>
            </div>
        </div>

        {/*chart bar*/}
        <h3>STtaions overview</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="value" fill="#4CAF50"/>
                </BarChart>
                </ResponsiveContainer>
                </div>

    
    );}
    export default Analytics;