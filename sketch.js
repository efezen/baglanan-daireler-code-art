const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
  animate: true,
};

const sketch = () => {
  let circles = [];
  for (let i = 0; i < 100; i++) {
    circles.push(
      new Circle(Math.random() * 2048, Math.random() * 2048, Math.random() * 20)
    );
  }
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";
    context.lineWidth = 12;

    for (let i = 0; i < circles.length; i++) {
      const circle1 = circles[i];
      for (let j = i + 1; j < circles.length; j++) {
        const circle2 = circles[j];
        const dist = getDistance(circle1.x, circle2.x, circle1.y, circle2.y);

        if (dist < 250) {
          context.lineWidth = 10 -dist/25;
          context.beginPath();
          context.moveTo(circle1.x, circle1.y);
          context.lineTo(circle2.x, circle2.y);
          context.stroke();
        }
      }
    }
    context.lineWidth = 8;
    circles.forEach((circle) => {
      circle.draw(context);
      circle.move(context);
      circle.bounce(width, height);
    });
  };
};

const getDistance = (x1, x2, y1, y2) => {
  const a = x1 - x2;
  const b = y1 - y2;
  return Math.sqrt(a * a + b * b);
};

canvasSketch(sketch, settings);

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = Math.random() * 4 - 2;
    this.velocityY = Math.random() * 4 - 2;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = "white";
    context.fill();
  }

  move() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
  bounce(width, height) {
    if (this.x <= 0 || this.x >= width) {
      this.velocityX *= -1;
    }
    if (this.y <= 0 || this.y >= height) {
      this.velocityX *= -1;
    }
  }
}
