var dustObj = function () {
	this.x = [];
	this.y = [];
	this.amp = [];
	this.NO = [];
	this.alpha = 0;
}
dustObj.prototype.num = 30;

dustObj.prototype.init = function(){
	for(var i = 0; i <this.num;i++){
		this.x[i] = Math.random()*canWidth;
		this.y[i] = Math.random() * canHeight;
		this.amp[i] = 20 + Math.random() * 15 ;
		this.NO[i] = Math.floor(Math.random() * 7);
	}
	this.alpha = 0 ;
}

dustObj.prototype.draw = function(){
	for(var i = 0; i <this.num;i++){
       // ctx1.drawImage(dustPIC[this.NO[i]],this.x[i]+this.amp[i],this.y[i]);

	}
}