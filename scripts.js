// Código do botão PIX
document.getElementById('copyPixButton').addEventListener('click', function() {
    const pixKey = "00020126330014BR.GOV.BCB.PIX0111051729961505204000053039865802BR5923Lucas Capatini Ernandes6009SAO PAULO621405101kKOG9jnHe6304CD75"; 
    
    const tempInput = document.createElement('input');
    tempInput.value = pixKey;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    const feedback = document.getElementById('copyFeedback');
    feedback.style.display = 'block';
    
    setTimeout(function() {
      feedback.style.display = 'none';
    }, 3000);
  });
  
  // Countdown Timer
  function updateCountdown() {
    const weddingDate = new Date('November 22, 2025 10:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
    document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
  // Modal para imagem do trajeto
  const modal = document.getElementById("imageModal");
  const img = document.getElementById("trajetoImage");
  const modalImg = document.getElementById("modalImage");
  const span = document.getElementsByClassName("close")[0];
  
  img.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
  }
  
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  modal.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }