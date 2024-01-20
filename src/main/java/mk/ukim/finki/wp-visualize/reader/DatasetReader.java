package mk.ukim.finki.wpvisualize.reader;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import mk.ukim.finki.wpvisualize.domain.Dataset;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Component
public class DatasetReader {
    private final ObjectMapper objectMapper;
    private final PathMatchingResourcePatternResolver resolver;

    public DatasetReader(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.resolver = new PathMatchingResourcePatternResolver();
    }

    public List<Dataset> getAllDatasets() throws IOException {
        List<Dataset> datasets = new ArrayList<>();
        // Search for all CSV files in the datasetsCSV directory
        Resource[] resources = resolver.getResources("classpath:datasetsCSV/*.csv");

        for (Resource resource : resources) {
            Dataset dataset = readFromResource(resource);
            datasets.add(dataset);
        }

        return datasets;
    }

    private Dataset readFromResource(Resource resource) throws IOException {
        String name = resource.getFilename()
                      .replace("_", " ")
                      .replace(".csv", "");
        String filePath = resource.getURL().getPath();

        Dataset dataset = new Dataset();
        dataset.setName(name);

        List<JsonNode> dataList = new ArrayList<>();
        List<String> attributes = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()));
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {
            for (CSVRecord record : csvParser) {
                ObjectNode dataNode = objectMapper.createObjectNode();
                for (String attribute : csvParser.getHeaderMap().keySet()) {
                    dataNode.put(attribute, record.get(attribute));
                }
                dataList.add(dataNode);
            }
        }

        ArrayNode dataJsonArray = objectMapper.valueToTree(dataList);
        dataset.setFileData(dataJsonArray);

        return dataset;
//        Dataset dataset = new Dataset();
//        dataset.setName(name);
//        dataset.setFilePath(filePath);
//
//        List<JsonNode> dataList = new ArrayList<>();
//        List<String> attributes = new ArrayList<>();
//
//        try (CSVParser csvParser = new CSVParser(new FileReader(filePath), CSVFormat.DEFAULT)) {
//            for (CSVRecord record : csvParser) {
//                if (attributes.isEmpty()) {
//                    record.forEach(attributes::add);
//                } else {
//                    ObjectNode dataNode = objectMapper.createObjectNode();
//                    for (int i = 0; i < record.size(); i++) {
//                        dataNode.put(attributes.get(i), record.get(i));
//                    }
//                    dataList.add(dataNode);
//                }
//            }
//        }
//
//        ArrayNode dataJsonArray = objectMapper.valueToTree(dataList);
//        dataset.setFileData(dataJsonArray);
//
//        return dataset;
    }
}
