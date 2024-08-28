// Set up the SVG canvas dimensions
const width = 960;
const height = 600;

// Create the SVG element
const svg = d3.select("#choropleth")
    .attr("width", width)
    .attr("height", height);

// Define color scale
const colorScale = d3.scaleQuantize()
    .domain([0, 100])
    .range(["#f7f7f7", "#d9d9d9", "#bdbdbd", "#636363"]);

// Define the projection and path
const projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2])
    .scale([1000]);

const path = d3.geoPath().projection(projection);

// Load data
Promise.all([
    d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"),
    d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json")
]).then(([countyData, educationData]) => {
    // Create a map for education data
    const educationByFips = new Map(educationData.map(d => [d.fips, d.bachelorsOrHigher]));

    // Draw counties
    svg.selectAll(".county")
    .data(topojson.feature(countyData, countyData.objects.counties).features)
    .enter().append("path")
    .attr("class", "county")
    .attr("d", path)
    .attr("data-fips", d => d.id)
    .attr("data-education", d => educationByFips.get(d.id))
    .attr("fill", d => colorScale(educationByFips.get(d.id)))
        .on("mouseover", function(event, d) {
            d3.select("#tooltip")
                .style("visibility", "visible")
                .attr("data-education", educationByFips.get(d.id))
                .html(`County: ${d.properties.name}<br>Education: ${educationByFips.get(d.id)}%`);
        })
        .on("mousemove", function(event) {
            d3.select("#tooltip")
                .style("top", (event.pageY + 5) + "px")
                .style("left", (event.pageX + 5) + "px");
        })
        .on("mouseout", function() {
            d3.select("#tooltip")
                .style("visibility", "hidden");
        });

    // Create the legend
    const legend = svg.append("g")
        .attr("id", "legend")
        .attr("transform", `translate(${width - 200}, 20)`);

    const legendColors = colorScale.range();
    const legendLabels = colorScale.range().map(d => colorScale.invertExtent(d));

    legend.selectAll("rect")
        .data(legendColors)
        .enter().append("rect")
        .attr("x", (d, i) => i * 50)
        .attr("width", 50)
        .attr("height", 20)
        .attr("fill", d => d);

    legend.selectAll("text")
        .data(legendLabels)
        .enter().append("text")
        .attr("x", (d, i) => i * 50)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .text(d => `${Math.round(d[0])}%`);
});
Promise.all([
    d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"),
    d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json")
]).then(([countyData, educationData]) => {
    console.log(countyData, educationData);
     // Create a map for education data
     const educationByFips = new Map(educationData.map(d => [d.fips, d.bachelorsOrHigher]));

     // Draw counties
     svg.selectAll(".county")
         .data(topojson.feature(countyData, countyData.objects.counties).features)
         .enter().append("path")
         .attr("class", "county")
         .attr("d", path)
         .attr("data-fips", d => d.id)
         .attr("data-education", d => educationByFips.get(d.id))
         .attr("fill", d => colorScale(educationByFips.get(d.id)))
         .on("mouseover", function(event, d) {
             d3.select("#tooltip")
                 .style("visibility", "visible")
                 .attr("data-education", educationByFips.get(d.id))
                 .html(`County: ${d.properties.name}<br>Education: ${educationByFips.get(d.id)}%`);
         })
         .on("mousemove", function(event) {
             d3.select("#tooltip")
                 .style("top", (event.pageY + 5) + "px")
                 .style("left", (event.pageX + 5) + "px");
         })
         .on("mouseout", function() {
             d3.select("#tooltip")
                 .style("visibility", "hidden");
         });
 
     // Create the legend
     const legend = svg.append("g")
         .attr("id", "legend")
         .attr("transform", `translate(${width - 200}, 20)`);
 
     const legendColors = colorScale.range();
     const legendLabels = colorScale.range().map(d => colorScale.invertExtent(d));
 
     legend.selectAll("rect")
         .data(legendColors)
         .enter().append("rect")
         .attr("x", (d, i) => i * 50)
         .attr("width", 50)
         .attr("height", 20)
         .attr("fill", d => d);
 
     legend.selectAll("text")
         .data(legendLabels)
         .enter().append("text")
         .attr("x", (d, i) => i * 50)
         .attr("y", 40)
         .attr("text-anchor", "middle")
         .text(d => `${Math.round(d[0])}%`);
});
