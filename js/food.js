function Food() {
    this.pos = [];
    this.fill = "white";

    this.getPos = function() {
        return this.pos;
    }

    this.pickLocation = function() {
        var cols = floor(width/scl);
        var rows = floor(height/scl);
        
        this.pos = createVector(floor(random(cols)), floor(random(rows)));
        this.pos.mult(scl);
    }
    this.pickLocation();

    this.show = function() {
        fill(this.fill);
        rect(this.pos.x, this.pos.y, scl, scl);
    }

}