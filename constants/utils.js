export {hsv2rgb, get_color, set_color, rgb2text};

function hsv2rgb(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    h /= 360;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function rgb2text(color){
    return "R="+color.r+" G="+color.g+" B="+color.b;
}


let ip = "http://192.168.1.150/"
let header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control' : 'no-store'
}
async function get_color(){
    try{
        let res = await fetch((ip +"get_color"), {
            method: "GET",
            headers: header
        });
        res = await res.json();
        return res;
    }catch(er){
        console.log("get color fail: " +er);
        return er;
    }
    
}

async function set_color(color){
    try{
        let res = await fetch((ip+"set_color?R="+color.r+"&G="+color.g+"&B="+color.b), {
            method: "POST",
            headers: header
        });
        res = await res.json();
        return res;
    }catch(er){
        console.log("set color fail: " +er);
        return er;
    }
    
}