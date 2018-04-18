function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.fill = "white";
    this.total = 1;
    this.tail = [];
    this.dead = false;
    this.score = new Score();

    this.deathCrush = function() {
        if (!this.dead) {
            if (this.x < 0 || this.x > width-scl) {
                //console.log("Death by CRUSH!");
                this.dead = true;
                this.score.saveBestScore(this.tail.length - 1);
            }
            if (this.y < 0 || this.y > height-scl) {
                //console.log("Death by CRUSH!");
                this.dead = true;
                this.score.saveBestScore(this.tail.length - 1);
            }
        }
    }

    this.deathBite = function() {
        if (!this.dead) {
            for (var i = 0; i < this.tail.length-1; i++) {
                var pos = this.tail[i];
                var d = dist(this.x, this.y, pos.x, pos.y);
                if (d < 1) {
                    //console.log("Death by BITE!");
                    this.dead = true;
                    this.score.saveBestScore(this.tail.length - 1);
                }
            }
        }
    }

    this.isDead = function() {
        this.deathBite();
        this.deathCrush();

        return this.dead;
    }

    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            console.log("eat!");
            return true;
        } else {
            return false;
        }
    }
    
    this.getX = function() {
        return this.x;
    }

    this.getY = function() {
        return this.y;
    }

    this.getXSpeed = function() {
        return this.xspeed;
    }

    this.getYSpeed = function() {
        return this.yspeed;
    }

    this.changeDirection = function() {
        if (!this.dead) {
            if (keyCode === UP_ARROW && this.getYSpeed() !== 1) {
                this.direction(0, -1);
            } else if (keyCode === DOWN_ARROW && this.getYSpeed() !== -1) {
                this.direction(0, 1);
            } else if (keyCode === RIGHT_ARROW && this.getXSpeed() !== -1) {
                this.direction(1, 0);
            } else if (keyCode === LEFT_ARROW && this.getXSpeed() !== 1) {
                this.direction(-1, 0);
            }
        }
    }

    this.direction = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }
    
    this.update = function() {
        oldx = this.x;
        oldy = this.y;

        console.log("total in " + this.total);
        console.log("tail in " + this.tail.length);

        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;
        
        if (this.isDead()) {
            this.x = oldx;
            this.y = oldy;
            this.tail[this.total-1] = createVector(this.x, this.y); // Eat and die next move
        } else {
            if (this.total === this.tail.length) {
                for (var i = 0; i < this.tail.length - 1; i++) {
                    this.tail[i] = this.tail[i + 1];
                }
            } else {
                console.log("err!");
            }
            this.tail[this.total-1] = createVector(this.x, this.y);
        }
        console.log("total out " + this.total);
        console.log("tail out " + this.tail.length);
    }

    this.show = function() {
        fill(this.fill);
        
        for (var i = 0; i < this.total; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }

        rect(this.x, this.y, scl, scl);
    }

}