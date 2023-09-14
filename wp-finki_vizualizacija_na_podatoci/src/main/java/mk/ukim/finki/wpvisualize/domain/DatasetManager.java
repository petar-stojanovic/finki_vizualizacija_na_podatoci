package mk.ukim.finki.wpvisualize.domain;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class DatasetManager {
    private List<Dataset> datasets;

    public DatasetManager() {
        datasets = new ArrayList<>();
    }

    public void addDataset(Dataset dataset) {
        datasets.add(dataset);
    }

    public List<Dataset> getAllDatasets() {
        return datasets;
    }

    public Dataset getDatasetByName(String name) throws IOException {
        List<Dataset> datasets = this.getAllDatasets();
        for (Dataset dataset : datasets) {
            if (dataset.getName().equals(name)) {
                return dataset;
            }
        }
        return null;
    }
}
