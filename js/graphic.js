//jquery shorthand
var $graphic = $('#graphic');
//base colors
var colors = {
    'red1': '#6C2315', 'red2': '#A23520', 'red3': '#D8472B', 'red4': '#E27560', 'red5': '#ECA395', 'red6': '#F5D1CA',
    'orange1': '#714616', 'orange2': '#AA6A21', 'orange3': '#E38D2C', 'orange4': '#EAAA61', 'orange5': '#F1C696', 'orange6': '#F8E2CA',
    'yellow1': '#77631B', 'yellow2': '#B39429', 'yellow3': '#EFC637', 'yellow4': '#F3D469', 'yellow5': '#F7E39B', 'yellow6': '#FBF1CD',
    'teal1': '#0B403F', 'teal2': '#11605E', 'teal3': '#17807E', 'teal4': '#51A09E', 'teal5': '#8BC0BF', 'teal6': '#C5DFDF',
    'blue1': '#28556F', 'blue2': '#3D7FA6', 'blue3': '#51AADE', 'blue4': '#7DBFE6', 'blue5': '#A8D5EF', 'blue6': '#D3EAF7'
};

/*
 * Render the graphic
 */
//check for svg
$(window).load(function() {
    draw_graphic();
});

function draw_graphic(){
    if (Modernizr.svg){
        $("#graphic1").empty();
        var width = $graphic.width();
        render(width);
        window.onresize = draw_graphic; //very important! the key to responsiveness
    }
}

function render(width) {


/////data example//////
var us = [{"year":2012,"vep_highest":0.58},
    {"year":2010,"vep_highest":0.409},
    {"year":2008,"vep_highest":0.616},
    {"year":2006,"vep_highest":0.404},
    {"year":2004,"vep_highest":0.601},
    {"year":2002,"vep_highest":0.395},
    {"year":2000,"vep_highest":0.542},
    {"year":1998,"vep_highest":0.381},
    {"year":1996,"vep_highest":0.517},
    {"year":1994,"vep_highest":0.411},
    {"year":1992,"vep_highest":0.581},
    {"year":1990,"vep_highest":0.384},
    {"year":1988,"vep_highest":0.528},
    {"year":1986,"vep_highest":0.381},
    {"year":1984,"vep_highest":0.552},
    {"year":1982,"vep_highest":0.421}];

var ca = [{"year":2012,"vep_highest":0.551},
    {"year":2010,"vep_highest":0.44},
    {"year":2008,"vep_highest":0.609},
    {"year":2006,"vep_highest":0.402},
    {"year":2004,"vep_highest":0.588},
    {"year":2002,"vep_highest":0.361},
    {"year":2000,"vep_highest":0.557},
    {"year":1998,"vep_highest":0.435},
    {"year":1996,"vep_highest":0.537},
    {"year":1994,"vep_highest":0.469},
    {"year":1992,"vep_highest":0.603},
    {"year":1990,"vep_highest":0.424},
    {"year":1988,"vep_highest":0.557},
    {"year":1986,"vep_highest":0.434},
    {"year":1984,"vep_highest":0.572},
    {"year":1982,"vep_highest":0.487}];


    var caColor = colors.red1;
    var usColor = "#f4cec6";

    //us
    var graphic1 = d3.custom.lineChart()
        .yAccess(function(d) {return +d.vep_highest; })
        .yMax(1)
        .hover("false")
        .yAxisFormat(d3.format("%"))
        .strokeColor(usColor)
        .yAxisLabel("Voter Turnout")
        .strokeWidth(4)
        .aspect(16,9)
        .margin({top:40, left: 65, right: 15, bottom: 20})
        .mobileThreshold(500)
        .tickSize(12)
        ;

    d3.select("#graphic1")
        .datum(us)
        .call(graphic1);

    //california
    var secondLine = d3.custom.addLine()
        .xAccess(function(d) { return d.year; })
        .yAccess(function(d) { return +d.vep_highest; })
        .strokeColor(caColor)
        .yMax(1)
        .strokeWidth(4)
        .margin({top:40, left: 65, right: 15, bottom: 20})
        ;

    d3.select('#graphic1')
        .datum(ca)
        .call(secondLine);


    //legend code

    var lineColor = { "line1" : usColor, "line2": caColor };

    var spacing = 150;

    var legend = d3.selectAll("svg").append("g")
        .attr("class", "legend")
        .attr("height", 100)
        .attr("width", 400)
        .attr("transform", "translate(60,30)");

    legend.selectAll("rect")
        .data(["line1", "line2"])
        .enter().append("rect")
            .attr("x", function(d, i) { return i * spacing; })
            .attr("y", -25)
            .attr("width", 20)
            .attr("height", 20)
            .style("fill", function(d, i){
                var color = lineColor[d];
                return color;
            });

    legend.selectAll("text")
        .data(["United States", "California"])
        .enter().append("text")
            .text(function(d){ return d; })
        .attr("x", function(d, i){ return 25 + i * spacing; })
        .attr("y", -25)
        .attr("text-anchor", "start")
        .attr("dy", "1.1em");


}//end function render    





