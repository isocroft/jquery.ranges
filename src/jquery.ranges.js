/**************************************************************************
 * Copyright © 2013-2016 @cdv code labs All Rights Reserved.              *
 *                                                                        *
 * @APIurl http://cproscodedev.com.ng/projects/js/ranges                  *
 * @licence:  MIT                                                         *
 * @package jQuery Plugin                                                 *
 *                                                                        *
 * File: jquery.ranges.js                                                 *
 * Author(s): Ifeora Okechukwu (@isocroft - http://twitter.com/isocroft)  *
 * Version: 0.0.4                                                         *
 * Date Created: 04/03/2013                                               *
 * Date Last Modified: 27/01/2016                                         *
 * Last Released: 28/01/2016                                              *
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

 ;(function(factory){

     /* UMD (Universal Module Definition) */
	 
     if(typeof define == "function" && "amd" in define){
	      define(['jquery'], factory);
	 }
	 if(typeof module != "undefined" && typeof module.exports == "object"){
	     factory(require('jquery'));
	 }
	 if(this.window === this && this.jQuery){
	     factory(this.jQuery);
	 }
	 
}(function($,undefined){

  'use strict';
  
  $.fn.ranges = function(options){
   
   
    if(!$.isPlainObject(options)){
        if($(this.selector).data("rangeSet")){ // we have initialized before...
		    if(typeof options == "string"){
			     var secondArg = (arguments[1] != null || typeof arguments[1] != "undefined")? arguments[1] : "";
				 return $(this.selector).prop(options, secondArg);
			}else{
			    throw new TypeError("invalid first argument to ranges object");
			}
		}else{
		    options = {};
		}
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
                         stripClass:'strip', // used to set the class for the strip that grows along with the pin
						 pinEvents:{
						     pinDragStart:function(){},
							 pinDragOn:function(){},
							 pinDragStop:function(){}
						 }
					},			
	                $opts = $.extend(__defaults, options, true),
		            diff = $opts.max - $opts.min,  /* difference in limits (lower bound and upper bound) */
		            options = (($opts.vals >= $opts.min && $opts.max >= $opts.vals) && (diff % $opts.step == 0) && $opts) || null,
		 
		 $opts = null;
		 	   	 	   
		 $(this.selector).data("rangeSet", false);   
   
         return $(this).each(function(index){
	   
             var $frag = document.createDocumentFragment(),
			     value = options.vals, /* value point */
		         ratio = value/diff * 100, /* percentage ratio value */
			     drag_active = false, /* are we draging? well, for now NO! */
		         x = 0, /* reference to the pin */
                 $view = $('<div>').attr("class",'ranges-input-'+options.boxClass),			 
				 $widget = $(this).attr('role','application').css({position:"relative"}),
				 $wrapper_id = "aria-ranges-"+($widget[0].id || "widget"),
				 $wrapper = $('<div id='+$wrapper_id+' class="ranges-wrapper"></div>');
				 
				 $widget.data("rangeSet", true); // cache the fact that we have indeed initialised  
                 $widget.wrap($wrapper);
                 
           var   wid = parseInt($widget.css("width")), 
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
				 $slidr = $('<div>').css({height:hlfheight+"px",position:"relative",padding:"0px",margin:qtrheight+"px 0px "+qtrheight+"px 0px",width:((parseInt($pin.css('left')) + pinHalfEffectiveWidth ))+"px",border:"none"}),
				 $arrw = $('<span>'),
				 minLeft = (0 - pinHalfEffectiveWidth),
				 maxLeft = (minLeft + wid),
				 setObjPoints = function($jq1, $jq2, offset){    
				     left = ((offset) <= minLeft)? minLeft : ((offset >= maxLeft) ? maxLeft : offset-pinHalfEffectiveWidth); /* include step functionality here later */
					 value = ((left + pinHalfEffectiveWidth) / wid) * diff;
					 $jq2.attr('aria-value', value); 
					 ratio = (value/diff) * 100;
		             $jq1.css('left', left+"px");
					 $jq2.css('width',(left+pinHalfEffectiveWidth)+"px");
					 $('input.ranges-input-'+options.inputClass).val((options.roundValues)? Math.round(options.scale * value) : options.scale * value);
					 return value; 
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
				 
				 $($widget[0].parentNode).append($view);
				 
				 if(!('vals' in $.propHooks)){
					 $.propHooks.vals = { // setting and getting slider value...
						get:function(elem){
						   var $slid = $(elem).find('[role="slider"]').eq(0);
						   return parseFloat($slid.attr('aria-value'));
						},
						set:function(elem, val){
						    val = parseInt(val) || 0;
							var $pn = $(elem).find('[role="pin"]').eq(0);
							var $slid = $(elem).find('[role="slider"]').eq(0);
							setObjPoints($pn, $slid, (val-$pin.width()));
						}
					 };
				 }	 
					 
		         $pin.on('mousedown', function(e){	
				       var handler = function(e){
					            var _event = $.Event( "pindragon" ), _offset = (e.clientX-$pin.width());
								_event.value = setObjPoints($pin, $slidr, _offset); // [_offset] will constantly center the [$pin] underneath the mouse pointer!
								$(document).trigger(_event);								
            	       }, event = $.Event( "pindragstart" );		
                        					   
	                   if(!drag_active) drag_active = true;
                            x = this;
					        left = parseInt($(x).css('left'));
				            x.ondragstart = function(){ return false;  }; // inhibit (Firefox, IE) drag 'n drop wahala!!!
								if(drag_active){
								    event.value = $widget.prop('vals');
									$(document).trigger(event);
									if($.throttle){ // if Ben Alman's --throttle & debounce-- is available to jQuery, then use it
										 $(document).bind('mousemove.rangespl', $.throttle(10, true, handler)); 
									}else{
										 $(document).bind('mousemove.rangespl', function(ev){  handler(ev); }); // namespace the event to avoid conflict with other plugins
									}
								}
                       			
				});
				
				
				$(document)
				.on('pindragstart', options.pinEvents.pinDragStart)
				.on('pindragon', options.pinEvents.pinDragOn)
				.on('pindragstop', options.pinEvents.pinDragStop)
				.on('mouseup', function(e){
				    
				     if(drag_active){
					     drag_active = false;
						 $(this).trigger('pindragstop');
                     }						 
						 
					if(!drag_active){
					    $(document).unbind("mousemove.rangespl");       
					}
					
				});
       });
	   
	}

}));

