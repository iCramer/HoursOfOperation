import 'normalize.css';
import './App.css';
import OfficeHours from './Components/OfficeHours/OfficeHours';
import Branding from './Components/Branding/Branding';

function App() {
  return (
    <div className="App">
      <OfficeHours />
      <hr/>
      <Branding />
    </div>
  );
}

export default App;
