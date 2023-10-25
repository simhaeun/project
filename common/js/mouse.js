let polyline = document.querySelector('.drawing_line_polyline');
let polyPoints = polyline.getAttribute('points');
let circle = document.querySelector('.drawing_line_circle');
let circleX = circle.getAttribute('cx');
let circleY = circle.getAttribute('cy');
let circleR = circle.getAttribute('r');

let total = 12;
let gap = 30;
let ease = 0.5;
let debounce_removeLine;
let debounce_counter = 0;

const pointer = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    tx: 0,
    ty: 0,
    dist: 0,
    scale: 1,
    speed: 2,
    circRadius: 10,

    updateCrds: function () {
        if (this.x != 0) {
            this.dist = Math.abs((this.x - this.tx) + (this.y - this.ty));
            this.scale = Math.max(this.scale + ((100 - this.dist * 8) * 0.01 - this.scale) * 0.1, 0.25); // gt 0.25 = 4px
            this.tx += (this.x - this.tx) / this.speed;
            this.ty += (this.y - this.ty) / this.speed;
        }
    }
};

let points = [];

$(window).on('mousemove', function (e) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    debounce_counter = 0;
    drawLine();

    // debounce
    clearTimeout(debounce_removeLine);
    debounce_removeLine = setTimeout(() => {
        debounce_counter = 12;
        drawLine();
    }, 80);
})

$(window).on('mousedown', function (e) {
    pointer.circRadius = 6;
    drawLine();
});

$(window).on('mouseup', function (e) {
    pointer.circRadius = 8;
    drawLine();
});

function drawLine() {
    pointer.updateCrds();

    points.push({
        x: pointer.tx,
        y: pointer.ty
    });

    while (points.length > total) {
        points.shift();
        if (points.length > gap) {
        for (const i = 0; i < 5; i++) {
            points.shift();
        }
        }
    }

    const pointsArr = points.map(point => `${point.x},${point.y}`);
    polyPoints = pointsArr.join(' ');
    polyline.setAttribute('points', polyPoints);

    // circle
    circleX = pointer.x;
    circleY = pointer.y;
    circleR = pointer.scale * pointer.circRadius;
    circle.setAttribute('cx', circleX);
    circle.setAttribute('cy', circleY);
    circle.setAttribute('r', circleR);

    if (debounce_counter > 0) {
        debounce_counter--;
        requestAnimationFrame(drawLine);
    }
}