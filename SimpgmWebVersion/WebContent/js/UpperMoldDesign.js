// *******************************************************************
// ****************** Variable Declaration ***************************
// *******************************************************************
var poly1, poly2, poly3, poly4, a, b, c, d, e, f;
var objectArray = [];
var circleArray = [];
var xVal50PointsArray = [];
var yVal50PointsArray = []
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
var x_RF_surf_upp_Mold = 0;
var y_RF_surf_upp_Mold = 0;
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
//****************** Generating Coordinates ***************************
//*******************************************************************
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
	    }else{
	    	var object1 = {"x": x_surf_1_upp_Mold*1e-3, "y": y_surf_1_upp_Mold*1e-3};
	    	if(i == 0 || i == (N_surf_upp_Mold-2)){
	    		circleArray.push(object1);
	    	}
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

circleArray.push({"x":x_RF_surf_upp_Mold, "y": (y_RF_surf_upp_Mold-RF_surf_upp_Mold)});
circleArray.push({"x":D_1_upp_Insert/2, "y": (y_RF_surf_upp_Mold-RF_surf_upp_Mold)});
circleArray.push({"x":D_1_upp_Insert/2, "y": y_RF_surf_upp_Mold-RF_surf_upp_Mold-(H_upp_Mold-H_upp_Insert)});
circleArray.push({"x":D_upp_Mold/2, "y": y_RF_surf_upp_Mold-RF_surf_upp_Mold-(H_upp_Mold-H_upp_Insert)});
circleArray.push({"x":D_1_upp_Insert/2, "y": (y_RF_surf_upp_Mold-RF_surf_upp_Mold+H_upp_Insert)});
circleArray.push({"x":D_1_upp_Insert/2, "y": (y_RF_surf_upp_Mold-RF_surf_upp_Mold+H_upp_Insert)});

//*******************************************************************
//****************** printing/ debugging ****************************
//*******************************************************************
console.log(Math.min.apply(null,xVal50PointsArray));
console.log(Math.max.apply(null,xVal50PointsArray));
console.log(Math.min.apply(null,yVal50PointsArray));
console.log(Math.max.apply(null,yVal50PointsArray));
console.log(circleArray);
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
		  
		  var div = d3.select("body").append("div")	
		    .attr("class", "tooltip")				
		    .style("opacity", 0);
 
		  var svgContainer = d3.select(el[0]).append("svg")
		    .attr("width", 1050)
		    .attr("height",1070);
		  //************ polygon draw ***************************
		  function drawPoly (poly1,poly2,poly3){
			 
			 
			 d3.selectAll("g").remove();
			 var drawPolygon1 = svgContainer.append("g")
		        .selectAll("polygon")
		        .data([objectArray])
		        .enter().append("polygon")
		        .attr("points",function(d) {
		        	return d.map(function(d) { return [scaleX(d.x),scaleY(d.y)].join(","); }).join(" ");})
		        .attr("stroke","black")
		        .attr("fill","LightGray")
		        .attr("fill-opacity",0)
		        .attr("stroke-width",2);
		  }
		  
		  //************ circle draw ********************************
		  function drawCircle (){
			  svgContainer.append("g")
			  	.selectAll("dot")
			  	.data(circleArray)
			  	.enter().append("circle")
			  		.attr("r", 5)
			  		.attr("cx", function (d) {return scaleX(d.x); })
			  		.attr("cy", function (d) {return scaleY(d.y); })
			  		.attr("fill", "blue")
			  		.on("mouseover", function(d) {		
			            div.transition()		
			                .duration(200)		
			                .style("opacity", .9);		
			            div	.html(d.x + "<br/>"  + d.y)	
			                .style("left", (d3.event.pageX) + "px")		
			                .style("top", (d3.event.pageY - 28) + "px");	
			            })					
			        .on("mouseout", function(d) {		
			            div.transition()		
			                .duration(500)		
			                .style("opacity", 0);	
			        });
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
			  drawCircle();
		  },true);
		  
	}
	return {
		link: link,
		restrict: 'E',
		scope: { data: '=' }
	};
});

