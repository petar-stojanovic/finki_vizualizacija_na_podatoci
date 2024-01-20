package mk.ukim.finki.wpvisualize.domain;

import java.util.List;

public class Category {
    private String name;
    private String code;
    private String description;
    private List<Dataset> datasets;

    public Category() {
    }

    public Category(String name, String code, String description, List<Dataset> datasets) {
        this.name = name;
        this.code = code;
        this.description = description;
        this.datasets = datasets;
    }

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }

    public List<Dataset> getDatasets() {
        return datasets;
    }
}
