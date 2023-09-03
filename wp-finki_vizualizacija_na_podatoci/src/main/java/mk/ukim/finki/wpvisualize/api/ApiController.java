package mk.ukim.finki.wpvisualize.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import mk.ukim.finki.wpvisualize.domain.Category;
import mk.ukim.finki.wpvisualize.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiController {
    private final ResourceLoader resourceLoader;

    private final String datasetsDirectory = "datasets/";

    private final CategoryService categoryService;

    @Autowired
    public ApiController(ResourceLoader resourceLoader, CategoryService categoryService) {
        this.resourceLoader = resourceLoader;
        this.categoryService = categoryService;
    }

    @GetMapping("/{name}")
    public ResponseEntity<Object> getDatasetByName(@PathVariable String name) {
        try {
            String fileName = name + ".json";

            // Log the file path for debugging
            String filePath = datasetsDirectory + fileName;
            System.out.println("File Path: " + filePath);

            // Read the JSON file using ClassLoader
            ClassLoader classLoader = getClass().getClassLoader();
            InputStream inputStream = classLoader.getResourceAsStream(filePath);

            if (inputStream == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dataset not found.");
            }

            System.out.println(inputStream.toString());
            // Convert the InputStream to a JSON string
            String jsonString = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                    .lines().collect(Collectors.joining());

            jsonString = jsonString.replace("\uFEFF", "");

            // Parse the JSON string to JsonNode
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(jsonString);

            List<String> attributes = new ArrayList<>();
            jsonNode.get(0).fieldNames().forEachRemaining(attributes::add);

            // Create a new JSON object to include both data and attributes
            ObjectMapper mapper = new ObjectMapper();
            ObjectNode responseJson = mapper.createObjectNode();
            responseJson.put("attributes", mapper.valueToTree(attributes));
            responseJson.put("data", jsonNode);

            return ResponseEntity.ok(responseJson);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error reading dataset.");
        }
    }

    @GetMapping("/datasetNames")
    public List<String> getAllDatasetNames() {
        List<Category> categories = this.categoryService.getAllCategories();
        List<String> datasetNames = new ArrayList<>();
        for(Category category : categories) {
            List<String> categoryDatasets = category.getDatasets();
            datasetNames.addAll(categoryDatasets);
        }
        return datasetNames;
//        try {
//            Resource resource = resourceLoader.getResource("classpath:" + datasetsDirectory);
//            File datasetsDir = resource.getFile();
//            File[] files = datasetsDir.listFiles();
//
//            if (files == null || files.length == 0) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No datasets found.");
//            }
//
//            List<String> datasetNames = Arrays.stream(files)
//                    .map(file -> file.getName().replace(".json", ""))
//                    .collect(Collectors.toList());
//
//            return ResponseEntity.ok(datasetNames);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching dataset names.");
//        }
    }

    @GetMapping("/categories")
    public List<Category> getCategories() {
        return this.categoryService.getAllCategories();
    }

    @GetMapping("/datasets")
    public List<String> getCategoryDatasets(
            @RequestParam("categoryCode") String categoryCode
    ) {
        return this.categoryService.getCategoryDatasets(categoryCode);
    }

    @GetMapping("/category/{code}")
    public Category getCategoryData(
            @PathVariable String code
    ) {
        return this.categoryService.getCategoryData(code);
    }

}
