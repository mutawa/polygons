"use strict";

const points = [];
let maxPoints = 3;

function setup() {
    createCanvas(900, 900);
}

function draw() {
    background(52);
    text(maxPoints , 20,20);
    const gold = color("gold");
    gold.setAlpha(180);
    fill(gold);
    stroke("red");
    beginShape();
    points.forEach(pt => { vertex(pt.x, pt.y); });
    endShape(CLOSE);
   
}

function keyPressed() {
    if(key === " ") { maxPoints += 1; }
}

function mousePressed()
{
    if(points.length<maxPoints) {
        points.push({x:mouseX, y:mouseY});
    }
    
}
