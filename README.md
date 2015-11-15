# jquery.ranges

This is a tiny jquery library that adds functionality for slider <tt>UI</tt> widget on your next web site/app


Browser Support
-------------

There have been tests on several UAs and the outcomes look very good for the following:

* IE 6+
* FF 3+
* Chrome 2+
* Opera 5+
* Saf 3+

Getting  Started
----------------

Setting up `jquery.ranges` in your projects is really very easy with just 3 steps:

* First, you install the jquery library into your project page
* Then, install the plugin script 
* Finnaly, 

<pre class="language-javascript">
 <code>
  <!DOCTYPE html>
    <html lang="en">
        <head>
          <meta charset="utf-8" />
		  <title> jQuery Ranges </title>
		  
          <script src="path/to/lib/jquery.js"></script> 
          <script src="dist/jquery.ranges.min.js"></script>
		  
		  <link href="dist/jquery.ranges.min.css" rel="stylesheets" type="text/css" />
	      
		  <script type="text/javascript">
	 
	         $('#ranges-widget').ranges({
			     max:1000,
				 min:0,
	             vals:10,
		         scale:30,
		         allowArrow:false
	         });
			
		 </script>
		 .
		 .
		 .
        </head>
	    <body>
		    <div id="ranges-widget">
			
			</div>
		</body>
	</html>	
  </code>
</pre>
  
Documentation 
-------------

There are a couple of option settings which you can pass to *jquery.ranges* while 
 activating it and they are as listed below
 
 - <em>max<em> (Type: Number | DefaultValue: `100`)
 - <em>min</em> (Type: Number | DefaultValue: `0`)
 - <em>vals</em> (Type: Number | DefaultValue: `0`)
 - <em>scale</em> (Type: Number | DefaultValue: `10`)
 - <em>step</em> (Type: Number | DefaultValue: `1`)
 - <em>allowArrow</em> (Type: Boolean | DefaultValue: `true`)
 - <em>pinEvents</em> (Type: Object | DefaultValue: `{pinDragStart:function(){}, pinDragOn:function(){}, pinDragStop:function(){}}`)