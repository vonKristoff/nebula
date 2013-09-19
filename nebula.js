/**
* Nebula jQuery plug-in
* Description
*
* @author Jean-Christophe Nicolas <mrjcnicolas@gmail.com>
* @homepage http://bite-software.co.uk/nebula/
* @version 0.1.0
* @license MIT http://opensource.org/licenses/MIT
* @date 2013-09-19
*/
(function($) {

$.fn.nebula = function(options){
	
	var el = $(this),
		process = new Plugin(el,options);

	window.onresize = function(){
		process.resize()
	}
			
	return this.el;	
}

var Plugin = function(me,options){

	this.config = {
		mixture:.85, // decimal of 0.1 => 0.02 // use to off balance bg base colour
		smoke:.875,
		color1: [227,192,128],//[100,180,190,.95]
		color2: [80,20,10],//[80,50,230,.02],
		density: 20 
	}
	var smoke = (1 - this.config.smoke)/10;

	this.config.color1[3] = this.config.mixture;
	this.config.color2[3] = smoke;
	
	$.extend(this.config,options);

	this.el = me;
	this.w = window.innerWidth;
	this.h = window.innerHeight;
	this.ratio = this.ratiolise();

	this.init();
}

Plugin.prototype.init = function(){

	var RadialGradient = this.buildLayers();

	this.el.css({
		'background-image': RadialGradient
	})
}

Plugin.prototype.buildLayers = function(){

	var cfg = this.config,
		num = cfg.density,
		layers = [];

	for(var i=0;i<num;i++){

		var dim = ~~(Math.random()*20) + 30,
			componants = {
			x : ~~(Math.random()*100),
			y : ~~(Math.random()*100),
			c1 : (i%2 == 0)? cfg.color1 : cfg.color1,
			c2 : cfg.color2,
			dx : dim,
			dy : ~~(dim * (1+(1-this.ratio)))
		}

		componants.c1 = this.colorMix(componants.c1);
		componants.c2 = this.colorMix(componants.c2);
		
		layers[i] = this.gradientString(componants); // toString

	}
	
	return layers.join();
}
Plugin.prototype.colorMix = function(rgb){

	var alpha = rgb[3],
		hsl = this.hsl(rgb),
		h = hsl[0],
		s = hsl[1],
		l = hsl[2];

	var nh = ~~(Math.random()*20) + h,
		ns = ~~(Math.random()*s/2) + s/2,
		nl = ~~(Math.random()*l/2) + l/2;

	var nrgb = this.rgb([nh,ns,nl]);

	nrgb[3] = alpha;

	return nrgb;
}
Plugin.prototype.gradientString = function(obj){

	var c1 = [obj.c1],
		c2 = [obj.c2];

	var str = '-webkit-radial-gradient( ';

	str += obj.x + '% ';
	str += obj.y + '%,';
	str += obj.dx + '% ';
	str += obj.dy + '%,';
	str += 'rgba(' + c1.join() + ') 10%,';
	str += 'rgba(' + c2.join() + ') 70%';

	str += ' )';

	return str;
}
Plugin.prototype.ratiolise = function(){

	var r = (this.w < this.h)? this.w/this.h : this.h/this.w;
	
	return r;
}

Plugin.prototype.resize = function(){

	this.w = window.innerWidth;
	this.h = window.innerHeight;
	this.ratio = this.ratiolise();
}

Plugin.prototype.rgbise = function(rgb){

	var r = rgb[0],
		g = rgb[1],
		b = rgb[2];

	var str = 'rgb(';

	str += r + ',';
	str += g + ',';
	str += b + ')';

	return str;

}

Plugin.prototype.rgbaise = function(rgb){

	var r = rgb[0],
		g = rgb[1],
		b = rgb[2],
		a = rgb[3];

	var str = 'rgba(';

	str += r + ',';
	str += g + ',';
	str += b + ',';
	str += a + ')';

	return str;

}


Plugin.prototype.hsl = function(rgb){

	var r1 = rgb[0] / 255;
	var g1 = rgb[1] / 255;
	var b1 = rgb[2] / 255;
	var maxColor = Math.max(r1,g1,b1);
	var minColor = Math.min(r1,g1,b1);
	//Calculate L:
	var L = (maxColor + minColor) / 2 ;
	var S = 0;
	var H = 0;
	if(maxColor != minColor){
	    //Calculate S:
	    if(L < 0.5){
	        S = (maxColor - minColor) / (maxColor + minColor);
	    }else{
	        S = (maxColor - minColor) / (2.0 - maxColor - minColor);
	    }
	    //Calculate H:
	    if(r1 == maxColor){
	        H = (g1-b1) / (maxColor - minColor);
	    }else if(g1 == maxColor){
	        H = 2.0 + (b1 - r1) / (maxColor - minColor);
	    }else{
	        H = 4.0 + (r1 - g1) / (maxColor - minColor);
	    }
	}

	L = L * 100;
	S = S * 100;
	H = H * 60;
	if(H<0){
	    H += 360;
	}

	var result = [H, S, L];
	return result;
	
}
Plugin.prototype.rgb = function(hsl){
	var h = hsl[0];
	var s = hsl[1];
	var l = hsl[2];
	
	var m1, m2, hue;
	var r, g, b;
	s /=100;
	l /= 100;
	if (s == 0)
		r = g = b = (l * 255);
	else {
		if (l <= 0.5)
			m2 = l * (s + 1);
		else
			m2 = l + s - l * s;
		m1 = l * 2 - m2;
		hue = h / 360;
		r = this.hue2rgb(m1, m2, hue + 1/3);
		g = this.hue2rgb(m1, m2, hue);
		b = this.hue2rgb(m1, m2, hue - 1/3);
	}
	return [Math.round(r), Math.round(g), Math.round(b)];
}
Plugin.prototype.hue2rgb = function(m1, m2, hue) {
	var v;
	if (hue < 0)
		hue += 1;
	else if (hue > 1)
		hue -= 1;

	if (6 * hue < 1)
		v = m1 + (m2 - m1) * hue * 6;
	else if (2 * hue < 1)
		v = m2;
	else if (3 * hue < 2)
		v = m1 + (m2 - m1) * (2/3 - hue) * 6;
	else
		v = m1;

	return 255 * v;
};

})(jQuery);