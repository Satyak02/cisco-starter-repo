import './App.css';
import Banner from './banner';
import Exhibit from './Exhibit';
import AddressDisplay from './addressdisplay';
import LatencyDisplay from './latencydisplay';

function App() {
  return (
    <div className="App">
      <Banner />
      <Exhibit title="Your IP Addresses">
        <AddressDisplay version="v4" />
        <AddressDisplay version="v6" />
      </Exhibit>
      <Exhibit title="Packet Latency">
        <LatencyDisplay />
      </Exhibit>
    </div>
  );
}

export default App;
