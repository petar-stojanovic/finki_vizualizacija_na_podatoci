package mk.ukim.finki.wpvisualize.domain;

import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
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

    public File downloadDataset(String name) throws IOException {
        List<Dataset> datasets = this.getAllDatasets();
        for (Dataset dataset : datasets) {
            if (dataset.getName().equals(name)) {

                String uploadDirectory = "src/main/resources/datasetsCSV";

                String fileName = name.replace(" ", "_");
                return Paths.get(uploadDirectory, fileName + ".csv").toFile();
            }
        }
        return null;
    }

    public File downloadFilteredDataset(String name, String xAxis, String yAxis, String label, String[] labelElements) throws IOException {
        // Find the dataset by name
        Dataset dataset = getDatasetByName(name);
        if (dataset == null) {
            return null;
        }

        String uploadDirectory = "src/main/resources/datasetsCSV";
        String fileName = name.replace(" ", "_") + ".csv";
        File originalFile = Paths.get(uploadDirectory, fileName).toFile();

        String filteredFileName = "filtered_" + fileName;
        File filteredFile = new File(filteredFileName);

        try (FileReader fileReader = new FileReader(originalFile); BufferedReader bufferedReader = new BufferedReader(fileReader); FileWriter fileWriter = new FileWriter(filteredFile)) {
            String headerLine = bufferedReader.readLine();
            int xAxisIndex = -1;
            int yAxisIndex = -1;
            int labelIndex = -1;

            String[] headers = headerLine.split(",");
            for (int i = 0; i < headers.length; i++) {
                if (headers[i].equalsIgnoreCase(xAxis)) {
                    xAxisIndex = i;
                }
                if (headers[i].equalsIgnoreCase(yAxis)) {
                    yAxisIndex = i;
                }
                if (headers[i].equalsIgnoreCase(label)) {
                    labelIndex = i;
                }
            }

            if (xAxisIndex == -1 || yAxisIndex == -1 || labelIndex == -1) {
                return null;
            }

            StringBuilder textToCSV = new StringBuilder();
            textToCSV.append(xAxis + ",").append(yAxis + ",").append(label).append("\n");
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                String[] values = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);

                if (Arrays.asList(labelElements).contains(values[labelIndex])) {
                    textToCSV.append(values[xAxisIndex] + ",").append(values[yAxisIndex] + ",").append(values[labelIndex]).append("\n");
                }

            }
            return convertStringToFile(textToCSV.toString());
        }
    }

    private File convertStringToFile(String csvData) throws IOException {
        File tempFile = File.createTempFile("temp_csv", ".csv");

        try (FileWriter fileWriter = new FileWriter(tempFile)) {
            fileWriter.write(csvData);
        }

        return tempFile;
    }

}
