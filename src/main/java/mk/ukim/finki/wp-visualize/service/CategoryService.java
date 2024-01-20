package mk.ukim.finki.wpvisualize.service;

import mk.ukim.finki.wpvisualize.domain.Category;
import mk.ukim.finki.wpvisualize.domain.CategoryManager;
import mk.ukim.finki.wpvisualize.domain.Dataset;
import mk.ukim.finki.wpvisualize.reader.CategoryReader;
import mk.ukim.finki.wpvisualize.writer.CategoryWriter;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {
    private final CategoryManager categoryManager;
    private final DatasetService datasetService;
    private final CategoryReader categoryReader;
    private final CategoryWriter categoryWriter;

    public CategoryService(CategoryManager categoryManager, DatasetService datasetService, CategoryReader categoryReader, CategoryWriter categoryWriter) throws IOException {
        this.categoryManager = categoryManager;
        this.datasetService = datasetService;
        this.categoryReader = categoryReader;
        this.categoryWriter = categoryWriter;
        initializeCategories();
    }

    public void initializeCategories() throws IOException {
        categoryManager.resetCategories();
        List<Category> categories = categoryReader.readCategories();
        categories.forEach(categoryManager::addCategory);
    }

    public List<Category> getAllCategories() throws IOException {
        return categoryManager.getCategories();
    }

    public List<String> getAllCategoryTitles() {
        List<Category> categories = categoryManager.getCategories();
        List<String> titles = new ArrayList<>();

        for (Category category : categories) {
            titles.add(category.getName());
        }

        return titles;
    }

    public List<Dataset> getCategoryDatasets(String code) {
        List<Category> categories = categoryManager.getCategories();

        for (Category category : categories) {
            if (category.getCode().equals(code)) {
                return category.getDatasets();
            }
        }

        return new ArrayList<>();
    }

    public List<String> getCategoryDatasetNames(String code) {
        List<Dataset> datasets = this.getCategoryDatasets(code);
        List<String> datasetNames = new ArrayList<>();

        for(Dataset dataset : datasets) {
            datasetNames.add(dataset.getName());
        }

        return datasetNames;
    }

    public Category getCategoryData(String code) throws IOException {
        initializeCategories();
        List<Category> categories = categoryManager.getCategories();

        for (Category category : categories) {
            if (category.getCode().equals(code)) {
                return category;
            }
        }

        return null;
    }

    public void addNewCategory(Category category) throws IOException {
        this.categoryWriter.addCategory(category);
        this.categoryManager.addCategory(category);
        initializeCategories();
    }

    public void addDataset(Category category, String datasetName) throws IOException {
        Dataset dataset = new Dataset();
        dataset.setName(datasetName);
        dataset.setFilePath(datasetName.replace(" ", "_") + ".csv");

        category.getDatasets().add(dataset);
        this.categoryWriter.updateCategory(category);
        this.datasetService.initializeDatasets();
    }
}
