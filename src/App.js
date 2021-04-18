import "./App.css";
import { Web3Provider } from "./hooks/useWeb3";
import { Welcome } from "./components/Welcome";

const App = () => {
  return (
    <Web3Provider>
      <div className="App">
        <Welcome />
      </div>
    </Web3Provider>
  );
};

export default App;
