package mk.ukim.finki.wpvisualize.reader;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import mk.ukim.finki.wpvisualize.domain.Category;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class CategoryReader {
    public List<Category> readCategories() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        InputStream inputStream = getClass().getResourceAsStream("/categoryData/categories.json");
        return objectMapper.readValue(inputStream, new TypeReference<List<Category>>() {});
    }
}
