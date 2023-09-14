package mk.ukim.finki.wpvisualize.domain;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CategoryManager {
    private List<Category> categories;

    public CategoryManager() {
        categories = new ArrayList<>();
    }

    public void addCategory(Category category) {
        categories.add(category);
    }

    public void resetCategories() {
        categories = new ArrayList<>();
    }

    public List<Category> getCategories() {
        return categories;
    }
}
