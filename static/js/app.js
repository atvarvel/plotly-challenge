// Get sample data for demographic info panel
function sampleMetadata(sample) {
    // Read in json file
    d3.json("../samples.json").then((data) => {
        var metadata = data.metadata;
        // Filter data based on current sample
        var filteredData = metadata.filter(sampleObject => sampleObject.id == sample);
        var sampleData = filteredData[0];
        // Get panel area from html
        var panel = d3.select("#sample-metadata");
        // Clear any data currently in the panel
        panel.html("");
        // Append each entry in the sample data to the panel
        Object.entries(sampleData).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
}

function createPlots(sample) {
    d3.json("../samples.json").then((data) => {
        var samples = data.samples;
        var filteredData = samples.filter(sampleObject => sampleObject.id == sample);
        var sampleData = filteredData[0];

        var ids = sampleData.otu_ids;
        var labels = sampleData.otu_labels;
        var values = sampleData.sample_values;

        var barData = [{
            y: ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            x: values.slice(0, 10).reverse(),
            text: labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        }];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };
        
    });
}