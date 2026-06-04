//useState and useEffect
import{ useState, useEffect} from "react";
import axios  from "axios";
import{MapPin, Zap,User,CheckCircle, HelpCircle, Search} from "lucide-react";
import {ClipLoader } from "react-spinners";

function StationList(){
    //stations list start empty// and data still loading 
    const[stations, setStations]= useState([]);
    const[loading, setLoading] =useState(true);
    const[search, setSearch] = useState("");
    const[showOperational, setShowOperational] = useState(false);

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
        return(
            <div className="loading">
                <ClipLoader color="#4CAF50" size={40} />
                <p>Loading stations..</p>
            </div>
        );
    }
    const filtredStations = stations.filter((station)=> {
        //filter by search
        const matchesSearch = station.city?.toLowerCase().includes(search.toLowerCase());
        //filter show operatioanll
        const matchesOperational = showOperational ? station.is_operational !== false: true;

        //return the two conditions
        return matchesSearch && matchesOperational;
    });

    return(
        <div className="station-list">
            <h2>EV Charging Stations inA Morocco</h2>


            <div className="search-bar">
                <button className={showOperational ? "filter-btn active": "filter-btn"}
                onClick={() => setShowOperational(!showOperational)}>
                    <CheckCircle size={16}/>
                     {showOperational ? "showing operational" : "show operational onlt"}
                     </button>
                <Search size={18} />
                <input type="text" placeholder="Search by city:" value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <p className="results-count ">{filtredStations.length} Stations found</p>
            {/*loop for each stations and show it as cards*/}
            {filtredStations.map((station) =>
            (
                <div key={station.id} className="station-card">
                    <h3>{station.name}</h3>
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