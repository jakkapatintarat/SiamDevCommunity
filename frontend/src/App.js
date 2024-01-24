import { BrowserRouter } from "react-router-dom";
import Web from "./routes/Routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Web />
      </BrowserRouter>
    </div>
  );
}

export default App;
