package mk.ukim.finki.wpvisualize.domain;

import java.util.List;

public class Category {
    private String name;
    private String description;
    private List<String> datasets;

    public Category() {
    }

    public Category(String name, String description, List<String> datasets) {
        this.name = name;
        this.description = description;
        this.datasets = datasets;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getDatasets() {
        return datasets;
    }
}
