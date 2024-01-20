package mk.ukim.finki.wpvisualize.service;

import mk.ukim.finki.wpvisualize.domain.Dataset;
import mk.ukim.finki.wpvisualize.domain.DatasetManager;
import mk.ukim.finki.wpvisualize.reader.DatasetReader;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class DatasetService {
    private final DatasetReader datasetReader;
    private final DatasetManager datasetManager;

    public DatasetService(DatasetReader datasetReader, DatasetManager datasetManager) throws IOException {
        this.datasetReader = datasetReader;
        this.datasetManager = datasetManager;
        initializeDatasets();
    }

    public void initializeDatasets() throws IOException {
        List<Dataset> datasets = datasetReader.getAllDatasets();
        datasets.forEach(datasetManager::addDataset);
    }

    public Dataset getDatasetByName(String name) throws IOException {
        return datasetManager.getDatasetByName(name);
    }

    public File downloadDataset(String name) throws IOException {
        return datasetManager.downloadDataset(name);
    }

    public File downloadFilteredDataset(String name, String xAxis, String yAxis, String label, String[] labelElements) throws IOException {
        return datasetManager.downloadFilteredDataset(name, xAxis, yAxis, label, labelElements);

    }
}
