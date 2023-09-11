let noteCon = document.querySelector('#noteCon');
let create = document.querySelector('#create');
let items = document.querySelectorAll('.items');



let deletOptionsMain = document.querySelector('.deletOptions');
let cancelMain = document.querySelector('.cancel');

let running = true;





const createNote = (text1 = '', text2 = '', index, time = '') => {


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
         <input type="text" name="" class="header" placeholder="Title">
         <img src="#" alt="Image formate not supported or failed to load" class="choosedImg">
         <audio class="choosedAudio" src="#"></audio>
         <div class="divForList"></div>
         <textarea name="" class="contentBox" cols="30" rows="10" id="" placeholder="Text"></textarea>
      </div>
      <div class="ediOptnsC">
         <div class="ediOptns"><span class="ripple">+</span></div>
         <div class="ediOptns"><span><i class="fa fa-palette"></i></span></div>
         <div class="ediOptns"><span class="ediDate">last edited 5:55</span></div>
         <div class="ediOptns"><span class="ripple">&vellip;</span></div>
         
      
      </div>
      
   
         
   <div class="optionsOne">
   

   <div class="addImage"><input type="file" name="image11" id="image11"><i class="fa-solid fa-image"></i><label for="image11">Add image</label></div>
   

   <div class="addRecording"><input accept="audio/*" type="file" name="sound11" id="sound11"><i class="fa-solid fa-microphone"></i><label for="sound11">Recording</label></div>
   
   <div class="addCheckbox"><i class="fa fa-check-square"></i><span>Checkboxes</span></div>
   
   </div>

      
      <div class="noteCover "></div>
   
      `;
   newNote.insertAdjacentHTML('afterbegin', innerData);
   noteCon.insertAdjacentElement('afterbegin', newNote);


   let contentOptions = noteCon.querySelector('.contentOptions');

   let ediOptns = noteCon.querySelector('.ediOptnsC');

   let back = noteCon.querySelector('.back');

   let content = noteCon.querySelector('.content');

   let header = noteCon.querySelector('.header');

   let noteCover = noteCon.querySelector('.noteCover');

   let contentBox = noteCon.querySelector('.contentBox');

   let ediDate = noteCon.querySelector('.ediDate');



   let optionsOne = noteCon.querySelector('.optionsOne');

   let addedAudio = document.querySelector('#addedAudio');
   let addImage = noteCon.querySelector('.addImage');
   let addImageInput = addImage.querySelector('#image11');
   let choosedImg = noteCon.querySelector('.choosedImg');


   let addRecording = noteCon.querySelector('.addRecording');
   let choosedAudio = noteCon.querySelector('.choosedAudio');


   let addCheckbox = noteCon.querySelector('.addCheckbox');
   let divForList = noteCon.querySelector('.divForList');


   let allOptionsOne = optionsOne.querySelectorAll('div');
   allOptionsOne.forEach((ops, index) => {
      ops.addEventListener('click', () => {});
   });

   function getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
   }
   addImageInput.addEventListener('click', (e) => {

      console.log('image uploading');
   });
   let storeImageArray = [];
   addImageInput.onchange = evt => {
      const [file] = addImageInput.files
      if (file) {
         choosedImg.src = URL.createObjectURL(file)
         choosedImg.style.cssText = `
      display: block;
      width: 100%;
      height: 100%;
      `;

         choosedImg.addEventListener('load', () => {

            let imgData = getBase64Image(choosedImg);

            storeImageArray.push(imgData);
            localStorage.setItem('contentImage', JSON.stringify(storeImageArray));

         })

      }
   }

   function changeHandler({
      target
   }) {
      if (!target.files.length) return;

      const urlObj = URL.createObjectURL(target.files[0]);


      choosedAudio.addEventListener("load", () => {
         URL.revokeObjectURL(urlObj);
      });


      choosedAudio.controls = "true";

      choosedAudio.src = urlObj;
   }
   addRecording.addEventListener('change', changeHandler);


   let listInputFuncC = (event) => {

      const inpValue = event.target.value;
      const inpClass = event.target.className;

      const contentUpdate = document.querySelectorAll('.ListInputC');

      let noteContent = [];
      contentUpdate.forEach((noteC) => {
         return noteContent.push(noteC.value || ' ');

      })
      localStorage.setItem('listContentC', JSON.stringify(noteContent));


   }

   let storCheckC = (event) => {
      let checkInpC = document.querySelectorAll('.checkBoxInputC');
      let checkBoxArrayC = [];
      checkInpC.forEach((input) => {
         return checkBoxArrayC.push(input.checked);

      })
      localStorage.setItem('checkBoxStatusC', JSON.stringify(checkBoxArrayC));

   }

   let addNoteData = () => {
      let noteListUpdate = document.querySelectorAll('.divForList');

      let contentData = [];
      noteListUpdate.forEach((noteD) => {
         return contentData.push(noteD.innerHTML || ' ');

      })
      contentData.reverse();
      // console.log(contentData);
      localStorage.setItem('noteDataContent', JSON.stringify(contentData));

   }



   const creatingCheckBox = (text, index) => {
      console.log('%cList created in content', 'color: green;');

      let newList = document.createElement('div');
      newList.classList.add('listedItemsC');
      let listData = `
    <div><i class="fa-solid fa-list"></i></div>
          
          <div class='checkBoxC'><span><input type='checkBox' class="checkBoxInputC"></span></div>
          
          <div><input class="ListInputC" type='text' value=''></div>
          <div class='deleteListC'>X</div>
         
   `;

      newList.insertAdjacentHTML('afterbegin', listData);
      divForList.appendChild(newList);

      newList.id = Math.round(Math.random() * 1000);;

      let listedItemsC = noteCon.querySelector('.listedItemsC');
      let newListId = newList.id;


      let checkBoxC = noteCon.querySelectorAll('.checkBoxC');
      let checkBoxInputC = noteCon.querySelectorAll('.checkBoxInputC');
      let listInputC = listedItemsC.querySelectorAll('.ListInputC');

      let deleteListC = listedItemsC.querySelectorAll('.deleteListC');




      checkBoxInputC.forEach((input) => {


         let checkSiblingC = input.parentElement.parentElement.nextElementSibling.firstChild;
         input.addEventListener('change', (e) => {


            storCheckC();

            if (input.checked) {

               input.style.cssText = `
         opacity: 1;
         `;
               checkSiblingC.style.cssText = `
      color: grey;
      pointer-events: none;
         
      `;
               console.log('checked');

            } else if (!input.checked) {
               console.log('unchecked');
               input.style.cssText = `
      opacity: 0;
      `;

               checkSiblingC.style.cssText = `
      color: white;
      pointer-events: auto;
         
      `;

            }


         }) //

      });


      listInputC.forEach((input, index) => {
         input.addEventListener('input', (event) => {
            console.log('channnnnnnnnnnm');
            listInputFuncC(event);
         })
         const savedValue = getListContent ? getListContent[index] : '';
      })



      deleteListC.forEach((dl) => {
         dl.addEventListener('click', () => {
            console.log('list item deleted');
            dl.style.cssText = `
      color: green;
         
         `;
            listedItemsC.remove();
            getListContentC.splice(index + 1, 1);
            localStorage.setItem('listContentC', JSON.stringify(getListContentC));

            localStorage.setItem('noteDataContent', JSON.stringify(getListDivData));
            addNoteDataA();

         })
      })



   }
   /////
   addCheckbox.addEventListener('click', () => {
      creatingCheckBox();
      addNoteData();

   })

   let allListedItemsC = document.querySelectorAll('.listedItems');


   const onInput = function(event) {

      const inpValue = event.target.value;
      const inpClass = event.target.className;
      let ediDate = noteCon.querySelectorAll('.ediDate');

      const headerUpdate = document.querySelectorAll('.header');
      const contentUpdate = document.querySelectorAll('.contentBox');

      let noteHeader = [];
      headerUpdate.forEach((noteH) => {
         return noteHeader.push(noteH.value);
      })
      noteHeader.reverse();
      localStorage.setItem('header', JSON.stringify(noteHeader));

      let noteContent = [];
      contentUpdate.forEach((noteC) => {
         return noteContent.push(noteC.value);
      })
      noteContent.reverse();
      localStorage.setItem('content', JSON.stringify(noteContent));


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


   contentBox.addEventListener('change', (event) => {
      onInput(event);
      updateNoteOrder(newNote);
   })
   header.addEventListener('change', (event) => {
      onInput(event);
      updateNoteOrder(newNote);
   });

   let notesOrder = [];


   notesOrder.push(index);


   function updateNoteOrder(noteContainer) {
      const parentElement = noteContainer.parentNode;
      parentElement.prepend(noteContainer); // Move the noteContainer to the first child position

      // Update the notesOrder array based on the new order
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
      running = true; 
      // Set running to false when closing the div with the HTML button
      setTimeout(() => {
         running = false; 
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
   contentBox.value = text2;
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
         getHeader.splice(index, 1);
         getContent.splice(index, 1);
         localStorage.setItem('header', JSON.stringify(getHeader));
         localStorage.setItem('content', JSON.stringify(getContent));

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

   cancelMain.addEventListener('click', () => {
      cancelOps();
   })

   let pressNote = new Hammer(noteCover);
   let canvaBlank = document.querySelector('.canvaBlank');

   pressNote.on('tap', (e) => {
      openEditor();
      canvaBlank.style.cssText = `
   pointer-events: none;
   `;

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
      canvaBlank.style.cssText = `
   pointer-events: auto;
   `;

      pressNote = true;
   });






   let windowBack = () => {
      if (!running) {
         return false;
      }
      canvaBlank.style.cssText = `
   pointer-events: auto;
   `;

      window.history.pushState({ page: 1 }, '', '');

      window.onpopstate = function(event) {
         if (event) {
            closeEditor();
            noteCover.style.display = 'none';
            delBoxWithCond();
            console.log('keypress');
            running = false; 
            // Set running to false after closing the div
         } else {
            running = true; 
            // Setting running to true when not a backspace event
         }
      };
   };




};


createNote();
let db;
const request = indexedDB.open("MyTestDatabase");
request.onerror = (event) => {
   console.error("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = (event) => {
   db = event.target.result;
   console.info('creation success');
};
request.onupgradeneeded = (event) => {

}



const getHeader = JSON.parse(localStorage.getItem('header'));
const getContent = JSON.parse(localStorage.getItem('content'));
const getTime = JSON.parse(localStorage.getItem('time'));

const getListDivData = JSON.parse(localStorage.getItem('noteDataContent'));


if (getHeader && (getContent && getTime)) {
   getHeader.forEach((note, index) => createNote(note, getContent[index], index, getTime));

} else if (getHeader) {
   getHeader.forEach((note, index) => createNote(note, null, index, getTime[index]));
} else if (getContent) {
   getContent.forEach((note, index) => createNote(null, note, index, getTime[index]));

}







let divForListAll = document.querySelectorAll('.divForList');
let addCheckboxA = document.querySelector('.addCheckbox');

let listInputFuncCA = (event) => {

   const inpValue = event.target.value;
   const inpClass = event.target.className;

   const contentUpdate = noteCon.querySelectorAll('.ListInputC');

   let noteContent = [];
   contentUpdate.forEach((noteC) => {
      return noteContent.push(noteC.value);
   })
   // noteContent.reverse();
   localStorage.setItem('listContentC', JSON.stringify(noteContent));


}

let storCheckCA = (event) => {
   let checkInpC = document.querySelectorAll('.checkBoxInputC');
   let checkBoxArrayC = [];
   checkInpC.forEach((input) => {
      return checkBoxArrayC.push(input.checked);

   })
   localStorage.setItem('checkBoxStatusC', JSON.stringify(checkBoxArrayC));

}

let addNoteDataA = () => {
   let noteListUpdate = document.querySelectorAll('.divForList');

   let contentData = [];
   noteListUpdate.forEach((noteD) => {
      return contentData.push(noteD.innerHTML || ' ');
   })
   // contentData.reverse();
   localStorage.setItem('noteDataContent', JSON.stringify(contentData));
   // console.log(noteData);

}





let addingDataToTheContentList = (text = "", index) => {


   divForListAll.forEach((divData, index) => {
      const savedData = getListDivData ? getListDivData[index] : '';

      divData.innerHTML = savedData;

      let listedItemsC = divData.querySelector('.listedItemsC');

      let allCheckBoxInputC = divData.querySelectorAll('.checkBoxInputC');

      let listInputC = document.querySelectorAll('.ListInputC');

      let deleteListC = divData.querySelectorAll('.deleteListC');




      allCheckBoxInputC.forEach(input => {


         let checkSiblingC = divData.querySelector('.ListInput');
         input.addEventListener('change', (e) => {

            console.log('%c line 1109 works ', 'color: red;');

            storCheckCA();

            if (input.checked) {

               input.style.cssText = `
         opacity: 1;
         `;
               checkSiblingC.style.cssText = `
      color: grey;
      pointer-events: none;
         
      `;
               console.log('checked');

            } else if (!input.checked) {
               console.log('unchecked');
               input.style.cssText = `
      opacity: 0;
      `;

               checkSiblingC.style.cssText = `
      color: white;
      pointer-events: auto;
         
      `;

            }


         }) //

      })

      listInputC.forEach((input, index) => {
         input.addEventListener('input', (event) => {
            console.log('channnnnnnnnnnm');
            listInputFuncCA(event);
         })


         const savedValue = getListContentC ? getListContentC[index] : ' ';
         if (savedValue == undefined) {
            return input.value = ' ';
         }
         input.value = savedValue;

      })



      deleteListC.forEach((dl) => {
         dl.addEventListener('click', () => {
            console.log('list item deleted');
            dl.style.cssText = `
      color: green;
         
         `;
            listedItemsC.remove();
            getListContentC.splice(index + 1, 1);
            localStorage.setItem('listContentC', JSON.stringify(getListContentC));

            localStorage.setItem('noteDataContent', JSON.stringify(getListDivData));
            addNoteDataA();

         })
      })

   })






}

addCheckboxA.addEventListener('click', () => {
   console.log('div status updated 2');
})


const getListContentC = JSON.parse(localStorage.getItem('listContentC'));

if (getListDivData) {
   getListDivData.forEach((note, index) => {
      // console.log(note);
      addingDataToTheContentList(note, index);
   });

};
////


let createHam = new Hammer(create);
createHam.on('tap', () => {
   createNote();
});

let choosedImgStore = document.querySelectorAll('.choosedImg');

let addingImage = (AI, index) => {

   choosedImgStore.forEach((img, index) => {

      const savedImage = getContentImage ? getContentImage[index] : '';
      img.src = "data:image/png;base64," + savedImage;;

      if (savedImage != undefined) {
         img.style.cssText = `
         display: block;
         width: 100%;
         height: 100%;
         background: blue;
         `;
      }

   })


}


const getContentImage = JSON.parse(localStorage.getItem('contentImage'));

if (getContentImage) {

   getContentImage.forEach((note, index) => addingImage(note, index));
}




let ripple = document.querySelectorAll('.ripple');
ripple.forEach((r) => {
   let rippleHam = new Hammer(r);
   rippleHam.on('press tap', () => {
      r.classList.add('rippleAni')
      setTimeout(() => {
         r.classList.remove('rippleAni')

      }, 1000)

   })
})



var addRippleEffect = function(e) {
   var target = e.target;
   if (target.className.toLowerCase() !== 'box') return false;
   console.log('advance ripple effect');
   var rect = target.getBoundingClientRect();
   var ripple = target.querySelector('.rippleTouch');
   if (!ripple) {
      ripple = document.createElement('span');
      ripple.className = 'rippleTouch';
      ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
      target.appendChild(ripple);
   }
   ripple.classList.remove('show');
   var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
   var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
   ripple.style.top = top + 'px';
   ripple.style.left = left + 'px';
   ripple.classList.add('show');
   return false;
}

let boxTouch = document.querySelectorAll('.box');
boxTouch.forEach((b) => {
   b.addEventListener('click', () => {
      addRippleEffect,
      false;
   })
})
