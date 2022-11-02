const clock = document.getElementById('caption')
const imageElement = document.getElementById('background-image');
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
const temp_canvas = document.getElementById('temp-canvas');
const temp_ctx = temp_canvas.getContext('2d');
// ctx.imageSmoothingEnabled = false;
let glitchEffect = false;
// const channels = ['red', 'green', 'blue']
const colorData = {};
const offsets = {
    red: {
        x: 0,
        y: 0
    },
    green: {
        x: 0,
        y: 0
    },
    blue: {
        x: 0,
        y: 0
    }
};

const headerColors = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
temp_canvas.width = canvas.width;
temp_canvas.height = canvas.height;

const randomImage = () => {
    return './public/imgs/flatorte.jpg';
}



const makeImage = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (glitchEffect) {
        // for (const color in offsets) {
        //     temp_ctx.clearRect(0, 0, temp_canvas.width, temp_canvas.height);
        //     temp_ctx.putImageData(colorData[color], 0, 0);
            
        //     ctx.drawImage(temp_canvas,offsets[color].x,offsets[color].y)
        // }
    }
    else {
        ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
    }

    clearInterval(starter);
}


const setupImage = () => {

    temp_ctx.drawImage(imageElement, 0, 0, temp_canvas.width, temp_canvas.height);
    const data = temp_ctx.getImageData(0, 0, temp_canvas.width, temp_canvas.height);
    console.log(data);
    
    for (const color in offsets) {
        colorData[color] = temp_ctx.createImageData(data.width, data.height);
        const cdata = colorData[color].data;
        const idata = data.data; 
        for (let i = 0; i < idata.length; i +=4) {
            cdata[i] = (color === 'red') ? idata[i] : 0
            cdata[i+1] = (color === 'green') ? idata[i+1] : 0
            cdata[i+2] = (color === 'blue') ? idata[i+2] : 0
            cdata[i+3] = idata[i+3]
        }
    }
    console.log(colorData);

}

const time = () => {
    let now = new Date();
    let day = now.getDay();
    let month = now.getMonth();
    let date = now.getDate();

    switch (date) {
        case 1: case 21: case 31:
            date = `${date}st`;
            break;
        case 2: case 22: case 32:
            date = `${date}nd`;
            break;
        case 3: case 23:
            date = `${date}rd`
            break;
        default:
            date = `${date}th`;
            break;
    }


    switch (day) {
        case 0:  day = 'Sun'; break;
        case 1:  day = 'Mon'; break;
        case 2:  day = 'Tue'; break;
        case 3:  day = 'Wed'; break;
        case 4:  day = 'Thu'; break;
        case 5:  day = 'Fri'; break;
        case 6:  day = 'Sat'; break;
        default: day = 'NaN'; break;
    };
    switch (month) {
        case 0:  month = 'Jan'; break;
        case 1:  month = 'Feb'; break;
        case 2:  month = 'Mar'; break;
        case 3:  month = 'Apr'; break;
        case 4:  month = 'May'; break;
        case 5:  month = 'Jun'; break;
        case 6:  month = 'Jul'; break;
        case 7:  month = 'Aug'; break;
        case 8:  month = 'Sep'; break;
        case 9:  month = 'Oct'; break;
        case 10: month = 'Nov'; break;
        case 11: month = 'Dec'; break;
        default: month = 'NaN'; break;
    }

    let h = String(now.getHours()).padStart(2,'0');
    let m = String(now.getMinutes()).padStart(2,'0');
    let s = String(now.getSeconds()).padStart(2,'0');
    clock.innerHTML = `${day}, ${month} ${date} | ${h >= 13 ? h - 12 : h}:${m}:${s} ${h >= 12 ? 'PM': 'AM'}`
    delete now;
}


window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    makeImage();
}

let starter;
// let imageFile = 
// imageElement.src = randomImage();

// console.log(imageElement)

window.onload = () => {
    time();
    // setupImage();
    
    starter = setInterval(makeImage, 100);
    setInterval(time,500);
}
