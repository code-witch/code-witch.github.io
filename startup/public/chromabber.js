// https://codepen.io/njmcode/pen/ZLrWzq

console.clear();

// cache output canvas
const output_c = document.getElementById('output')
const output_ctx = output_c.getContext('2d')

// create buffer canvas
const c = document.createElement('canvas')
const ctx = c.getContext('2d')
c.width = output_c.width
c.height = output_c.height

// Ref to image in DOM
const pic = document.getElementById('pic')

const channels = ['r', 'g', 'b']
const channelData = {}
const channelDrift = {
    r: { x: 0, y: 0 },
    g: { x: 0, y: 0 },
    b: { x: 0, y: 0 }
}

const opts = {
    OPACITY: 1,
    ENABLED: true,
    DRAW_ORIGINAL: false
}

let gui = null

const reset = () => {
    channelDrift.r.x = 0
    channelDrift.r.y = 0
    channelDrift.g.x = 0
    channelDrift.g.y = 0
    channelDrift.b.x = 0
    channelDrift.b.y = 0
    opts.OPACITY = 1
    opts.ENABLED = true
    opts.DRAW_ORIGINAL = false
    
    if (gui) {
        for (var i in gui.__controllers) {
            gui.__controllers[i].updateDisplay();
        }
    }
}
reset()

opts.reset = reset

function render() {
    output_ctx.clearRect(0, 0, c.width, c.height)
    
    if(opts.DRAW_ORIGINAL) {
        output_ctx.globalAlpha = 1
        output_ctx.globalCompositeOperation = 'source-over'
        output_ctx.drawImage(pic, 0, 0, output_c.width, output_c.height)
    }
    
    // Render each RGB image on top of each other, blended, and offset
    if(opts.ENABLED) {
        output_ctx.globalCompositeOperation = 'screen'
        output_ctx.globalAlpha = opts.OPACITY
    
        channels.forEach(idx => {
            ctx.clearRect(0, 0, c.width, c.height)
            ctx.putImageData(channelData[idx], 0, 0)

            output_ctx.drawImage(c, channelDrift[idx].x, channelDrift[idx].y)
        })
    }
}

function init() {
    // Draw image to the canvas first so we can grab the data
    ctx.drawImage(pic, 0, 0, c.width, c.height)
    const imgData = ctx.getImageData(0, 0, c.width, c.height)
    
    // Create and cache RGB channel data 
    channels.forEach(idx => {
        channelData[idx] = ctx.createImageData(imgData.width, imgData.height)
        const cdata = channelData[idx].data
        const idata = imgData.data
        for(let i = 0; i < idata.length; i+=4) {
            cdata[i] = (idx === 'r') ? idata[i] : 0
            cdata[i+1] = (idx === 'g') ? idata[i+1] : 0
            cdata[i+2] = (idx === 'b') ? idata[i+2] : 0
            cdata[i+3] = idata[i+3]
        }
    })
    console.log(channelData)
    
    // Kickoff
    frame()
}

// Redraw loop
function frame() {
    requestAnimationFrame(frame)
    render()
}

// Add GUI for param tweaks
gui = new dat.GUI()
gui.add(opts, 'ENABLED').name('Enabled')
gui.add(opts, 'OPACITY').min(0).max(1).step(0.05).name('Opacity')
gui.add(opts, 'DRAW_ORIGINAL').name('Draw original')
const axes = ['x','y']
channels.forEach(idx => {
    axes.forEach(ax => {
        gui.add(channelDrift[idx], ax).min(-1000).max(1000).step(0.1).name(idx + '.' + ax)
    })
})
gui.add(opts, 'reset').name('Reset')
gui.close()

// Kick off after image is loaded
imagesLoaded(pic, function() {
    console.log('loaded')
    init()
})