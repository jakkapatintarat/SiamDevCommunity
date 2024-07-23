import { BrowserRouter } from "react-router-dom";
import Web from "./routes/Routes";
import Navbar from './components/user/Navbar';
import AdminRoutes from "./routes/Adminroutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Web />
        <AdminRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
