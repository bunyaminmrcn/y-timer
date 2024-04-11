import './App.css';
import Timer
 from './components/Timer';
function App() {
  return (
    <div className="app">
      <div className="container">
        <h1 className="header">
          Until New Year in
        </h1>
        <Timer />
      </div>
    </div>
  );
}

export default App;
