/**************************************************************************
 * Copyright © 2013 @cdv code labs All Rights Reserved.                   *
 *                                                                        *
 * @APIurl http://cproscodedev.com.ng/projects/js/ranges                  *
 * @licence:  MIT                                                         *
 * @package jQuery Plugin                                                 *
 *                                                                        *
 * File: jquery.ranges.js                                                 *
 * Author(s): Ifeora Okechukwu (@isocroft - member Codedev Team)          *
 * Version: 0.1                                                           *
 * Date Created: 04/03/2013                                               *
 * Date Last Modified: 04/04/2014                                         *
 * Date Released: 00/00/0000                                              *
 *                                                                        *
 * Redistribution and use in source and binary forms, with or without     *
 * modification, are permitted under open source licensing terms          *
 *                                                                        *
 *                                                                        *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND AUTHORS ON AN   *
 * "AS IS" BASIS HENCE ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,      *
 * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND      * 
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE *
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,    *
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES               *
 **************************************************************************/

 

;(function($,w,undefined){

  'use strict';
  
  $.fn.ranges = function(options){
   
      
    if($.rangeSet !== undefined){
	       return;
	  }

    if(!$.isPlainObject(options)){
        options = {};
        $.rangeSet = false;
		} 
		 
	   
	 
	   var __defaults = {
	           step:1,
             max:100, 
						 min:0, 
						 vals:0,
						 scale:10,
						 roundValues:true, // used to make fractional output or whole output on the input textbox
						 allowArrow:true, // used to make the arrow visible or not
						 inputEditable:false, // set if the input will be editable
						 pinClass:'pin', // set the pin class
						 boxClass:'box', // set the wrapper of the (input-tag) and (input-text)
					   inputTagClass:'tag', // used to style the span just in front of the input
						 arrowSize:8,  // used to set the size of the arrow
						 inputClass:'text', // used to set the class for input textbox
                         stripClass:'strip' // used to set the class for the strip that grows along with the pin
					},			
	     $opts = $.extend({},__defaults, options),
		 diff = $opts.max - $opts.min,  /* difference in limits (lower bound and upper bound) */
		 options = (($opts.vals >= $opts.min && $opts.max >= $opts.vals) && (diff % $opts.step == 0) && $opts) || null,
		 
		 $opts = null;
		 
		 $.rangeSet = true;	 // cache the fact that we have indeed initialised    	 	   
		   
   
         return $(this).each(function(index){
	   
             var $frag = document.createDocumentFragment(),
			     value = options.vals, /* value point */
		         ratio = value/diff * 100, /* percentage ratio value */
			     drag_active = false, /* are we draging? well, for now NO! */
		         x = 0, /* reference to the pin */
                 $view = $('<div>').attr("class",'ranges-input-'+options.boxClass),			 
				 $widget = $(this).attr('role','application').css({position:"relative"}),
				 $wrapper_id = "aria-ranges-"+($widget[0].id || "widget"),
				 $wrapper = $('<div id='+$wrapper_id+' class="ranges-wrapper"></div>'),                 
                 wid = parseInt($widget.css("width")), 
                 hgt = parseInt($widget.css("height")), 
				 widgOffsetWidth = $widget.outerWidth(),
                 qtrwidth = (0.25 * wid),
                 qtrheight = (0.25 * hgt),
                 hlfwidth = qtrwidth * 2,
                 hlfheight = qtrheight * 2,
                 pinheight = hgt,
				 pxwid = (ratio/100) * wid,
				 pinHalfEffectiveWidth = 0.5*(parseInt(pinheight)),
				 left = pxwid - pinHalfEffectiveWidth, 
				 $pin = $('<a>').css({width:(pinheight-2)+"px",height:(pinheight-2)+"px",display:"block",textDecoration:"none",position:"absolute",left:left+"px",top:"0px",margin:"0px",padding:"0px",border:"1px solid transparent"}),
				 $slidr = $('<div>').css({height:hlfheight+"px",position:"relative",padding:"0px",margin:qtrheight+"px 0px "+qtrheight+"px 0px",width:((parseInt($pin.css('left')) + pinHalfEffectiveWidth))+"px",border:"none"}),
				 $arrw = $('<span>'),
				 minLeft = (0 - pinHalfEffectiveWidth),
				 maxLeft = (minLeft + wid),
				 setObjPoints = function($jq1, $jq2, offset){    
					 left = ((offset) <= minLeft)? minLeft : ((offset >= maxLeft) ? maxLeft : offset); /* include step functionality here later */
					 value = ((left + pinHalfEffectiveWidth) / wid) * diff;
					 $slidr.attr('aria-value', value); 
					 ratio = (value/diff) * 100;
		             $jq1.css('left', left+"px");
					 $jq2.css('width',(left+pinHalfEffectiveWidth)+"px");
					 $('input.ranges-input-'+options.inputClass).val((options.roundValues)? Math.round(options.scale * value) : options.scale * value);
					 
		         };
				 
				 
				 $view.html('<span class="ranges-input-'+options.inputTagClass+'"></span><input type="text" value="'+((options.roundValues)? Math.round(options.scale * value) : options.scale * value) +'" '+(options.inputEditable? 'readonly="readonly"': '')+' tabindex='+index+' class="ranges-input-'+options.inputClass+'" />');
                 
				 
				 $arrw.addClass('arrow-ranges').addClass('arrow-ranges-n');
				 $arrw.css({color:'#666666',borderWidth:options.arrowSize+'px',borderBottomColor:'#999999',borderBottomStyle:'solid',borderBottomWidth:options.arrowSize+'px',left:(pinHalfEffectiveWidth - 10)+"px"})
				 
				 $pin.attr("class", 'ranges-'+options.pinClass);
				 $pin.attr("href", "javascript:void(0);");
				 $pin.attr("click", "return false;");
                 $pin.attr("role","pin");
				 
				 if(options.allowArrow){
				    $arrw.appendTo($pin);
				 }

				 $slidr.attr("class",'ranges-'+options.stripClass);
         $slidr.attr("role","slider");         
				 $slidr.attr('aria-value', options.vals);
				
				 $frag.appendChild($slidr[0]);
				 $frag.appendChild($pin[0]); 
        $widget[0].appendChild($frag);
				 
				 $widget.wrap($wrapper);
				 $('.ranges-wrapper').append($view);
				 
		
				 
				 $pin.on('mousedown', function(e) {	
                       var t = e.clientX,
					   handler = function(e){
            	                setObjPoints($pin, $slidr, (e.clientX-pinHalfEffectiveWidth)); 									 
            	       };				   
	                   if(!drag_active) drag_active = true;
               x = this;
					     left = parseInt($(x).css('left'));
				       x.ondragstart = function(){ return false;  }; // inhibit (Firefox, IE) drag 'n drop wahala!!!
				       if(drag_active){
				             if($.throttle){ // if Ben Alman's --throttle & debounce-- is available to jQuery, then use it
                                   $(document).bind('mousemove.rangespl', $.throttle(10, true, handler)); 
					         }else{
					               $(document).bind('mousemove.rangespl', function(ev){  handler(ev); }); // namespace the event to avoid conflict with other plugins
					         }
					    }
                       			
				});
				
				
				$(document).on('mouseup', function(e){
				    
				     if(drag_active)
					     drag_active = false; 
						 
					if(!drag_active){
					    $(document).unbind("mousemove.rangespl");       
					}
					
				});
       });
	   
	}
	
}(jQuery, this));

