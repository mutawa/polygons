"use strict";

const points = [{x:290, y:90},{x:540,y:90},{x:600,y:340}];
let maxPoints = 6;
let paint = "gold";
let scl = 1;
function setup() {
    createCanvas(900, 900);
}

function draw() {
    scale(scl);
    background(52);
    text(maxPoints , 20,20);
    const gold = color(paint);
    gold.setAlpha(180);
    noFill();
    stroke("red");
    beginShape();
    points.forEach(pt => { vertex(pt.x, pt.y); });
    endShape(CLOSE);

    
    if (checkInside({x:mouseX, y:mouseY},points)){
        fill("cyan");
        text("inside",30,30);
    } else {
        fill("orange");
        text("outside", 50,50);
    }
   
}

function checkInside(point, polygon)
{
    if(polygon.length < 3) return false;
    let pgn = [...polygon];
    let a0, a1, a2, a3;
    let cnt = 0;
    const p1 = polygon[0];    
    const last = pgn[polygon.length-1];
    if(!(p1.x===last.x && p1.y === last.y)) { pgn.push(p1); }
    for(let i=1; i < pgn.length -2; i++)
    {
        
        const p2 = pgn[i];
        const p3 = pgn[i+1];
        stroke(200);
        //line(p1.x, p1.y, point.x, point.y);
        //line(p2.x, p2.y, point.x, point.y);
        //line(p3.x, p3.y, point.x, point.y);

        a0 = getArea(p1,p2,p3);

        a1 = getArea(p1,p2,point);
        a2 = getArea(p1,point,p3);
        a3 = getArea(point,p2,p3);
        noStroke();
        text(a0, 200,30);
        text(a1, 200,50);
        text(a2, 200,70);
        text(a3, 200,90);
        text((a1+a2+a3), 200,120);

        if (a1+a2+a3 === a0) { 
            stroke(200,100,20,100);
            fill(20,20,100,40);
            cnt++;
            
        } else {
            stroke(200,100,100,40);
            noFill();
        }
        triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        
        
    }
    text(cnt, 200,150);
    return cnt%2===1;
}


function getArea(p1,p2,p3) {
    return abs(.5 * (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)));
}

function keyPressed() {
    if(key === " ") { maxPoints += 1; }
    else if (key === "u") { scl += 0.1; }
}

function mousePressed()
{
    if(points.length<maxPoints) {
        points.push({x:mouseX, y:mouseY});
    }
    
}
