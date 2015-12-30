var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    mousePos = {
        x: SCREEN_WIDTH / 2,
        y: 100
    },

    // create canvas
    canvas = document.getElementById('rocketlayer'),
    context = canvas.getContext('2d'),
    particles = [],
    rockets = [],
    MAX_PARTICLES = 400,
    colorCode = 0,
    // set debug to true for canvas testing
    debug = false,
    newyear = false,
    startyear = new Date();

var picarray = [ //{"pic" : "http://c2.staticflickr.com/4/3859/14309050858_098ce542b9_h.jpg", "right" : "https://www.flickr.com/photos/janthepic/14294073177/in/photostream/"},
                //{"pic" : "http://c2.staticflickr.com/6/5477/14495657415_9fd6c0830f_h.jpg", "right" : "https://www.flickr.com/photos/janthepic/14495657415/in/photolist-o5W2VR-nNryRM-nNrkrG-cjEmMU-cjEmqC-fZ37Dj-cjEm63-pbAHxo-cgE4mb-6LnoEn-xXLb57-5QiLFC-67q6hg-6Lnq4g-o1cruh-atCHJo-4M6Xia-ci3H1W-pdn5TR-67ujgf-AEXST-ohv68j-ai2cpB-pdneZg-oW9Qsn-cjHgaU-cjHgtA-cjHfHd-ci3GJy-ci3FWL-cgE3Cd-cjekwL-cjeKcJ-cjeKDq-ohuR73-ojrU7p-ofDWwN-o1c1BU-ohuVKw-o1ceeg-ohDmff-ojrSbk-ojrJB2-o1c5wC-ohp6H6-o1ccJc-ohDqyW-o1ch9V-ojrLCB-o1c7W7"},
                {"pic" : "http://farm8.staticflickr.com/7501/15564522503_282de7aee7_b.jpg", "right" : ""},
                //{"pic" : "http://c1.staticflickr.com/9/8246/8590859556_2285d3b8fa_n.jpg", "right" : ""},
                {"pic" : "http://c2.staticflickr.com/4/3523/3172086098_552590811a_b.jpg", "right" : ""},
                //{"pic" : "http://c1.staticflickr.com/9/8476/8144268935_4eed030aaa_b.jpg", "right" : "https://www.flickr.com/photos/adventureaustria/8144268935/in/photolist-dpFvpV-dpFEy7-dpFEZJ-dpFuxP-dpFF6W-dpFELf-dpFEvy-dpFFfu-dpFFjh-dpFEpJ-dpFuNZ-dpFEWS-dpFuFX-dpFuz2-dpFEBW-dpFENL-e47Ljt-cjHgUw-cjHgBf-9MjN5H-9MnAjG-9MnAMw-9MjMbM-9MnArm-9MjMe8-9MnB5W-rX9Hm-b5yAgR-59CbX5-8nq146-8npZQX-iWkgCa-eKTtoi-eL5V81-eL5Qtf-eL5UoG-eKTsL2-eKTsf8-pu5mn8-eaahFk-6Lnoux-941HXn-941HUg-oEB1Jx-944Mxm-4ZW2qY-aVN3WB-aVN5Lg-aVN5kK-aVN3C4"},
                //{"pic" : "http://c1.staticflickr.com/9/8463/8144302028_bb9772273f_b.jpg", "right" : "https://www.flickr.com/photos/adventureaustria/8144302028/in/photolist-dpFvpV-dpFEy7-dpFEZJ-dpFuxP-dpFF6W-dpFELf-dpFEvy-dpFFfu-dpFFjh-dpFEpJ-dpFuNZ-dpFEWS-dpFuFX-dpFuz2-dpFEBW-dpFENL-e47Ljt-cjHgUw-cjHgBf-9MjN5H-9MnAjG-9MnAMw-9MjMbM-9MnArm-9MjMe8-9MnB5W-rX9Hm-b5yAgR-59CbX5-8nq146-8npZQX-iWkgCa-eKTtoi-eL5V81-eL5Qtf-eL5UoG-eKTsL2-eKTsf8-pu5mn8-eaahFk-6Lnoux-941HXn-941HUg-oEB1Jx-944Mxm-4ZW2qY-aVN3WB-aVN5Lg-aVN5kK-aVN3C4/"},
                //{"pic" : "http://c1.staticflickr.com/3/2884/9031522954_d1bb94ad9c_h.jpg", "right" : "https://www.flickr.com/photos/petrduchac/9031522954/in/photolist-dpFvpV-dpFEy7-dpFEZJ-dpFuxP-dpFF6W-dpFELf-dpFEvy-dpFFfu-dpFFjh-dpFEpJ-dpFuNZ-dpFEWS-dpFuFX-dpFuz2-dpFEBW-dpFENL-e47Ljt-cjHgUw-cjHgBf-9MjN5H-9MnAjG-9MnAMw-9MjMbM-9MnArm-9MjMe8-9MnB5W-rX9Hm-b5yAgR-59CbX5-8nq146-8npZQX-iWkgCa-eKTtoi-eL5V81-eL5Qtf-eL5UoG-eKTsL2-eKTsf8-pu5mn8-eaahFk-6Lnoux-941HXn-941HUg-oEB1Jx-944Mxm-4ZW2qY-aVN3WB-aVN5Lg-aVN5kK-aVN3C4/"},
                //{"pic" : "http://c2.staticflickr.com/4/3711/9031520500_9580e5013b_h.jpg", "right" : "https://www.flickr.com/photos/petrduchac/9031520500/"},
                //{"pic" : "http://c2.staticflickr.com/8/7032/6689416565_b5e69a7b7d_b.jpg" "right" : "https://www.flickr.com/photos/45909933@N08/6689416565/"},
                {"pic" : "http://c2.staticflickr.com/4/3379/3179553077_81c8a66c56_b.jpg", "right" : "https://www.flickr.com/photos/taviona/3179553077/"}
                ];
var arraycurrent = 0;


// init
$(document).ready(function() {
    //document.body.appendChild(canvas);
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    // start time
    startTime();

    loadBG();
    setInterval(loadBG, 12000)

    $('#preview').on("click", function(e) {
      debug = true;
    })

    $('body').append("<h1 id='title'> Happy " + (startyear.getFullYear()+1) + "</h1>");
});


function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    if (((startyear.getFullYear() < today.getFullYear()) || debug == true) && !newyear )
    {
        // start - firework and make better check for new year
        $( '#webcam' ).attr("Display", "none");
        setInterval(launch, 600);
        setInterval(loop, 1000 / 50);
        newyear = true;
        myAudio = new Audio('Fireworks.ogg');
        myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        myAudio.play();
    }

    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);

    document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(function(){ startTime() }, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getnext() {
    return (arraycurrent++) % picarray.length;
}

function loadBG() {
    var nextPic = picarray[getnext()];
    var newPic = document.createElement("img");
    newPic.id = "webcam";
    newPic.src = nextPic.pic;

    $( "#webcam" ).fadeOut(600, function () {
        $( "#bgcontainer" ).empty().hide();
        $( "#bgcontainer" ).append(newPic).fadeIn(600);
    });

    $( '#right' ).text("Rights: " + nextPic.right);
};



// launch more rockets!!!
function randomlaunch() {
    for (var i = 0; i < 6; i++) {
        launchFrom(Math.random() * SCREEN_WIDTH * 2 / 3 + SCREEN_WIDTH / 6);
    }
};

function genNewX() {
    mousePos.x = (Math.random() * SCREEN_WIDTH * 2 / 3 + SCREEN_WIDTH / 6);
}

function launch() {
    genNewX();
    launchFrom(mousePos.x);
}

function launchFrom(x) {
    if (rockets.length < 10) {
        var rocket = new Rocket(x);
        rocket.explosionColor = Math.floor(Math.random() * 360 / 10) * 10;
        rocket.vel.y = Math.random() * -3 - 4;
        rocket.vel.x = Math.random() * 6 - 3;
        rocket.size = 8;
        rocket.shrink = 0.999;
        rocket.gravity = 0.01;
        rockets.push(rocket);
    }
}

function loop() {
    // update screen size
    if (SCREEN_WIDTH != window.innerWidth) {
        canvas.width = SCREEN_WIDTH = window.innerWidth;
    }
    if (SCREEN_HEIGHT != window.innerHeight) {
        canvas.height = SCREEN_HEIGHT = window.innerHeight;
    }

    // clear canvas
    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    var existingRockets = [];

    for (var i = 0; i < rockets.length; i++) {
        // update and render
        rockets[i].update();
        rockets[i].render(context);

        // calculate distance with Pythagoras
        var distance = Math.sqrt(Math.pow(mousePos.x - rockets[i].pos.x, 2) + Math.pow(mousePos.y - rockets[i].pos.y, 2));

        // random chance of 1% if rockets is above the middle
        var randomChance = rockets[i].pos.y < (SCREEN_HEIGHT * 2 / 3) ? (Math.random() * 100 <= 1) : false;

/* Explosion rules
             - 80% of screen
            - going down
            - close to the mouse
            - 1% chance of random explosion
        */
        if (rockets[i].pos.y < SCREEN_HEIGHT / 5 || rockets[i].vel.y >= 0 || distance < 50 || randomChance) {
            rockets[i].explode();
        } else {
            existingRockets.push(rockets[i]);
        }
    }

    rockets = existingRockets;

    var existingParticles = [];

    for (var i = 0; i < particles.length; i++) {
        particles[i].update();

        // render and save particles that can be rendered
        if (particles[i].exists()) {
            particles[i].render(context);
            existingParticles.push(particles[i]);
        }
    }

    // update array with existing particles - old particles should be garbage collected
    particles = existingParticles;

    while (particles.length > MAX_PARTICLES) {
        particles.shift();
    }
}

function Particle(pos) {
    this.pos = {
        x: pos ? pos.x : 0,
        y: pos ? pos.y : 0
    };
    this.vel = {
        x: 0,
        y: 0
    };
    this.shrink = .97;
    this.size = 2;

    this.resistance = 1;
    this.gravity = 0;

    this.flick = false;

    this.alpha = 1;
    this.fade = 0;
    this.color = 0;
}

Particle.prototype.update = function() {
    // apply resistance
    this.vel.x *= this.resistance;
    this.vel.y *= this.resistance;

    // gravity down
    this.vel.y += this.gravity;

    // update position based on speed
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    // shrink
    this.size *= this.shrink;

    // fade out
    this.alpha -= this.fade;
};

Particle.prototype.render = function(c) {
    if (!this.exists()) {
        return;
    }

    c.save();

    c.globalCompositeOperation = 'lighter';

    var x = this.pos.x,
        y = this.pos.y,
        r = this.size / 2;

    var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
    gradient.addColorStop(0.8, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")");
    gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");

    c.fillStyle = gradient;

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size : this.size, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();

    c.restore();
};

Particle.prototype.exists = function() {
    return this.alpha >= 0.1 && this.size >= 1;
};

function Rocket(x) {
    Particle.apply(this, [{
        x: x,
        y: SCREEN_HEIGHT
    }]);

    this.explosionColor = 0;
}

Rocket.prototype = new Particle();
Rocket.prototype.constructor = Rocket;

Rocket.prototype.explode = function() {
    var count = Math.random() * 10 + 80;

    for (var i = 0; i < count; i++) {
        var particle = new Particle(this.pos);
        var angle = Math.random() * Math.PI * 2;

        // emulate 3D effect by using cosine and put more particles in the middle
        var speed = Math.cos(Math.random() * Math.PI / 2) * 15;

        particle.vel.x = Math.cos(angle) * speed;
        particle.vel.y = Math.sin(angle) * speed;

        particle.size = 10;

        particle.gravity = 0.2;
        particle.resistance = 0.92;
        particle.shrink = Math.random() * 0.05 + 0.93;

        particle.flick = true;
        particle.color = this.explosionColor;

        particles.push(particle);
    }
};

Rocket.prototype.render = function(c) {
    if (!this.exists()) {
        return;
    }

    c.save();

    c.globalCompositeOperation = 'lighter';

    var x = this.pos.x,
        y = this.pos.y,
        r = this.size / 2;

    var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255, 255, 255 ," + this.alpha + ")");
    gradient.addColorStop(1, "rgba(0, 0, 0, " + this.alpha + ")");

    c.fillStyle = gradient;

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size / 2 + this.size / 2 : this.size, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();

    c.restore();
};
