export {
    hsv2rgb, 
    rgb2text, 
    get_color, 
    set_color, 
    set_mode, 
    get_mode,
    change_flash_params,
    change_patrol_params,
    change_fade_params,
    random_mode};

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
    if(color?.r == undefined  || color?.g == undefined || color?.b ==undefined)
    return "Sunucudan duzgun veri gelmedi.";
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
        }).catch(error => console.log('error', error));;
        res = await res.json();
        return res;
    }catch(er){
        console.log("get color fail: " +er);
        return er;
    }
    
}

async function set_color(color){
    try{
        let res = await fetch(("http://192.168.1.150:81/set_color?r="+color.r+"&g="+color.g+"&b="+color.b), {
            method: "POST",
            headers: header
        }).catch(error => console.log('error', error));;
        res = await res.json();
        return res;
    }catch(er){
        console.log("set color fail: " +er);
    }
}

async function set_mode(mode){
    try{
        fetch((ip+"set_mode?mode="+mode), {
            method: "POST",
            headers: header
        }).catch(error => console.log('error', error));;
    }catch(er){
        console.log("set mode fail: " +er);
    }
}
async function get_mode(){
    try{
        let res = await fetch((ip +"get_mode"), {
            method: "GET",
            headers: header
        }).catch(error => console.log('error', error));;
        return res;
    }catch(er){
        console.log("get mode fail: " +er);
        return er;
    }
}


async function change_flash_params(dd, dl, re){
    try{
        fetch((ip+"change_flash_params?delay_dark="+dd+"&delay_light="+dl+"&random_enabled="+re), {
            method: "POST",
            headers: header
        }).catch(error => console.log('error', error));;
    }catch(er){
        console.log("set flash params fail: " +er);
    }
}

async function change_patrol_params(is, ie, d, ow){
    try{
        fetch((ip+"change_patrol_params?interval_start="+is+
        "&interval_end ="+ie+
        "&delay="+d+
        "&one_way="+ow), {
            method: "POST",
            headers: header
        }).catch(error => console.log('error', error));;
    }catch(er){
        console.log("set patrol params fail: " +er);
    }
}

async function change_fade_params(d,ss){
    try{
        fetch((ip+"change_fade_params?delay="+d+"&step_size="+ss), {
            method: "POST",
            headers: header
        }).catch(error => console.log('error', error));;
    }catch(er){
        console.log("set fade params fail: " +er);
    }
}

async function random_mode(){
    try{
        fetch((ip+"random_mode"), {
            method: "POST",
            headers: header
        }).catch(error => console.log('error', error));;
    }catch(er){
        console.log("set random mode fail: " +er);
    }
}