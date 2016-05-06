//一个池子，闲置的就会被执行圈圈

var haloObj = function() {
        //x y 位置
        this.x = [];
        this.y = [];
        this.alive = []; // 状态
        this.r = []; //半径
    }
    //数量
haloObj.prototype.num = 10;

haloObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.r[i] = 0;
    }
}
haloObj.prototype.draw = function() {
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            // console.log(this.alive[i]);
            this.r[i] += deltaTime * 0.05;
            if (this.r[i] > 50) {
                this.alive[i] = false;
                break;
            }
            var alpha = 1 - this.r[i] / 50;
            ctx1.save();
            ctx1.lineWidth = 2;
            ctx1.shadowBlur = 10;
            ctx1.shadowColor = 'white';

            // ctx1.strokeStyle = "rgba(203,91,0" + alpha + ")";
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            ctx1.closePath();
            ctx1.strokeStyle = "rgba(203,91,0," + alpha + ")";

            ctx1.stroke();
            ctx1.restore();
        }


    }
}
haloObj.prototype.born = function(x, y) {
    for (var i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
            this.alive[i] = true;
            //碰撞时果实的坐标
            this.x[i] = x;
            this.y[i] = y;
            this.r[i] = 10;
            return;
        }

    }
}
