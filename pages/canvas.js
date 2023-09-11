let preLoading = document.querySelector('#preLoading');

window.onload = () => {
   preLoading.style.display = 'none';
}

let prevmouseX, prevmouseY,
   isDrawing = false,
   selectTool = 'brush',
   brushWidth = 2;
var startX, startY, endX, endY, snapshot;
let lineWidth = brushWidth;
const halfLineWidth = lineWidth / 2;
let fillStyle = '#333';
let strokeStyle = '#000';
const shadowColor = '#333';
const lineCap = 'round';
const shadowBlur = lineWidth / 4;
let selectedColor = '#333';

const state = {
   mousedown: false
};
const canvas = document.querySelector('canvas'),
   canvasContext = canvas.getContext('2d');
canvasContext2 = canvas.getContext('2d');
toolbtn = document.querySelectorAll('.tool');
fillColor = document.querySelector('#fill-color');
fixShape = document.querySelector('#fix-shape');
sizeSlider = document.querySelector('#size-slider');
colorBtn = document.querySelectorAll('.colors .option');
colorPicker = document.querySelector('#color-picker');
clearButton = document.getElementById('clear-canvas');
saveImg = document.querySelector('.save-img');

toolbtn.forEach(btn => {
   btn.addEventListener('click', () => {
      document.querySelector('.options  .active').classList.remove('active');
      btn.classList.add('active');
      selectTool = btn.id;
      console.log(selectTool);
   });
});

let brushDropD = document.querySelector('#brushDropD');
let dropItems = document.querySelector('#dropItems');

brushDropD.addEventListener('click', () => {
   if (dropItems.style.opacity != '1') {
      dropItems.style.height = '120px';
      dropItems.style.opacity = '1';
      dropItems.style.pointerEvents = 'auto';
      console.log('dropup')
   } else {
      dropItems.style.height = '1px';
      dropItems.style.opacity = '0';
      dropItems.style.ZIndex = '-1';
      dropItems.style.pointerEvents = 'none';
      console.log('dropdown')
   }
});
sizeSlider.addEventListener('change', () => lineWidth = sizeSlider.value);
colorBtn.forEach(btn => {
   document.querySelector('.options  .selected').classList.remove('selected');
   btn.classList.add('selected');
   btn.addEventListener('click', () => {
      selectedColor = window.getComputedStyle(btn).getPropertyValue('background-color');
   });
});
colorPicker.addEventListener('change', () => {
   colorPicker.parentElement.style.background = colorPicker.value;
   colorPicker.parentElement.click();
});
clearButton.addEventListener('click', () => {
   canvasContext.clearRect(0, 0, canvas.width, canvas.height);
   canvasBg();
});
const canvasBg = () => {
   canvasContext.fillStyle = '#fff';
   canvasContext.fillRect(0, 0, canvas.width, canvas.height);
   canvasContext.fillStyle = selectedColor;
};
saveImg.addEventListener('click', () => {
   const link = document.createElement('a');
   link.download = `${Date.now()}.jpg`;
   link.href = canvas.toDataURL();
   link.click();
});



const undoButton = document.getElementById("undo-btn");
const redoButton = document.getElementById("redo-btn");

let canvasStates = [];
let currentState = 0;

undoButton.addEventListener("click", function() {
   if (currentState > 0) {
      currentState--;
      const image = new Image();
      image.src = canvasStates[currentState];
      image.onload = function() {
         canvasContext.drawImage(image, 0, 0);
         console.log('undo')
      }
   }
});

redoButton.addEventListener("click", function() {
   if (currentState < canvasStates.length - 1) {
      currentState++;
      const image = new Image();
      image.src = canvasStates[currentState];
      image.onload = function() {
         canvasContext.drawImage(image, 0, 0);
         console.log('redo')
      }
   }
});

function addState() {
   canvasStates.push(canvas.toDataURL());
   currentState++;
}



let row = document.querySelector('.row');
let toolsBoard = document.querySelector('.tools-board');
let closeTools = document.getElementById('closeTools');
var icon = document.getElementById("icon");
closeTools.addEventListener('mouseup', () => {
   closeTools.style.opacity = '1';
   setTimeout(
      () => {

         closeTools.style.opacity = '0.4';
      }, 3000)
});
closeTools.addEventListener('mouseout', () => {
   closeTools.style.opacity = '0.4';
});
icon.onclick = function() {
   if (this.className !== "Icon open") {
      toolsBoard.classList.toggle('translate');
      console.log('close');
      this.className = "Icon open";

   } else {
      toolsBoard.classList.remove('translate');
      console.log('open');
      this.className = "Icon";

   }
};

let sideBarBTN = document.getElementById('sideBarBTN');








closeTools.addEventListener('click', () => {



});

window.addEventListener('load', () => {
   canvas.width = canvas.offsetWidth;
   canvas.height = canvas.offsetHeight;
   canvasBg();
})

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
let hue = 0;
window.addEventListener('resize', function() {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
});

const mouse = {
   x: undefined,
   y: undefined,
}





const drawRect = (e) => {
   
   var startX, startY, endX, endY;


   const touch = e.touches[0];
   startX = touch.clientX;
   startY = touch.clientY;

   endX = e.touches[0].clientX;
   endY = e.touches[0].clientY;

   canvasContext.beginPath();
   canvasContext.strokeRect(startX, startY, endX - startX, endY - startY);
   canvasContext.stroke();

   console.log(startX - endX, startY - endY);
}

const startDraw = (e) => {
   isDrawing = true;
   prevmouseX = e.touches[0].clientX;
   prevmouseY = e.touches[0].clientY;

   canvasContext.beginPath();
   canvasContext.lineWidth = brushWidth;

}
const drawing = (e) => {
   if (!isDrawing) return;

   if (selectTool === 'brush') {
      canvasContext.lineTo(e.offsetX, e.offsetY);
      canvasContext.stroke();
   } else if (selectTool === 'squere') {
      drawRect(e);
   }

   canvasContext.lineWidth = brushWidth;
}

const drawingS = (e) => {
   if (isDrawing) return;
   if (selectTool === 'brush') {

      canvasContext.lineWidth = 0.5;

   } else if (selectTool === 'squere') {

      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;

   } else if (selectTool === 'circle') {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
   } else if (selectTool === 'triangle') {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
   } else if (selectTool === 'Brush1') {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
   } else if (selectTool === 'Brush2') {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
   } else if (selectTool === 'Brush3') {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
   } else if (selectTool === 'Brush4') {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      snapshot = false;

   } else if (selectTool === 'Brush5') {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;

   } else if (selectTool === 'Brush6') {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;

   } else if (selectTool === 'Brush7') {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;

   } else if (selectTool === 'Brush8') {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;

   } else if (selectTool === 'Brush9') {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;


   } else if (selectTool === 'Brush10') {
      animate();


   } else if (selectTool === 'Brush11') {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;


   }




   const mousePos = getMosuePositionOnCanvas(e);
   canvasContext.beginPath();
   canvasContext.moveTo(mousePos.x, mousePos.y);
   canvasContext.lineWidth = lineWidth;
   canvasContext.strokeStyle = selectedColor;
   canvasContext.fillStyle = selectedColor;
   canvasContext.shadowColor = null;
   canvasContext.shadowBlur = null;

   canvasContext.fill();
   snapshot = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
   state.mousedown = true;
}
const drawingP = (e) => {
   canvasContext.putImageData(snapshot, 0, 0);
   if (state.mousedown) {
      const mousePos = getMosuePositionOnCanvas(e);
      canvasContext.lineCap = 'round';
      if (selectTool === 'brush' || selectTool === 'eraser') {
         canvasContext.strokeStyle = selectTool === 'eraser' ? '#fff' : selectedColor;


         canvasContext.setLineDash([0, 0]);
         canvasContext.lineTo(mousePos.x, mousePos.y);
         canvasContext.stroke();

      } else if (selectTool === 'squere') {
         endX = e.touches[0].clientX;
         endY = e.touches[0].clientY;

         canvasContext.beginPath();
         if (!fillColor.checked && !fixShape.checked) {
            return canvasContext.strokeRect(startX, startY, endX - startX, endY - startY);
         } else if (fillColor.checked) {
            canvasContext.fillRect(startX, startY, endX - startX, endY - startY);

         } else if (fixShape.checked) {
            canvasContext.strokeRect(startX, startY, sizeSlider.value, sizeSlider.value);
         }


         canvasContext.stroke();
         console.log(startX, startY, startX - endX, startY - endY);
      } else if (selectTool === 'circle') {


         endX = e.touches[0].clientX;
         endY = e.touches[0].clientY;


         canvasContext.beginPath();
         let redius = Math.sqrt(Math.pow((endX - startX), 2) + Math.pow((endY - startY), 2));
         canvasContext.arc(startX, startY, redius, 0, 2 * Math.PI);
         canvasContext.stroke();

         if (fillColor.checked) {
            canvasContext.fill()
            canvasContext.stroke();
         } else if (fixShape.checked && fillColor.checked) {
            canvasContext.arc(endX, endY, sizeSlider.value, 0, 2 * Math.PI);
         } else if (fixShape.checked) {
            canvasContext.beginPath();
            canvasContext.arc(endX, endY, sizeSlider.value, 0, 2 * Math.PI);
            lineWidth = 5;
            canvasContext.stroke();
         }


      } else if (selectTool === 'triangle') {
         endX = e.touches[0].clientX;
         endY = e.touches[0].clientY;

         canvasContext.beginPath();
         canvasContext.moveTo(startX, startY);
         canvasContext.lineTo(endX, endY);
         canvasContext.lineTo(endX * 2 - startX, startY);
         canvasContext.closePath();
         fillColor.checked ? canvasContext.fill() : canvasContext.stroke();

      } else if (selectTool === 'Brush1') {
         endX = e.touches[0].clientX;
         endY = e.touches[0].clientY;

         canvasContext.setLineDash([4, 4]);
         canvasContext.lineTo(mousePos.x, mousePos.y);

         canvasContext.stroke();
         console.log('brush1 works');

      } else if (selectTool === 'Brush2') {
         endX = e.touches[0].clientX;
         endY = e.touches[0].clientY;

         var gradient = canvasContext.createLinearGradient(0, 0, 200, 0);
         gradient.addColorStop("0", "magenta");
         gradient.addColorStop("0.5", "blue");
         gradient.addColorStop("1.0", "red");
         canvasContext.setLineDash([0, 0]);
         canvasContext.strokeStyle = gradient;
         canvasContext.lineTo(mousePos.x, mousePos.y);
         canvasContext.stroke();
         console.log('brush2 works');


      } else if (selectTool === 'Brush3') {
         endX = e.touches[0].clientX;
         endY = e.touches[0].clientY;

         canvasContext.moveTo(startX, startY);
         canvasContext.setLineDash([4, 4]);

         canvasContext.lineTo(mousePos.x, mousePos.y);
         canvasContext.stroke();

         console.log('brush3 works');


      } else if (selectTool === 'Brush4') {
         endX = e.touches[0].clientX;
         endY = e.touches[0].clientY;
         canvasContext.setLineDash([0, 0]);
         canvasContext.lineWidth = 0.9;
         canvasContext.rect(startX, startY, endX - startX, endY - startY);

         canvasContext.stroke();

         console.log('brush4 works');


      } else if (selectTool === 'Brush5') {

         canvasContext.setLineDash([0, 0]);
         var r = 255 * Math.random() | 0,
            g = 255 * Math.random() | 0,
            b = 255 * Math.random() | 0;
         var cssColor = 'rgb(' + r + ',' + g + ',' + b + ')';

         canvasContext.strokeStyle = cssColor;
         canvasContext.lineTo(mousePos.x, mousePos.y);
         canvasContext.stroke();


      } else if (selectTool === 'Brush6') {
         endX = e.touches[0].clientX;
         endY = e.touches[0].clientY;


         canvasContext.setLineDash([0, 0]);
         canvasContext.arc(endX, endY, 20, 0, 2 * Math.PI);
         canvasContext.stroke();

      } else if (selectTool === 'Brush7') {
         endX = e.touches[0].clientX;
         endY = e.touches[0].clientY;


         canvasContext.setLineDash([4, 4]);
         canvasContext.arc(endX, endY, 20, 5, 2 * Math.PI);

         canvasContext.lineTo(mousePos.x, mousePos.y);
         canvasContext.stroke();

      } else if (selectTool === 'Brush8') {
         endX = e.touches[0].clientX;
         endY = e.touches[0].clientY;


         canvasContext.setLineDash([sizeSlider.value, sizeSlider.value]);
         // canvasContext.arc(endX, endY, 20, 5, 2 * Math.PI);

         canvasContext.lineTo(mousePos.x, mousePos.y);
         canvasContext.stroke();

      } else if (selectTool === 'Brush9') {
         endX = e.touches[0].clientX;
         endY = e.touches[0].clientY;

         canvasContext.strokeStyle = 'hsl(' + hue + ',100%,50%)';
         canvasContext.lineTo(mousePos.x, mousePos.y);
         canvasContext.stroke();
         canvasContext2.lineWidth = 5;
         canvasContext2.strokeStyle = 'red';
         canvasContext2.lineTo(mousePos.x, mousePos.y);
         canvasContext2.stroke();
         hue++;

      } else if (selectTool === 'Brush10') {
         // ctx.putImageData(snapshot, 0, 0);
         const touch = event.touches[0];
         // startX = touch.clientX;
         // startY = touch.clientY;

         mouse.x = touch.clientX;
         mouse.y = touch.clientY;
         for (let i = 0; i < 10; i++) {
            particleArray.push(new particle());
         }
      } else if (selectTool === 'Brush11') {
         var img = document.createElement('img');
         img = new Image();
         img.src = '/yt4 project/Figa_HTML.png';
         img.style.width = '' + sizeSlider.value + 'px';
         var imgDraw = canvasContext.createPattern(img, 'repeat');
         canvasContext.strokeStyle = imgDraw;
         /*
          canvasContext.beginPath();
         canvasContext.lineTo(mousePos.x, mousePos.y);
            canvasContext.closePath();
            // canvasContext.fill();
            canvasContext.stroke();
            */
         canvasContext.setLineDash([0, 0]);
         canvasContext.lineTo(mousePos.x, mousePos.y);
         canvasContext.stroke();

      }




      // console.log(e.touches.length);

      if (e.touches.length === 1) {
         canvas.style.touchAction = 'none';
      } else {
         canvas.style.touchAction = 'manipulation';
         canvasContext.strokeStyle = '#FFFFFF00';
         canvasContext.fillStyle = '#FFFFFF00';
         canvasContext.lineWidth = 0.001;
      }

      /*switch(e.touches.length){
         case 2:
         canvas.style.touchAction = 'manipulation';
         canvasContext.strokeStyle = '#FFFFFF00';
         canvasContext.fillStyle = '#FFFFFF00';
         canvasContext.lineWidth = 0.001;
         break;
         default:
         canvas.style.touchAction = 'none';
      }*/


   }


};
const drawingE = (e) => {
   e.preventDefault();

   addState()
   if (state.mousedown) {


      canvasContext.shadowColor = shadowColor;
      canvasContext.shadowBlur = shadowBlur;

      if (selectTool === 'eraser') {
         canvasContext.shadowColor = selectTool === 'eraser' ? '#fff' : shadowColor;
      };

      canvasContext.stroke();
   };

   state.mousedown = false;
};


/*// const canvas = document.getElementById("myCanvas");
document.getElementById("zoomInButton").addEventListener("click", zoomIn);
document.getElementById("zoomOutButton").addEventListener("click", zoomOut);


let currentZoom = 1;

canvas.addEventListener("touchstart", handleTouchStart);
canvas.addEventListener("touchmove", handleTouchMove);

function handleTouchStart(e) {
  // Get the distance between the two touch points
  const touch1 = e.touches[0];
  const touch2 = e.touches[1];
  const distance = Math.sqrt(
    (touch2.clientX - touch1.clientX) ** 2 +
      (touch2.clientY - touch1.clientY) ** 2
  );

  // Save the distance as the starting distance for the touch move
  e.target.dataset.startDistance = distance;
}

function handleTouchMove(e) {
  // Get the distance between the two touch points
  const touch1 = e.touches[0];
  const touch2 = e.touches[1];
  const distance = Math.sqrt(
    (touch2.clientX - touch1.clientX) ** 2 +
      (touch2.clientY - touch1.clientY) ** 2
  );

  // Calculate the difference in distance from the starting distance
  const delta = distance - e.target.dataset.startDistance;

  // Adjust the current zoom level based on the delta
  currentZoom += delta * 0.01;

  // Apply the zoom to the canvas
  canvas.style.transform = `scale(${currentZoom})`;
}*/


/*function drawCircle(){

canvasContext.fillStyle = 'blue';

// canvasContext.strokeStyle = 'red';
// canvasContext.lineWidth = 15;
canvasContext.beginPath();
canvasContext.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
canvasContext.fill();
// canvasContext.stroke();
// console.log(ctx);
}
drawCircle();*/



class particle {
   constructor() {

      this.x = mouse.x;
      this.y = mouse.y;

      // this.x = Math.random()*canvas.width;
      // this.y = Math.random()*canvas.height;

      this.size = Math.random() * 5 + 1;
      // this.speedX = 1;
      // this.speedY = 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.colorR = 'hsl(' + hue + ',100%,50%)';
   }
   update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) {
         this.size -= 0.1;
      }
   }

   DrawR() {
      canvasContext.fillStyle = this.colorR;
      // canvasContext.strokeStyle = 'red';
      // canvasContext.lineWidth = 15;
      canvasContext.beginPath();
      canvasContext.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      canvasContext.fill();
      // canvasContext.stroke();
   }

}
/*function init(){
    for (let i = 0; i < 100; i++) {
      particleArray.push(new particle());
      }
   }   
init(); */
console.log(particleArray);

function handleParticle() {



   for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].update();
      particleArray[i].DrawR();
      /* for (var j = i; j < particleArray.length; j++) {
          const dx = particleArray[i].x - particleArray[j].x;
          const dy = particleArray[i].y - particleArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 10) {
             canvasContext.strokeStyle = particleArray[i].colorR;
             canvasContext.lineWidth = particleArray[i].size;
             canvasContext.beginPath();
             canvasContext.moveTo(particleArray[i].x, particleArray[i].y);
             canvasContext.lineTo(particleArray[j].x, particleArray[j].y);
             canvasContext.stroke();
             canvasContext.closePath();
          }
       }*/

      if (particleArray[i].size <= 0.3) {
         particleArray.slice(i, 1);
         // console.log(particleArray.length);
         // i--;
      }
   }
}

function animate() {
   // canvasContext.clearRect(0,0,canvas.width,canvas.height);
   // canvasContext.fillStyle = 'rgba(0,0,0,02)';
   // canvasContext.fillRect(0,0,canvas.width,canvas.height);

   handleParticle();
   requestAnimationFrame(animate);
   // drawCircle();
   hue++;
   // hue+=5;

}
// animate();




function getMosuePositionOnCanvas(e) {
   const clientX = e.clientX || e.touches[0].clientX;
   const clientY = e.clientY || e.touches[0].clientY;
   const { offsetLeft, offsetTop } = e.target;
   const canvasX = clientX - offsetLeft;
   const canvasY = clientY - offsetTop;

   return { x: canvasX, y: canvasY };
};




canvas.addEventListener('mousedown', drawingS);
canvas.addEventListener('mousemove', drawingP);
canvas.addEventListener('mouseup', drawingE);
canvas.addEventListener('mouseout', drawingE);

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawing);

canvas.addEventListener('touchstart', drawingS);
canvas.addEventListener('touchmove', drawingP);
canvas.addEventListener('touchend', drawingE);

canvas.addEventListener('click', function() {

});

const fullScreen = document.getElementById('full-screen');
const blockTop = document.getElementById('block-top');
const blockBottom = document.getElementById('block-bottom');

// fullScreen.addEventListener('click',()=>{
fullScreen.onclick = function() {
   if (blockTop.style.display !== 'none' && blockBottom.style.display !== 'none') {
      blockTop.style.display = 'none';

      blockBottom.style.display = 'none';
      fullScreen.style.color = 'darkred';
      console.log('Fscreen display none')
   } else {
      blockTop.style.display = 'block';
      blockBottom.style.display = 'block';
      fullScreen.style.color = 'black';
      console.log('Fscreen display block')
   }
}
// )





/*const state = {
   mousedown: false
};

// ===================
// == Configuration ==
// ===================
const lineWidth = 20;
const halfLineWidth = lineWidth / 2;
const fillStyle = '#333';
const strokeStyle = '#333';
const shadowColor = '#333';
const shadowBlur = lineWidth / 4;

// =====================
// == Event Listeners ==
// =====================
canvas.addEventListener('mousedown', handleWritingStart);
canvas.addEventListener('mousemove', handleWritingInProgress);
canvas.addEventListener('mouseup', handleDrawingEnd);
canvas.addEventListener('mouseout', handleDrawingEnd);

canvas.addEventListener('touchstart', handleWritingStart);
canvas.addEventListener('touchmove', handleWritingInProgress);
canvas.addEventListener('touchend', handleDrawingEnd);

clearButton.addEventListener('click', handleClearButtonClick);

// ====================
// == Event Handlers ==
// ====================
function handleWritingStart(event) {
   event.preventDefault();

   const mousePos = getMosuePositionOnCanvas(event);

   canvasContext.beginPath();

   canvasContext.moveTo(mousePos.x, mousePos.y);

   canvasContext.lineWidth = lineWidth;
   canvasContext.strokeStyle = strokeStyle;
   canvasContext.shadowColor = null;
   canvasContext.shadowBlur = null;

   canvasContext.fill();

   state.mousedown = true;
}

function handleWritingInProgress(event) {
   event.preventDefault();

   if (state.mousedown) {
      const mousePos = getMosuePositionOnCanvas(event);

      canvasContext.lineTo(mousePos.x, mousePos.y);
      canvasContext.stroke();
   }
}

function handleDrawingEnd(event) {
   event.preventDefault();

   if (state.mousedown) {
      canvasContext.shadowColor = shadowColor;
      canvasContext.shadowBlur = shadowBlur;

      canvasContext.stroke();
   }

   state.mousedown = false;
}

function handleClearButtonClick(event) {
   event.preventDefault();

   clearCanvas();
}

// ======================
// == Helper Functions ==
// ======================
function getMosuePositionOnCanvas(event) {
   const clientX = event.clientX || event.touches[0].clientX;
   const clientY = event.clientY || event.touches[0].clientY;
   const { offsetLeft, offsetTop } = event.target;
   const canvasX = clientX - offsetLeft;
   const canvasY = clientY - offsetTop;

   return { x: canvasX, y: canvasY };
}

function clearCanvas() {
   canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}*/