var pie;
function pieChart(state, data) {
  var colorMap = ["#7e3838", "#7e6538", "#7c7e38", "#587e38", "#387e45", "#387e6a", "#386a7e", "#daca61"];
  var content = [];
  for(var i=0; i<data.length; i++) {
    content.push({
      "label": data[i].primary_focus_area,
      "value": parseFloat(data[i].total),
      "color": colorMap[i]
    });
  }
  pie = new d3pie("pie-chart", {
    "header": {
      "title": {
        "text": state + " Spending by Category",
        "fontSize": 14,
        "font": "verdana"
      },
      "titleSubtitlePadding": 12
    },
    "size": {
      "canvasHeight": 300,
      "canvasWidth": 500,
      "pieOuterRadius": "88%"
    },
    "data": {
      "content": content
    },
    "labels": {
      "outer": {
        "pieDistance": 32
      },
      "inner": {
        "format": "percentage",
        "hideWhenLessThanPercentage": "10"
      },
      "mainLabel": {
        "font": "verdana"
      },
      "percentage": {
        "color": "#e1e1e1",
        "font": "verdana",
        "decimalPlaces": 0
      },
      "lines": {
        "enabled": true,
        "color": "#cccccc"
      },
      "truncation": {
        "enabled": true
      }
    },
    "effects": {
      "pullOutSegmentOnClick": {
        "effect": "linear",
        "speed": 400,
        "size": 8
      }
    }
  });
}