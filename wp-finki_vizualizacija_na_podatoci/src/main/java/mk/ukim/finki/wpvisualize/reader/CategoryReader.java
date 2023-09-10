package mk.ukim.finki.wpvisualize.reader;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import mk.ukim.finki.wpvisualize.domain.Category;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class CategoryReader {
    public List<Category> readCategories() throws IOException {
        String filePath = "src/main/resources/categoryData/categories.json"; // Update with the correct file path
        File file = new File(filePath);
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(file, new TypeReference<List<Category>>() {});
    }
}
