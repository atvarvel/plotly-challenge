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
        
        Plotly.plot("bar", barData, barLayout);

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

        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 30 },
            xaxis: { title: "OTU ID" },
            hovermode: "closest"
        };

        Plotly.plot("bubble", bubbleData, bubbleLayout);
    });
}

function init() {
    var selector = d3.select("#selDataset");

    d3.json("../samples.json").then((data) => {
        var names = data.names;
        names.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        var firstSample = names[0];
        createPlots(firstSample);
        sampleMetadata(firstSample);
    });
}

init();

var selector = d3.select("#selDataset");

selector.on("change", function() {
    var selectedValue = selector.property("value");
    createPlots(selectedValue);
    sampleMetadata(selectedValue);
});

// function changeOption(newSample) {
//     createPlots(newSample);
//     sampleMetadata(newSample);
// }

