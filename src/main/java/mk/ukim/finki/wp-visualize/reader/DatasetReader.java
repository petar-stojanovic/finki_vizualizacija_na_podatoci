package mk.ukim.finki.wpvisualize.reader;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import mk.ukim.finki.wpvisualize.domain.Dataset;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class DatasetReader {
    private final ObjectMapper objectMapper;

    public DatasetReader(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<Dataset> getAllDatasets() throws IOException {
//        List<Dataset> datasets = new ArrayList<>();
//        File directory = new File("src/main/resources/datasetsCSV/");
        List<Dataset> datasets = new ArrayList<>();
        Resource resource = new ClassPathResource("datasetsCSV/");
        File directory = resource.getFile();

        if (directory.isDirectory()) {
            File[] files = directory.listFiles((dir, name) -> name.endsWith(".csv"));

            if (files != null) {
                for (File file : files) {
                    Dataset dataset = readFromFile(file);
                    datasets.add(dataset);
                }
            }
        }

        return datasets;
    }

    private Dataset readFromFile(File file) throws IOException {
        String name = file.getName()
                .replace("_", " ")
                .replace(".csv", "");
        String filePath = file.getPath();

        Dataset dataset = new Dataset();
        dataset.setName(name);
        dataset.setFilePath(filePath);

        List<JsonNode> dataList = new ArrayList<>();
        List<String> attributes = new ArrayList<>();

        try (CSVParser csvParser = new CSVParser(new FileReader(filePath), CSVFormat.DEFAULT)) {
            for (CSVRecord record : csvParser) {
                if (attributes.isEmpty()) {
                    record.forEach(attributes::add);
                } else {
                    ObjectNode dataNode = objectMapper.createObjectNode();
                    for (int i = 0; i < record.size(); i++) {
                        dataNode.put(attributes.get(i), record.get(i));
                    }
                    dataList.add(dataNode);
                }
            }
        }

        ArrayNode dataJsonArray = objectMapper.valueToTree(dataList);
        dataset.setFileData(dataJsonArray);

        return dataset;
    }
}
