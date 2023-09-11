let noteCheckCon = document.querySelector('#noteCon');



let canvaBlank = document.querySelector('.canvaBlank');

let createTable = document.querySelector('#createTable');

let storCheckNew = (event) => {
   let checkInpS = document.querySelectorAll('.checkBoxInput');
   let checkBoxArray = [];
    checkInpS.forEach((input)=>{
     return checkBoxArray.push(input.checked);
      
    })
      localStorage.setItem('checkBoxStatus', JSON.stringify(checkBoxArray));
  
}


const createList = (text1 = '', text2 = '', index, time = '') => {


   let newNote = document.createElement('div');
   newNote.classList.add('content');
   let innerData = `
   
      <div class="contentOptions">
         <div class="conOpts back"><span class="ripple">&larr;</span></div>
         <div class="conOpts pin"><span>&#128204;</span></div>
         <div class="conOpts remind"><span>&#128276;</span></div>
         <div class="conOpts save"><span class="ripple"><i class="fa fa-archive"></i></span></div>
      </div>
         
      <div class="maincon">
         <input type="text" name="" class="headerT" placeholder="Title">
         
      <div class="listedContainer">
         
         <div class='listedItems'>
         
          <div><i class="fa-solid fa-list"></i></div>
          
          <div class='checkBox'><span><input type='checkBox' class="checkBoxInput"></span></div>
          
          <div><input type='text'></div>
         
         </div>
        <div class="addList">List item</div> 
      </div>
         
      </div>
      <div class="ediOptnsC">
         <div class="ediOptns"><span class="ripple">+</span></div>
         <div class="ediOptns"><span><i class="fa fa-palette"></i></span></div>
         <div class="ediOptns"><span class="ediDate">last edited 5:55</span></div>
         <div class="ediOptns"><span class="ripple">&vellip;</span></div>
      </div>
      <div class="noteCover ">
         
      </div>
   
      `;
   newNote.insertAdjacentHTML('afterbegin', innerData);
   noteCon.insertAdjacentElement('afterbegin', newNote);
   // noteCon.appendChild(newNote);



   let contentOptions = noteCon.querySelector('.contentOptions');

   let ediOptns = noteCon.querySelector('.ediOptnsC');

   let back = noteCon.querySelector('.back');

   let content = noteCon.querySelector('.content');

   let header = noteCon.querySelector('.headerT');

   let noteCover = noteCon.querySelector('.noteCover');


   let ediDate = noteCon.querySelector('.ediDate');



   let contentBox = noteCon.querySelector('.listedContainer');
   let addList = noteCon.querySelector('.addList');

   let addNoteData = () => {
      let noteListUpdate = document.querySelectorAll('.listedContainer');

      let noteData = [];
      noteListUpdate.forEach((noteD) => {
         return noteData.push(noteD.innerHTML);
      })
      localStorage.setItem('noteDataLI', JSON.stringify(noteData));

   }

   let createListItem = (text = '', index, noteId) => {

      let newList = document.createElement('div');
      newList.classList.add('listedItems');

      let listData = `
    <div><i class="fa-solid fa-list"></i></div>
          
          <div class='checkBox'><span><input type='checkBox' class="checkBoxInput"></span></div>
          
          <div><input class="ListInput" type='text' value='new list'></div>
         <div class='deleteList'>X</div>
   `;

      newList.insertAdjacentHTML('afterbegin', listData);

      newList.id = Math.round(Math.random() * 1000);;
      addList.insertAdjacentElement('beforeBegin', newList);




      let listedItems = noteCon.querySelector('.listedItems');

      let newListId = newList.id;


      let checkBox = noteCon.querySelectorAll('.checkBox');
      let checkBoxInput = noteCon.querySelectorAll('.checkBoxInput');
      let listInput = noteCon.querySelectorAll('.ListInput');
      let deleteList = noteCon.querySelectorAll('.deleteList');
      checkBoxInput.forEach((input) => {
   
      let checkParNew = input.parentElement.parentElement.parentElement;
      
      let checkSiblingNew = input.parentElement.parentElement.nextElementSibling.firstChild;
      input.addEventListener('change', (e) => {
      

      storCheckNew();
         
         if (input.checked) {

         input.style.cssText = `
            opacity: 1;
            `;
         checkParM.style.cssText = `
         order: 1;
         transform: translate(0,200%);
            `;
         checkSiblingM.style.cssText = `
         color: grey;
         pointer-events: none;
         
         `;

         } else if(!input.checked){
         input.style.cssText = `
            opacity: 0;
            `;
         
         checkParNew.style.cssText = `
         transform: translate(0,0);
            `;
         checkSiblingNew.style.cssText = `
         color: white;
         pointer-events: auto;
         
            `;
            
         }
      
         //
      });

   })

      let idArray = [];

      function addIdToList() {
         return idArray.push(newListId);

      }
      localStorage.setItem('listIds', JSON.stringify(newListId));

      addIdToList();

      let listInputFunc = (event) => {

         const inpValue = event.target.value;
         const inpClass = event.target.className;

         const contentUpdate = document.querySelectorAll('.ListInput');

         let noteContent = [];
         contentUpdate.forEach((noteC) => {
            let noteCVal = noteC.value;
            if (noteCVal.length > 0) {

            }
            return noteContent.push(noteC.value);
         })
         localStorage.setItem('listContent', JSON.stringify(noteContent));


      }




      listInput.forEach((input, index) => {
         input.addEventListener('input', (event) => {
            listInputFunc(event);
         })

      })
      
      deleteList.forEach((dl)=>{
         
         dl.addEventListener('click', () => {
            console.log('dddddd');
            dl.style.cssText = `
            color: green;
                  
                  `;
            listCon.remove();
            getListContent.splice(index + 1, 1);
            localStorage.setItem('listContent', JSON.stringify(getListContent));
         
            localStorage.setItem('noteDataLI', JSON.stringify(getContentT));
               addNoteData();
         
         });
   });

};


   addList.addEventListener('click', () => {

      createListItem(null, null, newNote.id);
      addNoteData();
   });



let allListContainer = document.querySelectorAll('.listedItems');

allListContainer.forEach((listCon) => {
   let delListA = listCon.querySelectorAll('.deleteList');
   delListA.forEach((dl)=>{
      dl.addEventListener('click', () => {
         console.log('dddddd');
         dl.style.cssText = `
      color: green;
         
         `;
         listCon.remove();
         getListContent.splice(index+1, 1);
         localStorage.setItem('listContent', JSON.stringify(getListContent));
         
         localStorage.setItem('noteDataLI', JSON.stringify(getContentT));
      addNoteData();
         
      })
   })
   
})


   const onInput = function(event) {

      const inpValue = event.target.value;
      const inpClass = event.target.className;
      let ediDate = noteCon.querySelectorAll('.ediDate');

      const headerUpdate = document.querySelectorAll('.headerT');

      let noteHeader = [];
      headerUpdate.forEach((noteH) => {
         return noteHeader.push(noteH.value);
      })
      noteHeader.reverse();
      // console.log(noteHeader);
      localStorage.setItem('headerT', JSON.stringify(noteHeader));


      let date = new Date();
      let times = date.toLocaleString([], {
         hour: '2-digit',
         minute: '2-digit',
      });
      let getTime = [];
      getTime.push(times.toString());
      localStorage.setItem('time', JSON.stringify(getTime));

      let dummytime = JSON.parse(localStorage.getItem('time'));


   }






   header.addEventListener('change', (event) => {
      // console.log('worked');
      onInput(event);
      updateNoteOrder(newNote);
   });

   let notesOrder = [];


   notesOrder.push(index);


   function updateNoteOrder(noteContainer) {
      const parentElement = noteContainer.parentNode;
      parentElement.prepend(noteContainer); // Moving the noteContainer to the first child position

      // Updating the notesOrder array based on the new order
      const noteIds = Array.from(parentElement.children).map((note) => note.dataset.noteId);
      const updatedOrder = notesOrder.filter((noteId) => noteIds.includes(noteId));
      localStorage.setItem('notesOrder', JSON.stringify(updatedOrder));
   }

   updateNoteOrder(newNote);



   const openEditor = () => {

      windowBack();
      console.log('content yap event');
      content.style.cssText = `
   position: fixed;
   top: 0;
   width: 99vw;
   height: 200vw;
   z-index: 100;
   overflow: hidden;
   animation: bounceIn 2s;
   z-index: 202;
   
   `;
      header.style.cssText = `
   width: 100%;
   height: 10%;
   font-size: 2rem;
   padding: 0 0 0 1%;
   overflow: hidden;
   `;
      contentBox.style.cssText = `
   width: 100%;
   height: 83%;
   forn-size: 2rem;
   padding: 3px 5px 0 2%;
   overflow: hidden;
   `;
      contentOptions.style.display = 'flex';
      ediOptns.style.display = 'flex';
      setTimeout(() => {
         contentBox.disabled = false;
         header.disabled = false;
         noteCover.style.display = 'none';
      }, 300);
      running = true; // Set running to false when closing the div with the HTML button
      setTimeout(() => {
         running = false; // Set running to true after a brief delay
      }, 100);
   }

   let closeEditor = () => {

      content.style.cssText = `
   position: relative;
   top: 0;
   left: 0;
   width: 48.5%;
   overflow: hidden;
   animation: rubberBand 1s;
   `;
      header.style.cssText = `
   width: 100%;
   height: 10%;
   forn-size: 2em;
   padding: 0 0 0 1%;
   overflow: hidden;
   
   `;
      contentBox.style.cssText = `
   width: 100%;
   height: 83%;
   forn-size: 2em;
   padding: 3px 5px 0 2%;
   overflow: hidden;
   
   `;
      noteCover.classList.add('ripple');
      contentOptions.style.display = 'none';
      ediOptns.style.display = 'none';
      setTimeout(() => {
         header.disabled = true;
         contentBox.disabled = true;
         noteCover.style.display = 'block';
      }, 300)
   }

   //adding values

   ediDate.innerText = time;

   let newNoteHam = new Hammer(newNote);
   newNoteHam.on('swipeleft swiperight', (e) => {
      if (e.type != 'swiperight') {
         newNote.style.cssText = `
         animation: backOutLeft 2s;
         opacity: 0.5;
         `;
      } else {
         newNote.style.cssText = `
         animation: backOutRight 2s;
         opacity: 0.5;
         `;
      }
      noteCover.style.cssText = `
         background: #8A8A8A;
      
         `;
      setTimeout(() => {

         newNote.remove();
         getHeaderT.splice(index, 1);
         localStorage.setItem('headerT', JSON.stringify(getHeaderT));

      }, 1000)
   })

   let deletOps = () => {
      console.log('content box pressed');
      deletOptionsMain.style.cssText = `
   transform: translate(0, 0);
   animation: zoomIn 0.7s;
   `;
      content.style.cssText = `
   border: 2px solid #0078C5;
   animation: pulse 2s;
   `;
   }
   let cancelOps = () => {
      deletOptionsMain.style.cssText = `
      transform: translate(0, -100%);
      animation: zoomOut 0.7s;
      `;
      content.style.cssText = `
      border: 1px solid #727272;
      animation: none;
      `;

   }

   let deleteBox = () => {
      newNote.remove();
   }
   let delBoxWithCond = () => {
      if (header.value <= 0 && contentBox.value <= 0) {
         setTimeout(() => {

            deleteBox();

         }, 500);
      };
   };

   let pressNote = new Hammer(noteCover);

   pressNote.on('tap', (e) => {
      openEditor();

      console.log('pressNote taped');
      setTimeout(() => {

         content.style.animation = 'none';
      }, 2000);

   });
   pressNote.on('press', (e) => {
      deletOps();


   });

   window.addEventListener('load', (e) => {
      console.log('window loaded');
   });


   let backHam = new Hammer(back);
   backHam.on('tap', () => {
      closeEditor();
      delBoxWithCond();

      pressNote = true;
   });


   let windowBack = () => {
      if (!running) {
         return false;
      }
      window.history.pushState({ page: 1 }, '', '');

      window.onpopstate = function(event) {
         if (event) {
            closeEditor();
            noteCover.style.display = 'none';
            delBoxWithCond();
            console.log('keypress');
            running = false; // Set running to false after closing the div
         } else {
            // Continue user action through link or button
            running = true; // Setting running to true when not a backspace event
         }
      };
   };


}





createTable.addEventListener('click', () => {
   console.log('list created');
   createList();
})



const addingList = (text1 = '', text2 = '', index, time = '', listValue) => {


   let newNote = document.createElement('div');
   newNote.classList.add('content');
   let innerData = `
   
      <div class="contentOptions">
         <div class="conOpts back"><span class="ripple">&larr;</span></div>
         <div class="conOpts pin"><span>&#128204;</span></div>
         <div class="conOpts remind"><span>&#128276;</span></div>
         <div class="conOpts save"><span class="ripple"><i class="fa fa-archive"></i></span></div>
      </div>
         
      <div class="maincon">
         <input type="text" name="" class="headerT" placeholder="Title">
         
      <div class="listedContainer">
         
         <div class='listedItems'>
         
          <div><i class="fa-solid fa-list"></i></div>
          
          <div class='checkBox'><span><input type='checkBox' class="checkBoxInput"></span></div>
          
          <div><input type='text'></div>
         
         </div>
        <div class="addList">List item</div> 
      </div>
         
      </div>
      <div class="ediOptnsC">
         <div class="ediOptns"><span class="ripple">+</span></div>
         <div class="ediOptns"><span><i class="fa fa-palette"></i></span></div>
         <div class="ediOptns"><span class="ediDate">last edited 5:55</span></div>
         <div class="ediOptns"><span class="ripple">&vellip;</span></div>
      </div>
      <div class="noteCover ">
         
      </div>
   
      `;
   newNote.insertAdjacentHTML('afterbegin', innerData);
   noteCon.insertAdjacentElement('afterbegin', newNote);
   // noteCon.appendChild(newNote);



   let contentOptions = noteCon.querySelector('.contentOptions');

   let ediOptns = noteCon.querySelector('.ediOptnsC');

   let back = noteCon.querySelector('.back');

   let content = noteCon.querySelector('.content');

   let header = noteCon.querySelector('.headerT');

   let noteCover = noteCon.querySelector('.noteCover');


   let ediDate = noteCon.querySelector('.ediDate');



   let contentBox = noteCon.querySelector('.listedContainer');
   contentBox.innerHTML = text2;
   let addList = noteCon.querySelector('.addList');
   let deleteList = document.querySelectorAll('.deleteList');



let listInputFunc = (event) => {

         const inpValue = event.target.value;
         const inpClass = event.target.className;

         const contentUpdate = document.querySelectorAll('.ListInput');

         let noteContent = [];
         contentUpdate.forEach((noteC) => {
            return noteContent.push(noteC.value);
         })
         localStorage.setItem('listContent', JSON.stringify(noteContent));


      }

let storCheck = (event) => {
   let checkInpS = document.querySelectorAll('.checkBoxInput');
   let checkBoxArray = [];
    checkInpS.forEach((input)=>{
     return checkBoxArray.push(input.checked);
      
    })
      localStorage.setItem('checkBoxStatus', JSON.stringify(checkBoxArray));
  
}




let addNoteData = () => {
      let noteListUpdate = document.querySelectorAll('.listedContainer');

      let noteData = [];
      noteListUpdate.forEach((noteD) => {
         return noteData.push(noteD.innerHTML);
      })
      noteData.reverse();
      // console.log(noteData);
      localStorage.setItem('noteDataLI', JSON.stringify(noteData));

   }




let createListItem = (text = '', index, noteId) => {

      let newList = document.createElement('div');
      newList.classList.add('listedItems');

      let listData = `
    <div><i class="fa-solid fa-list"></i></div>
          
          <div class='checkBox'><span><input type='checkBox' class="checkBoxInput"></span></div>
          
          <div><input class="ListInput" type='text' value=''></div>
          <div class='deleteList'>X</div>
         
   `;

      newList.insertAdjacentHTML('afterbegin', listData);

      newList.id = Math.round(Math.random() * 1000);;
      addList.insertAdjacentElement('beforeBegin', newList);



      let listedItems = noteCon.querySelector('.listedItems');

      let newListId = newList.id;


      let checkBox = noteCon.querySelectorAll('.checkBox');
      let checkBoxInput = noteCon.querySelectorAll('.checkBoxInput');
      let listInput = contentBox.querySelectorAll('.ListInput');


      // event for checkbox logic
      checkBoxInput.forEach((input) => {
      
      let checkParM = input.parentElement.parentElement.parentElement;
      
      let checkSiblingM = input.parentElement.parentElement.nextElementSibling.firstChild;
      input.addEventListener('change', (e) => {
      

      storCheck();
         
         if (input.checked) {

         input.style.cssText = `
            opacity: 1;
            `;
         checkParM.style.cssText = `
         transform: translate(0,300%);
            `;
         checkSiblingM.style.cssText = `
         color: grey;
         pointer-events: none;
         
         `;
         console.log('checked');
         
         } else if(!input.checked){
         console.log('unchecked');
         input.style.cssText = `
            opacity: 0;
            `;
         
         checkParM.style.cssText = `
         transform: translate(0,0);
            `;
         checkSiblingM.style.cssText = `
         color: white;
         pointer-events: auto;
         
            `;
            
         }
      
            
         })
         //
      });

      let idArray = [];

      function addIdToList() {
         return idArray.push(newListId);

      }
      localStorage.setItem('listIds', JSON.stringify(newListId));

      addIdToList();


      //event for list input field
      listInput.forEach((input, index) => {
         input.addEventListener('input', (event) => {
            console.log('channnnnnnnnnnm');
            listInputFunc(event);
         })
         const savedValue = getListContent ? getListContent[index] : '';
      })


      deleteList.forEach((dl)=>{
         
            dl.addEventListener('click', () => {
               console.log('dddddd');
               dl.style.cssText = `
               color: green;
                  
                  `;
               listCon.remove();
               getListContent.splice(index + 1, 1);
               localStorage.setItem('listContent', JSON.stringify(getListContent));
         
               localStorage.setItem('noteDataLI', JSON.stringify(getContentT));
               addNoteData();
         
            });
      });
      

   };
   
   /////////8


addList.addEventListener('click', () => {
      console.log('add list clicked');
      createListItem(null, null, newNote.id);
      addNoteData();
   });

let allListContainer = document.querySelectorAll('.listedItems');

allListContainer.forEach((listCon) => {
   let delListA = listCon.querySelectorAll('.deleteList');
   let listInputA = listCon.querySelectorAll('.ListInput');
   let checkBox = listCon.querySelectorAll('.checkBox');
   let checkBoxInputA = listCon.querySelectorAll('.checkBoxInput');
   
   checkBoxInputA.forEach((input) => {
      
      let checkSibling = input.parentElement.parentElement.nextElementSibling.firstChild;
      input.addEventListener('change', (e) => {
      

      storCheck();
         
         if (input.checked) {

         input.style.cssText = `
            opacity: 1;
            `;
         listCon.style.cssText = `
         order: 1;
         transform: translate(0,200%);
            `;
         checkSibling.style.cssText = `
         color: grey;
         pointer-events: none;
         
         `;

         } else if(!input.checked){

         input.style.cssText = `
            opacity: 0;
            `;
         
         listCon.style.cssText = `
         transform: translate(0,0);
            `;
         checkSibling.style.cssText = `
         color: white;
         pointer-events: auto;
            `;
         }
         
      });
      
               
      if (input.checked) {
         input.style.cssText = `
            opacity: 1;
            `;
         listCon.style.cssText = `
         order: 1;
         transform: translate(0,200%);
            `;
            
      } else {
         input.style.cssText = `
            opacity: 0;
            `;
         
         listCon.style.cssText = `
         transform: translate(0,0);
            `;
         
         }
      
         
   });

   //*Events*//
   listInputA.forEach((input, index) => {
         input.addEventListener('input', (event) => {
            listInputFunc(event);
         })
         const savedValue = getListContent ? getListContent[index] : '';
      })

   
   delListA.forEach((dl)=>{
      dl.addEventListener('click', () => {
         console.log('list item deleted');
         dl.style.cssText = `
      color: green;
         
         `;
         listCon.remove();
         getListContent.splice(index+1, 1);
         localStorage.setItem('listContent', JSON.stringify(getListContent));
         
         localStorage.setItem('noteDataLI', JSON.stringify(getContentT));
      addNoteData();
         
      })
   })
   
})






   const onInput = function(event) {

      const inpValue = event.target.value;
      const inpClass = event.target.className;
      let ediDate = noteCon.querySelectorAll('.ediDate');

      const headerUpdate = document.querySelectorAll('.headerT');

      let noteHeader = [];
      headerUpdate.forEach((noteH) => {
         return noteHeader.push(noteH.value);
      })
      localStorage.setItem('headerT', JSON.stringify(noteHeader));


      let date = new Date();
      let times = date.toLocaleString([], {
         hour: '2-digit',
         minute: '2-digit',
      });
      let getTime = [];
      getTime.push(times.toString());
      localStorage.setItem('time', JSON.stringify(getTime));

      let dummytime = JSON.parse(localStorage.getItem('time'));


   }






   header.addEventListener('change', (event) => {
      // console.log('worked');
      onInput(event);
      updateNoteOrder(newNote);
   });

   let notesOrder = [];


   notesOrder.push(index);


   function updateNoteOrder(noteContainer) {
      const parentElement = noteContainer.parentNode;
      parentElement.prepend(noteContainer); // Movimg the noteContainer to the first child position

      // Updating the notesOrder array based on the new order
      const noteIds = Array.from(parentElement.children).map((note) => note.dataset.noteId);
      const updatedOrder = notesOrder.filter((noteId) => noteIds.includes(noteId));
      localStorage.setItem('notesOrder', JSON.stringify(updatedOrder));
   }

   updateNoteOrder(newNote);



   const openEditor = () => {

      windowBack();
      console.log('content yap event');
      content.style.cssText = `
   position: fixed;
   top: 0;
   width: 99vw;
   height: 200vw;
   z-index: 100;
   overflow: hidden;
   animation: bounceIn 2s;
   z-index: 202;
   
   `;
      header.style.cssText = `
   width: 100%;
   height: 10%;
   forn-size: 2rem;
   padding: 0 0 0 1%;
   overflow: hidden;
   `;
      contentBox.style.cssText = `
   width: 100%;
   height: 83%;
   forn-size: 2rem;
   padding: 3px 5px 0 2%;
   overflow: hidden;
   `;
      contentOptions.style.display = 'flex';
      ediOptns.style.display = 'flex';
      setTimeout(() => {
         contentBox.disabled = false;
         header.disabled = false;
         noteCover.style.display = 'none';
      }, 300);
      running = true; // Set running to false when closing the div with the HTML button
      setTimeout(() => {
         running = false; // Set running to true after a brief delay
      }, 100);
   }

   let closeEditor = () => {

      // console.log(running);
      content.style.cssText = `
   position: relative;
   top: 0;
   left: 0;
   width: 48.5%;
   overflow: hidden;
   animation: rubberBand 1s;
   `;
      header.style.cssText = `
   width: 100%;
   height: 10%;
   forn-size: 2em;
   padding: 0 0 0 1%;
   overflow: hidden;
   
   `;
      contentBox.style.cssText = `
   width: 100%;
   height: 83%;
   forn-size: 2em;
   padding: 3px 5px 0 2%;
   overflow: hidden;
   
   `;
      noteCover.classList.add('ripple');
      contentOptions.style.display = 'none';
      ediOptns.style.display = 'none';
      setTimeout(() => {
         header.disabled = true;
         contentBox.disabled = true;
         noteCover.style.display = 'block';
      }, 300)
   }

   //adding values

   header.value = text1;


   ediDate.innerText = time;

   let newNoteHam = new Hammer(newNote);
   newNoteHam.on('swipeleft swiperight', (e) => {
      // console.log(e.type);
      if (e.type != 'swiperight') {
         newNote.style.cssText = `
         animation: backOutLeft 2s;
         opacity: 0.5;
         `;
      } else {
         newNote.style.cssText = `
         animation: backOutRight 2s;
         opacity: 0.5;
         `;
      }
      noteCover.style.cssText = `
         background: #8A8A8A;
      
         `;
      setTimeout(() => {

         newNote.remove();
         getHeaderT.splice(index, 1);
         getContentT.splice(index, 1);
         localStorage.setItem('headerT', JSON.stringify(getHeaderT));
         localStorage.setItem('noteDataLI', JSON.stringify(getContentT));

      }, 1000)
   })

   let deletOps = () => {
      console.log('content box pressed');
      deletOptionsMain.style.cssText = `
   transform: translate(0, 0);
   animation: zoomIn 0.7s;
   `;
      content.style.cssText = `
   border: 2px solid #0078C5;
   animation: pulse 2s;
   `;
   }
   let cancelOps = () => {
      deletOptionsMain.style.cssText = `
      transform: translate(0, -100%);
      animation: zoomOut 0.7s;
      `;
      content.style.cssText = `
      border: 1px solid #727272;
      animation: none;
      `;

   }

   let deleteBox = () => {
      newNote.remove();
   }
   let delBoxWithCond = () => {
      if (header.value <= 0 && contentBox.value <= 0) {
         setTimeout(() => {

            deleteBox();

         }, 500);
      };
   };

   // cancelMain.addEventListener('click', ()=>{
   //    cancelOps();
   // })

   let pressNote = new Hammer(noteCover);
   // let canvaBlank = document.querySelector('.canvaBlank');

   pressNote.on('tap', (e) => {
      openEditor();
      // canvaBlank.style.cssText = `
      // pointer-events: none;
      // `;

      console.log('pressNote taped');
      setTimeout(() => {

         content.style.animation = 'none';
      }, 2000);

   });
   pressNote.on('press', (e) => {
      deletOps();


   });

   window.addEventListener('load', (e) => {
      console.log('window loaded');
   });


   let backHam = new Hammer(back);
   backHam.on('tap', () => {
      closeEditor();
      delBoxWithCond();
      // canvaBlank.style.cssText = `
      // pointer-events: auto;
      // `;

      pressNote = true;
   });


   let windowBack = () => {
      if (!running) {
         //  console.log('running false');
         return false;
      }
      //  console.log('running true');
      // canvaBlank.style.cssText = `
      //    pointer-events: auto;
      //    `;

      window.history.pushState({ page: 1 }, '', '');

      window.onpopstate = function(event) {
         if (event) {
            closeEditor();
            noteCover.style.display = 'none';
            delBoxWithCond();
            console.log('keypress');
            running = false; // Set running to false after closing the div
         } else {
            // console.log('not a backspace');
            // Continue user action through link or button
            running = true; // Set running to true when not a backspace event
         }
      };
   };






}






const getHeaderT = JSON.parse(localStorage.getItem('headerT'));
// const getContentT = localStorage.getItem('noteDataLI');
const getContentT = JSON.parse(localStorage.getItem('noteDataLI'));
const getTimeT = JSON.parse(localStorage.getItem('time'));

// const getEdiTime = localStorage.getItem('time');
// const time = JSON.parse(localStorage.getItem('time'));

const getListContent = JSON.parse(localStorage.getItem('listContent'));

if (getHeaderT && (getTimeT && getContentT)) {
   getHeaderT.forEach((note, index) => addingList(note, getContentT[index], index, getTimeT, getListContent[index]));

} else if (getHeaderT && getContentT) {
   getHeaderT.forEach((note, index) => addingList(note, getContentT[index], index, getTimeT[index], getListContent));
} else if (getContentT) {
   getContentT.forEach((note, index) => addingList(null, note, index, getTimeT[index], getListContent));
}

// else if (getContent) {
//    getContent.forEach((note, index) => createNote(null, note, index, getTime[index]));

// }


/*
if (getHeader) {
   getHeader.forEach((note, index) => createNote(note, getContent[index]));
}

if (getContent) {
   getContent.forEach((note, index) => createNote(getHeader[index], note));
}
*/

////////////**/////////////
let allListContainerS = document.querySelectorAll('.listedItems');

let addingToList = document.querySelector('.addList');
let allListInput = document.querySelectorAll('.ListInput');
let allCheckBoxInput = document.querySelectorAll('.checkBoxInput');

let addListItem = (text = '', index) => {

   allListInput.forEach((listing, index) => {

      const savedValue = getListContent ? getListContent[index] : '';
      if (savedValue == undefined) {
         return listing.value = ' ';
      }
      listing.value = savedValue;

   })
   


   //////**//////
   //this is the previoce code that does not work properly
   /*
         let newList = document.createElement('div');
         newList.classList.add('listedItems');

         let listData = `
       <div><i class="fa-solid fa-list"></i></div>
             
             <div class='checkBox'><span><input type='checkBox' class="checkBoxInput"></span></div>
             
             <div><input class="ListInput" type='text'></div>
            
      `;
      
         newList.insertAdjacentHTML('afterbegin', listData);
         // let idNum = 0;
         newList.id = noteId;
         // newList.id = idNum;
         // newList.id = Date.now();
         // idNum+=1;

         addingToList.insertAdjacentElement('beforeBegin', newList);




   let listedItems = noteCon.querySelector('.listedItems');

   let newListId = newList.id;


   let checkBox = noteCon.querySelectorAll('.checkBox');
   let checkBoxInput = noteCon.querySelectorAll('.checkBoxInput');
   let listInput = noteCon.querySelectorAll('.ListInput');
   // listInput.id = idNum;

   // let inputId = listInput.id;

   checkBoxInput.forEach((c) => {

      c.addEventListener('change', (e) => {
         console.log(newListId);
         
         if (c.checked) {
            c.style.cssText = `
            opacity: 1;
            `;
            console.log('checked');
         } else {
            console.log('unchecked');
            c.style.cssText = `
               opacity: 0;
               `;
               }
            })
            //
         });


   let listInputFunc = (event) => {

      const inpValue = event.target.value;
      const inpClass = event.target.className;
            // console.log(inpClass+' '+inpValue);

            // console.log(headerUpdate);
      const contentUpdate = document.querySelectorAll('.ListInput');
            // console.log(contentUpdate);


            // console.log(noteHeader);

      let noteContent = [];
      contentUpdate.forEach((noteC) => {
         return noteContent.push(noteC.value);
      })
            // noteContent.reverse();
            // console.log(noteContent);
      localStorage.setItem('listContent', JSON.stringify(noteContent));


   }

   //  const savedValue = getListContent ? getListContent[index] : '';
   //  inputId.value = savedValue;

   listInput.forEach((input, index) => {
      input.addEventListener('change', (event) => {
         listInputFunc(event);
      })
      const savedValue = getListContent ? getListContent[index] : '';
            input.value = savedValue;

   })
   */


};

let checkBoxVal = (status, index) => {
   allCheckBoxInput.forEach((check, index)=>{
      
      const savedCheck = savedCheckedStatus ? savedCheckedStatus[index] : false;
      // if (savedValue == undefined) {
      //    return listing.value = ' ';
      // }
      check.checked = savedCheck;
      
      let checkPar = check.parentElement.parentElement.parentElement;
      
      let checkSiblingA = check.parentElement.parentElement.nextElementSibling.firstChild;
      
      if (check.checked) {
         check.style.cssText = `
            opacity: 1;
            `;
        checkPar.style.cssText = `
         order: 1;
         transform: translate(0,200%);
            `;
         checkSiblingA.style.cssText = `
         color: grey;
         pointer-events: none;
                     `; 
         // console.log('checked store');
         
      } else {
         // console.log('unchecked store');
         check.style.cssText = `
            opacity: 0;
            `;
         
         checkPar.style.cssText = `
         
         transform: translate(0,0);
            `;
            
         checkSiblingA.style.cssText = `
         color: white;
         pointer-events: auto;
                     `;
         
         }
      
      
   })

}

// const getListContent = JSON.parse(localStorage.getItem('listContent'));
const getListId = JSON.parse(localStorage.getItem('listIds'));

// const getEdiTime = localStorage.getItem('time');
// const time = JSON.parse(localStorage.getItem('time'));

const savedCheckedStatus = JSON.parse(localStorage.getItem('checkBoxStatus'));


if (getListContent && getListId) {
   getListContent.forEach((note, index) => addListItem(note, index));
   console.log('hffuufbjkgfy');
   // funcArray[0](null,null);

}
if (savedCheckedStatus) {
   savedCheckedStatus.forEach((note, index)=> checkBoxVal(note, index));
}
/////

