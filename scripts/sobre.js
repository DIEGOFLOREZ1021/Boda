const button = document.getElementById('openButton');
const music = document.getElementById('music');
const envelope = document.querySelector('.envelope');

button.addEventListener('click', () => {
  music.play();
  envelope.classList.add('open');
  setTimeout(() => {
    window.location.href = 'main.html';
  }, 3500);
});
