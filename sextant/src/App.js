import './App.css';
import Banner from './components/banner';
import Exhibit from './components/Exhibit';

function App() {
  return (
    <div className="App">
      <Banner />
      <Exhibit title="Sample Data Panel">
        <p>This is where child components will go!</p>
      </Exhibit>
    </div>
  );
}

export default App;
