package mk.ukim.finki.wpvisualize.api;

import mk.ukim.finki.wpvisualize.domain.Category;
import mk.ukim.finki.wpvisualize.domain.Dataset;
import mk.ukim.finki.wpvisualize.service.CategoryService;
import mk.ukim.finki.wpvisualize.service.DatasetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiController {
    private final CategoryService categoryService;
    private final DatasetService datasetService;

    @Autowired
    public ApiController(CategoryService categoryService, DatasetService datasetService) {
        this.categoryService = categoryService;
        this.datasetService = datasetService;
    }

    @GetMapping("/categories")
    public List<Category> getCategories() throws IOException {
        return this.categoryService.getAllCategories();
    }

    @GetMapping("/datasets")
    public List<String> getCategoryDatasets(
            @RequestParam("categoryCode") String categoryCode
    ) {
        return this.categoryService.getCategoryDatasetNames(categoryCode);
    }

    @GetMapping("/category/{code}")
    public Category getCategoryData(
            @PathVariable String code
    ) throws IOException {
        return this.categoryService.getCategoryData(code);
    }

    @PostMapping("/categories")
    public void addCategory(
            @RequestParam("name") String name,
            @RequestParam("description") String description
    ) throws IOException {
        List<Dataset> datasets = new ArrayList<>();
        this.categoryService.addNewCategory(new Category(name, name, description, datasets));
    }

    @GetMapping("/{name}")
    public Dataset getDatasetByName(
            @PathVariable String name
    ) throws IOException {
        return datasetService.getDatasetByName(name);
    }

    @GetMapping("/datasetNames")
    public List<String> getAllDatasetNames() throws IOException {
        List<Category> categories = this.categoryService.getAllCategories();
        List<String> datasetNames = new ArrayList<>();
        for(Category category : categories) {
            List<Dataset> categoryDatasets = category.getDatasets();
            for(Dataset dataset : categoryDatasets) {
                datasetNames.add(dataset.getName());
            }
        }
        return datasetNames;
    }

    @PostMapping("/datasets")
    public ResponseEntity<String> addDataset(
            @RequestParam("category") String categoryName,
            @RequestParam("dataset") String dataset,
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        if (!file.getOriginalFilename().endsWith(".csv")) {
            return ResponseEntity.badRequest().body("Only CSV files are allowed");
        }

        try {
            String uploadDirectory = "src/main/resources/datasetsCSV";
            String fileName = dataset.replace(" ", "_");

            Path filePath = Paths.get(uploadDirectory, fileName + ".csv");
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }

        Category category = this.categoryService.getCategoryData(categoryName);
        this.categoryService.addDataset(category, dataset);

        return ResponseEntity.ok().body("Added new dataset!");
    }

}
