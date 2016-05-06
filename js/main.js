var can1;
var can2;
var ctx1;
var ctx2; //背景
var canWidth;
var canHeight;
var lastTime;
var deltaTime;
var bgPic = new Image(); //文件路径
var ane; // 海葵
var fruit;

var mom;
var baby;
//定义鼠标变量 X Y
var mx;
var my;
//定义分值计算
var data;

var wave; //白色的圈
var halo; // 大鱼吃小鱼特效
var dust;
document.body.onload = game;

function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

function init() {
    can1 = document.getElementById('canvas1'); //fishes dust ui circle
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById('canvas2'); //background ane fruits
    ctx2 = can2.getContext('2d');
    //鼠标移动事件 addEventListener是dom对象  false- 默认。事件句柄在冒泡阶段执行
    can1.addEventListener('mousemove', onMouseMove, false);
    bgPic.src = './src/background.jpg';
    canWidth = can1.width;
    canHeight = can1.height;
    //海藻
    ane = new aneObj();
    ane.init();
    //初始化果实
    fruit = new fruitObj();
    fruit.init();
    //绘制大鱼
    mom = new momObj();
    mom.init();
    //小鱼
    baby = new babyObj();
    baby.init();
    //添加小鱼尾巴数组
    // for (var i = 0; i < 8; i++) {
    //     babyTail[i] = new Image();
    //     babyTail[i].src = './src/babyTail' + i +'.png';
    // }
    //初始化鼠标位置
    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    data = new dataObj();
    
    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();

    dust = new dustObj();
    dust.init();
}

function gameloop() {
    window.requestAnimFrame(gameloop);
    var now = Date.now();
    deltaTime = now - lastTime;

    if (deltaTime > 40) {
        deltaTime = 40;
    }
    lastTime = now;
    drawBackground();
    ane.draw(); //每一帧都绘制海葵
    fruitMonitor();
    fruit.draw();
    //绘制的时候把前面的内容清除
    ctx1.clearRect(0, 0, canWidth, canHeight);
    baby.draw();
    mom.draw();

    momFruitsCollision();
    momBabyCollision();

    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}

function onMouseMove(e) {
    if (!data.gameOver) {
        if (e.offSetX || e.layerX) {
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
            // console.log('----'+mx+'-----' + my)
        }
    }

}
