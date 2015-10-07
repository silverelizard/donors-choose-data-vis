var pie;
function pieChart(state) {
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
      "canvasHeight": 250,
      "canvasWidth": 350,
      "pieOuterRadius": "88%"
    },
    "data": {
      "content": [
        {
          "label": "When's it going to be done?",
          "value": 8,
          "color": "#7e3838"
        },
        {
          "label": "Bennnnn!",
          "value": 5,
          "color": "#7e6538"
        },
        {
          "label": "Oh, god.",
          "value": 2,
          "color": "#7c7e38"
        },
        {
          "label": "But it's Friday night!",
          "value": 3,
          "color": "#587e38"
        },
        {
          "label": "Again?",
          "value": 2,
          "color": "#387e45"
        },
        {
          "label": "I'm considering an affair.",
          "value": 1,
          "color": "#387e6a"
        },
        {
          "label": "[baleful stare]",
          "value": 3,
          "color": "#386a7e"
        }
      ]
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