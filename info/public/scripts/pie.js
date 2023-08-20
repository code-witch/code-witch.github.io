const canvas = document.getElementById('pieCanvas');
const ctx = canvas.getContext('2d');

const background = '#282a36';
const textColor = '#ccc';
const borderColor = '#313544';// #2b2e3b


const chartColors = ['#E34949','#49E37A','#4975E3','#9449E3','#E149E3','#E3D049','#E38D49'];
// const chartColors = ['cyan','green','blue','purple','pink','yellow', 'black', 'white', 'orange', 'red']

const skills = {
    languages: {
        name: 'Languages',
        total: 0,
        unit: '%',

        "Python": 35,
        "JavaScript": 35,
        "Java": 5,
        "C#": 5,
        "Pug & HTML & CSS": 10,
        // pug: 0,
        "Ruby": 5,
        "PHP": 5
    },
    databases: {
        name: 'Databases',
        total: 0,
        unit: '%',

        "MySQL": 25,
        "MS SQL Server": 10,
        "PostgreSQL": 10,
        "MongoDB": 50,
        "Neo4j": 5,
    },
    frameworks: {
        name: 'Frameworks',
        total: 0,
        unit: ' years',

        // mvc & mvvm: 4, // years
        "Express.js": new Date().getFullYear() - new Date('jan 1 2019').getFullYear(),
        "Node.js": new Date().getFullYear() - new Date('jan 1 2019').getFullYear(),
        "UWP": 0.5,
        "ASP.NET": 0.5,
        "ReactJS": 0.5,
    },
    tools: {
        name: 'Software',
        total: 0,
        unit: ' years',

        "Git": new Date().getFullYear() - new Date('jan 1 2016').getFullYear(),
        "Adobe Illustrator": 1,
        "Adobe Photoshop": 0.5,
        "Visual Studio Code": new Date().getFullYear() - new Date('jan 1 2018').getFullYear(),
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

        "Windows": new Date().getFullYear() - new Date('jan 1 2010').getFullYear(),
        "Linux": new Date().getFullYear() - new Date('jan 1 2014').getFullYear(),
        "MacOS": new Date().getFullYear() - new Date('jan 1 2018').getFullYear(),
    }
}

for (const key in skills) {
    for (const skill in skills[key]) {
        if (skill !== 'total' && skill !== 'name' && skill !== 'unit') {
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