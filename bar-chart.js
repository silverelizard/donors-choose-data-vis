function barChart(stateCode) {
    query('https://31h0fuyx4f.execute-api.us-west-2.amazonaws.com/prod/projects/categories/' + stateCode,
        function(err, stateData) {
            query('https://31h0fuyx4f.execute-api.us-west-2.amazonaws.com/prod/projects/categories/',
                function(err, avgData) {
                    console.log(avgData);
                    console.log(stateData);
                    pieChart(stateCode, stateData);
                });
        });
}

function makeChart(data) {

    var barPadding = 1;

    var margin = {top: 5, right: 5, bottom: 5, left: 5},
        width = 400 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

// var x0 = Math.max(-d3.min(data), d3.max(data));
// var x1 = Math.max(d3.max(data));

    var x0 = 36;
    var x1 = 10;

    var x = d3.scale.linear()
        .domain([-x0, x1])
        .range([0, width])
        .nice();

    var y = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeRoundBands([0, height], .2);

    var svg = d3.select("#bar-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g");
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "value")
        .attr("class", function(d, i) { return d.value < 0 ? "bar negative" : "bar positive"; })
        .attr("x", function(d, i) { return x(Math.min(0, d.value)); })
        .attr("y", function(d, i) { return y(i); })
        .attr("width", function(d, i) { return Math.abs(x(d.value) - x(0)); })
        .attr("height", y.rangeBand());

    svg.append("g")
        .attr("class", "y axis")
        .append("line")
        .attr("x1", x(0))
        .attr("x2", x(0))
        .attr("y1", 20)
        .attr("y2", height-20);

    svg.selectAll("text")
        .data(data)
        .enter().append("text")
        .text(function(d) {return d.label;})
        .attr("text-anchor", "left")
        .attr("x", function(d, i) {
            if (d.value <= 0) {
                console.log(d.value);
                return  x(Math.min(0, d.value)) - 15;
            }
            else {return  x(Math.min(0, d.value)) + Math.abs(x(d.value) - x(0)) + 1;}
        })
        .attr("y", function(d, i) { return y(i) + 8; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "9px")
        .attr("fill", "black");

}

function query(url, cb) {
    $.ajax({
        method: 'GET',
        url: url
    }).done(function(response) {
        cb(null, response);
    });
}