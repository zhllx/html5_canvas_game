var aneObj = function() {
    // this.x = [];
    // this.len = [];
    //摆动 start point , control point end point(sin)
    this.rootx=[];//绘制贝塞尔曲线x 起始点
    this.headx=[];//贝塞尔曲线x y结束点
    this.heady=[];
    this.alpha=0; //定义角度
    this.amp = []; //来回摆动（正负）
}
aneObj.prototype.num = 50;
//初始化
aneObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        // this.x[i] = i * 16 + Math.random() * 20;
        // this.len[i] = 200 + Math.random() * 50;
        this.rootx[i] = i * 16 + Math.random() * 20;
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 250 + Math.random()*50; 
        this.amp[i] = Math.random() * 20 +20;
    }
};
aneObj.prototype.draw = function() {
     this.alpha += deltaTime*0.001 ;
     var l = Math.sin(this.alpha);  //控制左右摆动速度 （也就是alpha 变化数值不要太大）
     
    ctx2.save();
    ctx2.lineWidth = 20;
    ctx2.lineCap = 'round';
    ctx2.strokeStyle = '#3b154e';
    ctx2.globalAlpha = 0.6;
    for (var i = 0; i < this.num; i++) {
         this.headx[i]=this.rootx[i] + l * this.amp[i];
         
        ctx2.beginPath(); //起始一条路径，或重置当前路径（没有重置，如果有多个颜色，会被覆盖，都是最后一种颜色）
        ctx2.moveTo(this.rootx[i], canHeight); //开始一条路径，必须放在最前面
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 150,this.headx[i],this.heady[i]);//(control point x ,y, end point(sin) x,y)
        // ctx2.lineWidth=20;
        // ctx2.lineCap='round';
        // ctx2.strokeStyle = '#3b154e';
        // ctx2.globalAlpha = 0.6;

        ctx2.stroke();
    }
    ctx2.restore();
}
