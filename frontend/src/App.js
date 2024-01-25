import { BrowserRouter } from "react-router-dom";
import Web from "./routes/Routes";
import Navbar from './components/user/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Web />
      </BrowserRouter>
    </div>
  );
}

export default App;
