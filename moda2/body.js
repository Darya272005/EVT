// Инициализация Swiper
function initSwiper() {
    return new Swiper('.trends-slider', {
      loop: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        slideChange: function() {
          const slides = document.querySelectorAll('.swiper-slide');
          slides.forEach(slide => {
            const content = slide.querySelector('.slide-content');
            content.style.transform = 'translateY(50px)';
            content.style.opacity = '0';
          });
          
          const activeSlide = document.querySelector('.swiper-slide-active');
          const activeContent = activeSlide.querySelector('.slide-content');
          setTimeout(() => {
            activeContent.style.transform = 'translateY(0)';
            activeContent.style.opacity = '1';
          }, 300);
        }
      }
    });
  }
  
  // Управление бургер-меню
  function setupBurgerMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navMobile = document.getElementById('navMobile');
    
    if (burgerMenu && navMobile) {
      burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navMobile.classList.toggle('active');
        
        if (navMobile.classList.contains('active')) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      });
      
      // Закрытие мобильного меню при клике на ссылку
      document.querySelectorAll('#navMobile a').forEach(link => {
        link.addEventListener('click', () => {
          burgerMenu.classList.remove('active');
          navMobile.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
  }
  
  // Плавная прокрутка
  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // Переключение темы
  function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    
    if (themeToggle) {
      const themeIcon = themeToggle.querySelector('i');
      const themeIconMobile = themeToggleMobile ? themeToggleMobile.querySelector('i') : null;
      
      function toggleTheme() {
        document.body.classList.toggle('dark');
        
        if (document.body.classList.contains('dark')) {
          themeIcon.classList.replace('fa-moon', 'fa-sun');
          if (themeIconMobile) themeIconMobile.classList.replace('fa-moon', 'fa-sun');
          localStorage.setItem('theme', 'dark');
        } else {
          themeIcon.classList.replace('fa-sun', 'fa-moon');
          if (themeIconMobile) themeIconMobile.classList.replace('fa-sun', 'fa-moon');
          localStorage.setItem('theme', 'light');
        }
      }
      
      themeToggle.addEventListener('click', toggleTheme);
      if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
      }
      
      // Проверка сохраненной темы
      if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        if (themeIconMobile) themeIconMobile.classList.replace('fa-moon', 'fa-sun');
      }
    }
  }
  
  // Кнопка "Наверх"
  function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      });
    }
  }
  
  // Форма рассылки
  function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        alert(`Спасибо за подписку, ${email}! Вы будете получать наши персональные рекомендации по стилю.`);
        newsletterForm.reset();
      });
    }
  }
  
  // Анимация при прокрутке
  function setupScrollAnimations() {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.section-title, .fashion-card, .blog-post, .quiz-step');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Установка начального состояния для анимированных элементов
    document.querySelectorAll('.section-title, .fashion-card, .blog-post, .quiz-step').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
  }
  
  // Основная функция инициализации
  document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.trends-slider')) {
      initSwiper();
    }
    
    setupBurgerMenu();
    setupSmoothScrolling();
    setupThemeToggle();
    setupBackToTop();
    setupNewsletterForm();
    setupScrollAnimations();
    
    // Кнопки на главной странице
    if (document.getElementById('viewTrendsBtn')) {
      document.getElementById('viewTrendsBtn').addEventListener('click', () => {
        document.querySelector('#trends').scrollIntoView({ behavior: 'smooth' });
      });
    }
    
    if (document.getElementById('startQuizBtn')) {
      document.getElementById('startQuizBtn').addEventListener('click', () => {
        document.querySelector('#quiz').scrollIntoView({ behavior: 'smooth' });
      });
    }
  });
  document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('quizIntro')) return;
  
    const quizIntro = document.getElementById('quizIntro');
    const quizSteps = document.getElementById('quizSteps');
    const startQuizBtn = document.getElementById('startQuiz');
    const restartQuizBtn = document.getElementById('restartQuiz');
    const quizProgress = document.getElementById('quizProgress');
    const quizResult = document.getElementById('quizResult');
    const resultStyle = document.getElementById('resultStyle');
    
    let currentStep = 1;
    let userAnswers = {};
    const styleResults = {
      'casual-neutral-comfort': 'Повседневный комфорт',
      'casual-neutral-elegant': 'Спортивный шик',
      'casual-pastel-romantic': 'Нежный кэжуал',
      'classic-neutral-elegant': 'Классический минимализм',
      'classic-dark-elegant': 'Современная классика',
      'bohemian-bright-bold': 'Бохо-шик',
      'bohemian-pastel-romantic': 'Романтичный бохо',
      'minimalist-neutral-elegant': 'Скандинавский минимализм'
    };
    
    // Начало теста
    startQuizBtn.addEventListener('click', () => {
      quizIntro.style.display = 'none';
      quizSteps.style.display = 'block';
      document.getElementById('step1').classList.add('active');
      updateProgress();
    });
    
    // Перезапуск теста
    restartQuizBtn.addEventListener('click', () => {
      quizResult.classList.remove('active');
      document.getElementById('step1').classList.add('active');
      currentStep = 1;
      userAnswers = {};
      updateProgress();
      document.querySelector('#quiz').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Кнопки "Далее" и "Назад"
    document.getElementById('nextStep1')?.addEventListener('click', () => {
      saveAnswer(1);
      document.getElementById('step1').classList.remove('active');
      document.getElementById('step2').classList.add('active');
      currentStep = 2;
      updateProgress();
    });
    
    document.getElementById('prevStep2')?.addEventListener('click', () => {
      document.getElementById('step2').classList.remove('active');
      document.getElementById('step1').classList.add('active');
      currentStep = 1;
      updateProgress();
    });
    
    document.getElementById('nextStep2')?.addEventListener('click', () => {
      saveAnswer(2);
      document.getElementById('step2').classList.remove('active');
      document.getElementById('step3').classList.add('active');
      currentStep = 3;
      updateProgress();
    });
    
    document.getElementById('prevStep3')?.addEventListener('click', () => {
      document.getElementById('step3').classList.remove('active');
      document.getElementById('step2').classList.add('active');
      currentStep = 2;
      updateProgress();
    });
    
    // Показать результаты
    document.getElementById('showResults')?.addEventListener('click', () => {
      saveAnswer(3);
      showResults();
    });
    
    // Выбор вариантов ответа
    document.querySelectorAll('.quiz-option').forEach(option => {
      option.addEventListener('click', function() {
        const step = this.closest('.quiz-step').id.replace('step', '');
        const options = document.querySelectorAll(`#step${step} .quiz-option`);
        
        options.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
    
    // Сохранение ответа
    function saveAnswer(step) {
      const selectedOption = document.querySelector(`#step${step} .quiz-option.selected`);
      if (selectedOption) {
        userAnswers[`step${step}`] = selectedOption.getAttribute('data-value');
      }
    }
    
    // Обновление прогресс-бара
    function updateProgress() {
      const progress = (currentStep / 3) * 100;
      quizProgress.style.width = `${progress}%`;
    }
    
    // Показать результаты теста
    function showResults() {
      const styleKey = `${userAnswers.step1}-${userAnswers.step2}-${userAnswers.step3}`;
      const style = styleResults[styleKey] || 'Универсальный классический';
      
      resultStyle.textContent = style;
      document.getElementById('step3').classList.remove('active');
      quizResult.classList.add('active');
      
      // Прокрутка к результатам
      setTimeout(() => {
        quizResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  });
  document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.wardrobe-container')) return;
  
    // Данные для гардероба
    const wardrobeData = {
      categories: [
        { id: 'outerwear', name: 'Верхняя одежда', icon: 'fa-tshirt' },
        { id: 'tshirts', name: 'Футболки', icon: 'fa-tshirt' },
        { id: 'shirts', name: 'Рубашки', icon: 'fa-vest' },
        { id: 'sweaters', name: 'Свитеры', icon: 'fa-vest-patches' },
        { id: 'pants', name: 'Брюки', icon: 'fa-jeans' },
        { id: 'shoes', name: 'Обувь', icon: 'fa-shoe-prints' },
        { id: 'accessories', name: 'Аксессуары', icon: 'fa-ring' }
      ],
      items: [
        { id: 1, category: 'outerwear', name: 'Джинсовая куртка', description: 'Синяя, oversize', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80' },
        { id: 2, category: 'tshirts', name: 'Белая футболка', description: 'Хлопок, классика', image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80' },
        { id: 3, category: 'pants', name: 'Черные джинсы', description: 'Слим, эластан', image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80' },
        { id: 4, category: 'shoes', name: 'Белые кроссовки', description: 'Кожа, минимализм', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=812&q=80' }
      ],
      outfits: []
    };
  
    // Инициализация гардероба
    function initWardrobe() {
      renderCategories();
      renderItems('outerwear');
      setupCategoryButtons();
      setupOutfitBuilder();
    }
  
    // Отображение категорий
    function renderCategories() {
      const categoriesContainer = document.querySelector('.category-list');
      if (!categoriesContainer) return;
  
      categoriesContainer.innerHTML = wardrobeData.categories.map(category => `
        <li class="category-item">
          <button class="category-btn" data-category="${category.id}">
            <i class="fas ${category.icon}"></i> ${category.name}
          </button>
        </li>
      `).join('');
    }
  
    // Отображение предметов одежды
    function renderItems(categoryId) {
      const itemsContainer = document.querySelector('.wardrobe-items');
      if (!itemsContainer) return;
  
      const filteredItems = wardrobeData.items.filter(item => item.category === categoryId);
      
      itemsContainer.innerHTML = filteredItems.map(item => `
        <div class="wardrobe-item" data-id="${item.id}" draggable="true">
          <div class="wardrobe-item-img">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="wardrobe-item-info">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
          </div>
        </div>
      `).join('');
    }
  
    // Настройка кнопок категорий
    function setupCategoryButtons() {
      document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          const categoryId = this.getAttribute('data-category');
          renderItems(categoryId);
        });
      });
    }
  
    // Настройка конструктора образов
    function setupOutfitBuilder() {
      const outfitSlots = document.querySelectorAll('.outfit-slot');
      const generateBtn = document.querySelector('.outfit-actions .btn-outline');
      const saveBtn = document.querySelector('.outfit-actions .btn');
      const addOutfitBtn = document.getElementById('addOutfitBtn');
  
      // Перетаскивание предметов
      document.querySelectorAll('.wardrobe-item').forEach(item => {
        item.addEventListener('dragstart', function(e) {
          e.dataTransfer.setData('text/plain', this.getAttribute('data-id'));
        });
      });
  
      // Сброс предметов в слоты
      outfitSlots.forEach(slot => {
        slot.addEventListener('dragover', function(e) {
          e.preventDefault();
        });
  
        slot.addEventListener('drop', function(e) {
          e.preventDefault();
          const itemId = e.dataTransfer.getData('text/plain');
          const item = wardrobeData.items.find(i => i.id == itemId);
          
          if (item) {
            this.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <div class="remove-item">
                <i class="fas fa-times"></i>
              </div>
            `;
            this.classList.add('filled');
            this.setAttribute('data-item-id', itemId);
          }
        });
      });
  
      // Удаление предметов из слотов
      document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-item')) {
          const slot = e.target.closest('.outfit-slot');
          resetSlot(slot);
        }
      });
  
      // Генерация случайного образа
      if (generateBtn) {
        generateBtn.addEventListener('click', function() {
          outfitSlots.forEach(slot => {
            if (!slot.classList.contains('filled')) {
              const randomItem = wardrobeData.items[Math.floor(Math.random() * wardrobeData.items.length)];
              slot.innerHTML = `
                <img src="${randomItem.image}" alt="${randomItem.name}">
                <div class="remove-item">
                  <i class="fas fa-times"></i>
                </div>
              `;
              slot.classList.add('filled');
              slot.setAttribute('data-item-id', randomItem.id);
            }
          });
        });
      }
  
      // Сохранение образа
      if (saveBtn) {
        saveBtn.addEventListener('click', function() {
          const outfit = {
            id: Date.now(),
            items: []
          };
  
          outfitSlots.forEach(slot => {
            if (slot.classList.contains('filled')) {
              const itemId = slot.getAttribute('data-item-id');
              outfit.items.push(itemId);
            }
          });
  
          if (outfit.items.length > 0) {
            wardrobeData.outfits.push(outfit);
            alert('Образ успешно сохранен!');
            outfitSlots.forEach(resetSlot);
          } else {
            alert('Добавьте хотя бы один предмет одежды для сохранения образа.');
          }
        });
      }
  
      // Кнопка добавления нового образа (если есть на странице)
      if (addOutfitBtn) {
        addOutfitBtn.addEventListener('click', function() {
          const newOutfitModal = document.getElementById('newOutfitModal');
          if (newOutfitModal) {
            newOutfitModal.style.display = 'block';
          }
        });
      }
    }
  
    // Сброс слота
    function resetSlot(slot) {
      const slotType = slot.getAttribute('data-type');
      slot.innerHTML = `
        <i class="fas fa-${getSlotIcon(slotType)}"></i>
        <span>${getSlotName(slotType)}</span>
      `;
      slot.classList.remove('filled');
      slot.removeAttribute('data-item-id');
    }
  
    // Получение иконки для слота
    function getSlotIcon(type) {
      switch(type) {
        case 'head': return 'hat-cowboy';
        case 'top': return 'tshirt';
        case 'bottom': return 'jeans';
        case 'shoes': return 'shoe-prints';
        default: return 'plus';
      }
    }
  
    // Получение названия для слота
    function getSlotName(type) {
      switch(type) {
        case 'head': return 'Головной убор';
        case 'top': return 'Верх';
        case 'bottom': return 'Низ';
        case 'shoes': return 'Обувь';
        default: return 'Добавить';
      }
    }
  
    // Инициализация гардероба при загрузке
    initWardrobe();
  });
  document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.trend-categories')) return;
  
    // Данные для трендов
    const trendsData = {
      categories: ['Все', 'Женщины', 'Мужчины', 'Обувь', 'Аксессуары', 'Цвета'],
      items: [
        {
          id: 1,
          title: 'Летние тренды 2023',
          description: 'Яркие цвета, воздушные ткани и смелые принты',
          image: 'https://i.pinimg.com/736x/2a/21/a1/2a21a16529b2208a6c2950aba42c63d3.jpg',
          tags: ['Все', 'Женщины'],
          date: '15 июня 2023',
          likes: 245
        },
        {
          id: 2,
          title: 'Деним на все случаи жизни',
          description: 'Новые силуэты и неожиданные сочетания',
          image: 'https://fluffyann.ru/wp-content/uploads/2024/09/sayj_g3ti9k.jpg',
          tags: ['Все', 'Женщины', 'Мужчины'],
          date: '10 июня 2023',
          likes: 189
        },
        {
          id: 3,
          title: 'Аксессуары сезона',
          description: 'Сумки, украшения и головные уборы',
          image: 'https://i.pinimg.com/originals/a4/69/3b/a4693bad7fcbca6910b68d7393c88582.jpg',
          tags: ['Все', 'Аксессуары'],
          date: '5 июня 2023',
          likes: 312
        }
      ]
    };
  
    // Инициализация каталога
    function initCatalog() {
      renderCategories();
      renderTrends('Все');
      setupCategoryFilters();
      setupFavoriteButtons();
    }
  
    // Отображение категорий
    function renderCategories() {
      const categoriesContainer = document.querySelector('.trend-categories');
      if (!categoriesContainer) return;
  
      categoriesContainer.innerHTML = trendsData.categories.map(category => `
        <div class="trend-category ${category === 'Все' ? 'active' : ''}" data-category="${category}">
          ${category}
        </div>
      `).join('');
    }
  
    // Отображение трендов
    function renderTrends(category) {
      const trendsContainer = document.querySelector('.fashion-grid');
      if (!trendsContainer) return;
  
      const filteredItems = category === 'Все' 
        ? trendsData.items 
        : trendsData.items.filter(item => item.tags.includes(category));
      
      trendsContainer.innerHTML = filteredItems.map(item => `
        <div class="fashion-card">
          <div class="fashion-img">
            <img src="${item.image}" alt="${item.title}">
            <div class="fashion-tag">${item.tags.find(t => t !== 'Все')}</div>
            <div class="fashion-actions">
              <button class="fashion-action-btn" title="Добавить в избранное" data-id="${item.id}">
                <i class="fas fa-heart"></i>
              </button>
              <button class="fashion-action-btn" title="Сохранить в гардероб">
                <i class="fas fa-save"></i>
              </button>
            </div>
          </div>
          <div class="fashion-info">
            <h3>${item.title}</h3>
            <div class="fashion-meta">
              <span><i class="fas fa-calendar-alt"></i> ${item.date}</span>
              <span><i class="fas fa-heart"></i> ${item.likes}</span>
            </div>
            <p class="fashion-description">${item.description}</p>
            <button class="btn" style="width: 100%;">
              <i class="fas fa-magic"></i> Создать похожий
            </button>
          </div>
        </div>
      `).join('');
    }
  
    // Настройка фильтров по категориям
    function setupCategoryFilters() {
      document.querySelectorAll('.trend-category').forEach(btn => {
        btn.addEventListener('click', function() {
          document.querySelectorAll('.trend-category').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          const category = this.getAttribute('data-category');
          renderTrends(category);
        });
      });
    }
  
    // Настройка кнопок "Добавить в избранное"
    function setupFavoriteButtons() {
      document.addEventListener('click', function(e) {
        if (e.target.closest('.fashion-action-btn')) {
          const btn = e.target.closest('.fashion-action-btn');
          if (btn.querySelector('.fa-heart')) {
            btn.classList.toggle('active');
            const itemId = btn.getAttribute('data-id');
            // Здесь можно добавить логику сохранения в избранное
            alert('Тренд добавлен в избранное!');
          }
        }
      });
    }
  
    // Инициализация каталога при загрузке
    initCatalog();
  });