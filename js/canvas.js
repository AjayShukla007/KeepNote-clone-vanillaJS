const createCanvabtn = document.querySelector('#canvasBtn');


const colorArray = [
   'black', 'red', 'yellow', 'green', 'skyblue', 'deeppink', 'chocolate',

   'white', 'darkred', 'peru', 'darkgreen', 'darkblue', 'pink', 'darksalmon',

   'grey', 'indianred', 'orange', 'limegreen', 'blue', 'purple', 'cyan',

   'lightgrey', 'lightpink', 'peachpuff', 'lime', 'lightblue', 'rebeccapurple', 'lightblue'
]

let noteConCanva = document.querySelector('#noteCon');


const createCanvas = () => {

   let newCanvas = document.createElement('div');
   newCanvas.classList.add('canvasContainer');
   let innerData = `
   <div class="canvaBlank"></div>

   <div class="convaOptns">
      <div class="convaBack">
         <i class="fa fa-arrow-left"></i>
      </div>
      <button class="undo">
         <i class="fa fa-undo"></i>
      </button>
      <button class="redo" disabled>
         <i class="fa fa-undo fa-rotate-180"></i>
      </button>
      <div class="three-dot">
         
         <span>
         <i class="fa fa-circle"></i>
         <i class="fa fa-circle"></i>
         <i class="fa fa-circle"></i>
         </span>
         

      </div>
   </div>
   
   <canvas class="canvas" id="canvas">
      
   </canvas>
   <div class="canvaStyle">
   <div class="canvaType">
      <div class="canvaSelect" id='select'>
         <i class="fa fa-object-group"></i>
      </div>
      <div class="canvaEraser" id='eraser'>
         <i class="fa-solid fa-eraser"></i>
      </div>
      <div class="canvaPen" id='pen'>
         <i class="fa-solid fa-pen"></i>
      </div>
      <div class="canvaMarker" id='marker'>
         <i class="fa-solid fa-marker"></i>
      </div>
      <div class="canvaBrush" id='brush'>
         <i class="fa-solid fa-brush"></i>
      </div>
   </div>
   <div class="activeLine"><span></span></div>
   <div class="canvaColor">
   </div>
   <div class="canvaSizing">
      <input class="canvaSize" type="range" name="size" min="1" max="30" value="5"> <div class="sizeBall"><span></span></div>
   </div>
   
  </div>
  
        <div class="canvaMoreOpts">
         <div class="gridDisplay">
         Show grid
          </div>
         <div class="shareCanva">
         Share
         </div>
         <div class="deleteCanva">
         Delete
         </div>
      </div>
   
<div class="gridBox">
   
<div class="chooseGrid">
   <div class="gridContainer">
   <div class="gridActive"></i></div>
   <span>Squere</span>
   </div>
   
   <div class="gridContainer">
   <div class="gridLine"></div>
   <span>Rule</span>
   </div>
   
   <div class="gridContainer">
   <div class="gridDot"></div>
   <span>dot</span>
   </div>
   
   <div class="gridContainer">
   <div class="gridClean"></div>
   <span>none</span>
   </div>
</div>
<div class="gridLock">
   <div class="gridCancel">
      cancel
   </div>
   <div class="gridOk">
      Accept
   </div>
</div>
</div>

      `;
   newCanvas.insertAdjacentHTML('afterbegin', innerData);
   noteConCanva.insertAdjacentElement('afterbegin', newCanvas);


   const canvasElement = noteConCanva.querySelector('.canvas');
   const canvasContainer = noteConCanva.querySelector('.canvasContainer');


   let canvasWidth = canvasContainer.offsetWidth;
   let canvasHeight = canvasContainer.offsetHeight;

   canvasElement.width = canvasWidth;
   canvasElement.height = canvasHeight;

   // Updating the canvas dimensions when the window is resized
   let newWidth = canvasContainer.offsetWidth;
   let newHeight = canvasContainer.offsetHeight;
   canvasContainer.addEventListener('resize', () => {
      console.log('resized');
      canvasElement.width = canvasWidth;
      canvasElement.height = canvasHeight;

      newWidth = canvasContainer.offsetWidth;
      newHeight = canvasContainer.offsetHeight;

      canvas.setWidth(newWidth);
      canvas.setHeight(newHeight);
      canvas.renderAll();
   });



   const canvas = new fabric.Canvas('canvas'),
      canvasContext = canvas.getContext('2d');
   let isDrawing = false;


   function saveCanvasDrawing(canvasContainer, canvas) {
      const canvasData = canvas.toDataURL();
      localStorage.setItem(canvasContainer.id, canvasData);
   }

   function restoreCanvasDrawing(canvasContainer, canvas) {
      console.log('restor canvas log line no.1697');
      const canvasData = localStorage.getItem(canvasContainer.id);
      if (canvasData) {
         fabric.Image.fromURL(canvasData, (img) => {
            canvas.clear();
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
               scaleX: canvas.width / img.width,
               scaleY: canvas.height / img.height
            });
         });
      }
   }


   const closeCanva = noteConCanva.querySelector('.convaBack');

   const convaOptns = noteConCanva.querySelector('.convaOptns');

   let canvaStyle = noteConCanva.querySelector('.canvaStyle');
   let canvaColor = noteConCanva.querySelector('.canvaColor');
   let canvaType = noteConCanva.querySelector('.canvaType');
   let canvaSize = noteConCanva.querySelector('.canvaSize');
   let sizeBallContainer = noteConCanva.querySelector('.sizeBall');
   let sizeBall = sizeBallContainer.querySelector('span');

   let activeLine = noteConCanva.querySelector('.activeLine');
   let activeLineSpan = activeLine.querySelector('span');

   let threeDot = noteConCanva.querySelector('.three-dot');
   let canvaBlank = noteConCanva.querySelector('.canvaBlank');



   closeCanva.addEventListener('click', () => {
      console.log('canva closing');
      saveCanvasDrawing(canvasContainer, canvas);

      canvasElement.width = canvasWidth;
      canvasElement.height = canvasHeight;


      newWidth = canvasContainer.offsetWidth;
      newHeight = canvasContainer.offsetHeight;

      canvas.setWidth(newWidth);
      canvas.setHeight(newHeight);
      canvas.renderAll();


      canvas.isDrawingMode = false;
      canvas.selectable = false;

      canvasContainer.style.cssText = `
   width: 49vw;
   height: 50vh;
   position: relative;
   z-index: 200;
   `;
      convaOptns.style.cssText = `
   display: none;
   `;
      canvaStyle.style.cssText = `
   display: none;
   `;
      canvaBlank.style.cssText = `
   
   display: block;
   opacity: 1;
   z-index: 200;
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: transparent;
   `;
   })


   canvaBlank.addEventListener('click', () => {
      console.log('canva opening');

      canvasElement.width = canvasWidth;
      canvasElement.height = canvasHeight;


      newWidth = canvasContainer.offsetWidth * 2;
      newHeight = canvasContainer.offsetHeight * 2;

      canvas.setWidth(newWidth);
      canvas.setHeight(newHeight);
      canvas.renderAll();



      canvas.isDrawingMode = true;
      canvas.selectable = false;

      canvasContainer.style.cssText = `
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 201;
    `;
      convaOptns.style.cssText = `
    display: flex;
    `;
      canvaStyle.style.cssText = `
    display: flex;
    `;
      canvaBlank.style.cssText = `
     
   display: none;
   opacity: 0;
   z-index: 200;
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: transparent;
    `;
   })





   let canvaMoreOpts = noteConCanva.querySelector('.canvaMoreOpts');

   let gridDisplay = noteConCanva.querySelector('.gridDisplay');

   let shareCanva = noteConCanva.querySelector('.shareCanva');
   let deleteCanva = noteConCanva.querySelector('.deleteCanva');

   let gridBox = noteConCanva.querySelector('.gridBox');
   let gridOk = noteConCanva.querySelector('.gridOk');
   let gridCancel = noteConCanva.querySelector('.gridCancel');


   let gridContainer = noteConCanva.querySelectorAll('.gridContainer');
   let gridType;

   let threeDotHam = new Hammer(threeDot);
   threeDotHam.on('tap press', () => {
      toggleCanvaOps();
   });


   let toggleCanvaOps = () => {
      canvaMoreOpts.style.cssText = `
   width: 40%;
   height: 22%;
   opacity: 1;
   transform: scale(1);
   `;
      shareCanva.style.cssText = `
   
   `;
      deleteCanva.style.cssText = `
   
   `;
   }
   let closeCanvaOps = () => {
      canvaMoreOpts.style.cssText = `
   width: 40%;
   height: 0%;
   opacity: 0;
   transform: scale(0);
   `;
      shareCanva.style.cssText = `
   
   `;
      deleteCanva.style.cssText = `
   
   `;
   }

   gridDisplay.addEventListener('click', () => {
      gridBox.style.cssText = `
      transform: translate(-50%,-50%) scale(1);
      opacity: 1;
      `;

      canvaBlank.style.cssText = `
      opacity: 1;
      display: block;
      `;

      closeCanvaOps();
   });




   shareCanva.addEventListener("click", () => {
      console.log('sharing');
      downloadAndShare();
   });


   function downloadAndShare() {

      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");

      // Setting the temporary canvas dimensions
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // Creating a new image element
      const image = new Image();

      // Setting the image source as the data URL of the main canvas
      image.src = canvas.toDataURL();

      // When the image is loaded, draw it onto the temporary canvas
      image.onload = function() {
         // Settying the background color to white on the temporary canvas
         tempCtx.fillStyle = "#ffffff";
         tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

         tempCtx.drawImage(image, 0, 0);

         const dataURL = tempCanvas.toDataURL("image/png", 1.0);

         const link = document.createElement("a");
         link.href = dataURL;
         link.download = "canvas-image.png";

         link.click();
      };
   }
   let deletetheCanva = () => {
      console.log('canva delete');
      newCanvas.remove();

      const storedContainers = JSON.parse(localStorage.getItem("canvasContainers")) || [];
      const index = storedContainers.indexOf(newCanvas.id);
      if (index !== -1) {
         storedContainers.splice(index, 1);
         localStorage.setItem("canvasContainers", JSON.stringify(storedContainers));
      }
   };

   let deleteCanvaHam = new Hammer(deleteCanva);
   deleteCanvaHam.on('tap', () => {
      deletetheCanva();
   });

   let canvaBlankHam = new Hammer(canvaBlank);
   canvaBlankHam.on('swipeleft swiperight', (e) => {
      if (e.type === 'swipeleft') {
         canvasContainer.style.transform = 'scale(0.9) translate(-50%,0)';
      } else {

         canvasContainer.style.transform = 'scale(0.9) translate(50%,0)';

      }
      setTimeout(() => {
         deletetheCanva();

      }, 500)
   })




   let activeGrid = () => {
      clearGrid(); // Remove existing grid lines
      var gridsize = 5;
      for (var x = 1; x < canvas.width / gridsize; x++) {
         canvas.add(
            new fabric.Line([20 * x, 0, 20 * x, 1000], {
               stroke: "#C6C6C6",
               strokeWidth: 1,
               selectable: false,
               strokeDashArray: [0, 0],
            })
         );
         canvas.add(
            new fabric.Line([0, 20 * x, 1000, 20 * x], {
               stroke: "#C6C6C6",
               strokeWidth: 1,
               selectable: false,
               strokeDashArray: [0, 0],
            })
         );
      }
   };

   let lineGrid = () => {
      clearGrid(); // Remove existing grid lines
      var gridsize = 5;
      for (var x = 1; x < canvas.width / gridsize; x++) {
         canvas.add(
            new fabric.Line([20 * x, 0, 20 * x, 1000], {
               stroke: "#C6C6C6",
               strokeWidth: 1,
               selectable: false,
               strokeDashArray: [0, 20],
            })
         );
         canvas.add(
            new fabric.Line([0, 20 * x, 1000, 20 * x], {
               stroke: "#C6C6C6",
               strokeWidth: 1,
               selectable: false,
               strokeDashArray: [20, 0],
            })
         );
      }
   };

   let dotGrid = () => {
      clearGrid(); // Remove existing grid lines
      var gridsize = 5;
      for (var x = 1; x < canvas.width / gridsize; x++) {
         canvas.add(
            new fabric.Line([20 * x, 0, 20 * x, 5000], {
               stroke: "#000",
               strokeWidth: 1,
               selectable: false,
               strokeDashArray: [0, 20],
            })
         );
         canvas.add(
            new fabric.Line([0, 20 * x, 2000, 20 * x], {
               stroke: "#000",
               strokeWidth: 1,
               selectable: false,
               strokeDashArray: [1, 20],
            })
         );
      }
   };

   let clearGrid = () => {
      var objectsToRemove = [];
      canvas.getObjects().forEach(function(object) {
         if (object.stroke === "#C6C6C6" || object.stroke === "#000") {
            objectsToRemove.push(object);
         }
      });
      objectsToRemove.forEach(function(object) {
         canvas.remove(object);
      });
   };



   //* setting grid

   gridContainer.forEach((c) => {

      let selectedGridType = c.querySelector('div');



      selectedGridType.addEventListener('click', (e) => {


         gridType = selectedGridType.className;
         console.log(gridType);

      });
      selectedGridType.addEventListener('mousedown', () => {
         selectedGridType.classList.toggle('gridChoose');

      })
      selectedGridType.addEventListener('mouseleave', () => {
         selectedGridType.classList.toggle('gridChoose');

      })
   });

   gridOk.addEventListener('click', () => {
      gridBox.style.cssText = `
   transform: translate(-50%,-50%) scale(0);
   opacity: 0;
   `;
      canvaBlank.style.cssText = `
         opacity: 0;
         display: none;
         `;
      if (gridType === 'gridActive gridChoose') {
         console.log('gridActive choosen');
         activeGrid();

      } else if (gridType === 'gridLine gridChoose') {
         console.log('gridLine choosen');
         lineGrid();

      } else if (gridType === 'gridDot gridChoose') {
         console.log('gridLine choosen');
         dotGrid();

      } else if (gridType === 'gridClean gridChoose') {
         console.log('gridLine choosen');
         clearGrid();

      }

   })

   gridCancel.addEventListener('click', () => {
      gridBox.style.cssText = `
      transform: translate(-50%,-50%) scale(0);
      opacity: 0;
      `;
      canvaBlank.style.cssText = `
         opacity: 0;
         display: none;
         `;
   })

   canvaBlank.addEventListener('click', () => {
      gridBox.style.cssText = `
         transform: translate(-50%,-50%) scale(0);
         opacity: 0;
         `;

      canvaBlank.style.cssText = `
            opacity: 0;
            display: none;
            `;
   });
   
   let canvaStyleHam = new Hammer(canvaStyle);

   let lineWidth = 5;

   let prevmouseX, prevmouseY,
      selectedTool = 'canvaPen',
      brushWidth = 2;
   var startX, startY, endX, endY, snapshot;
   const halfLineWidth = lineWidth / 2;
   let fillStyle = '#333';
   let strokeStyle = '#000';
   const shadowColor = '#333';
   const lineCap = 'round';
   const shadowBlur = lineWidth / 4;
   let selectedColor = 'black';



   let colArrLength = colorArray.length + 1;






   canvaSize.addEventListener('change', () => {
      lineWidth = canvaSize.value;

      sizeBall.style.transform = `scale(1.${lineWidth})`;
      sizeBall.style.transformOrigin = 'center';
      if (lineWidth < 10) {
         sizeBall.style.transform = `scale(0.${lineWidth})`;
      } else if (lineWidth > 20) {
         sizeBall.style.transform = `scale(1.7${lineWidth})`;

      }

      if (selectedTool === 'canvaPen') {
         setPenMode();
      } else if (selectedTool === 'canvaMarker') {
         setMarkerMode();
      } else if (selectedTool === 'canvaBrush') {
         setBrushMode();
      } else if (selectedTool === 'canvaSelect') {
         setSelectMode();
      } else if (selectedTool === 'canvaEraser') {
         setEraserMode()
      }
      // console.log(lineWidth);
   })



   for (let i = 0; i < colArrLength; i++) {
      // console.log(colorArray[i]);
      const createDiv = document.createElement('div');
      createDiv.classList.add(colorArray[i]);
      // createDiv.classList.add('Cballs');
      // console.log(createDiv.className);
      const colors = canvaColor.querySelectorAll('div');
      canvaColor.appendChild(createDiv);

      // colors.style.backgroundColor = colorArray[i];

      colors.forEach((c, i) => {
         // console.log('hi colors works');
         c.style.cssText = `
      background: ${colorArray[i]};
      border: 1px solid ${colorArray[i]};
      `;
      })
   }

   const colorsClass = canvaColor.querySelectorAll('div');
   const canvaTool = canvaType.querySelectorAll('div');

   let storeColorArray = {
      canvaPen: '',
      canvaMarker: '',
      canvaBrush: '',
   }

   window.addEventListener('load', () => {
      storeColorArray.canvaPen = selectedColor;
      storeColorArray.canvaMarker = selectedColor;
      storeColorArray.canvaBrush = selectedColor;
      // console.log(storeColorArray);
   })

   canvas.allowPan = false;


   let tooMouseMove = (e) => {
      activeLineSpan.style.cssText = `
      left: ${e.pageX}px;
      background: #00BFFF;
      width: 15%;
      
      `;
      setTimeout(() => {
         activeLineSpan.style.cssText = `
          left: ${e.pageX}px;
          background: #00BFFF;
          width: 10%;
          
          `;
      }, 300)
   }
   let allToolsStyle;
   colorsClass.forEach((e) => {

      const colorHam = new Hammer(e);

      colorHam.on('tap', () => {
         selectedColor = e.className;
         // console.log(selectedColor);
         if (selectedTool === 'canvaPen') {
            storeColorArray.canvaPen = selectedColor;
            selectedColor = storeColorArray.canvaPen;
            // canvasContext.globalAlpha = 1;

            sizeBall.style.backgroundColor = selectedColor;
            allToolsStyle.style.cssText = `
               background: -webkit-linear-gradient(bottom left,#eee 75%, ${selectedColor} 25%);
               -webkit-background-clip: text;
               -webkit-text-fill-color: transparent;
               
               `;
            setPenMode();

            // console.log(storeColorArray);
         } else if (selectedTool === 'canvaMarker') {
            storeColorArray.canvaMarker = selectedColor;
            selectedColor = storeColorArray.canvaMarker;

            sizeBall.style.backgroundColor = selectedColor;

            allToolsStyle.style.cssText = `
               background: -webkit-linear-gradient(bottom left,#eee 50%, ${selectedColor} 50%);
               -webkit-background-clip: text;
               -webkit-text-fill-color: transparent;
               
               `;
            setMarkerMode();
         } else if (selectedTool === 'canvaBrush') {
            storeColorArray.canvaBrush = selectedColor;
            selectedColor = storeColorArray.canvaBrush;

            sizeBall.style.backgroundColor = selectedColor;

            allToolsStyle.style.cssText = `
               background: -webkit-linear-gradient(bottom left,#eee 70%, ${selectedColor} 30%);
               -webkit-background-clip: text;
               -webkit-text-fill-color: transparent;
               
               `;
            setBrushMode();
         } else if (selectedTool === 'canvaEraser') {

            setEraserMode()
         }

      });

   });
   canvaTool.forEach((e) => {
      e.addEventListener('mousemove', (e) => {

         tooMouseMove(e);
      })

      const typeHam = new Hammer(e);


      let countingTap = 0;

      typeHam.on('tap', (t) => {
         selectedTool = e.className;
         allToolsStyle = e;

         countingTap += 1;
         if (countingTap > 1) {
            canvaStyle.style.cssText = `
       display: flex;
      transform: translate(0, 0);
      `;
            countingTap -= 2;
         }

         if (selectedTool === 'canvaPen') {
            selectedColor = storeColorArray.canvaPen;
            sizeBall.style.backgroundColor = selectedColor;
            e.style.cssText = `
   background: -webkit-linear-gradient(bottom left,#eee 75%, ${selectedColor} 25%);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   
   `;

            setPenMode();
         } else if (selectedTool === 'canvaMarker') {
            selectedColor = storeColorArray.canvaMarker;
            sizeBall.style.backgroundColor = selectedColor;
            e.style.cssText = `
      background: -webkit-linear-gradient(bottom left,#eee 50%, ${selectedColor} 50%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      
      `;
            setMarkerMode();
         } else if (selectedTool === 'canvaBrush') {
            selectedColor = storeColorArray.canvaBrush;

            sizeBall.style.backgroundColor = selectedColor;
            e.style.cssText = `
      background: -webkit-linear-gradient(bottom left,#eee 70%, ${selectedColor} 30%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      
      `;
            setBrushMode();
         } else if (selectedTool === 'canvaSelect') {
            setSelectMode();

         } else if (selectedTool === 'canvaEraser') {

            setEraserMode();
         }
      });

      typeHam.on('doubletap', () => {
         canvaStyle.style.cssText = `
       display: flex;
      
   transform: translate(0, 80%);
   
   `;
      });


   });



   const canvasBg = () => {
      canvasContext.fillStyle = '#fff';
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);
      canvasContext.fillStyle = selectedColor;
   };



   const undoButton = noteConCanva.querySelector(".undo");
   const redoButton = noteConCanva.querySelector(".redo");


   let canvasStates = []; // Array to store canvas states
   let currentState = -1; // Index of the current state

   function addState() {
      // if (!isDrawing) 


      // Removing any states after the current state
      canvasStates = canvasStates.slice(0, currentState + 1);

      canvasStates.push(canvas.toDataURL());
      currentState++;

      console.log('State added');
   }

   // Function to restore a state
   function restoreState(stateIndex) {
      let ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = canvasStates[stateIndex];
      image.onload = function() {
         ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
         ctx.drawImage(image, 0, 0); // Draw the image
         console.log('State restored');
      };
   }

   // Adding an event listener for clicks on the undo button
   undoButton.addEventListener("click", function() {
      replay(undo, redo, redoButton, this);

   });

   redoButton.addEventListener("click", function() {
      replay(redo, undo, /*'.undo'*/ undoButton, this);



   });






   var state;
   var undo = [];
   var redo = [];


   function save() {
      // clear the redo stack
      redo = [];

      if (state) {
         undo.push(state);

         undoButton.disabled = false;

      }
      state = JSON.stringify(canvas);
   }

   /**
    * Save the current state in the redo stack, reset to a state in the undo stack, and enable the buttons accordingly.
    * Or, do the opposite (redo vs. undo)
    * @param playStack which stack to get the last state from and to then render the canvas as
    * @param saveStack which stack to push current state into
    * @param buttonsOn jQuery selector. Enable these buttons.
    * @param buttonsOff jQuery selector. Disable these buttons.
    */
   function replay(playStack, saveStack, buttonsOn, buttonsOff) {
      saveStack.push(state);
      state = playStack.pop();
      var on = buttonsOn;
      var off = buttonsOff;
      on.disabled = true;
      off.disabled = true;
      canvas.clear();
      canvas.loadFromJSON(state, function() {
         canvas.renderAll();
         on.disabled = false;

         if (playStack.length) {
            off.disabled = false;

         }
      });
   }

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // Set up the canvas
   // canvas = new fabric.Canvas('canvas');
   // canvas.setWidth(500);
   // canvas.setHeight(500);
   // save initial state
   save();
   // register event listener for user's actions
   canvas.on('object:modified', function() {
      save();
   });
   canvas.on('mouse:up', save);


   let currentBrushWidth = lineWidth;

   function setBrushWidth(width) {
      currentBrushWidth = width;
      if (canvas.isDrawingMode) {
         canvas.freeDrawingBrush.width = parseInt(width, 10);
      }
   }

   function setEraserMode() {
      canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
      isDrawing = true;
      canvas.isDrawingMode = true;
      canvas.selection = false;
      currentBrushWidth = lineWidth;
      setBrushWidth(currentBrushWidth);
      canvas.off('mouse:down');
   }

   function setPenMode() {
      isDrawing = true;
      canvas.isDrawingMode = true;
      canvas.selection = false;
      currentBrushWidth = lineWidth;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas, { opacity: 1 });
      setBrushWidth(currentBrushWidth);
      canvas.freeDrawingBrush.color = selectedColor;
      canvas.freeDrawingBrush.shadow = null; // Removing any existing shadow
      canvas.off('mouse:down');

      canvas.renderAll();

   }

   function setMarkerMode() {
      isDrawing = true;
      canvas.isDrawingMode = true;
      canvas.selection = false;
      currentBrushWidth = lineWidth;
      setBrushWidth(currentBrushWidth);
      canvas.freeDrawingBrush.color = selectedColor;

      canvas.freeDrawingBrush = new fabric.MarkerBrush(canvas, { opacity: 1 });
      canvas.freeDrawingBrush.shadow = new fabric.Shadow({
         color: selectedColor,
         blur: currentBrushWidth / 2,
         offsetX: 0,
         offsetY: 0,
      });
      canvas.renderAll();
      canvas.off('mouse:down');

   }

   function setBrushMode() {
      isDrawing = true;
      canvas.isDrawingMode = true;
      canvas.selection = false;
      currentBrushWidth = lineWidth;
      setBrushWidth(currentBrushWidth);
      canvas.freeDrawingBrush.color = selectedColor;
      canvas.freeDrawingBrush.shadow = null; // Remove any existing shadow
      canvas.freeDrawingBrush = new fabric.InkBrush(canvas,
      {
         opacity: 0.6 // Opacity of brush
      });
      canvas.off('mouse:down');

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



   let handleAddState = (e) => {
      addState();
      console.log('mouse got up from canvas');

   }


   // Generating a unique ID for the canvas container
   const containerId = "canvasContainer_" + Date.now();

   canvasContainer.id = containerId;

   const storedContainers = JSON.parse(localStorage.getItem("canvasContainers")) || [];
   storedContainers.push(containerId);
   localStorage.setItem("canvasContainers", JSON.stringify(storedContainers));


} 

createCanvabtn.addEventListener('click', () => {
   createCanvas();
})



function loadCanvasContainers() {
   const storedContainers = JSON.parse(localStorage.getItem("canvasContainers")) || [];
   storedContainers.forEach((containerId) => {
      /**********/

      let newCanvas;
      const createCanvasStored = () => {
         newCanvas = document.createElement('div');
         newCanvas.classList.add('canvasContainer');
         let innerData = `
   <div class="canvaBlank"></div>

   <div class="convaOptns">
      <div class="convaBack">
         <i class="fa fa-arrow-left"></i>
      </div>
      <button class="undo">
         <i class="fa fa-undo"></i>
      </button>
      <button class="redo" disabled>
         <i class="fa fa-undo fa-rotate-180"></i>
      </button>
      <div class="three-dot">
         
         <span>
         <i class="fa fa-circle"></i>
         <i class="fa fa-circle"></i>
         <i class="fa fa-circle"></i>
         </span>
         
         

      </div>
   </div>
   
   <canvas class="canvas" id="canvas">
      
   </canvas>
   <div class="canvaStyle">
   <div class="canvaType">
      <div class="canvaSelect" id='select'>
         <i class="fa fa-object-group"></i>
      </div>
      <div class="canvaEraser" id='eraser'>
         <i class="fa-solid fa-eraser"></i>
      </div>
      <div class="canvaPen" id='pen'>
         <i class="fa-solid fa-pen"></i>
      </div>
      <div class="canvaMarker" id='marker'>
         <i class="fa-solid fa-marker"></i>
      </div>
      <div class="canvaBrush" id='brush'>
         <i class="fa-solid fa-brush"></i>
      </div>
   </div>
   <div class="activeLine"><span></span></div>
   <div class="canvaColor">
   </div>
   <div class="canvaSizing">
      <input class="canvaSize" type="range" name="size" min="1" max="30" value="5"> <div class="sizeBall"><span></span></div>
   </div>
   
 </div>
  
       <div class="canvaMoreOpts">
         <div class="gridDisplay">
         Show grid
          </div>
         <div class="shareCanva">
         Share
         </div>
         <div class="deleteCanva">
         Delete
         </div>
      </div>
   
<div class="gridBox">
   
<div class="chooseGrid">
   <div class="gridContainer">
   <div class="gridActive"></i></div>
   <span>Squere</span>
   </div>
   
   <div class="gridContainer">
   <div class="gridLine"></div>
   <span>Rule</span>
   </div>
   
   <div class="gridContainer">
   <div class="gridDot"></div>
   <span>dot</span>
   </div>
   
   <div class="gridContainer">
   <div class="gridClean"></div>
   <span>none</span>
   </div>
</div>
<div class="gridLock">
   <div class="gridCancel">
      cancel
   </div>
   <div class="gridOk">
      Accept
   </div>
</div>
</div>
<div class='closeCanvaAlert'>
<h1>Are you sure?</h1>
<p>Changes may not be editable in future</p>
<div canvaCloseYesOrNo>
<span class='no'>No</span>
<span class='yes'>Ok</span>
</div>
</div>
      `;
         newCanvas.insertAdjacentHTML('afterbegin', innerData);
         noteConCanva.insertAdjacentElement('afterbegin', newCanvas);


         const canvasElement = noteConCanva.querySelector('.canvas');
         const canvasContainer = noteConCanva.querySelector('.canvasContainer');


         let canvasWidth = canvasContainer.offsetWidth;
         let canvasHeight = canvasContainer.offsetHeight;

         canvasElement.width = canvasWidth;
         canvasElement.height = canvasHeight;








         let newWidth = canvasContainer.offsetWidth;
         let newHeight = canvasContainer.offsetHeight;
         canvasContainer.addEventListener('resize', () => {
            console.log('resized');
            canvasElement.width = canvasWidth;
            canvasElement.height = canvasHeight;

            newWidth = canvasContainer.offsetWidth;
            newHeight = canvasContainer.offsetHeight;

            canvas.setWidth(newWidth);
            canvas.setHeight(newHeight);
            canvas.renderAll();
         });



         const canvas = new fabric.Canvas('canvas'),
            canvasContext = canvas.getContext('2d');
         let isDrawing = false;

         const closeCanva = noteConCanva.querySelector('.convaBack');

         const convaOptns = noteConCanva.querySelector('.convaOptns');

         let canvaStyle = noteConCanva.querySelector('.canvaStyle');
         let canvaColor = noteConCanva.querySelector('.canvaColor');
         let canvaType = noteConCanva.querySelector('.canvaType');
         let canvaSize = noteConCanva.querySelector('.canvaSize');
         let sizeBallContainer = noteConCanva.querySelector('.sizeBall');
         let sizeBall = sizeBallContainer.querySelector('span');

         let activeLine = noteConCanva.querySelector('.activeLine');
         let activeLineSpan = activeLine.querySelector('span');

         let threeDot = noteConCanva.querySelector('.three-dot');
         let canvaBlank = noteConCanva.querySelector('.canvaBlank');

         let closeCanvaAlert = noteConCanva.querySelector('.closeCanvaAlert');
         let closeCanvachoice = closeCanvaAlert.querySelectorAll('span');

         // Save the canvas drawing to localStorage
         function saveCanvasDrawing(canvasContainer, canvas) {
            const canvasData = canvas.toDataURL();
            localStorage.setItem(canvasContainer.id, canvasData);
         }

         function restoreCanvasDrawing(canvasContainer, canvas) {
            console.log('restor canvas log line no.1714');
            const canvasData = localStorage.getItem(canvasContainer.id);
            if (canvasData) {
               fabric.Image.fromURL(canvasData, (img) => {
                  canvas.clear();
                  canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                     scaleX: canvas.width / img.width,
                     scaleY: canvas.height / img.height
                  });
               });
            }
         }
         let closeOrNot;
         closeCanvachoice.forEach((e) => {
            e.addEventListener('click', () => {
               closeOrNot = e.className;

               if (closeOrNot === 'yes') {
                  closingAlert();
                  closeCanvaAlert.style.cssText = `
         transform: scale(0) translate(-50%,-50%);
         transition: 1s ease all;
         `;
                  // setTimeout(()=>{
                  //  closeCanvaAlert.style.cssText = `
                  //           display: none;
                  //           `;  
                  // },1000);
               } else {
                  closeCanvaAlert.style.cssText = `
         transform: scale(2);
         transition: 1s ease all;
         `;
               }
            })
         })

         let closingAlert = () => {


            saveCanvasDrawing(canvasContainer, canvas);

            canvasElement.width = canvasWidth;
            canvasElement.height = canvasHeight;


            newWidth = canvasContainer.offsetWidth;
            newHeight = canvasContainer.offsetHeight;

            canvas.setWidth(newWidth);
            canvas.setHeight(newHeight);
            canvas.renderAll();


            canvas.isDrawingMode = false;
            canvas.selectable = false;

            canvasContainer.style.cssText = `
   width: 49vw;
   height: 50vh;
   position: relative;
   z-index: 200;
   `;
            convaOptns.style.cssText = `
   display: none;
   `;
            canvaStyle.style.cssText = `
   display: none;
   `;
            canvaBlank.style.cssText = `
   
   display: block;
   opacity: 1;
   z-index: 200;
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: transparent;
   `;


         }

         closeCanva.addEventListener('click', () => {
            console.log('canva closing');
            closeCanvaAlert.style.cssText = `
         transform: scale(1) translate(-50%,-50%);
         display: flex;
         `;
         })

         canvaBlank.addEventListener('click', () => {



            console.log('canva opening');
            restoreCanvasDrawing(canvasContainer, canvas);

            canvasElement.width = canvasWidth;
            canvasElement.height = canvasHeight;


            newWidth = canvasContainer.offsetWidth * 2;
            newHeight = canvasContainer.offsetHeight * 2;

            canvas.setWidth(newWidth);
            canvas.setHeight(newHeight);
            canvas.renderAll();



            // canvas.isDrawingMode = true;
            // canvas.selectable = false;

            canvasContainer.style.cssText = `
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 201;
    `;
            convaOptns.style.cssText = `
    display: flex;
    `;
            canvaStyle.style.cssText = `
    display: flex;
    `;
            canvaBlank.style.cssText = `
     
   display: none;
   opacity: 0;
   z-index: 20;
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: transparent;
    `;
         })





         let canvaMoreOpts = noteConCanva.querySelector('.canvaMoreOpts');

         let gridDisplay = noteConCanva.querySelector('.gridDisplay');




         let shareCanva = noteConCanva.querySelector('.shareCanva');
         let deleteCanva = noteConCanva.querySelector('.deleteCanva');

         let gridBox = noteConCanva.querySelector('.gridBox');
         let gridOk = noteConCanva.querySelector('.gridOk');
         let gridCancel = noteConCanva.querySelector('.gridCancel');


         let gridContainer = noteConCanva.querySelectorAll('.gridContainer');
         let gridType;

         let threeDotHam = new Hammer(threeDot);
         threeDotHam.on('tap press', () => {
            toggleCanvaOps();
         });


         let toggleCanvaOps = () => {
            canvaMoreOpts.style.cssText = `
   width: 40%;
   height: 22%;
   opacity: 1;
   transform: scale(1);
   `;
            shareCanva.style.cssText = `
   
   `;
            deleteCanva.style.cssText = `
   
   `;
         }
         let closeCanvaOps = () => {
            canvaMoreOpts.style.cssText = `
   width: 40%;
   height: 0%;
   opacity: 0;
   transform: scale(0);
   `;
            shareCanva.style.cssText = `
   
   `;
            deleteCanva.style.cssText = `
   
   `;
         }

         gridDisplay.addEventListener('click', () => {
            gridBox.style.cssText = `
      transform: translate(-50%,-50%) scale(1);
      opacity: 1;
      `;

            canvaBlank.style.cssText = `
      opacity: 1;
      display: block;
      `;

            closeCanvaOps();
         });




         shareCanva.addEventListener("click", () => {
            console.log('sharing');
            downloadAndShare();
         });


         function downloadAndShare() {

            const tempCanvas = document.createElement("canvas");
            const tempCtx = tempCanvas.getContext("2d");

            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;

            const image = new Image();

            image.src = canvas.toDataURL();

            image.onload = function() {
               tempCtx.fillStyle = "#ffffff";
               tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

               tempCtx.drawImage(image, 0, 0);

               const dataURL = tempCanvas.toDataURL("image/png", 1.0);

               const link = document.createElement("a");
               link.href = dataURL;
               link.download = "canvas-image.png";

               link.click();
            };
         }



         /*let deletetheCanva = ()=>{
            console.log('canva delete');
            newCanvas.remove();
            
         };
         let deleteCanvaHam = new Hammer(deleteCanva);
         deleteCanvaHam.on('tap',()=>{
            deletetheCanva();
         });*/
         let deletetheCanva = () => {
            console.log('canva delete');
            newCanvas.remove();

            // Remove the canvas container ID from the storedContainers array in localStorage
            const storedContainers = JSON.parse(localStorage.getItem("canvasContainers")) || [];
            const index = storedContainers.indexOf(newCanvas.id);
            if (index !== -1) {
               storedContainers.splice(index, 1);
               localStorage.setItem("canvasContainers", JSON.stringify(storedContainers));
            }
         };

         let deleteCanvaHam = new Hammer(deleteCanva);
         deleteCanvaHam.on('tap', () => {
            deletetheCanva();
         });

         let canvaBlankHam = new Hammer(canvaBlank);
         canvaBlankHam.on('swipeleft swiperight', (e) => {
            if (e.type === 'swipeleft') {
               canvasContainer.style.transform = 'scale(0.9) translate(-50%,0)';
            } else {

               canvasContainer.style.transform = 'scale(0.9) translate(50%,0)';

            }
            setTimeout(() => {
               deletetheCanva();

            }, 500)
         })


         let activeGrid = () => {
            clearGrid(); // Remove existing grid lines
            var gridsize = 5;
            for (var x = 1; x < canvas.width / gridsize; x++) {
               canvas.add(
                  new fabric.Line([20 * x, 0, 20 * x, 1000], {
                     stroke: "#C6C6C6",
                     strokeWidth: 1,
                     selectable: false,
                     strokeDashArray: [0, 0],
                  })
               );
               canvas.add(
                  new fabric.Line([0, 20 * x, 1000, 20 * x], {
                     stroke: "#C6C6C6",
                     strokeWidth: 1,
                     selectable: false,
                     strokeDashArray: [0, 0],
                  })
               );
            }
         };

         let lineGrid = () => {
            clearGrid(); // Remove existing grid lines
            var gridsize = 5;
            for (var x = 1; x < canvas.width / gridsize; x++) {
               canvas.add(
                  new fabric.Line([20 * x, 0, 20 * x, 1000], {
                     stroke: "#C6C6C6",
                     strokeWidth: 1,
                     selectable: false,
                     strokeDashArray: [0, 20],
                  })
               );
               canvas.add(
                  new fabric.Line([0, 20 * x, 1000, 20 * x], {
                     stroke: "#C6C6C6",
                     strokeWidth: 1,
                     selectable: false,
                     strokeDashArray: [20, 0],
                  })
               );
            }
         };

         let dotGrid = () => {
            clearGrid(); // Remove existing grid lines
            var gridsize = 5;
            for (var x = 1; x < canvas.width / gridsize; x++) {
               canvas.add(
                  new fabric.Line([20 * x, 0, 20 * x, 5000], {
                     stroke: "#000",
                     strokeWidth: 1,
                     selectable: false,
                     strokeDashArray: [0, 20],
                  })
               );
               canvas.add(
                  new fabric.Line([0, 20 * x, 2000, 20 * x], {
                     stroke: "#000",
                     strokeWidth: 1,
                     selectable: false,
                     strokeDashArray: [1, 20],
                  })
               );
            }
         };

         let clearGrid = () => {
            var objectsToRemove = [];
            canvas.getObjects().forEach(function(object) {
               if (object.stroke === "#C6C6C6" || object.stroke === "#000") {
                  objectsToRemove.push(object);
               }
            });
            objectsToRemove.forEach(function(object) {
               canvas.remove(object);
            });
         };

         //* setting grid

         gridContainer.forEach((c) => {

            let selectedGridType = c.querySelector('div');



            selectedGridType.addEventListener('click', (e) => {


               gridType = selectedGridType.className;
               console.log(gridType);

            });
            selectedGridType.addEventListener('mousedown', () => {
               selectedGridType.classList.toggle('gridChoose');

            })
            selectedGridType.addEventListener('mouseleave', () => {
               selectedGridType.classList.toggle('gridChoose');

            })
         });

         gridOk.addEventListener('click', () => {
            gridBox.style.cssText = `
   transform: translate(-50%,-50%) scale(0);
   opacity: 0;
   `;
            canvaBlank.style.cssText = `
         opacity: 0;
         display: none;
         `;
            if (gridType === 'gridActive gridChoose') {
               console.log('gridActive choosen');
               activeGrid();

            } else if (gridType === 'gridLine gridChoose') {
               console.log('gridLine choosen');
               lineGrid();

            } else if (gridType === 'gridDot gridChoose') {
               console.log('gridLine choosen');
               dotGrid();

            } else if (gridType === 'gridClean gridChoose') {
               console.log('gridLine choosen');
               clearGrid();

            }

         })

         gridCancel.addEventListener('click', () => {
            gridBox.style.cssText = `
      transform: translate(-50%,-50%) scale(0);
      opacity: 0;
      `;
            canvaBlank.style.cssText = `
         opacity: 0;
         display: none;
         `;
         })

         canvaBlank.addEventListener('click', () => {
            gridBox.style.cssText = `
         transform: translate(-50%,-50%) scale(0);
         opacity: 0;
         `;

            canvaBlank.style.cssText = `
            opacity: 0;
            display: none;
            `;
         });

         let canvaStyleHam = new Hammer(canvaStyle);


         let lineWidth = 5;

         let prevmouseX, prevmouseY,
            selectedTool = 'canvaPen',
            brushWidth = 2;
         var startX, startY, endX, endY, snapshot;
         const halfLineWidth = lineWidth / 2;
         let fillStyle = '#333';
         let strokeStyle = '#000';
         const shadowColor = '#333';
         const lineCap = 'round';
         const shadowBlur = lineWidth / 4;
         let selectedColor = 'black';



         let colArrLength = colorArray.length + 1;






         canvaSize.addEventListener('change', () => {
            lineWidth = canvaSize.value;

            sizeBall.style.transform = `scale(1.${lineWidth})`;
            sizeBall.style.transformOrigin = 'center';
            if (lineWidth < 10) {
               sizeBall.style.transform = `scale(0.${lineWidth})`;
            } else if (lineWidth > 20) {
               sizeBall.style.transform = `scale(1.7${lineWidth})`;

            }

            if (selectedTool === 'canvaPen') {
               setPenMode();
            } else if (selectedTool === 'canvaMarker') {
               setMarkerMode();
            } else if (selectedTool === 'canvaBrush') {
               setBrushMode();
            } else if (selectedTool === 'canvaSelect') {
               setSelectMode();
            } else if (selectedTool === 'canvaEraser') {
               setEraserMode()
            }
         })



         for (let i = 0; i < colArrLength; i++) {
            const createDiv = document.createElement('div');
            createDiv.classList.add(colorArray[i]);
            const colors = canvaColor.querySelectorAll('div');
            canvaColor.appendChild(createDiv);

            colors.forEach((c, i) => {
               c.style.cssText = `
      background: ${colorArray[i]};
      border: 1px solid ${colorArray[i]};
      `;
            })
         }

         const colorsClass = canvaColor.querySelectorAll('div');
         const canvaTool = canvaType.querySelectorAll('div');

         let storeColorArray = {
            canvaPen: '',
            canvaMarker: '',
            canvaBrush: '',
         }

         window.addEventListener('load', () => {
            storeColorArray.canvaPen = selectedColor;
            storeColorArray.canvaMarker = selectedColor;
            storeColorArray.canvaBrush = selectedColor;
         })

         canvas.allowPan = false;


         let tooMouseMove = (e) => {
            activeLineSpan.style.cssText = `
      left: ${e.pageX}px;
      background: #00BFFF;
      width: 15%;
      
      `;
            setTimeout(() => {
               activeLineSpan.style.cssText = `
          left: ${e.pageX}px;
          background: #00BFFF;
          width: 10%;
          
          `;
            }, 300)
         }
         let allToolsStyle;
         colorsClass.forEach((e) => {

            const colorHam = new Hammer(e);

            colorHam.on('tap', () => {
               selectedColor = e.className;
               if (selectedTool === 'canvaPen') {
                  storeColorArray.canvaPen = selectedColor;
                  selectedColor = storeColorArray.canvaPen;

                  sizeBall.style.backgroundColor = selectedColor;
                  allToolsStyle.style.cssText = `
               background: -webkit-linear-gradient(bottom left,#eee 75%, ${selectedColor} 25%);
               -webkit-background-clip: text;
               -webkit-text-fill-color: transparent;
               
               `;
                  setPenMode();

               } else if (selectedTool === 'canvaMarker') {
                  storeColorArray.canvaMarker = selectedColor;
                  selectedColor = storeColorArray.canvaMarker;

                  sizeBall.style.backgroundColor = selectedColor;

                  allToolsStyle.style.cssText = `
               background: -webkit-linear-gradient(bottom left,#eee 50%, ${selectedColor} 50%);
               -webkit-background-clip: text;
               -webkit-text-fill-color: transparent;
               
               `;
                  setMarkerMode();
               } else if (selectedTool === 'canvaBrush') {
                  storeColorArray.canvaBrush = selectedColor;
                  selectedColor = storeColorArray.canvaBrush;

                  sizeBall.style.backgroundColor = selectedColor;

                  allToolsStyle.style.cssText = `
               background: -webkit-linear-gradient(bottom left,#eee 70%, ${selectedColor} 30%);
               -webkit-background-clip: text;
               -webkit-text-fill-color: transparent;
               
               `;
                  setBrushMode();
               } else if (selectedTool === 'canvaEraser') {

                  setEraserMode()
               }

            });

         });
         canvaTool.forEach((e) => {
            e.addEventListener('mousemove', (e) => {

               tooMouseMove(e);
            })

            const typeHam = new Hammer(e);


            let countingTap = 0;

            typeHam.on('tap', (t) => {
               selectedTool = e.className;
               allToolsStyle = e;

               countingTap += 1;
               if (countingTap > 1) {
                  canvaStyle.style.cssText = `
       display: flex;
      transform: translate(0, 0);
      `;
                  countingTap -= 2;
               }
               if (selectedTool === 'canvaPen') {
                  selectedColor = storeColorArray.canvaPen;
                  sizeBall.style.backgroundColor = selectedColor;
                  e.style.cssText = `
   background: -webkit-linear-gradient(bottom left,#eee 75%, ${selectedColor} 25%);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   
   `;

                  setPenMode();
               } else if (selectedTool === 'canvaMarker') {
                  selectedColor = storeColorArray.canvaMarker;
                  sizeBall.style.backgroundColor = selectedColor;
                  e.style.cssText = `
      background: -webkit-linear-gradient(bottom left,#eee 50%, ${selectedColor} 50%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      
      `;
                  setMarkerMode();
               } else if (selectedTool === 'canvaBrush') {
                  selectedColor = storeColorArray.canvaBrush;

                  sizeBall.style.backgroundColor = selectedColor;
                  e.style.cssText = `
      background: -webkit-linear-gradient(bottom left,#eee 70%, ${selectedColor} 30%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      
      `;
                  setBrushMode();
               } else if (selectedTool === 'canvaSelect') {
                  setSelectMode();

               } else if (selectedTool === 'canvaEraser') {

                  setEraserMode();
               }


            });

            typeHam.on('doubletap', () => {
               // console.log('double tap');
               canvaStyle.style.cssText = `
       display: flex;
      
   transform: translate(0, 80%);
   
   `;
            });


         });



         const canvasBg = () => {
            canvasContext.fillStyle = '#fff';
            canvasContext.fillRect(0, 0, canvas.width, canvas.height);
            canvasContext.fillStyle = selectedColor;
         };

         const undoButton = noteConCanva.querySelector(".undo");
         const redoButton = noteConCanva.querySelector(".redo");


         let canvasStates = []; // Array to store canvas states
         let currentState = -1; // Index of the current state

         function addState() {


            canvasStates = canvasStates.slice(0, currentState + 1);

            canvasStates.push(canvas.toDataURL());
            currentState++;

            console.log('State added');
            // }
         }

         function restoreState(stateIndex) {
            let ctx = canvas.getContext('2d');
            const image = new Image();
            image.src = canvasStates[stateIndex];
            image.onload = function() {
               ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
               ctx.drawImage(image, 0, 0); // Draw the image
               console.log('State restored');
            };
         }

         undoButton.addEventListener("click", function() {
            replay(undo, redo, redoButton, this);
         });

         redoButton.addEventListener("click", function() {
            replay(redo, undo, /*'.undo'*/ undoButton, this);

         });



         var state;
         var undo = [];
         var redo = [];


         function save() {
            // clear the redo stack
            redo = [];

            if (state) {
               undo.push(state);

               undoButton.disabled = false;

            }
            state = JSON.stringify(canvas);
         }

         function replay(playStack, saveStack, buttonsOn, buttonsOff) {
            saveStack.push(state);
            state = playStack.pop();
            var on = buttonsOn;
            var off = buttonsOff;
            on.disabled = true;
            off.disabled = true;
            canvas.clear();
            canvas.loadFromJSON(state, function() {
               canvas.renderAll();
               on.disabled = false;

               if (playStack.length) {
                  off.disabled = false;

               }
            });
         }
         save();
         // register event listener for user's actions
         canvas.on('object:modified', function() {
            save();
         });
         canvas.on('mouse:up', save);





         let currentBrushWidth = lineWidth;

         function setBrushWidth(width) {
            currentBrushWidth = width;
            if (canvas.isDrawingMode) {
               canvas.freeDrawingBrush.width = parseInt(width, 10);
            }
         }

         function setEraserMode() {
            canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
            isDrawing = true;
            canvas.isDrawingMode = true;
            canvas.selection = false;
            currentBrushWidth = lineWidth;
            setBrushWidth(currentBrushWidth);
            canvas.off('mouse:down');
         }

         function setPenMode() {
            isDrawing = true;
            canvas.isDrawingMode = true;
            canvas.selection = false;
            currentBrushWidth = lineWidth;
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas, { opacity: 1 });
            setBrushWidth(currentBrushWidth);
            canvas.freeDrawingBrush.color = selectedColor;
            canvas.freeDrawingBrush.shadow = null; // Remove any existing shadow
            canvas.off('mouse:down');

            canvas.renderAll();

         }

         function setMarkerMode() {
            isDrawing = true;
            canvas.isDrawingMode = true;
            canvas.selection = false;
            currentBrushWidth = lineWidth;
            setBrushWidth(currentBrushWidth);
            canvas.freeDrawingBrush.color = selectedColor;

            canvas.freeDrawingBrush = new fabric.MarkerBrush(canvas, { opacity: 1 });
            canvas.freeDrawingBrush.shadow = new fabric.Shadow({
               color: selectedColor,
               blur: currentBrushWidth / 2,
               offsetX: 0,
               offsetY: 0,
            });
            canvas.renderAll();
            canvas.off('mouse:down');

         }

         function setBrushMode() {
            isDrawing = true;
            canvas.isDrawingMode = true;
            canvas.selection = false;
            currentBrushWidth = lineWidth;
            setBrushWidth(currentBrushWidth);
            canvas.freeDrawingBrush.color = selectedColor;
            canvas.freeDrawingBrush.shadow = null; // Remove any existing shadow
            canvas.freeDrawingBrush = new fabric.InkBrush(canvas,
            {
               opacity: 0.6 // Opacity of brush
            });
            canvas.off('mouse:down');

         }

         function setSelectMode() {
            isDrawing = false;
            canvas.isDrawingMode = false;
            canvas.selection = true;
            canvas.off('mouse:down');
            canvas.on('mouse:down', handleObjectSelection);
            console.log('select');
            //  addState();

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



         canvasContainer.id = containerId;

      }

      const canvasData = localStorage.getItem(containerId);
      if (canvasData) {
         fabric.Image.fromURL(canvasData, (img) => {
            const fabricCanvas = new fabric.Canvas(newCanvas.querySelector(".canvas"));
            fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas));
         }, { crossOrigin: "anonymous" }); // Added { crossOrigin: "anonymous" } parameter
      }


      createCanvasStored();

      /**********/
   });
}


loadCanvasContainers();

