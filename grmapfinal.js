
// Create map instance
var chart = am4core.create("mapfinal", am4maps.MapChart);
chart.homeZoomLevel = 0.8;
// Set map definition
chart.geodata = am4geodata_greeceHigh;

// Set projection
chart.projection = new am4maps.projections.Miller();
 // Add zoom control
chart.zoomControl = new am4maps.ZoomControl();
chart.zoomControl.align = "right";
chart.zoomControl.marginRight = 15;
chart.zoomControl.valign = "middle";
chart.zoomEasing = am4core.ease.sinOut;


// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;
var backgroundColor = am4core.color("#004b76");
polygonSeries.interpolationDuration = 3;
var polygonTemplate = polygonSeries.mapPolygons.template;
// ...;
polygonTemplate.events.on("hit", function (ev) {
  ev.target.series.chart.zoomToMapObject(ev.target);
});

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.fill = am4core.color("#e5e5e5");
polygonTemplate.fillOpacity = 1;

// Create image series
var imageSeries = chart.series.push(new am4maps.MapImageSeries());
imageSeries.dataFields.value = "total_confirmed_cases";

// Create a circle image in image series template so it gets replicated to all new images
var imageSeriesTemplate = imageSeries.mapImages.template;
var circle = imageSeriesTemplate.createChild(am4core.Circle);
circle.radius = 4;
circle.fill = am4core.color("#f14038");
circle.fillOpacity = 0.7;
circle.stroke = am4core.color("#fff");
circle.strokeWidth = 2;
circle.strokeOpacity = 0.7;
circle.nonScaling = true;
circle.tooltipText = `[bold]Δομή {name_gr}
{region_gr} [/]
---------------
Κρούσματα COVID19: {total_confirmed_cases}
Χωρητικότητα : {capacity}
Αριθμός Tests: {total_samples}
Τελευταία ενημέρωση: {last update}
`;

// Set property fields
imageSeriesTemplate.propertyFields.latitude = "latitude";
imageSeriesTemplate.propertyFields.longitude = "longtitude";

// Enable OverlapBuster / configure images
imageSeriesTemplate.layout = "absolute";
imageSeriesTemplate.isMeasured = true;
var overlap = chart.plugins.push(new am4plugins_overlapBuster.OverlapBuster());
overlap.targets.push(imageSeries.mapImages.template);

// Set heat rules
imageSeries.heatRules.push({
  target: circle,
  min: 8,
  max: 26,
  property: "radius"
});
	// top title
	var title = chart.titles.create();
	title.fontSize = "1em";
	title.text = "Στατιστικά στις Δομές Φιλοξενίας Προσφύγων";
	title.align = "left";
	title.horizontalCenter = "left";
	title.marginLeft = 25;
	title.paddingBottom = 20;
	title.fill = am4core.color("#ffffff");
	title.y = 10;

// switcher 0 cases
var zeroSwitch = chart.createChild(am4core.SwitchButton);
zeroSwitch.align = "right"
zeroSwitch.y = 0;
zeroSwitch.leftLabel.text = "Δομές με COVID19";
zeroSwitch.leftLabel.fill = am4core.color("#f14038");
zeroSwitch.rightLabel.fill = am4core.color("#f14038");
zeroSwitch.rightLabel.text = "Ενσωμάτωση 0";
zeroSwitch.rightLabel.interactionsEnabled = true;
zeroSwitch.leftLabel.fontSize = "0.8em";
zeroSwitch.rightLabel.fontSize = "0.8em";
AmCharts.ready(function() {

    var serialChart = new AmCharts.AmSerialChart();
    //serialChart.dataProvider = chartData[0];
    serialChart.categoryField = "date";
    serialChart.startDuration = 1;
    serialChart.sequencedAnimation = false;
    
    // VALUE AXIS
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 0.15;
    valueAxis.minimum = 0;
    valueAxis.dashLength = 3;
    serialChart.addValueAxis(valueAxis);
    
    // GRAPH
    var graph = new AmCharts.AmGraph();
    graph.type = "column";
    graph.valueField = "confirmed";
    graph.fillAlphas = 0.6;
    //graph.balloonText = "[[value]] confirmed";
    serialChart.addGraph(graph);
    
    // WRITE
    serialChart.write("chartdiv");
    
    window.serialChart = serialChart;
    });

