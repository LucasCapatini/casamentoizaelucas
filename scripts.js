// Loading Screen
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(function() {
    loadingScreen.classList.add('hidden');
  }, 1500);
});

// Código do botão PIX com Modal
document.getElementById('copyPixButton').addEventListener('click', function() {
    const pixKey = "00020126330014BR.GOV.BCB.PIX0111051729961505204000053039865802BR5923Lucas Capatini Ernandes6009SAO PAULO621405101kKOG9jnHe6304CD75";

    const tempInput = document.createElement('input');
    tempInput.value = pixKey;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Mostrar modal de agradecimento
    const pixModal = document.getElementById('pixThanksModal');
    pixModal.classList.add('show');
  });

  // Fechar modal PIX
  const pixModalClose = document.querySelector('.pix-modal-close');
  const pixModal = document.getElementById('pixThanksModal');

  if (pixModalClose) {
    pixModalClose.addEventListener('click', function() {
      pixModal.classList.remove('show');
    });
  }

  if (pixModal) {
    pixModal.addEventListener('click', function(e) {
      if (e.target === pixModal) {
        pixModal.classList.remove('show');
      }
    });
  }
  
  // Countdown Timer com Milestones
  let lastMilestone = null;

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

    // Milestones
    const milestones = [100, 50, 30, 7, 1];
    const currentMilestone = milestones.find(m => days === m);

    if (currentMilestone && currentMilestone !== lastMilestone) {
      lastMilestone = currentMilestone;
      showMilestoneAnimation(currentMilestone);
    }
  }

  function showMilestoneAnimation(days) {
    // Criar confetti
    createConfetti();

    // Mostrar mensagem
    const milestoneMsg = document.createElement('div');
    milestoneMsg.className = 'milestone-message';
    milestoneMsg.innerHTML = `
      <div class="milestone-content">
        <h2>Faltam ${days} dias!</h2>
        <p>${getMilestoneMessage(days)}</p>
      </div>
    `;
    document.body.appendChild(milestoneMsg);

    setTimeout(() => {
      milestoneMsg.classList.add('show');
    }, 100);

    setTimeout(() => {
      milestoneMsg.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(milestoneMsg);
      }, 500);
    }, 5000);
  }

  function getMilestoneMessage(days) {
    const messages = {
      100: 'Começam as preparações finais!',
      50: 'Estamos cada vez mais perto!',
      30: 'Já está quase na hora! Não esqueça de confirmar sua presença!',
      7: 'Uma semana para o grande dia!',
      1: 'Amanhã é o grande dia! Estamos ansiosos!'
    };
    return messages[days] || '';
  }

  function createConfetti() {
    const colors = ['#5a7d5a', '#d4b483', '#f8f1e9'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      document.body.appendChild(confetti);

      setTimeout(() => {
        document.body.removeChild(confetti);
      }, 5000);
    }
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

  // Animações ao Scroll com Intersection Observer
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observar todos os elementos com classes de animação
  document.querySelectorAll('.fade-in-up, .fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
  });

  // Parallax Effect
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('body::before');
        if (document.body.offsetWidth > 768) {
          document.body.style.setProperty('--parallax-offset', scrolled * 0.5 + 'px');
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Lazy Loading de Imagens
  const lazyImageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        const bgUrl = lazyImage.getAttribute('data-bg');
        lazyImage.style.backgroundImage = `url('${bgUrl}')`;
        lazyImage.classList.add('loaded');
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  }, {
    rootMargin: '50px'
  });

  document.querySelectorAll('.lazy-bg').forEach(img => {
    lazyImageObserver.observe(img);
  });

  // RSVP Form Submission
  const rsvpForm = document.getElementById('rsvpForm');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        acompanhantes: document.getElementById('acompanhantes').value,
        origem: document.getElementById('origem').value,
        restricoes: document.getElementById('restricoes').value,
        hospedagem: document.getElementById('hospedagem').checked
      };

      // Aqui você pode integrar com um backend ou Google Forms
      // Por enquanto, apenas mostra mensagem de sucesso
      console.log('RSVP Data:', formData);

      // Mostrar mensagem de sucesso
      rsvpForm.style.display = 'none';
      document.getElementById('rsvpSuccess').style.display = 'block';

      // Scroll suave para a mensagem de sucesso
      document.getElementById('rsvpSuccess').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    });
  }

  // Scroll Spy - Rastrear seção ativa
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  function updateActiveSection() {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-section') === currentSection) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection();

  // Scroll suave ao clicar nos itens de navegação
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Botão Voltar ao Topo
  const backToTopButton = document.getElementById('backToTop');

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Menu Hambúrguer Mobile
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburgerBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', function() {
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeMenuBtn.addEventListener('click', closeMenu);

  // Fechar menu ao clicar em um item
  mobileMenuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      closeMenu();

      setTimeout(function() {
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 400);
    });
  });

  // Adicionar ao Calendário
  const addToCalendarBtn = document.getElementById('addToCalendar');
  const calendarDropdown = document.getElementById('calendarDropdown');

  addToCalendarBtn.addEventListener('click', function() {
    if (calendarDropdown.style.display === 'none') {
      calendarDropdown.style.display = 'block';
    } else {
      calendarDropdown.style.display = 'none';
    }
  });

  // Fechar dropdown ao clicar fora
  document.addEventListener('click', function(e) {
    if (!addToCalendarBtn.contains(e.target) && !calendarDropdown.contains(e.target)) {
      calendarDropdown.style.display = 'none';
    }
  });

  // Dados do evento
  const eventData = {
    title: 'Casamento Izabela & Lucas',
    description: 'Cerimônia de casamento de Izabela e Lucas em Paraty - RJ',
    location: 'Paraty - RJ',
    startDate: '20251122T100000',
    endDate: '20251122T200000',
    startDateFormatted: '2025-11-22T10:00:00',
    endDateFormatted: '2025-11-22T20:00:00'
  };

  // Google Calendar
  document.getElementById('googleCalendar').addEventListener('click', function(e) {
    e.preventDefault();
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${eventData.startDate}/${eventData.endDate}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}`;
    window.open(url, '_blank');
    calendarDropdown.style.display = 'none';
  });

  // Outlook Calendar
  document.getElementById('outlookCalendar').addEventListener('click', function(e) {
    e.preventDefault();
    const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventData.title)}&body=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}&startdt=${eventData.startDateFormatted}&enddt=${eventData.endDateFormatted}`;
    window.open(url, '_blank');
    calendarDropdown.style.display = 'none';
  });

  // Apple Calendar (iCal)
  document.getElementById('appleCalendar').addEventListener('click', function(e) {
    e.preventDefault();
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${eventData.startDate}
DTEND:${eventData.endDate}
SUMMARY:${eventData.title}
DESCRIPTION:${eventData.description}
LOCATION:${eventData.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'casamento-izabela-lucas.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    calendarDropdown.style.display = 'none';
  });

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Fechar todas as FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Se não estava ativa, abrir
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // Calculadora de Custos
  const calculateBtn = document.getElementById('calculateBtn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', function() {
      const origin = document.getElementById('origin-select').value;
      const fuelPrice = parseFloat(document.getElementById('fuel-price').value);
      const peopleCount = parseInt(document.getElementById('people-count').value);

      // Dados da viagem (estimativas)
      const tripData = {
        cg: {
          distance: 1650, // km (ida e volta)
          tolls: 450 // R$ (ida e volta com Sem Parar)
        },
        tl: {
          distance: 1480, // km (ida e volta)
          tolls: 400 // R$ (ida e volta com Sem Parar)
        }
      };

      const data = tripData[origin];
      const consumption = 12; // km/l (média)

      // Cálculos
      const fuelNeeded = data.distance / consumption;
      const fuelCost = fuelNeeded * fuelPrice;
      const totalCost = fuelCost + data.tolls;
      const perPersonCost = totalCost / peopleCount;

      // Mostrar resultados
      document.getElementById('toll-cost').textContent =
        'R$ ' + data.tolls.toFixed(2).replace('.', ',');
      document.getElementById('fuel-cost').textContent =
        'R$ ' + fuelCost.toFixed(2).replace('.', ',');
      document.getElementById('total-cost').textContent =
        'R$ ' + totalCost.toFixed(2).replace('.', ',');
      document.getElementById('per-person-cost').textContent =
        'R$ ' + perPersonCost.toFixed(2).replace('.', ',');

      // Mostrar div de resultados
      const resultsDiv = document.getElementById('costResults');
      resultsDiv.style.display = 'block';

      // Scroll suave para resultados
      resultsDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    });
  }