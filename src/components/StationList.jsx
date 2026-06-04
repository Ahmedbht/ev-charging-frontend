//useState and useEffect
import{ useState, useEffect} from "react";
import axios  from "axios";
import{MapPin, Zap,User,CheckCircle, HelpCircle} from "lucide-react";

function StationList(){
    //stations list start empty// and data still loading 
    const[stations, setStations]= useState([]);
    const[loading, setLoading] =useState(true);

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/stations")
        .then((response) =>{
            //data from api // and when data arrived loading is finished
            setStations(response.data);
            setLoading(false);
        })
        .catch((error)=>{
            console.log("error fetching stations", error);
            setLoading(false);
        });
    },[]);
    
    if (loading){
        return<p>Loading stations..</p>;
    }

    return(
        <div className="Stations List">
            <h2>EV Charging Stations in Morocco</h2>

            {/*loop for each stations and show it as cards*/}
            {stations.map((station) =>
            (
                <div key={station.id} className="station-card">
                    <h3>{stations.name}</h3>
                    <p><MapPin size={16} /> City:{station.city || "Unknown"}</p>
                    <p><User size={16} /> Operator: {station.operator || "Unknown"}</p>
                    <p> <Zap size={16} /> Chargin Points:{station.number_of_points || "Unknown"}</p>
                    <p>
                        {station.is_operational
                        ?<CheckCircle size={16} color="green"/>
                        :<HelpCircle size={16} color="gray"/>
}
                        {station.is_operational ?"Operational" : "? Unknown"}
                    </p>
                    </div>
            ))}
        </div>
    )
}
export default StationList;