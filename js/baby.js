var babyObj = function() {
    this.x;
    this.y;
    this.angle;
    // this.babyEye = new Image();
    this.babyEye = [];
    for (var i = 0; i < 2; i++) {
        this.babyEye[i] = new Image();
    }

    // this.babyBody = new Image();
    this.babyBody = [];
    for (var i = 0; i < 20; i++) {
        this.babyBody[i] = new Image();
    }

    // this.babyTail = new Image();
    this.babyTail = [];
    for (var i = 0; i < 8; i++) {
        this.babyTail[i] = new Image();
        // this.babyTail[i].src = './src/babyTail' + i +'.png';
    }

    //定义小鱼尾巴计时器
    this.babyTailTimer = 0;
    this.babyTailCount = 0;
    //定义小鱼眼睛计时器
    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000; //时间间隔
    //定义小鱼身体计时器
    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
}
babyObj.prototype.init = function() {
    this.angle = 0;
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    // this.babyEye.src = './src/babyEye0.png';
    for (var i = 0; i < 2; i++) {
        this.babyEye[i].src = './src/babyEye' + i + '.png';
    }
    // this.babyBody.src = './src/babyFade0.png';
    for (var i = 0; i < 19; i++) {
        this.babyBody[i].src = './src/babyFade' + i + '.png';
    }
    // this.babyTail.src = './src/babyTail0.png';
    for (var i = 0; i < 8; i++) {
        this.babyTail[i].src = './src/babyTail' + i + '.png';
    }
}
babyObj.prototype.draw = function() {

    //lerp x y :一个值趋向一个目标值（小鱼跟着大鱼移动）
    //lerpDistance 是 commonFunction里封装好的一个函数
    this.x = lerpDistance(mom.x, this.x, 0.98);
    this.y = lerpDistance(mom.y, this.y, 0.98);

    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    // var beta = Math.atan2(deltaY, deltaX);
    var beta = Math.atan2(deltaY, deltaX) + Math.PI //-PI PI
        //lerpAngle(目标值，当前值，系数) 是 commonFunction里封装好的一个函数
    this.angle = lerpAngle(beta, this.angle, 0.6)

    //baby tail count
    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8; //变量一直都是 0-7 循环
        this.babyTailTimer %= 50; //每加一针 对计时器复原

    }
    //baby eye
    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval) {
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        // console.log(this.babyEyeCount+'---this.babyEyeCount----');
        this.babyEyeTimer %= this.babyEyeTimer;
        if (this.babyEyeCount == 1) {
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        } else {
            this.babyEyeInterval = 200;
        }
    }
     this.babyBodyTimer += deltaTime;
     // console.log(this.babyBobyTimer);
     if(this.babyBodyTimer > 300){
        this.babyBodyCount += 1;
        this.babyBodyTimer = 0 ;
        if (this.babyBodyCount >18) {
            this.babyBodyCount = 18;

            //game over
            data.gameOver = true ;
        } 
     }
     // console.log(this.babyBodyCount);
// console.log(this.babyEyeCount+'---this.babyEyeCount----');
//  console.log(this.babyBodyCount+'-----3');
    ctx1.save();
    ctx1.translate(this.x, this.y); //定义坐标
    ctx1.rotate(this.angle); //旋转 要在定义了坐标之后
    ctx1.drawImage(this.babyTail[this.babyTailCount], -this.babyTail[this.babyTailCount].width * 0.5 + 23, -this.babyTail[this.babyTailCount].height * 0.5);
    ctx1.drawImage(this.babyBody[this.babyBodyCount], -this.babyBody[this.babyBodyCount].width * 0.5, -this.babyBody[this.babyBodyCount].height * 0.5);
    ctx1.drawImage(this.babyEye[this.babyEyeCount], -this.babyEye[this.babyEyeCount].width * 0.5, -this.babyEye[this.babyEyeCount].height * 0.5);

    ctx1.restore();
}
