# jquery.ranges


This is a tiny jquery library that adds functionality for slider <tt>UI</tt> widget on your current/next web site/app


## Browser Support

There have been tests on several UAs and the outcomes look very good for the following:

* IE 6+
* FF 3+
* Chrome 2+
* Opera 5+
* Saf 3+

## Getting  Started

Setting up `jquery.ranges` in your projects is really very easy with just 3 steps:

* First, you install the jquery library into your project page
* Then, install the plugin script 
* Finally, use it and reuse it! 

```
<!DOCTYPE html>
    <html lang="en" dir="ltr">
        <head>
          <meta charset="utf-8" />
		  <title> jQuery Ranges Plugin v0.0.4 </title>
		  
		  <link href="path/to/dist/jquery.ranges.min.css" rel="stylesheet" type="text/css" />
		  
          <script src="path/to/lib/jquery.js"></script> 
          <script src="path/to/dist/jquery.ranges.min.js"></script>
		  
		  <script type="text/javascript">
	         /*!
			  * NOTE: The values for options {max} and {min} are not absolute values for the bounds of the slider. 
              *       you can apply a factor to these values to 'scale' things up a bit. In the example	below, the 		  
			  *       upper bound of the slider is 30000 and the lower bound is 0. This is calculated by multiplying 
			  *       the {max} by the {scale} and thereafter multplying the {min} by the {scale} respectively. 
			  *       The current value is not the value of the {vals} option per say but {vals} multipled by {scale}. 
              *
			  *       Also, you can modify the value of the {step} option to create a 'jumping' slider
			  */
	 
	         $('#ranges-widget').ranges({
			     max:1000,
				 min:0,
	             vals:10,
		         scale:30,
				 step:2,
		         allowArrow:false // i don't want an arrow to show up on the slider pin!!
	         });
			
		 </script>
		 
        </head>
	    <body>
		    <div id="ranges-widget">
			
			</div>
		</body>
</html>	
```
  
## Documentation 

There are a couple of option settings which you can pass to *jquery.ranges* while activating it and they are as listed below
 
 1. <em>max<em> (Type: **Number** | DefaultValue: `100`)
 2. <em>min</em> (Type: **Number** | DefaultValue: `0`)
 3. <em>vals</em> (Type: **Number** | DefaultValue: `0`)
 4. <em>scale</em> (Type: **Number** | DefaultValue: `10`)
 5. <em>step</em> (Type: **Number** | DefaultValue: `1`)
 6. <em>arrowSize</em> (Type: **Number** | DefaultValue: `8`)
 7. <em>allowArrow</em> (Type: **Boolean** | DefaultValue: `true`)
 8. <em>pinEvents</em> (Type: **Object** | DefaultValue: `{pinDragStart:function(){}, pinDragOn:function(){}, pinDragStop:function(){}}`)
 
The **Pin Events** are the latest addition to the ranges plugin. They enable you to track and work with the dragging actions performed
on the slider *pin*. There are 3 of these events as you can see above [pinDragStart], [pinDragOn], [pinDragStop]. These events can come
in handy when you wish to make your app much more interactive. 

Also, you have the ability to set options after initialization (works only for the *vals* option for now) e.g. 

`$('.ranges').ranges("vals", 450);`

## UMD Support

You can also use this plugin in multiple development environments such as  non-modular, CommonJS/NodeJS and AMD. You don't need to worry
about browserify support. you can go ahead and use it in your browserify projects. But, you won't be getting it from the npm registry though.

## Enhancements

You can play around with the CSS file *jquery.ranges.css* to change the LAF of the widget. You can optionally override class styles
by defining your rule sets below and/or after the link to the CSS file. Enjoy!
 