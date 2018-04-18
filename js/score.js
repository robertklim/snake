function Score() {
    this.x = 5;
    this.y = 13;
    this.textSize = 12;
    this.fill = 255;
    this.bestScore = 0;
    this.date = new Date();

    this.getBestScore = function() {
        this.bestScore = document.cookie.replace(/(?:(?:^|.*;\s*)bestscore\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        
        return this.bestScore;
            
    }

    this.saveBestScore = function(score) {
        if (score > this.getBestScore()) {
            document.cookie = "bestscore=" + score + "; expires=" + (this.date.getDate() + 1) + ";";
        }
    }

    this.show = function(score) {
        textSize(this.textSize);
        fill(this.fill);
        text("Score: " + score, this.x, this.y);
        text("Best score: " + this.bestScore, 5, 30);
    }
}