// Get sample data for demographic info panel
function sampleMetadata(sample) {
    // Read in json file
    d3.json("samples.json").then((data) => {
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

// Create Bar and Bubble plots
function createPlots(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        // Filter data based on current sample
        var filteredData = samples.filter(sampleObject => sampleObject.id == sample);
        var sampleData = filteredData[0];
        // Create variables for ids, labels, and values
        var ids = sampleData.otu_ids;
        var labels = sampleData.otu_labels;
        var values = sampleData.sample_values;
        // Get data for bar chart
        var barData = [{
            y: ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            x: values.slice(0, 10).reverse(),
            text: labels.slice(0, 10).reverse(),
            type: "bar",
            // Make the bars horizontal
            orientation: "h"
        }];
        // Create title and margins for chart
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };
        // Plot bar chart
        Plotly.newPlot("bar", barData, barLayout);
        // Get data for bubble chart
        var bubbleData = [{
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                color: ids,
                size: values
            }
        }];
        // Create title, margins, and axis labels for chart
        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 30 },
            xaxis: { title: "OTU ID" },
            hovermode: "closest"
        };
        // Plot bubble chart
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}
// Initialize the charts when page is opened
function init() {
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        var names = data.names;
        names.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        // Plot charts using the first sample
        var firstSample = names[0];
        createPlots(firstSample);
        sampleMetadata(firstSample);
    });
}
// Initialize
init();

var selector = d3.select("#selDataset");
// Update charts when a new sample is selected from the dropdown
selector.on("change", function() {
    var selectedValue = selector.property("value");
    createPlots(selectedValue);
    sampleMetadata(selectedValue);
});
