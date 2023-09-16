package mk.ukim.finki.wpvisualize.domain;

import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
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
            System.out.println(dataset.getName());
            if (dataset.getName().equals(name)) {
                return dataset;
            }
        }
        return null;
    }

    public File downloadDataset(String name) throws IOException {
        List<Dataset> datasets = this.getAllDatasets();
        for (Dataset dataset : datasets) {
            if (dataset.getName().equals(name)) {

                String uploadDirectory = "src/main/resources/datasetsCSV";

                String fileName = name.replace(" ", "_");
                return Paths.get(uploadDirectory,fileName + ".csv").toFile();
            }
        }
        return null;
    }
}
