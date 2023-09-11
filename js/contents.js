let deletOptions = document.querySelector('.deletOptions');
let cancel = document.querySelector('.cancel');

let contentOptions = document.querySelector('.contentOptions');

let ediOptns = document.querySelector('.ediOptnsC');

let back = document.querySelector('.back');

let content = document.querySelector('.content');

let header = document.querySelector('.header');

let noteCover = document.querySelector('.noteCover');

let contentBox = document.querySelector('.contentBox');

let ediDate = document.querySelector('.ediDate');

const onInput = () => {

   let date = new Date();
   let time = date.toLocaleString([], {
      hour: '2-digit',
      minute: '2-digit',
   })
   let hours = date.getHours();
   let minutes = date.getMinutes() % 12 || 0;
   ediDate.innerHTML = `last edited ${time}`;


}


contentBox.addEventListener('change', () => {
   onInput();
})
header.addEventListener('change', () => {
   console.log('worked');
   onInput();

});

let openEditor = () => {
   windowBack();
   console.log('open editor in content js');
   noteCover.style.display = 'none';
   content.style.cssText = `
   position: fixed;
   top: 0;
   width: 99vw;
   height: 200vw;
   z-index: 100;
   overflow: hidden;
   animation: bounceIn 2s;
   
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
      noteCover.style.display = 'none';
   }, 300)
}

let closeEditor = () => {
   content.style.cssText = `
   position: relative;
   top: 0;
   left: 0;
   width: 49%;
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
   contentOptions.style.display = 'none';
   ediOptns.style.display = 'none';
   setTimeout(() => {
      noteCover.style.display = 'block';
   }, 300)
}



let deletOps = () => {
   console.log('content box pressed');
   deletOptions.style.cssText = `
   transform: translate(0, 0);
   animation: zoomIn 0.7s;
   `;
   content.style.cssText = `
   border: 2px solid #0078C5;
   animation: pulse 2s;
   `;
}
let cancelOps = () => {
   deletOptions.style.cssText = `
      transform: translate(0, -100%);
      animation: zoomOut 0.7s;
      `;
   content.style.cssText = `
      border: 1px solid #727272;
      animation: none;
      `;

}

let deleteBox = () => {

}

cancel.addEventListener('click', () => {
   cancelOps();
})

let cbox = new Hammer(content);

let pressNote = new Hammer(noteCover);

pressNote.on('tap', (e) => {
   openEditor();
   console.log('pressNote taped in content js');

});
pressNote.on('press', (e) => {
   deletOps();
});



let backHam = new Hammer(back);
backHam.on('tap', () => {
   closeEditor();

});


let windowBack = () => {

   window.history.pushState({ page: 1 }, "", "");

   window.onpopstate = function(event) {

      // if the pop state event fires due to clicks on a button
      // or a link it comes up as "undefined" 

      if (event) {
         // Code to handle back button or prevent from navigation
         closeEditor();
      }
      else {
      }
   }

}