var socket;
var isMobile = false;

$(function() {

	try
	{
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
			isMobile = true;
		};

		if(screen.width < 767) {
	       $('head').append('<link href="/client/libs/bootstrap/css/bootstrap-responsive.min.css" type="text/css" rel="stylesheet" />');
	       $(".gridster,#reports,#reports .masonry").css({"width":$(document).width()-70});
	    }

	    window.on("resize",function(){
	    	if(screen.width < 767) {
		       //$('head').append('<link href="/client/libs/bootstrap/css/bootstrap-responsive.css" type="text/css" rel="stylesheet" />');
		       $(".gridster,#reports,#reports .masonry").css({"width":$(document).width()-70});
		    }
	    })

		/*$(window).bind('orientationchange', function(e, onready){
		   if(onready){
		       //$(document.body).addClass('portrait-onready');
		   }
		   if (Math.abs(window.orientation) != 90){
		       //$(document.body).addClass('portrait');
		       $("meta[name=viewport]").attr("content","width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no");
		   } 
		   else {
		   		$("meta[name=viewport]").attr("content","width=device-width, initial-scale=0.8,maximum-scale=0.8, user-scalable=no");
		       //$(document.body).removeClass('portrait').removeClass('portrait-onready');
		   }
		});
		$(window).trigger('orientationchange', true); */
	}
	catch(e)
	{

	}
	

	var sparkLines = $('.inlinesparkline');
	if(sparkLines.length)
	{
		sparkLines.sparkline('html',{width:170,
		tooltipFormat:$.spformat('<span style="color: {{color}}"></span> {{prefix}}<span class="yekan">{{y}}</span>{{suffix}}</span>', 'tooltip-class'),
		tooltipPrefix:"میزان مصرف : ",tooltipSuffix:" مگابایت",height:100,fillColor:"#8dbe2e",lineColor:"#fff",lineWidth:2,highlightLineColor:"#fff"}); 
	}
	
	var header = $('.navbar');

	$(window).scroll(function(e){
		if(!$.browser.msie || ($.browser.msie && $.browser.version >8))
	    if(header.offset().top > 5){
	        if(!header.hasClass('shadow')){
	            header.addClass('shadow');
	            header.fadeTo('slow',.9);
	        }
	    }else if(header.hasClass('shadow')){
	        header.removeClass('shadow');
	        header.fadeTo('slow',1);
	    }
	});

	/*var knobs = $(".knob");
	if(knobs.length)
	{
		knobs.knob();
	}*/

	var isotopElement = $('.gridster');

	if(isotopElement.length)
	{
		isotopInitialization(isotopElement);
	}

	loginTransition();

	if(typeof(Highcharts) != "undefined")
	{
		Highcharts.setOptions({
		lang: {
				resetZoom:"بزرگنمایی اولیه"
			}
		});	
	}

	/*var helpControl = $("#control");
	var isHelpInside = false;
	if(helpControl)
	{
		helpControl = $(helpControl[0]);
		var pageDocument = $(document); 
		$(window).on("mousemove",function(e){
			if( !isHelpInside && e.clientX > pageDocument.width() - 200)
			{
				isHelpInside = true;
				helpControl.css("top",(pageDocument.height()-helpControl.height())*.5)
				helpControl.animate({"right":"-2px"});
			}
			else if(isHelpInside == true && e.clientX < pageDocument.width() - 200)
			{
				helpControl.animate({"right":"-200px"});
				isHelpInside = false;
			}
		});
	}*/
	
});


function loginTransition()
{
	loginView = $("#view").get(0);
	if(loginView)
	{
		loginView = $(loginView);
		loginView.css("opacity",0);
		loginView.css("top",100);

		$(window).load(function(){
			setTimeout(function(){
				loginView.animate({opacity:1,top:0});	
			},500);
			
		});
	}
	else
	{
			//172.16.12.22
			/*$.getScript(socketPath, function(data, textStatus, jqxhr) {

				//// [socket
			   	try{
			   		socket = io.connect(socketServer);
				   	socket.on('poll', function (data) 
				   	{
					    if(data != null && data.poll != null)
					    {
					    	var p = chart.series[0].points;
					    	var arr = [];
					    	while(p.length > 0)
					    	{
					    		var o = p.shift();
					    		if(o.name == data.title)
					    			o.y++;
					    		arr.push([o.name, o.y]);	
					    	}
					    	chart.series[0].setData(arr);
					    }
					});
				
			   	}catch(e){}
			   	//// socket] 
			});*/
	}
}

function dashboardHelp()
{
	/*$('#widget-cdr').popover({title:"میزان مصرف",content:"نمودار میزان مصرف، جزئیات مصرف اینترنت شما را در بازه ۱۰ روز گذشته نمایش میدهد."})
	$('#widget-cdr').on("mouseenter",function(){
		$('#widget-cdr').popover('show');
	});

	$('#widget-cdr').on("mouseleave",function(){
		$('#widget-cdr').popover('hide');
	});*/
}

function isotopInitialization(isotopElement)
{
	var gridsterContainer = $(".gridster>ul");
	var gridsterElements = $(".gridster>ul>li");
	var gridster = gridsterContainer.gridster({
        widget_margins: [6, 6],
        widget_base_dimensions: [144, 144]
    }).data('gridster');

    var lastPosition = {x:0,y:0};
    var lastClickType = 1;

    if(isMobile) {
		gridster.disable();
	}

    gridsterElements.bind("mousedown",function(e)
    {
    	lastPosition.x = e.pageX;
    	lastPosition.y = e.pageY;
    	lastClickType = e.which;
    });

    gridsterElements.bind("mouseup",function(e)
    {
    	if(e.pageX == lastPosition.x && e.pageY ==lastPosition.y)
    	{
    		var url = $(e.currentTarget).data("url");
    		if(url && lastClickType == 1)
    		{
    			window.location = url;
    		}
    	}
    	else
    	{

    	}
    });

    var filterKeys = $('.filter-keys');

    if(filterKeys.length)
    {
    	filterKeys.click(function(e){
    		var target = $(e.target);
    		var targetItem;
    		if(target)
    		{
    			items = target.data("value");
    			var container = filterKeys.data("container");
    			$("#"+container+" li").each(function(index,item){
    				item = $(item);
    				if(item.hasClass(items))
    				{
    					
    					if(!targetItem)
    					{
    						targetItem = item;
    					}
    					item.fadeTo(500,1);
    				}
    				else
    				{
    					item.fadeTo(500,.2);
    				}

    			});


    			if(targetItem)
    			{
    				$('html, body').animate({
                    	scrollTop: targetItem.offset().top-100
                	}, 500);	
    			}
    			
    		}
    	});
    }
}

function highChartsJalaliFormatter()
{
	var date = new Date(this.value);
	var jalaliDate = {
		day:date.getJalaliDate(),
		dayTitle:JalaliDate.j_days_in_persian[date.getJalaliDay()],
		monthTitle:JalaliDate.j_months_in_persian[date.getJalaliMonth()+1],
		year:date.getJalaliFullYear()
	}
	
    return jalaliDate.monthTitle+" "+jalaliDate.day;
}


jQuery.extend({
    stringify  : function stringify(obj) {         
        if ("JSON" in window) {
            return JSON.stringify(obj);
        }

        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';

            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") {
                        v = '"' + v + '"';
                    } else if (t == "object" && v !== null){
                        v = jQuery.stringify(v);
                    }

                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }

            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
});
