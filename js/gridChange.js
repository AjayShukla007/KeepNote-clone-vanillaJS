let gridOrRow = document.querySelector('.gridOrRow');
let box = document.querySelectorAll('.box');
let noteConGrid = document.querySelector('#noteCon');
let contentForGrid = noteConGrid.querySelectorAll('.content');

gridOrRow.addEventListener('click', () => {
   gridOrRow.classList.toggle('gridChange');
   if (gridOrRow.classList.contains('gridChange')) {
      console.log('grid chamged to colum');
      noteConGrid.style.display = 'block';
      var nodes = document.getElementById('noteCon').getElementsByTagName("div");
      for (var i = 0; i < nodes.length; i++) {
         nodes[i].style.width = '100%';
      }
   } else {
      console.log('grid changed to row');
      var nodes = document.getElementById('noteCon').getElementsByTagName("div");
      for (var i = 0; i < nodes.length; i++) {
         nodes[i].style.width = '48.5%';
      }
   }
});