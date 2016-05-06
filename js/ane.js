var aneObj = function() {
    // this.x = [];
    // this.len = [];
    //�ڶ� start point , control point end point(sin)
    this.rootx=[];//���Ʊ���������x ��ʼ��
    this.headx=[];//����������x y������
    this.heady=[];
    this.alpha=0; //����Ƕ�
    this.amp = []; //���ذڶ���������
}
aneObj.prototype.num = 50;
//��ʼ��
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
     var l = Math.sin(this.alpha);  //�������Ұڶ��ٶ� ��Ҳ����alpha �仯��ֵ��Ҫ̫��
     
    ctx2.save();
    ctx2.lineWidth = 20;
    ctx2.lineCap = 'round';
    ctx2.strokeStyle = '#3b154e';
    ctx2.globalAlpha = 0.6;
    for (var i = 0; i < this.num; i++) {
         this.headx[i]=this.rootx[i] + l * this.amp[i];
         
        ctx2.beginPath(); //��ʼһ��·���������õ�ǰ·����û�����ã�����ж����ɫ���ᱻ���ǣ��������һ����ɫ��
        ctx2.moveTo(this.rootx[i], canHeight); //��ʼһ��·�������������ǰ��
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 150,this.headx[i],this.heady[i]);//(control point x ,y, end point(sin) x,y)
        // ctx2.lineWidth=20;
        // ctx2.lineCap='round';
        // ctx2.strokeStyle = '#3b154e';
        // ctx2.globalAlpha = 0.6;

        ctx2.stroke();
    }
    ctx2.restore();
}
