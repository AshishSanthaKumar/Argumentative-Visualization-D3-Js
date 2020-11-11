var data;
var cord=[];
const margin = {top: 10, right: 20, bottom: 50, left: 50};
const width = 1420 - margin.left - margin.right;
const height = 700 - margin.top - margin.bottom;

var svg = d3.select(".main").append("svg")
                           .attr("width", width + margin.left + margin.right)
                           .attr("height", height + margin.top + margin.bottom)
                           .append("g")
                           .attr("transform", `translate(${margin.left},${margin.top})`);
//tooltip
div = d3.select("body").append("div")
     .attr("class", "tooltip-map")
     .style("opacity", 0);

var ronaldo = svg.append("rect")
                           .attr("class","ronaldo")
                           .attr("x", -50)
                           .attr("y", -10)
                           .attr("width", 710)
                           .attr("height", 700)
                           .style("stroke","black");

var messi = svg.append("rect")
                           .attr("class","messi")
                           .attr("x", 660)
                           .attr("y", -10)
                           .attr("width", 710)
                           .attr("height", 700)
                           .style("stroke","black");

svg.append("text")
    .attr("y", 40)
    .attr("x", 120)
    .text("R O N A L D O")
    .style("color","black")
    .style("font-size","54px")
    .style("font-weight","600");
    
svg.append("text")
    .attr("y", 40)
    .attr("x", 910)
    .text("M  E  S  S  I")
    .style("color","black")
    .style("font-size","54px")
    .style("font-weight","600"); 

svg.append("text")
    .attr("y", 35)
    .attr("x", 627)
    .text("V S")
    .style("color","black")
    .style("font-size","40px")
    .style("font-weight","600"); 

//x axis label
svg.append("text")
    .attr("y", 680)
    .attr("x", 305)
    .text("Scored Goals")
    .style("color","black")
    .style("font-size","14px")
    .style("font-weight","600");

//All time goal record
svg.append("text")
    .attr("y", 90)
    .attr("x", 205)
    .text("All Time Goal Record")
    .style("color","black")
    .style("font-size","24px")
    .style("font-weight","100")
    .style("text-decoration","underline");

//Trophy cabinet
svg.append("text")
    .attr("y", 90)
    .attr("x", 955)
    .text("Trophy Cabinet")
    .style("color","black")
    .style("font-size","24px")
    .style("font-weight","100")
    .style("text-decoration","underline");

//legend rectangle
var legend = svg.append("rect")
                           .attr("x", 480)
                           .attr("y", 510)
                           .attr("width", 170)
                           .attr("height", 100)
                           .style("stroke","black")
                           .style("fill","transparent");

//legend title
svg.append("text")
                .attr("y", 530)
                .attr("x", 535)
                .text("Legend")
                .style("color","black")
                .style("font-size","18px")
                .style("font-weight","600")
                .style("text-decoration","underline");

//legend Ronaldo
svg.append("text")
                .attr("y", 560)
                .attr("x", 495)
                .text("Ronaldo")
                .style("color","black")
                .style("font-size","18px")
                .style("font-weight","100");

svg.append("circle")
        .attr("cx", 590)
        .attr("cy", 555)
        .attr("r", "6")
        .style("fill", "#69b3a2")
        .style("stroke","black")

//legend Messi
svg.append("text")
                .attr("y", 590)
                .attr("x", 495)
                .text("Messi")
                .style("color","black")
                .style("font-size","18px")
                .style("font-weight","100");

svg.append("circle")
        .attr("cx", 590)
        .attr("cy", 585)
        .attr("r", "6")
        .style("fill", "#4C4082")
        .style("stroke","black");

var myimage = svg.append('image')
        .attr('xlink:href', 'IMG/cool-svgrepo-com.svg')
        .attr('width', 200)
        .attr('height', 200)



    
document.addEventListener('DOMContentLoaded', function() {
   
        Promise.all([d3.csv('data/goat.csv')])
                .then(function(values){
        
        data = values[0];


        data.map(function(d)
        {

                cord.push({
                        "group":d.group,
                        "ronaldo":d.ronaldo,
                        "messi":d.messi
                });
         
            var x = d3.scaleLinear()
                .domain([50, 760])
                .range([ 70, 620]);

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));
                
            
                var y = d3.scaleBand()
                .range([ 100, height ])
                .domain(data.map(function(d) { return d.group; }))
                
                .padding(1);
            svg.append("g")
                .attr("transform", "translate(" + (margin.left +15) + ",0)")
                .call(d3.axisLeft(y))
                .style("font-size","12px");    
                
                
            svg.selectAll("myline")
            .data(data)
            .enter()
            .append("line")
                .attr("x1", function(d) { return x(d.ronaldo); })
                .attr("x2", function(d) { return x(d.messi); })
                .attr("y1", function(d) { return y(d.group); })
                .attr("y2", function(d) { return y(d.group); })
                .attr("stroke", "black")
                .attr("stroke-width", "3px")

             // Circles of variable 1
                svg.selectAll("mycircle")
                .data(data)
                .enter()
                .append("circle")
                    .attr("cx", function(d) { return x(d.ronaldo); })
                    .attr("cy", function(d) { return y(d.group); })
                    .attr("r", "6")
                    .style("fill", "#69b3a2")
                    .style("stroke","black")
                    .on('mouseover', function(d,i) {
                        div.html("Ronaldo: "+d.ronaldo+" goals")
                        .style("left", (d3.event.pageX + 10) + "px")
                                .style("top", (d3.event.pageY - 15) + "px")
                                .style("visibility", "visible")
                                .attr("data-html", "true");
                    })
                    .on('mousemove',function(d,i) {
                        d3.select(this).transition()
                                .duration('50')
                                .attr('opacity', '.85');
                          div.transition()
                                .duration(50)
                                .style("opacity", 1);
                        div.html("Ronaldo: "+d.ronaldo+" goals")
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 15) + "px");
                    })
                    .on('mouseout', function(d,i) {
                        d3.select(this).style("stroke", 'black').style("stroke-width", 1);
                        div.style("visibility", "hidden");
                });

                // Circles of variable 2
                svg.selectAll("mycircle")
                .data(data)
                .enter()
                .append("circle")
                    .attr("cx", function(d) { return x(d.messi); })
                    .attr("cy", function(d) { return y(d.group); })
                    .attr("r", "6")
                    .style("fill", "#4C4082")
                    .style("stroke","black")
                    .on('mouseover', function(d,i) {
                        div.html("Messi: "+d.messi+" goals")
                        .style("left", (d3.event.pageX + 10) + "px")
                                .style("top", (d3.event.pageY - 15) + "px")
                                .style("visibility", "visible")
                                .attr("data-html", "true");
                    })
                    .on('mousemove',function(d,i) {
                        d3.select(this).transition()
                                .duration('50')
                                .attr('opacity', '.85');
                          div.transition()
                                .duration(50)
                                .style("opacity", 1);
                        div.html("Messi: "+d.messi+" goals")
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 15) + "px");
                    })
                    .on('mouseout', function(d,i) {
                        d3.select(this).style("stroke", 'black').style("stroke-width", 1);
                        div.style("visibility", "hidden");
                });
        })

})
});