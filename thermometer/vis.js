var w = window.innerWidth/1.2;
var h = window.innerHeight/1.5;

/* scale for thermometer 
 * input domain is the Celsius scale (-30°C to 60°C)
 * output range extend is the height of the rect.thermometer 
 */
var scale = d3.scale.linear().domain([0,90]).range([0,h/1.1]);   

// scale for yAxis label
var yAxis = d3.scale.linear().domain([0,90]) .range([h/1.1,0]);  

d3.select("article").append("svg").attr({width: w, height: h})

.append("rect").classed("thermometer",true)
	.attr({
		width: 20,
		height: h/1.1,
		rx: 10, 
		ry: 10,
		x: 100,
		y: 10
	});
	
	var svg2 = d3.select("article svg");
	
	
	svg2.append("g") .attr("transform", "translate(50,10)")
		.call(d3.svg.axis().scale(yAxis).orient("right").ticks(10));
		
	var article = d3.select("svg");	

var displayText = function(string){			
	d3.select("#raised")
		.text(function(){
			return string;
		});
};

function displayTemp(temp){

	var temperature = [scale(temp)];
			
	var mercuryDiv = article.selectAll("rect.mercury")
		.data(temperature, function(d){return d;});			

	mercuryDiv
		.enter()
		.append("rect")
		.classed("mercury",true)
		.attr({
			y: function(d){
				return   h/1.1 + d + 10;	
			},
			height: - h/1.1,
			x: 101,
			rx: 10, 
			ry: 10,
			width: 18
		});
	
	mercuryDiv
		.exit().remove();
		
	mercuryDiv
		.transition()
		.attr({
			y: function(d){
				return  h/1.1 - d + 10;	
			},
			height: function(d){
				return d;
			}
		})
		.duration(1000);

	displayText(temp);


}
