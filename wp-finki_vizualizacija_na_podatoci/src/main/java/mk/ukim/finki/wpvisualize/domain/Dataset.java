package mk.ukim.finki.wpvisualize.domain;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

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
        //this.fileData = filterJsonNode(fileData, new String[] { "code", "area", "flag", "source", "note" });
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
        //this.fileData = filterJsonNode(fileData, new String[] { "code", "area", "flag", "source", "note" });
    }

//    public JsonNode filterJsonNode(JsonNode inputNode, String[] excludedAttributes) {
//        if (inputNode.isObject()) {
//            ObjectNode filteredNode = inputNode.deepCopy();
//            for (String excludedAttribute : excludedAttributes) {
//                String normalizedExcludedAttribute = excludedAttribute.toLowerCase(); // Normalize to lowercase
//                filteredNode.remove(normalizedExcludedAttribute);
//            }
//            return filteredNode;
//        } else if (inputNode.isArray()) {
//            ArrayNode filteredArray = inputNode.deepCopy();
//            for (JsonNode arrayElement : filteredArray) {
//                if (arrayElement.isObject()) {
//                    ObjectNode filteredNode = (ObjectNode) arrayElement;
//                    for (String excludedAttribute : excludedAttributes) {
//                        String normalizedExcludedAttribute = excludedAttribute.toLowerCase(); // Normalize to lowercase
//                        filteredNode.remove(normalizedExcludedAttribute);
//                    }
//                }
//            }
//            return filteredArray;
//        }
//        return inputNode; // Return unchanged if not an object or array
//    }

}
