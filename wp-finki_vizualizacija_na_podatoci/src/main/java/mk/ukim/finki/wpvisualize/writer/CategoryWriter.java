package mk.ukim.finki.wpvisualize.writer;

import com.fasterxml.jackson.databind.ObjectMapper;
import mk.ukim.finki.wpvisualize.domain.Category;
import mk.ukim.finki.wpvisualize.reader.CategoryReader;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Component
public class CategoryWriter {
    private final CategoryReader categoryReader;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public CategoryWriter(CategoryReader categoryReader) {
        this.categoryReader = categoryReader;
    }

    public void addCategory(Category newCategory) throws IOException {
        List<Category> categories = this.categoryReader.readCategories();
        categories.add(newCategory);
        String jsonFilePath = "src/main/resources/categoryData/categories.json";
        objectMapper.writeValue(new File(jsonFilePath), categories);
    }

    public void updateCategory(Category updatedCategory) throws IOException {
        List<Category> categories = this.categoryReader.readCategories();

        for (int i = 0; i < categories.size(); i++) {
            if (categories.get(i).getCode().equals(updatedCategory.getCode())) {
                categories.set(i, updatedCategory);
                String jsonFilePath = "src/main/resources/categoryData/categories.json";
                objectMapper.writeValue(new File(jsonFilePath), categories);
                return;
            }
        }

        throw new IllegalArgumentException("Category not found for update.");
    }
}






