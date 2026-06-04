//useState and useEffect
import{ useState, useEffect} from "react";
import axios  from "axios";
import{Zap, MapPin, Trophy} from "lucide-react";

function TopStations(){
    const [stations, setStations] =useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/stations/top")
        .then((response) =>
        {
            setStations(response.data);
            setLoading(false);

        })
        .catch((error) =>{
            console.log("error fetching top stations:", error);
            setLoading(false);
        });
    }, []);

    if (loading){
        return<p>Loading top stations...</p>
    }

    return(
        <div className="top-stations">
            <h2>Top 10 stations by charging points</h2>
            {stations.map((station, index) =>(
                <div key={station.id} className="top-station-card">
                {/*rank nulber*/}
                <div className="rank">

                    <Trophy size={16}/>
                    {index +1}
                </div>

                <div className="top-station-info">
                    <h3>{station.name}</h3>
                    <p><MapPin size={14}/> {station.city || "unkknown"}</p>
                </div>

                {/*charging points*/}
                <div className="points">
                    <Zap size={16}/>
                    {station.number_of_points} points
                </div>
                </div>
            ))}
        </div>
    )
}

export default TopStations;