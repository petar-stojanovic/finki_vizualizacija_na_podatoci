import "./App.css";
import DatasetViewerCopy from "./components/DatasetViewer/DatasetViewerCopy";


function App() {
  // const [selectedDataset, setSelectedDataset] = useState(null);

  // const handleDatasetSelect = (datasetName) => {
  //   setSelectedDataset(datasetName);
  // };
  return (
    <div className="App">
      <DatasetViewerCopy />
      {/* <DatasetList onDatasetSelect={handleDatasetSelect} />
      {selectedDataset && <DatasetViewer selectedDataset={selectedDataset} />} */}
    </div>
  );
}

export default App;
