NEBULA
======

Generating a multi-layered composite of CSS radial-gradients - resembling the awesomness of deep space.
Currently Stars are not included in this version

<a href='http://bite-software.co.uk/nebula'>Plugin Site</a>

BASIC USAGE:
```javascript
$('.element').plugin({
	color1,
	color2,
	density,
	stars,
	smoke,
	mixture
});
```
<h1>config options:</h1>

| Option             | data type      | values               | Required | Nb.      								  | 
| ------------------ |----------------|----------------------|----------|-----------------------------------------|
| colour1  			 | array (rgb)    | [227,192,128] 	     | Yes      |      									  |       
| colour2	         | array (rgb)    | [10,150,200]         | Yes      |     									  |        
| density 			 | int            | 1 -> 100 	 	     | No       | number of generations					  |        
| smoke				 | float          | 0.0 -> 1.0   	     | No       | opacity of smoke    				      |
| mixture			 | float          | 0.0 -> 1.0   	     | No       | sensitivity for overlaying of colours   |
| stars				 | int	          | 0	-> 1000   	     | No       | generates a subtle starfield on the BG  |        


<h1>HTML setup</h1>
```html
<body></body>
```
Easy for a background. Or try it on a div tag ..

Dont forget to set the default 'body' CSS background-color property!

<h1>usage example</h1>
```javascript
$('body').nebula({
	color1:[227,192,128],
	color2:[80,20,10],
	stars:false,
	density:30,
	smoke:.8,
	mixture:.9
});
```