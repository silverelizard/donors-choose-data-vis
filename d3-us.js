function initialize(donationDiff) {
    var width = 600,
        height = 375,
        centered;

    var projection = d3.geo.albersUsa()
        .scale(800)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("#main").append("svg")
        .attr("id", "interactive-map")
        .attr("width", width)
        .attr("height", height);

    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)
        .on("click", clicked)

    ;

    var g = svg.append("g");

    var colorScale = d3.scale.linear().domain([-1, 1]).range([-255, 255]);

    d3.json("us.json", function (error, us) {
        if (error) throw error;
        var features = topojson.feature(us, us.objects.states).features;
        features.forEach(function (element, index, array) {
            element['statecode'] = usMap[element["id"]];
            if (donationDiff.hasOwnProperty(element.statecode)) {
                var obj = donationDiff[element.statecode];
                element.devDiff = obj.devDiff;
                element.total = obj.total;
            } else {
                element.devDiff = -Infinity;
                element.total = 0;
            }
        });

        g.attr("id", "states")
            .selectAll("path")
            .data(features)
            .enter().append("path")
            .attr("d", path)
            .attr("fill", function (d) {
                var key = d.devDiff;
                var offset = colorScale(key);
                if (offset < 0) {
                    offset = Math.abs(offset);
                    return d3.rgb(255, 255 - offset, 255 - offset);
                }
                return d3.rgb(255 - offset, 255, 255 - offset);
            })
            .on("click", clicked)
            .attr('alt', function (d) {
                return d.statecode;
            })
            .on("mousemove", function(d) {
                var html = "";

                html += "<div class=\"tooltip_kv\">";
                html += "<span class=\"tooltip_key\">";
                html += d.statecode;
                html += "</span>: ";
                html += "<span class=\"tooltip_value\">";
                html += d.total;
                html += "";
                html += "</span>";
                html += "</div>";

                $("#tooltip-container").html(html);
                $(this).attr("fill-opacity", "0.8");
                $("#tooltip-container").show();

                var coordinates = d3.mouse(this);

                if (d3.event.layerX < width / 2) {
                    d3.select("#tooltip-container")
                        .style("top", (d3.event.layerY + 15) + "px")
                        .style("left", (d3.event.layerX + 15) + "px");
                } else {
                    var tooltip_width = $("#tooltip-container").width();
                    d3.select("#tooltip-container")
                        .style("top", (d3.event.layerY + 15) + "px")
                        .style("left", (d3.event.layerX - tooltip_width - 30) + "px");
                }
            })
            .on("mouseout", function() {
                $(this).attr("fill-opacity", "1.0");
                $("#tooltip-container").hide();
            });


        g.append("path")
            .datum(topojson.mesh(us, us.objects.states, function (a, b) {
                return a !== b;
            }))
            .attr("id", "state-borders")
            .attr("d", path);
    });

    function mouseover(d) {
        $('#tip-' + d.id).show();
    }

    function clicked(d) {
        var x, y, k;

        if (d && centered !== d) {
            console.log(d.statecode);

            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;
        } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
        }

        g.selectAll("path")
            .classed("active", centered && function (d) {
                return d === centered;
            });

        g.transition()
            .duration(750)
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
            .style("stroke-width", 1.5 / k + "px");
    }

    var usMap = {
        1: "AL",
        2: "AK",
        4: "AZ",
        5: "AR",
        6: "CA",
        8: "CO",
        9: "CT",
        10: "DE",
        11: "DC",
        12: "FL",
        13: "GA",
        15: "HI",
        16: "ID",
        17: "IL",
        18: "IN",
        19: "IA",
        20: "KS",
        21: "KY",
        22: "LA",
        23: "ME",
        24: "MD",
        25: "MA",
        26: "MI",
        27: "MN",
        28: "MS",
        29: "MO",
        30: "MT",
        31: "NE",
        32: "NV",
        33: "NH",
        34: "NJ",
        35: "NM",
        36: "NY",
        37: "NC",
        38: "ND",
        39: "OH",
        40: "OK",
        41: "OR",
        42: "PA",
        44: "RI",
        45: "SC",
        46: "SD",
        47: "TN",
        48: "TX",
        49: "UT",
        50: "VT",
        51: "VA",
        53: "WA",
        54: "WV",
        55: "WI",
        56: "WY",
        60: "AS",
        64: "FM",
        66: "GU",
        68: "MH",
        69: "MP",
        70: "PW",
        72: "PR",
        74: "UM",
        78: "VI"
    };

}

$(function() {
    $.ajax({
        method: 'GET',
        url: 'https://31h0fuyx4f.execute-api.us-west-2.amazonaws.com/prod/donations/deviation-difference'
    }).done(function(response){
        initialize(response);
    });

});