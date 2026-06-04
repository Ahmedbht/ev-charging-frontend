import StationList from "./components/StationList";
import Analytics  from "./components/Analytics";
import TopStations from "./components/TopStations";

import './App.css';

function App(){

  return(
    <div className="app">
      <header className="header">
        <h1>EV Charging Morocco</h1>
      </header>

      <StationList/>
      <Analytics />
      <TopStations/>
    </div>
  )
}

export default App;