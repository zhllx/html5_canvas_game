var dataObj = function() {
    this.gameOver = false;
    this.score = 0;
    this.fruitNum = 0; //吃到的果实总量
    this.double = 1; //判断吃到的果实颜色
    this.alpha = 0; // 控制透明度
}
dataObj.prototype.reset = function() {
    this.fruitNum = 0;
    this.double = 1;
    // console.log('--re-'+this.fruitNum);
};
//绘制分数
dataObj.prototype.draw = function() {
    //显示吃到的果实数量，绘制在canvas1上
    // console.log(this.double);
    var w = can1.width;
    var h = can1.height;
    ctx1.save();
    ctx1.shadowBlur = 20;
    ctx1.shadowColor = '#EF3131';　　
    ctx1.font = "40px Verdana";
    ctx1.fillStyle = 'white';
    ctx1.textAlign="center";
    // ctx1.fillText('num: ' + this.fruitNum, w * 0.4, h * 0.1);
    // ctx1.font = "30px Verdana";
    ctx1.fillText('score: ' + 　this.score, w * 0.5, h * 0.8);
    if (data.gameOver) {
        this.alpha += deltaTime * 0.0005;
        if (this.alpha > 1) {

            this.alpha = 1;
        }
        ctx1.fillStyle = 'rgba(255,255,255,' + this.alpha + ')';
        ctx1.fillText('game over', w * 0.5, h * 0.3)
    }
    ctx1.restore();

}
dataObj.prototype.addScore = function() {
    this.score += this.fruitNum * 100 * this.double;
    // console.log('--sc-'+this.fruitNum);
    this.reset();
    // this.fruitNum = 0; //吃到的果实总量
    // this.double = 1 ;//判断吃到的果实颜色
    // console.log('---'+this.fruitNum);
}
