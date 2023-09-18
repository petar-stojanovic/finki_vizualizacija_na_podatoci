package mk.ukim.finki.wpvisualize.domain;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class Dataset {
    private String name;
    private String filePath;
    private JsonNode fileData;

    public Dataset() {
        ObjectMapper objectMapper = new ObjectMapper();
        fileData = objectMapper.createObjectNode();
    }

    public Dataset(String name, String filePath, JsonNode fileData) {
        this.name = name;
        this.filePath = filePath;
        this.fileData = fileData;
        this.filterJsonNode();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public JsonNode getFileData() {
        return fileData;
    }

    public void setFileData(JsonNode fileData) {
        this.fileData = fileData;
        this.filterJsonNode();
    }

    public void filterJsonNode() {
        JsonNode fileData = this.getFileData();
        List<String> valuesToRemove = Arrays.asList("code", "area", "note", "flag");

        if (fileData.isObject()) {
            removeFieldsContainingValues((ObjectNode) fileData, valuesToRemove);
        } else if (fileData.isArray()) {
            ArrayNode arrayNode = (ArrayNode) fileData;
            for (JsonNode element : arrayNode) {
                if (element.isObject()) {
                    removeFieldsContainingValues((ObjectNode) element, valuesToRemove);
                }
            }
        }
    }

    private void removeFieldsContainingValues(ObjectNode objectNode, List<String> valuesToRemove) {
        List<String> fieldsToRemove = new ArrayList<>();
        Iterator<String> fieldNames = objectNode.fieldNames();

        while (fieldNames.hasNext()) {
            String fieldName = fieldNames.next();
            for (String valueToRemove : valuesToRemove) {
                if (fieldName.toLowerCase().contains(valueToRemove.toLowerCase())) {
                    fieldsToRemove.add(fieldName);
                    break;
                }
            }
        }

        for (String fieldNameToRemove : fieldsToRemove) {
            objectNode.remove(fieldNameToRemove);
        }
    }
}
