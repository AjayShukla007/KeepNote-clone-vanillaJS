// (function() {
//  var $ = function(id){return document.getElementById(id)};
//    let isDrawingMode;
//  var canvas = this.__canvas = new fabric.Canvas('c', {
//     isDrawingMode: true
//  });
//  let canvasContext = canvas.getContext('2d');


// let canvaType = document.querySelector('.canvaType');
// const canvaTool = canvaType.querySelectorAll('div');

//  fabric.Object.prototype.transparentCorners = false;
// let fabricCanvas = null;

// canvaTool.forEach((e)=>{

//    const typeHam = new Hammer(e);

//    typeHam.on('tap',()=>{
//       selectedTool = e.className;
//       // canvasContext.globalAlpha = 1;
//       if (selectedTool === 'canvaBrush') {
//          canvasContext.globalAlpha = 0.25; // Set opacity to 0.5 for brush tool
//       } else {
//          canvasContext.globalAlpha = 1; // Reset opacity to 1 for other tools
//       }

// // ...

      
      
      

      

      
//       if (selectedTool === 'canvaSelect') {
         
//       //    if (!fabricCanvas) {
//       //  canvas = new fabric.Canvas(canvas);
//       // }
//       canvas.freeDrawingBrush = false;
//       isDrawingMode = false;
//       canvas.selection = true;
//       canvas.on('mouse:down', (event) => {
//        const pointer = canvas.getPointer(event.e);
//        const objects = canvas.getObjects();
//        const activeObject = canvas.getActiveObject();

//        if (activeObject && activeObject.containsPoint(pointer)) {
//           return;
//        }

//        for (let i = objects.length - 1; i >= 0; i--) {
//           if (objects[i].containsPoint(pointer)) {
//             canvas.setActiveObject(objects[i]);
//             break;
//           }
//        }
//       });
//     } 
//    //  else {
//    //    if (fabricCanvas) {
//    //     fabricCanvas.dispose();
//    //     fabricCanvas = null;
//    //    }
//    //  }
   
         
      
//       console.log(selectedTool);
//    });
   
// })

// if (isDrawingMode === true) {
   


//  if (fabric.PatternBrush) {
//     var vLinePatternBrush = new fabric.PatternBrush(canvas);
//     vLinePatternBrush.getPatternSrc = function() {

//       var patternCanvas = fabric.document.createElement('canvas');
//       patternCanvas.width = patternCanvas.height = 10;
//       var ctx = patternCanvas.getContext('2d');

//       ctx.strokeStyle = this.color;
//       ctx.lineWidth = 5;
//       ctx.beginPath();
//       ctx.moveTo(0, 5);
//       ctx.lineTo(10, 5);
//       ctx.closePath();
//       ctx.stroke();

//       return patternCanvas;
//     };

//     var hLinePatternBrush = new fabric.PatternBrush(canvas);
//     hLinePatternBrush.getPatternSrc = function() {

//       var patternCanvas = fabric.document.createElement('canvas');
//       patternCanvas.width = patternCanvas.height = 10;
//       var ctx = patternCanvas.getContext('2d');

//       ctx.strokeStyle = this.color;
//       ctx.lineWidth = 5;
//       ctx.beginPath();
//       ctx.moveTo(5, 0);
//       ctx.lineTo(5, 10);
//       ctx.closePath();
//       ctx.stroke();

//       return patternCanvas;
//     };


// /*
//     var img = new Image();
//     img.src = '../assets/honey_im_subtle.png';
//     var texturePatternBrush = new fabric.PatternBrush(canvas);
//     texturePatternBrush.source = img;
// */

// if (isDrawingMode) {
//    console.log('drawing');
//     if (this.value === 'canvaBrush') {
//       canvas.freeDrawingBrush = vLinePatternBrush;
//     }
//     else if (this.value === 'canvaPen') {
//       canvas.freeDrawingBrush = hLinePatternBrush;
//     }else if (this.value === 'canvaSelect') {
       
//     }
    

//     if (canvas.freeDrawingBrush) {
//       var brush = canvas.freeDrawingBrush;
//       brush.color = 'red';
      
//     }
//    }
//  }
// }
// //  $('drawing-mode-selector').onchange = function() {
    
    
    
// window.addEventListener('load', () => {
//    canvas.width = canvas.offsetWidth;
//    canvas.height = canvas.offsetHeight;
//    // canvasBg();
//    // canvas.width = canvas.offsetWidth;
//    // canvas.height = canvas.offsetHeight;
// })

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// const particleArray = [];
// let hue = 0;
// window.addEventListener('resize', function() {
//    canvas.width = window.innerWidth;
//    canvas.height = window.innerHeight;
// });
    
    
// })();
/*
const canvasElement = document.getElementById('canvas');
const canvas = new fabric.Canvas(canvasElement);

// Update the canvas dimensions when the window is resized
window.addEventListener('resize', () => {
   canvas.setDimensions({
      width: canvasElement.offsetWidth,
      height: canvasElement.offsetHeight
   }, { backstoreOnly: true });
});*/


const canvasElement = document.getElementById('canvas');

const canvasContainer = document.getElementById('canvasBox');

const canvasWidth = canvasContainer.offsetWidth;
const canvasHeight = canvasContainer.offsetHeight;

canvasElement.width = canvasWidth;
canvasElement.height = canvasHeight;

const canvas = new fabric.Canvas('canvas');

// Update the canvas dimensions when the window is resized
window.addEventListener('resize', () => {
   const newWidth = canvasContainer.offsetWidth;
   const newHeight = canvasContainer.offsetHeight;

   canvas.setWidth(newWidth);
   canvas.setHeight(newHeight);
   canvas.renderAll();
});


const penButton = document.getElementById('canvaPen');
const brushButton = document.getElementById('canvaBrush');
const selectButton = document.getElementById('canvaSelect');
let isDrawing = false;

penButton.addEventListener('click', setPenMode);
brushButton.addEventListener('click', setBrushMode);
selectButton.addEventListener('click', setSelectMode);

function setPenMode() {
  isDrawing = true;
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
  console.log('pen');
}

function setBrushMode() {
  isDrawing = true;
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
  console.log('brush');
  
}

function setSelectMode() {
  isDrawing = false;
  canvas.isDrawingMode = false;
  canvas.selection = true;
  canvas.off('mouse:down');
  canvas.on('mouse:down', handleObjectSelection);
  console.log('select');
  
}

function handleObjectSelection(event) {
  const pointer = canvas.getPointer(event.e);
  const objects = canvas.getObjects();
  const activeObject = canvas.getActiveObject();

  if (activeObject && activeObject.containsPoint(pointer)) {
    return;
  }

  for (let i = objects.length - 1; i >= 0; i--) {
    if (objects[i].containsPoint(pointer)) {
      canvas.setActiveObject(objects[i]);
      break;
    }
  }
}

