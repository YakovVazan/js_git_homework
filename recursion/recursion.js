class SierpinskiTriangle {
  constructor(level, x, y, size) {
    this.level = level;
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw(context) {
    this.drawTriangle(context, this.level, this.x, this.y, this.size);
  }

  drawTriangle(context, level, x, y, size) {
    if (level <= 0) {
      context.beginPath();
      context.moveTo(x, y - (size * Math.sqrt(3)) / 2);
      context.lineTo(x - size / 2, y + (size * Math.sqrt(3)) / 6);
      context.lineTo(x + size / 2, y + (size * Math.sqrt(3)) / 6);
      context.closePath();
      context.fill();
    } else {
      // center
      this.drawTriangle(
        context,
        level - 1,
        x,
        y - ((size / 2) * Math.sqrt(3)) / 2,
        size / 2
      );
      // left
      this.drawTriangle(
        context,
        level - 1,
        x - size / 2 / 2,
        y + ((size / 2) * Math.sqrt(3)) / 6,
        size / 2
      );
      // right
      this.drawTriangle(
        context,
        level - 1,
        x + size / 2 / 2,
        y + ((size / 2) * Math.sqrt(3)) / 6,
        size / 2
      );
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // fibonacci area
  let fiboIndex = document.querySelector("#fibo-value");
  fiboIndex.addEventListener("input", () => {
    document.querySelector("#fibo-result").innerHTML = calculateFiboSeries(
      fiboIndex.value
    );

    // clear ouput container if no input
    if (!fiboIndex.value) document.querySelector("#fibo-result").innerHTML = "";
  });

  // sierpinski area

  // listen for changes in the ranges and pass them to the funciton once detected
  let sizeRange = document.getElementById("size-range");
  sizeRange.oninput = () => updateSierpinski(sizeRange, amountRange);

  let amountRange = document.getElementById("amount-range");
  amountRange.oninput = () => updateSierpinski(sizeRange, amountRange);
});

function calculateFiboSeries(index) {
  let fiboSeriesBase = [];
  let fiboSeries = [];

  // Building base case of fibo sequence
  if (index < 2) {
    for (let i = 0; i < index; i++) {
      fiboSeriesBase.push(1);
    }
  } else {
    fiboSeriesBase = [1, 1];
  }

  // building the rest
  while (index > 2) {
    fiboSeries.push(calculateFibo(index));
    index--;
  }
  fiboSeries = fiboSeriesBase.join(" ") + " " + fiboSeries.reverse().join(" ");
  return fiboSeries;
}

function calculateFibo(index) {
  return index <= 2 ? 1 : calculateFibo(index - 1) + calculateFibo(index - 2);
}

function updateSierpinski(sizeRange, amountRange) {
  document.getElementById("size-range-output").innerHTML = sizeRange.value;
  document.getElementById("amount-range-output").innerHTML = amountRange.value;

  let sierpinski = new SierpinskiTriangle(
    amountRange.value,
    200,
    300,
    sizeRange.value
  );

  // init canvas and context
  let canvas = document.getElementById("output-canvas");
  let context = canvas.getContext("2d");

  // Clear canvas for every change
  context.clearRect(0, 0, canvas.width, canvas.height);

  sierpinski.draw(context);
}
