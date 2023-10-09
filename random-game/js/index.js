document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino');
    const startKey = document.querySelector('.start')
    let isJumping = false;
  
    document.addEventListener('keydown', function(event) {
      if (event.keyCode === 32 && !isJumping) {
        startKey.classList.add('hide')
        jump();
      }
    });
  
    function jump() {
      isJumping = true;
      let jumpHeight = 70;
      
      let jumpInterval = setInterval(() => {
        if (jumpHeight === 0) {
          clearInterval(jumpInterval);
          isJumping = false;
        }
        dino.style.bottom = jumpHeight + 'px';
        jumpHeight -= 1; 
      }, 7);
    }
  });
  