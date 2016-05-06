var momObj = function() {
    this.x;
    this.y;
    this.angle; //大鱼跟随鼠标产生的角度
    // this.bigEye = new Image();
    // this.bigBody = new Image();
    // this.bigTail = new Image();

    this.bigEye = [];
    //定义大鱼眼睛计时器
    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000; //时间间隔

    this.bigBody = [];
    this.bigBodyOra = [];
    this.bigBodyBlue = [];
    this.momBodyTimer = 0;
    this.momBodyCount = 0;

    this.bigTail = [];
    this.momTailTimer = 0;
    this.momTailCount = 0;


}
momObj.prototype.init = function() {
        this.x = canWidth * 0.5;
        this.y = canHeight * 0.5;
        this.angle = 0;

        // this.bigEye.src = './src/bigEye0.png';
        for (var i = 0; i < 2; i++) {
            this.bigEye[i] = new Image();
            this.bigEye[i].src = './src/bigEye' + i + '.png';

        }
        this.bigBody.src = './src/bigSwim0.png';

        for (var i = 0; i < 8; i++) {

            // this.bigBody[i] = new Image();
            this.bigBodyOra[i] = new Image();
            this.bigBodyBlue[i] = new Image();
            this.bigBodyOra[i].src = './src/bigSwim' + i + '.png';
            this.bigBodyBlue[i].src = './src/bigSwimBlue' + i + '.png';
        }


        // this.bigTail.src = './src/bigTail0.png';
        for (var i = 0; i < 8; i++) {
            this.bigTail[i] = new Image();
            this.bigTail[i].src = './src/bigTail' + i + '.png';

        }
    }
    //大鱼绘制在canvas1上
momObj.prototype.draw = function() {
    //lerp x y :一个值趋向一个目标值（小鱼跟着鼠标移动）
    //lerpDistance 是 commonFunction里封装好的一个函数
    this.x = lerpDistance(mx, this.x, 0.99);// mx my 在mian.js里。为鼠标位置
    this.y = lerpDistance(my, this.y, 0.99);
    //delta angle  
    //Math.atan2(y,x) 反正切
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    // var beta = Math.atan2(deltaY, deltaX);
    var beta = Math.atan2(deltaY, deltaX) + Math.PI //-PI PI
        //lerpAngle(目标值，当前值，系数) 是 commonFunction里封装好的一个函数
    this.angle = lerpAngle(beta, this.angle, 0.6);
    //eye
    this.momEyeTimer += deltaTime;
    if (this.momEyeTimer > this.momEyeInterval) {
        this.momEyeCount = (this.momEyeCount + 1) % 2;
        // console.log(this.babyEyeCount+'---this.babyEyeCount----');
        this.momEyeTimer %= this.momEyeTimer;
        if (this.momEyeCount == 1) {
            this.momEyeInterval = Math.random() * 1500 + 2000;
        } else {
            this.momEyeInterval = 200;
        }
    }

    //body
    // if(data.double = 1){
    //         this.bigBody[this.momBodyCount].src =  './src/bigSwim' + this.momBodyCount + '.png';
      
    // }else{
        
    //         this.bigBody[this.momBodyCount].src =  './src/bigSwimBlue' + this.momBodyCount + '.png';
    // }

    //Tail
    this.momTailTimer += deltaTime;
    if (this.momTailTimer > 50) {
        this.momTailCount = (this.momTailCount + 1) % 8;
        this.momTailTimer %= 50;
    }

    ctx1.save();
    ctx1.translate(this.x, this.y); //定义坐标
    ctx1.rotate(this.angle); //旋转 要在定义了坐标之后
    // ctx1.drawImage(this.bigTail, -this.bigTail.width * 0.5 + 30, -this.bigTail.height * 0.5);
    // ctx1.drawImage(this.bigBody, -this.bigBody.width * 0.5, -this.bigBody.height * 0.5);
    // ctx1.drawImage(this.bigEye, -this.bigEye.width * 0.5, -this.bigEye.height * 0.5);
    ctx1.drawImage(this.bigTail[this.momTailCount], -this.bigTail[this.momTailCount].width * 0.5 + 30, -this.bigTail[this.momTailCount].height * 0.5);
   
    if(data.double == 1){
      ctx1.drawImage(this.bigBodyOra[this.momBodyCount], -this.bigBodyOra[this.momBodyCount].width * 0.5, -this.bigBodyOra[this.momBodyCount].height * 0.5);  
    }else{
      ctx1.drawImage(this.bigBodyBlue[this.momBodyCount], -this.bigBodyBlue[this.momBodyCount].width * 0.5, -this.bigBodyBlue[this.momBodyCount].height * 0.5);  
    }
    // ctx1.drawImage(this.bigBody[this.momBodyCount], -this.bigBody[this.momBodyCount].width * 0.5, -this.bigBody[this.momBodyCount].height * 0.5);
    ctx1.drawImage(this.bigEye[this.momEyeCount], -this.bigEye[this.momEyeCount].width * 0.5, -this.bigEye[this.momEyeCount].height * 0.5);

    ctx1.restore();
}
