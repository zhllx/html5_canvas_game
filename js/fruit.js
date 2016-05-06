var fruitObj = function() {
    this.alive = []; //布尔值
    this.x = [];
    this.y = [];
    this.aneNo = []; //用来获取摇摆的海藻当前key
    this.l = []; //图片从小到大
    this.spd = []; //定义速度
    this.fruitType = []; //果实类型
    this.orange = new Image();
    this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNo[i] = 0;
        this.fruitType[i] = '';
        this.spd[i] = Math.random() * 0.017 + 0.002;
        this.born(i);
        

    }
    this.orange.src = './src/fruit.png';
    this.blue.src = './src/blue.png';
}
fruitObj.prototype.draw = function() {
    for (var i = 0; i < this.num; i++) {
        // this.l[i] += 0.01*deltaTime;
        // ctx2.drawImage(this.orange, this.x[i] - this.orange.width * 0.5, this.y[i] - this.orange.height * 0.5);
        if (this.alive[i]) {
        	if (this.fruitType[i] == 'blue') {
        		var pic = this.blue;
        	}else{
        		var pic = this.orange ;
        	}
            if (this.l[i] <= 14) {
                this.l[i] += this.spd[i] * deltaTime;
                this.x[i] = ane.headx[this.aneNo[i]];
                this.y[i] = ane.heady[this.aneNo[i]];
                ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            } else {
                this.y[i] -= this.spd[i] * 7 * deltaTime;
                ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
                
            }
            // console.log(this.x[i]);
            // ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);

            if (this.y[i] < 10) {
                this.alive[i] = false;
            }
        }


    }
}
fruitObj.prototype.born = function(i) {
    // var aneId = Math.floor(Math.random() * ane.num);
    // this.x[i] = ane.headx[aneId];
    // this.y[i] = ane.heady[aneId];
    this.aneNo[i] = Math.floor(Math.random() * ane.num);
    this.l[i] = 0;
    this.alive[i] = true;
    var ran = Math.random();
    if (ran > 0.2) {
        this.fruitType[i] = 'blue';
    } else {
        this.fruitType[i] = 'orange';
    }
   // console.log(this.x[i]);
}
//星星被吃了，变成false
fruitObj.prototype.dead = function(i){
     this.alive[i] = false;
}
function fruitMonitor() {
    var num = 0;
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) num++
    }
    if (num < 15) {
        sendFruit();
        return;
    }
}

function sendFruit() {
    for (var i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {
            fruit.born(i);
            return;
        }


    }
}
