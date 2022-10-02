const canvas = document.getElementById('pieCanvas');
const ctx = canvas.getContext('2d');

const fire = '#ff6161';
const grass = '#568700';
const water = '#00b5b5';
const yes = '#568700';
const no = '#ff6161';

const background = '#282a36';
const textColor = '#ccc';
const borderColor = '#313544';// #2b2e3b

// just add all the colors here :D
// find a way to only color the slices that need color,
// check if its checking color array size
const chartColors = ['red','green','blue','purple','pink','yellow', 'black', 'white', 'orange', 'cyan'];
// const languageColors = ['red','green','blue','purple','pink','yellow', 'black', 'white', 'orange', 'cyan']

// put these in weeks?
// maybe just percents?
const skills = {
    languages: {
        name: 'Languages',
        total: 0,
        unit: '%',

        "Python": 35,
        "JavaScript": 35,
        "Java": 5,
        "C#": 5,
        "HTML & CSS": 10,
        // pug: 0,
        "Ruby": 10,
    },
    databases: {
        name: 'Databases',
        total: 0,
        unit: '%',

        "MySQL": 25,
        "MSSQL Server": 10,
        "PostgreSQL": 10,
        "MongoDB": 50,
        "Neo4j": 5,
    },
    frameworks: {
        name: 'Frameworks',
        total: 0,
        unit: ' years',

        // mvc & mvvm: 4, // years
        "Express.js": 3,
        "Node.js": 3,
        "UWP": 0.5,
        "ASP.NET": 0.5,
        "ReactJS": 0.5,
    },
    tools: {
        name: 'Software',
        total: 0,
        unit: ' years',

        "Git": 6,
        "Adobe Illustrator": 1,
        "Adobe Photoshop": 0.5,
        "Visual Studio Code": 4,
    },
    misc: {
        name: 'Robots & OS',
        total: 0,
        unit: ' years',

        // robotics: 4,
        "Pneumatics": 1,
        "Electronics": 2,
        "Soldering": 3,
        "FRC": 5,

        "Linux": 6,
        "MacOS": 4,
        "Windows": 10,
    }
}


for (const key in skills) {
    for (const skill in skills[key]) {
        if (skill !== 'total' && skill !== 'name'&& skill !== 'unit') {
            skills[key].total += skills[key][skill];
        }
    }
}



const angle = (amount, total) => {
    return Math.ceil(360 * (amount / total))
}

const drawPieSlice = (x, y, startAngle, totalAngle, color, size) => {
    
    // if (color !== background && color !== borderColor) {
    //     // ctx.lineWidth = size * 0.1;
    //     ctx.lineWidth = 10;
    //     ctx.strokeStyle = borderColor;
    //     ctx.stroke();
    // }
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.ellipse(x,y, size, size, 0, startAngle * (Math.PI/180), totalAngle * (Math.PI/180));



    ctx.closePath();
    ctx.fill();


}

const drawChart = (x, y, obj, colors, size) => {
    drawPieSlice(x + 50, y, 0, 360, borderColor, size + size * 0.1);

    ctx.font = '18pt Helvetica';
    ctx.fillStyle = textColor;
    let counter = 0;
    let pieCounter = 0;
    let startAngle = 0;
    for (let o in obj) {
        if (o === 'name') {
            ctx.fillText(obj[o], x - 20, (y - size) / 2);
        } else if(o === 'total' || o === 'unit') {
            // do nothing
        } 
        else {  
            drawPieSlice(x + 50 , y, startAngle, startAngle + angle(obj[o], obj['total']), colors[pieCounter++], size);
            keySquare(x - 40, (y + size + 100) + 40 * counter, colors[counter++], o, obj[o], obj.unit);
            startAngle += angle(obj[o], obj['total']);            
        }
    }
    drawPieSlice(x + 50, y, 0, 360, borderColor, size / 2);
    drawPieSlice(x + 50, y, 0, 360, background, size / 3);
}


const keySquare = (x, y, color, desc, val, units) => {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,20,20);
    ctx.fillStyle = textColor;
    ctx.fillText(`${desc}: ${val}${units}`, x + 30, y + 15); // key label text
}

drawChart(200, 400, skills.languages, chartColors, 200);
drawChart(700, 400, skills.databases, chartColors, 200);
drawChart(1200, 400, skills.frameworks, chartColors, 200);
drawChart(1700, 400, skills.tools, chartColors, 200);
drawChart(2200, 400, skills.misc, chartColors, 200);