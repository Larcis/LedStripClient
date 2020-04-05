import {get_color, set_color, hsv2rgb} from './utils.js';
export {start_fade, cancel_fade, start_patrol_colors, cancel_patrol_colors, start_flash, cancel_flash};

let fade_interval = null;
let patrol_colors_interval = null;
let flash_interval = null


function is_any_mode_active(){
    return fade_interval || patrol_colors_interval || flash_interval;
}
function rand_color(){
    return {
        r: Math.round(Math.random() * 255 % 255),
        g: Math.round(Math.random() * 255 % 255),
        b: Math.round(Math.random() * 255 % 255)
    }
}
function start_flash(speed=250){
    if(is_any_mode_active()) return;
    let count = 0;
    flash_interval = setInterval(()=>{
        if(count++ % 2 == 0){
            set_color(rand_color()).catch(()=>{
                cancel_flash();
            }); 
        }else{
            set_color({r: 0, g:0, b:0}).catch(()=>{
                cancel_flash();
            });
            setTimeout(()=>{
                set_color(rand_color()).catch(()=>{
                    cancel_flash();
                }); 
            }, Math.round(Math.random() * 250 % 250))
        }
        
    }, speed)
}
function cancel_flash(){
    if(flash_interval){
        clearInterval(flash_interval);
        flash_interval = null;
    }
}
function start_fade(speed=30){
    if(is_any_mode_active()) return;
    let r, g, b;
    let ri, gi, bi;
    ri = gi = bi = -1;
    r = g = b = 1;
    get_color().then(color => {
        fade_interval = setInterval(()=>{
            if(color.r > 255 || color.r < 1) ri*= -1;
            if(color.g > 255 || color.g < 1) gi*= -1;
            if(color.b > 255 || color.b < 1) bi*= -1;
            set_color(color).catch(()=>{
                cancel_fade();
            });
            color.r += ri;
            color.g += gi;
            color.b += bi;
        }, speed);
    });
   
}

function cancel_fade(){
    if(fade_interval){
        clearInterval(fade_interval);
        fade_interval = null;
    }
}

function start_patrol_colors(speed=100){
    if(is_any_mode_active()) return;
    let hue = 1;
    let inc = 1;
    patrol_colors_interval = setInterval(()=>{
        if(hue > 360 || hue < 1) inc *= -1;
        hue += inc;
        set_color(hsv2rgb(hue, 1, 1)).catch(()=>{
            cancel_patrol_colors();
        });
    }, speed)
}

function cancel_patrol_colors(){
    if(patrol_colors_interval){
        clearInterval(patrol_colors_interval);
        patrol_colors_interval = null;
    }
}