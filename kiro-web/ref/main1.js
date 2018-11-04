var workspace_canvas = document.getElementById('workspace_canvas');
var workspace_ctx = workspace_canvas.getContext('2d');

var cellWidth = 20;
var snake, fruit;
var gameOver = false;
var score = 0;

init();
setInterval(mainLoop, 60);

function Snake() {
    this.direction = 'right';
    this.parts = [];
    this.canMove = false;
    
    for(var i = 0; i < 2; i++) {
        this.parts.push( {x: 0, y: 0} );
    }
    
    var that = this;
    window.onkeydown = function(e) {
        var key = e.keyCode;
        
        if(key === 37 && that.direction !== 'right' && that.canMove) {
            that.direction = 'left';
            that.canMove = false;
        } else if(key === 38 && that.direction !== 'bottom' && that.canMove) {
            that.direction = 'top';
            that.canMove = false;
        } else if(key === 39 && that.direction !== 'left' && that.canMove) {
            that.direction = 'right';
            that.canMove = false;
        } else if(key === 40 && that.direction !== 'top' && that.canMove) {
            that.direction = 'bottom';
            that.canMove = false;
        }
    }
    
    this.update = function() {
        // Movement
        var headX = this.parts[0].x;
        var headY = this.parts[0].y;
        
        if(this.direction === 'right') {
            headX++;
        } else if(this.direction === 'left') {
            headX--;
        } else if(this.direction === 'top') {
            headY--;
        } else if(this.direction === 'bottom') {
            headY++;
        }
        
        // Collide with walls
        if (headX*cellWidth >= workspace_canvas.width) {
            headX = 0;
        } else if(headX*cellWidth < 0) {
            headX = (workspace_canvas.width-cellWidth) / cellWidth;
        } else if(headY * cellWidth >= workspace_canvas.height) {
            headY = 0;
        } else if (headY*cellWidth < 0) {
            headY = (workspace_canvas.height-cellWidth) / cellWidth;
        }
        
        // eat fruit
        var newPart = {};
        if(headX === fruit.x && headY === fruit.y) {
            newPart.x = headX;
            newPart.y = headY;
            
            score += 10;
            
            fruit.create();
        } else {
            newPart = this.parts.pop();
            newPart.x = headX;
            newPart.y = headY;
        }
        
        this.parts.unshift(newPart);
        
        for(var i = 1; i < this.parts.length; i++) {
            if (this.parts[0].x === this.parts[i].x && this.parts[0].y === this.parts[i].y) {
                gameOver = true;
                break;
            }
        }
        
        this.canMove = true;
    }
    
    this.draw = function() {
        workspace_ctx.save();
        for(var i = 0; i < this.parts.length; i++) {
            var p = this.parts[i];
            
            workspace_ctx.fillStyle = 'brown';
            workspace_ctx.fillRect(p.x*cellWidth, p.y*cellWidth, cellWidth, cellWidth);
        }
        workspace_ctx.restore();
    };
}

function Fruit() {
    this.create = function() {
        this.x = Math.floor(Math.random() * (workspace_canvas.width/cellWidth));
        this.y = Math.floor(Math.random() * (workspace_canvas.height/cellWidth));
    }
    
    this.draw = function() {
        workspace_ctx.save();
        workspace_ctx.fillStyle = 'green';
        workspace_ctx.fillRect(this.x*cellWidth, this.y*cellWidth, cellWidth, cellWidth);
        workspace_ctx.restore();
    }
}


function init() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.create();
}

function mainLoop() {
    update();
    render();
}

function update() {
    if(gameOver)
        return;
    
    snake.update();
}

function render() {
    workspace_ctx.clearRect(0, 0, workspace_canvas.width, workspace_canvas.height);
    
    snake.draw();
    fruit.draw();
    
    if(gameOver) {
        workspace_ctx.save();
        workspace_ctx.fillStyle = 'blue';
        workspace_ctx.font = "40px serif";
        workspace_ctx.textAlign = 'center';
        workspace_ctx.textBaseline = 'middle';
        workspace_ctx.fillText("Game Over", workspace_canvas.width/2, 250);
        workspace_ctx.fillText("Score: " + score.toString(), workspace_canvas.width/2, 300);
        workspace_ctx.restore();
    }
}
