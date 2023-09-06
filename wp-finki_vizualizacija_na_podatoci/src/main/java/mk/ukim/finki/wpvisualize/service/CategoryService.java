package mk.ukim.finki.wpvisualize.service;

import mk.ukim.finki.wpvisualize.domain.Category;
import mk.ukim.finki.wpvisualize.domain.CategoryManager;
import mk.ukim.finki.wpvisualize.reader.CategoryReader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {
    private final CategoryManager categoryManager;
    private final CategoryReader categoryReader;

    public CategoryService(CategoryManager categoryManager, CategoryReader categoryReader) throws IOException {
        this.categoryManager = categoryManager;
        this.categoryReader = categoryReader;
        initializeCategories();
    }

    public void initializeCategories() throws IOException {
        List<Category> categories = categoryReader.readCategories();
        categories.forEach(categoryManager::addCategory);
    }

    public List<Category> getAllCategories() {
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

    public List<String> getCategoryDatasets(String code) {
        List<Category> categories = categoryManager.getCategories();

        for (Category category : categories) {
            if (category.getCode().equals(code)) {
                return category.getDatasets();
            }
        }

        return new ArrayList<>();
    }

    public Category getCategoryData(String code) {
        List<Category> categories = categoryManager.getCategories();

        for (Category category : categories) {
            if (category.getCode().equals(code)) {
                return category;
            }
        }

        return null;
    }
}
