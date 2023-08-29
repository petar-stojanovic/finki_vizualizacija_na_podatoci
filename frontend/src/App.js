import "./App.css";
import DatasetViewer from "./components/DatasetViewer/DatasetViewer";

function App() {
  // const [selectedDataset, setSelectedDataset] = useState(null);

  // const handleDatasetSelect = (datasetName) => {
  //   setSelectedDataset(datasetName);
  // };
  return (
    <div className="App">
      <DatasetViewer />
      {/* <DatasetList onDatasetSelect={handleDatasetSelect} />
      {selectedDataset && <DatasetViewer selectedDataset={selectedDataset} />} */}
    </div>
  );
}

export default App;
