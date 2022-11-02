let thomas;
let headExtend;
function setup() {
  createCanvas(displayWidth, displayHeight);
  thomas = new Thomas(displayWidth/2, displayHeight/2);
  frameRate(60);
  headExtend =false;
}

function draw() {
  if (!headExtend)
    background(128);

  thomas.display();
  thomas.move();
  

}

function mouseClicked(){
  headExtend = !headExtend;
}
class Thomas{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.faceRadius = 200/2;
    this.eyeSize = 60;
    this.mouthOffsetY = 40;
    this.originSpeed = 8;
    this.xSpeed = this.originSpeed;
    this.ySpeed = this.originSpeed;
    this.x_dir = 0;   // 0 for plus
    this.y_dir = 0;   // 0 for plus
    this.faceColor = [200,200,200];
    this.angular = 0.05;
  }
  display(){
    angleMode(degrees);
    translate(this.x,this.y);
    rotate(this.angular)

    stroke(0);
    fill(this.faceColor);
    ellipse(0,0,200);
    
    stroke(0);
    fill(255);
    ellipse(-50,-25,this.eyeSize);
    ellipse(0+50,0-25,this.eyeSize);

    noStroke();
    fill(0);
    
    ellipse(0-50, 0-25,30);
    ellipse(0+50, 0-25,30);

    // nose
    stroke(128)
    fill(this.faceColor);
    arc(0, 0+10, 60, 60, (270+50)/180*PI, (270-50)/180*PI, OPEN);

    stroke(0);
    noFill();
    curve( 0, 0-40, 0-40, 0+this.mouthOffsetY, 0+40, 0+this.mouthOffsetY, 0, 0-40);
    this.angular += 0.05;
  }

  move(){
    this.x = this.x_dir ? this.x - this.xSpeed: this.x + this.ySpeed;
    this.y = this.y_dir ? this.y - this.xSpeed: this.y + this.ySpeed;
    // collision
    let collision = false;
    if (this.x + this.faceRadius > displayWidth){
      this.x_dir = 1;
      this.xSpeed = random(this.originSpeed-3,this.originSpeed+3);
      collision = true;
    }
    else if(this.x - this.faceRadius < 0) {
      this.x_dir = 0;
      this.xSpeed = random(this.originSpeed-3,this.originSpeed+3);
      collision = true;
    }
    if (this.y + this.faceRadius > displayHeight){
      this.y_dir = 1;
      this.ySpeed = random(this.originSpeed-3,this.originSpeed+3);
      collision = true;
    }
    else if (this.y - this.faceRadius < 0){
      this.y_dir = 0;
      this.ySpeed = random(this.originSpeed-3,this.originSpeed+3);
      collision = true;
    }
    if (collision) this.faceColor = [random(160,240),random(160,240),random(160,240)];
  }
}