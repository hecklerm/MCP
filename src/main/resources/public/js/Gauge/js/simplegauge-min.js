var Gauge = function(j) {
    var D = document;
    var k = j || {};
    var t = k.id || "control";
    var y = k.parentId || "body";
    var v = k.width || 100;
    var q = k.height || 100;
    var h = k.scalable || false;
    var x = k.value || 0;
    var F = k.decimals || 0;
    var A = k.animated || false;
    var a = k.duration || 3;
    var E = k.title || "title";
    var n = k.unit || "unit";
    var p = k.minValue || 0;
    var C = k.maxValue || 100;
    var s = k.sections || null;
    var i = k.needleColor || "rgb(123, 123, 123)"; 
    var u = 270; 
    var c = C - p; 
    var f = u / c; 
    var z = 135 * Math.PI / 180; 
    var r = 45 * Math.PI / 180; 
    x = x < p?p:x;
    if (h){
        window.addEventListener("resize", g, false)
    }
    var e = D.createElement("canvas");
    e.id = t;
    e.width = v;
    e.height = q;
    if (y === "body") {
        D.body.appendChild(e)
    } else {
        D.getElementById(y).appendChild(e)
    }
    var m = D.getElementById(t).getContext("2d");
    var d = D.createElement("canvas");
    var w = D.createElement("canvas");

    function g() {
        if (h) {
            v = window.innerWidth;
            q = window.innerHeight
        }
        e.width = v;
        e.height = q;
        d.width = v;
        d.height = q;
        w.width = v;
        w.height = q;
        m.canvas.width = e.width;
        m.canvas.height = e.height;
        o();
        B();
        b()
    }
    function b() {
        m.clearRect(0, 0, e.width, e.height);
        m.drawImage(d, 0, 0);
        m.drawImage(w, 0, 0)
    }
    var o = function() {
        var G = d.getContext("2d");
        var I = d.width < d.height ? d.width : d.height;
        G.clearRect(0, 0, I, I);
        G.save();
        G.translate(0.5 * I, 0.5 * I);
        G.rotate(135 * Math.PI / 180);
        G.translate(-0.5 * I, -0.5 * I);
        if (null !== s && 0 < s.length) {
            for (var H = 0; H < s.length; H++) {
                l(G, I, s[H].start, s[H].stop, s[H].color)
            }
        }
        G.restore();
        G.translate(0.485 * I, 0.485 * I);
        G.beginPath();
        G.moveTo(0, 0);
        G.arc(0.015 * I, 0.015 * I, 0.485 * I, z, r, false);
        G.translate(-0.485 * I, -0.485 * I);
        G.closePath();
        G.strokeStyle = "white";
        G.lineWidth = (I * 0.03).toFixed(0);
        G.stroke()
    };
    var l = function(I, L, M, K, J) {
        M = M < p ? p : M > C ? C : M;
        K = K < p ? p : K > C ? C : K;
        var G = ((u / c * M - u / c * p)) * Math.PI / 180;
        var H = G + (K - M) / (c / u) * Math.PI / 180;
        I.translate(0.485 * L, 0.485 * L);
        I.beginPath();
        I.moveTo(0, 0);
        I.arc(0.015 * L, 0.015 * L, 0.485 * L, G, H, false);
        I.moveTo(0, 0);
        I.translate(-0.485 * L, -0.485 * L);
        I.closePath();
        I.fillStyle = J;
        I.fill()
    };
    var B = function() {
        var G = w.getContext("2d");
        var H = d.width < d.height ? d.width : d.height;
        G.clearRect(0, 0, H, H);
        G.save();
        G.translate(0.5 * H, 0.5 * H);
        G.rotate((((f * (x - p)) - 135)) * Math.PI / 180);
        G.translate(-0.5 * H, -0.5 * H);
        G.beginPath();
        G.moveTo(0.275 * H, 0.5 * H);
        G.bezierCurveTo(0.275 * H, 0.62426575 * H, 0.37573425 * H, 0.725 * H, 0.5 * H, 0.725 * H);
        G.bezierCurveTo(0.62426575 * H, 0.725 * H, 0.725 * H, 0.62426575 * H, 0.725 * H, 0.5 * H);
        G.bezierCurveTo(0.725 * H, 0.3891265 * H, 0.6448105 * H, 0.296985 * H, 0.5392625 * H, 0.2784125 * H);
        G.lineTo(0.5 * H, 0.0225);
        G.lineTo(0.4607375 * H, 0.2784125 * H);
        G.bezierCurveTo(0.3551895 * H, 0.296985 * H, 0.275 * H, 0.3891265 * H, 0.275 * H, 0.5 * H);
        G.closePath();
        G.fillStyle = i;
        G.fill();
        G.strokeStyle = "white";
        G.lineJoin = "bevel";
        G.lineCap = "round";
        G.lineWidth = (H * 0.03).toFixed(0);
        G.stroke();
        G.restore();
        G.textAlign = "center";
        G.fillStyle = "white";
        G.font = "bold " + (0.145 * H) + "px Arial";
        G.fillText((parseFloat(x).toFixed(F) + n), H * 0.5, H * 0.52, H * 0.38);
        G.font = (0.045 * H) + "px Arial";
        G.fillText(E, H * 0.5, H * 0.6, H * 0.38)
    };
    this.setValue = function(J) {
        var J = parseFloat(J);
        if (A) {
            var I = J < p ? p : (J > C ? C : J);
            var H = new Tween(new Object(), "", Tween.regularEaseInOut, x, I, a);
            H.onMotionChanged = function(K) {
                x = K.target._pos;
                B();
                b()
            };
            H.start()
        } else {
            var G = x;
            x = J < p ? p : (J > C ? C : J);
            if (x !== G) {
                B();
                b()
            }
        }
    };
    this.setTitle = function(G) {
        E = G;
        B();
        b()
    };
    this.setSize = function(G) {
        v = G;
        q = G;
        g()
    };
    g()
};