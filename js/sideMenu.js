let sideMenu = document.querySelector('#sideMenu');
let sidebtn = document.querySelector('#sidebtn');
let blur = document.querySelector('#blur');
let btnline = document.querySelectorAll('.btnline');



sideMenu.innerHTML = `
   <div id="appName"><h3>Keep Note</h3></div>
   <div class="sideContainer">
      <div class="sideOption">Note</div>
      <div class="sideOption">Remind</div>
   </div>
   <div class="sideContainer">
      <div class="sideOption">Create new note</div>
   </div>
   <div class="sideContainer">
      <div class="sideOption">Archive</div>
      <div class="sideOption">Trash</div>
   </div>
   <div class="sideContainer">
      <div class="sideOption">Settings</div>
      <div class="sideOption">Help or feedback</div>
   </div>
`;

sidebtn.addEventListener('click',()=>{
   console.log('open');
   sideMenu.style.transform = 'translate(0,0)';
   sidebtn.classList.toggle("change");
   
   blur.style.display = 'block';
   setTimeout(()=>{
      blur.style.opacity = 1;
   },300)
});
let blurTap = new Hammer(blur);
let sideMenuTap = new Hammer(sideMenu);

blurTap.on('tap press swipeleft' ,(ev)=>{
   console.log('close');
    sideMenu.style.transform = 'translate(-100%,0)';
   sidebtn.classList.toggle("change");
    blur.style.opacity = 0;
   setTimeout(() => {
    blur.style.display = 'none';
   }, 300);
});
sideMenuTap.on('swipeleft', (ev)=>{
   console.log('close');
   sideMenu.style.transform = 'translate(-100%,0)';
   sidebtn.classList.toggle("change");
   blur.style.opacity = 0;
   setTimeout(() => {
      blur.style.display = 'none';
   }, 300);
});