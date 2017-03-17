// *******************************************************************
// ****************** Variable Declaration ***************************
// *******************************************************************
var poly1, poly2, poly3, poly4, a, b, c, d, e, f;
var objectArray = [];
var width = height = 1000;
var xVal50PointsArray = yVal50PointsArray = [];
// ** Parameters for Upper Mold Surface Design ***
var D_surf_upp_Mold		=	10.74;
var N_surf_upp_Mold		=	50 ;

//***
var RF_surf_upp_Mold = 0;
var R_surf_upp_Mold		=	12.5;
var K_surf_upp_Mold		=	-6.84734e-1;
var A2_surf_upp_Mold	=	0;
var A4_surf_upp_Mold	=	-7.0626e-4;
var A6_surf_upp_Mold	=	3.36564e-5;
var A8_surf_upp_Mold	=	-1.27834e-6;
var A10_surf_upp_Mold	=	3.47264e-8;
var A12_surf_upp_Mold	=	0;
var A14_surf_upp_Mold	=	0;
var A16_surf_upp_Mold	=	0;
var A18_surf_upp_Mold	=	0;
var A20_surf_upp_Mold	=	0;

//*** Parameters for Upper Mold Design (mm) ***
var D_upp_Insert		=	35	*1e-3;   //#a
var D_1_upp_Insert		=	32	*1e-3;
var H_upp_Insert		=	15	*1e-3;	
var H_1_upp_Insert		=	8	*1e-3;     //#e
var D_upp_Sleeve_1          =       32      *1e-3;
var H_upp_Sleeve_1          =       15      *1e-3 ;  
var H_1_upp_Sleeve_1        =       4       *1e-3;   //#d
var D_upp_Mold		=	64	*1e-3;   //#b
var H_upp_Mold		=	15	*1e-3;   //#c 


//*** variable declaration of coordinates of the last point among 50
var x_RF_surf_upp_Mold = y_RF_surf_upp_Mold =0;

var myApp = angular.module('myApp', []);

//*******************************************************************
//****************** Generating Y coordinates ***********************
//*******************************************************************
function generatingYPoint (x,R,K,A2,A4, A6, A8, A10, A12, A14, A16, A18, A20) {
    return (Math.pow(x,2)/(R*(1+(Math.sqrt(1-(1+K)*((Math.pow(x,2))/(Math.pow(R,2)))))))
            + A2*(Math.pow(x,2)) + A4*(Math.pow(x,4)) + A6*(Math.pow(x,6)) + A8*(Math.pow(x,8))
            + A10*(Math.pow(x,10)) + A12*(Math.pow(x,12)) + A14*(Math.pow(x,14))
            + A16*(Math.pow(x,16)) + A18*(Math.pow(x,18)) + A20*(Math.pow(x,20)));
 }

//*******************************************************************
//****************** General Functions ******************************
//*******************************************************************
var bisect = d3.bisector(function (d) {
				return d;
			}).left;
//*******************************************************************
//****************** Generating Coordinates ***************************
//*******************************************************************
//loop e jamela kore rakhso
//draw gang copy niye gesila bag e
var generatingCoordinates= function(){
	for(i =0;i< N_surf_upp_Mold; i++){
		var x_surf_1_upp_Mold = i*((D_surf_upp_Mold/2)/N_surf_upp_Mold);
	    var y_surf_1_upp_Mold = generatingYPoint(x_surf_1_upp_Mold,R_surf_upp_Mold,K_surf_upp_Mold,
                						  A2_surf_upp_Mold,A4_surf_upp_Mold,A6_surf_upp_Mold,
                						  A8_surf_upp_Mold,A10_surf_upp_Mold,A12_surf_upp_Mold,
                						  A14_surf_upp_Mold,A16_surf_upp_Mold,A18_surf_upp_Mold,
                						  A20_surf_upp_Mold);
	    if(i == (N_surf_upp_Mold-1)){
	    	x_RF_surf_upp_Mold = x_surf_1_upp_Mold*1e-3;
	    	y_Rf_surf_upp_Mold = y_surf_1_upp_Mold*1e-3;
	    	xVal50PointsArray.push(x_RF_surf_upp_Mold);
	    	yVal50PointsArray.push(y_RF_surf_upp_Mold);
	    	//objectArray.push({"x": x_RF_surf_upp_Mold, "y": y_RF_surf_upp_Mold});
	    }else{
	    	var object1 = {"x": x_surf_1_upp_Mold*1e-3, "y": y_surf_1_upp_Mold*1e-3};
	  	    console.log(i + " " + x_surf_1_upp_Mold + " " + y_surf_1_upp_Mold);
	  	    xVal50PointsArray.push(x_surf_1_upp_Mold*1e-3);
	  	    yVal50PointsArray.push(y_surf_1_upp_Mold*1e-3);
	  	    objectArray.push(object1);
	    }    	    
	}
}();

//*******************************************************************
//****************** value insertion in Arrays **********************
//*******************************************************************
xVal50PointsArray.push.apply(xVal50PointsArray,[x_RF_surf_upp_Mold,D_1_upp_Insert/2,D_upp_Mold/2,0]);
yVal50PointsArray.push.apply(yVal50PointsArray,[(y_RF_surf_upp_Mold-RF_surf_upp_Mold),
		                     (y_RF_surf_upp_Mold-RF_surf_upp_Mold-(H_upp_Mold-H_upp_Insert)),
		                     (y_RF_surf_upp_Mold-RF_surf_upp_Mold+H_upp_Insert)]);
objectArray.push({"x":x_RF_surf_upp_Mold, "y": (y_RF_surf_upp_Mold-RF_surf_upp_Mold)});
objectArray.push({"x":D_1_upp_Insert/2, "y": (y_RF_surf_upp_Mold-RF_surf_upp_Mold)});
objectArray.push({"x":D_1_upp_Insert/2, "y": y_RF_surf_upp_Mold-RF_surf_upp_Mold-(H_upp_Mold-H_upp_Insert)});
objectArray.push({"x":D_upp_Mold/2, "y": y_RF_surf_upp_Mold-RF_surf_upp_Mold-(H_upp_Mold-H_upp_Insert)});
objectArray.push({"x":D_1_upp_Insert/2, "y": (y_RF_surf_upp_Mold-RF_surf_upp_Mold+H_upp_Insert)});
objectArray.push({"x":D_1_upp_Insert/2, "y": (y_RF_surf_upp_Mold-RF_surf_upp_Mold+H_upp_Insert)});
//no need because polygon --objectArray.push({"x":0, "y": 0});
//*******************************************************************
//****************** printing/ debugging ****************************
//*******************************************************************
console.log(Math.min.apply(null,xVal50PointsArray));
console.log(Math.max.apply(null,xVal50PointsArray));
console.log(Math.min.apply(null,yVal50PointsArray));
console.log(Math.max.apply(null,yVal50PointsArray));
console.log("x_RF_surf_upp_Mold " + x_RF_surf_upp_Mold);
console.log("D_1_upp_Insert/2 " + D_1_upp_Insert/2);
console.log("D_upp_Mold/2 " + D_upp_Mold/2);
console.log("y_RF_surf_upp_Mold-RF_surf_upp_Mold " + (y_RF_surf_upp_Mold-RF_surf_upp_Mold));





//*******************************************************************
//****************** scaling functions ******************************
//*******************************************************************
var scaleX = d3.scale.linear()
.domain([Math.min.apply(null,xVal50PointsArray),Math.max.apply(null,xVal50PointsArray)])
.range([500,1000]);

var scaleY = d3.scale.linear()
 .domain([Math.min.apply(null,yVal50PointsArray),Math.max.apply(null,yVal50PointsArray)])
 .range([500,0]);

var mirrorScaleX = d3.scale.linear()
.domain([Math.min.apply(null,xVal50PointsArray),Math.max.apply(null,xVal50PointsArray)])
.range([500,0]);

//*******************************************************************
//****************** Main execution Functions ***********************
//*******************************************************************
myApp.directive('donutChart',function(){
	function link(scope,el,attr){
		  
		  var svgContainer = d3.select(el[0]).append("svg")
		    .attr("width", 1200)
		    .attr("height",1000);
		  

		  
		  function showValueOnMouseMove (){
			  var focus = svgContainer.append("g")
				.attr("class", "focus")
				.style("display", "none");

			  focus.append("circle")
			  	.attr("r", 4.5);

			  focus.append("text")
			  	.attr("x", 9)
			  	.attr("dy", ".35em");
			  
			  svgContainer.append("rect")
			  				.attr("class", "overlay")
			  				.attr("width", width)
			  				.attr("height",height)
			  				.on("mouseover", function() { focus.style("display", null); })
			  				.on("mouseout", function() { focus.style("display", "none"); })
			  				.on("mousemove", mousemove);
			  
			  function mousemove(){
				  var selectedXValue = d3.mouse(this) [0];
				  var selectedYValue = d3.mouse(this) [1];
				  if (scaleX.invert(d3.mouse(this) [0]) == x_RF_surf_upp_Mold){
					  console.log("inside");
					  focus.attr("transform", "translate(" + selectedXValue + "," + selectedYValue + ")");
					  focus.select("text").text("( " + scaleX.invert(d3.mouse(this) [0]) + ", " +scaleY.invert(d3.mouse(this) [1]) + " )"); 
				  } 
			  }
		  }
		  
		  function drawPoly (poly1,poly2,poly3){
			 
			 
			 d3.selectAll("g").remove();
			 var drawPolygon1 = svgContainer.append("g")
		        //.attr("transform","scale(-1/2,1)")
		        .selectAll("polygon")
		        .data([objectArray])
		        .enter().append("polygon")
		        .attr("points",function(d) {
		        	return d.map(function(d) { return [scaleX(d.x),scaleY(d.y)].join(","); }).join(" ");})
		        .attr("stroke","black")
		        .attr("fill","LightGray")
		        .attr("fill-opacity",0)
		        .attr("stroke-width",2);
		        
			 
			 /*var testingMirrorDrawPolygon1 = svgContainer.append("g")
		        //.attr("transform","scale(-1/2,1)")
		        .selectAll("polygon")
		        .data([objectArray])
		        .enter().append("polygon")
		        .attr("points",function(d) {
		        	return d.map(function(d) { return [mirrorScaleX(d.x),scaleY(d.y)].join(","); }).join(" ");})
		        .attr("stroke","black")
		        .attr("fill","LightGray")
		        .attr("fill-opacity",.0)
		        .attr("stroke-width",2); 
			 var mirrorDrawPolygon1 = svgContainer.append("g")
		        .attr("transform","translate(220,0) scale(-1,1)")
		        .selectAll("polygon")
		        .data([poly1])
		        .enter().append("polygon")
		        .attr("points",function(d) {
		        	return d.map(function(d) { return [d.x,d.y].join(","); }).join(" ");})
		        .attr("stroke","black")
		        .attr("fill","LightGray")
		        .attr("stroke-width",2);
			 
			 var drawPolygon2 = svgContainer.append("g")
		        .attr("transform","translate(200,0)")
		        .selectAll("polygon")
		        .data([poly2])
		        .enter().append("polygon")
		        .attr("points",function(d) {
		        	return d.map(function(d) { return [d.x,d.y].join(","); }).join(" ");})
		        .attr("stroke","black")
		        .attr("fill","Plum")
		        .attr("stroke-width",2);
		    
			 var mirrorDrawPolygon2 = svgContainer.append("g")
		        .attr("transform","translate(220,0) scale(-1,1)")
		        .selectAll("polygon")
		        .data([poly2])
		        .enter().append("polygon")
		        .attr("points",function(d) {
		        	return d.map(function(d) { return [d.x,d.y].join(","); }).join(" ");})
		        .attr("stroke","black")
		        .attr("fill","Plum")
		        .attr("stroke-width",2);

			 var drawPolygon3 = svgContainer.append("g")
		        .attr("transform","translate(200,0)")
		        .selectAll("polyline")
		        .data([poly3])
		        .enter().append("polyline")
		        .attr("points",function(d) {
		        	return d.map(function(d) { return [d.x,d.y].join(","); }).join(" ");})
		        .attr("stroke","black")
		        .attr("fill","PaleGreen")
		        .attr("stroke-width",2);
		    
			 var mirrorDrawPolygon3 = svgContainer.append("g")
		        .attr("transform","translate(220,0) scale(-1,1)")
		        .selectAll("polyline")
		        .data([poly3])
		        .enter().append("polyline")
		        .attr("points",function(d) {
		        	return d.map(function(d) { return [d.x,d.y].join(","); }).join(" ");})
		        .attr("stroke","black")
		        .attr("fill","PaleGreen")
		        .attr("stroke-width",2);*/
		  }
//*******************************************************************
//****************** dynamic updates values *************************
//*******************************************************************		  
		  scope.$watch('data', function(data){
			  //console.log(data[0]);
			  a = parseInt(data [0]);
			  b = parseInt(data [1]);
			  c = parseInt(data [2]);
			  d = parseInt(data [3]);
			  e = parseInt(data [4]);
			  f = parseInt(data [5]);
			  poly1 = [{"x":(a/2), "y":10.0},
				       {"x":(b/2), "y":10.0},
				       {"x":(b/2), "y":c},
				       {"x":((a/2)-(d/2)), "y":c},
				       {"x":((a/2)-(d/2)), "y":(e+d)},
				       {"x":(a/2), "y":(e+d)}];
			  //console.log(poly1);
			  
			  poly2 = [{"x":(a/2), "y":e},
			           {"x":((a/2)-d), "y":e},
			           {"x":((a/2)-d), "y":(c+(d/2))},
			           {"x":((a/2)-(d/2)), "y":(c+(d/2))},
			           {"x":((a/2)-(d/2)), "y":c},
			           {"x":((a/2)-(d/2)), "y":(e+d)},
			           {"x":(a/2), "y":(e+d)}];
			  
			  poly3 = [{"x":10, "y":10},
			           {"x":(a/2), "y":10},
			           {"x":(a/2), "y":e},
			           {"x":((a/2)-d), "y":e},
			           {"x":((a/2)-d), "y":f},
			           {"x":10, "y":f}];
			  
			  drawPoly(poly1,poly2,poly3);	
			  showValueOnMouseMove();
		  },true);
		  
	}
	return {
		link: link,
		restrict: 'E',
		scope: { data: '=' }
	};
});

