import "./App.css";
import { Web3Provider } from "./web3";
import { DataProvider } from "./dataContext";
import { Welcome } from "./components/Welcome";

const App = () => {
  return (
    <Web3Provider>
      <DataProvider>
        <div className="App">
          <Welcome />
        </div>
      </DataProvider>
    </Web3Provider>
  );
};

export default App;
