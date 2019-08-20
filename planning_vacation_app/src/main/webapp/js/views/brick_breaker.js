


var gameView = {
    closeGame:()=>{
        gameover=true;
        util.dismissDialog('gameDialog');
    },
    gameDialog: {
        view: "fadeInWindow",
        id: "gameDialog",
        name: "gameDialog",
        position: "center",
        width: 500,
        height: 660,
        modal: true,
        body: {
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            width: 400,
                            label: "Igra"
                        },
                        {},
                        {
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "gameView.closeGame()"
                        }
                    ]
                },
                {  //template za onaj HTML dok ovdje
    view: "template",
    template: '<div id="brickBreaker">\n' +
    '    <center>\n' +
    '    <h1>\n' +
    '    Udarač blokova\n' +
    '</h1>\n' +
    '<h4>\n' +
    'Cilj: Eliminišite sve blokove.\n' +
    '</h4>\n' +
    '</center>\n' +
    '<canvas id="myCanvas" width="480" height="480"></canvas>\n' +
    '    </div>' +
        '<img style="display:none;" id="imgSheet" src="data:image/jpg;base64, /9j/4QlQaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/bAIQACAYGBgYGCAYGCAwIBwgMDgoICAoOEA0NDg0NEBEMDg0NDgwRDxITFBMSDxgYGhoYGCMiIiIjJycnJycnJycnJwEJCAgJCgkLCQkLDgsNCw4RDg4ODhETDQ0ODQ0TGBEPDw8PERgWFxQUFBcWGhoYGBoaISEgISEnJycnJycnJycn/90ABAAH/+4ADkFkb2JlAGTAAAAAAf/AABEIAEYAZAMAIgABEQECEQH/xACTAAABBQEBAAAAAAAAAAAAAAAAAQIDBQYEBwEAAgMBAQAAAAAAAAAAAAAAAAECAwYEBRAAAQMDAgMIAQMCBwAAAAAAAQIDBAAREgUxISJSBhMyQVFxkaEU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" alt="foo"/>\n'
                }
            ]
        }
    },

showGameDialog: function() {
    webix.ui(webix.copy(gameView.gameDialog));
        $$("gameDialog").show();
   canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    x = canvas.width / 2;
    y = canvas.height - 30;
    paddleX = (canvas.width - paddleWidth) / 2;
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    sheet = document.getElementById("imgSheet");
    dx=4;
    dy=-4;
    lives=3;
    score=0;
    bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
    gameover=false;
    draw();
},
}

///////////////

var canvas = null;
var sheet = null;
var ctx = null;
var imageCount=2;
var ballRadius = 6;
var x = null;
var y = null
var dx = 4;
var dy = -4;
var dspeed = Math.sqrt(dx*dx+dy*dy);
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = null;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 7;
var brickColumnCount = 10;
var brickWidth = 50;
var brickHeight = 17.5;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 35;
var score = 0;
var lives = 3;
var gamestart = false;
var gameover = false;
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function keyDownHandler(e) {
    gamestart=true;
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

//Do a check before updating position. Return if collision happened.
function collision(x,y,b)
{
    if (x > b.x &&
        x < b.x + brickWidth &&
        y > b.y &&
        y < b.y + brickHeight)
    {
        return true;
    }
    return false;
}
function betterCollisionDet()
{
    let normdX = dx/Math.ceil(dspeed*10);
    let normdY = dy/Math.ceil(dspeed*10);
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                let newX = x+dx;
                let newY = y+dy;
                //Coarse collision check
                if (collision(newX,newY,b))
                {
                    let cdetected = false;
                    //Granular collision check;
                    for(let step = 1; step<=Math.ceil(dspeed*10); step++)
                    {

                        if(collision(x+normdX,y,b)){
                            dx=-dx;
                            cdetected=true;
                        }
                        //y+=normdY;
                        else if(collision(x,y+normdY,b)){
                            dy=-dy;
                            cdetected=true;
                        }
                        x+=normdX;
                        y+=normdY;
                        if(cdetected==true)
                        {
                            x+=Math.sign(dx)*(Math.abs(dx)-Math.abs(normdX)*step);
                            y+=Math.sign(dy)*(Math.abs(dy)-Math.abs(normdY)*step);
                            break;
                        }
                    }
                    if(cdetected==false){
                        dy=-dy;
                        dx=-dx;
                    }
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("POBJEDILI STE, ČESTITAMO!");
                        gameover=true;
                       // document.location.reload();
                        util.dismissDialog("gameDialog");
                    }
                    return true;
                }
            }
        }
    }
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    let srcX = 0;
    let srcY = 0
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            srcX = 0;
            srcY = 35*((r+c)%2);

            if (bricks[c][r].status == 1) {
                var brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
                //debugger;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.drawImage(sheet,srcX,srcY,100,35, brickX, brickY, brickWidth, brickHeight);
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Comic Sans MS";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Bodovi: " + score, 8, 20);
}
function drawStart() {
    ctx.font = "16px Comic Sans MS";
    ctx.fillStyle = "#0095DD"
    ctx.textAlign = "center";
    ctx.fillText("Pritisnite bilo koje dugme", canvas.width/2, canvas.height-50);
    ctx.textAlign = "left";
}
function drawLives() {
    ctx.font = "16px  Comic Sans MS";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Životi: " + lives, canvas.width - 65, 20);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    if(!gamestart)
        drawStart();
    //collisionDetection();
    let collided = betterCollisionDet();
    //Canvas side collision
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    //Canvas top collision
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    //Canvas bottom collision
    else if (y + dy > canvas.height - ballRadius) {
        //Paddle collision override
        if (x > paddleX && x < paddleX + paddleWidth) {
            //Let's makesome better physics by adding angle variance
            //Normalize to [-1,1]
            let halfW = paddleWidth/2;
            let norm = (x-paddleX-halfW)/(halfW);
            let normAbs = Math.abs(norm);
            let normSign = Math.sign(norm);
            let newAngle = (Math.PI/6)+(4*Math.PI/12)*(1-normAbs);
            dy = -dspeed*Math.sin(newAngle);
            dx = dspeed*Math.cos(newAngle)*normSign;
        }
        //Death
        else {
            lives--;
            gamestart=false;
            if (!lives) {
                alert("KRAJ IGRE");
                gameover=true;
                util.dismissDialog("gameDialog");
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    //Update position
    if(!collided&&gamestart){
        x += dx;
        y += dy;
    }
    if(!gameover)
    requestAnimationFrame(draw);
}
//draw();
