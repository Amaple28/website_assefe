/**
 * ASSEFE - Scripts Principais
 * Funcionalidades: Acessibilidade, Menu Mobile, Animações ao Scroll, Voltar ao Topo, Clima
 */

// ========================================
// Inicialização quando o DOM estiver pronto
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initFontAccessibility();
    initMobileMenu();
    initScrollAnimations();
    initBackToTop();
    initWeather();
    initScrollSpy();
    initMonthNav();
});

// ========================================
// Acessibilidade - Controle de Tamanho de Fonte
// ========================================
function initFontAccessibility() {
    const fontSlider = document.getElementById('fontSlider');
    const root = document.documentElement;

    function setRootFontSize(px) {
        const value = Math.min(24, Math.max(12, Number(px) || 16));
        root.style.fontSize = value + 'px';
        if (fontSlider) fontSlider.value = String(value);
        
        try {
            localStorage.setItem('assefe_font_size', String(value));
        } catch (_) {
            // Ignora erro de localStorage
        }
    }

    // Carrega preferência salva
    try {
        const saved = localStorage.getItem('assefe_font_size');
        if (saved) setRootFontSize(saved);
    } catch (_) {
        // Ignora erro de localStorage
    }

    if (fontSlider) {
        fontSlider.addEventListener('input', (e) => {
            setRootFontSize(e.target.value);
        });
    }
}

// ========================================
// Contraste - Modo Escuro
// ========================================
function toggleContrast() {
    document.body.classList.toggle('dark-mode');
    
    try {
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('assefe_dark_mode', isDarkMode ? 'true' : 'false');
    } catch (_) {
        // Ignora erro de localStorage
    }
}

// Carrega preferência de contraste salva
(function() {
    try {
        const savedDarkMode = localStorage.getItem('assefe_dark_mode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
        }
    } catch (_) {
        // Ignora erro de localStorage
    }
})();

// ========================================
// Menu Mobile (Hamburguer)
// ========================================
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuIcon = document.getElementById('mobileMenuIcon');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    if (!mobileMenuButton || !mobileMenu || !mobileMenuIcon) return;

    function setMobileMenuOpen(isOpen) {
        // Toggle classes para mostrar/esconder menu
        mobileMenu.classList.toggle('active', isOpen);
        
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.toggle('active', isOpen);
        }

        // Bloqueia scroll do body quando menu está aberto
        document.body.classList.toggle('overflow-hidden', isOpen);

        // Atualiza ARIA
        mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
        mobileMenuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');

        // Troca ícone
        mobileMenuIcon.classList.toggle('fa-bars', !isOpen);
        mobileMenuIcon.classList.toggle('fa-xmark', isOpen);
    }

    // Toggle ao clicar no botão
    mobileMenuButton.addEventListener('click', () => {
        const isOpen = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        setMobileMenuOpen(!isOpen);
    });

    // Fecha ao clicar no overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => setMobileMenuOpen(false));
    }

    // Fecha ao clicar em links (exceto summaries de details)
    mobileMenu.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.closest && target.closest('a') && !target.closest('summary')) {
            setMobileMenuOpen(false);
        }
    });

    // Fecha com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
    });

    // Garante estado correto ao mudar para desktop
    window.addEventListener('resize', () => {
        if (window.matchMedia('(min-width: 1024px)').matches) {
            setMobileMenuOpen(false);
        }
    });
}

// ========================================
// Animações ao Rolar a Tela (Intersection Observer)
// ========================================
function initScrollAnimations() {
    // Seleciona todos os elementos com classes de animação
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');

    if (animatedElements.length === 0) return;

    // Configurações do observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -50px 0px', // Dispara um pouco antes do elemento entrar
        threshold: 0.1 // 10% do elemento visível
    };

    // Callback quando elemento entra/sai da viewport
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona classe 'visible' para ativar animação
                entry.target.classList.add('visible');
                // Para de observar após animar (opcional - remova se quiser reanimar ao sair/entrar)
                observer.unobserve(entry.target);
            }
        });
    };

    // Cria o observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observa cada elemento
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// Botão Voltar ao Topo
// ========================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    // Mostra/esconde botão baseado no scroll
    function toggleBackToTopVisibility() {
        const scrollY = window.scrollY || window.pageYOffset;
        const threshold = 300; // Mostra após 300px de scroll

        if (scrollY > threshold) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    // Scroll suave para o topo ao clicar
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Monitora scroll com throttle para performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                toggleBackToTopVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Verifica estado inicial
    toggleBackToTopVisibility();
}

// ========================================
// Utilitário: Esconder Header ao Rolar (Opcional)
// ========================================
function initHidingHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    // Scrollando para baixo
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Scrollando para cima
                    header.style.transform = 'translateY(0)';
                }
                
                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ========================================
// Utilitário: Smooth Scroll para Links Internos
// ========================================
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// ========================================
// Widget de Clima (Open-Meteo API - Sem chave necessária)
// ========================================
async function initWeather() {
    const elements = {
        temp: document.getElementById('weatherTemp'),
        icon: document.getElementById('weatherIcon'),
        desc: document.getElementById('weatherDesc'),
        wind: document.getElementById('weatherWind'),
        humidity: document.getElementById('weatherHumidity'),
        feels: document.getElementById('weatherFeels'),
        forecast: document.getElementById('weatherForecast')
    };

    // Verifica se os elementos existem na página
    if (!elements.temp) return;

    // Coordenadas de Brasília (Assefe)
    const lat = -15.7871;
    const lon = -47.8973;

    try {
        // Open-Meteo API (gratuita, sem chave)
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&timezone=America/Sao_Paulo&forecast_days=1`
        );

        if (!response.ok) throw new Error('Falha ao carregar clima');

        const data = await response.json();
        const current = data.current;

        // Atualiza dados atuais
        elements.temp.textContent = `${Math.round(current.temperature_2m)}°C`;
        elements.wind.textContent = `${current.wind_speed_10m} km/h`;
        elements.humidity.textContent = `${current.relative_humidity_2m}%`;
        elements.feels.textContent = `${Math.round(current.apparent_temperature)}°C`;

        // Descrição e ícone baseado no código WMO
        const weatherInfo = getWeatherInfo(current.weather_code);
        elements.desc.textContent = weatherInfo.description;
        elements.icon.innerHTML = `<i class="${weatherInfo.icon}"></i>`;

        // Previsão por hora (próximas 6 horas)
        if (elements.forecast && data.hourly) {
            const currentHour = new Date().getHours();
            let forecastHTML = '';
            
            for (let i = 0; i < 6; i++) {
                const hourIndex = currentHour + i;
                if (hourIndex < data.hourly.time.length) {
                    const time = new Date(data.hourly.time[hourIndex]);
                    const temp = Math.round(data.hourly.temperature_2m[hourIndex]);
                    const code = data.hourly.weather_code[hourIndex];
                    const info = getWeatherInfo(code);
                    
                    forecastHTML += `
                        <div class="forecast-item">
                            <span class="forecast-time">${time.getHours().toString().padStart(2, '0')}:00</span>
                            <span class="forecast-icon"><i class="${info.icon}"></i></span>
                            <span class="forecast-temp">${temp}°C</span>
                        </div>
                    `;
                }
            }
            elements.forecast.innerHTML = forecastHTML;
        }

    } catch (error) {
        console.error('Erro ao carregar clima:', error);
        // Mostra dados de fallback
        elements.temp.textContent = '25°C';
        elements.desc.textContent = 'Parcialmente nublado';
        elements.icon.innerHTML = '<i class="fas fa-cloud-sun"></i>';
        elements.wind.textContent = '10 km/h';
        elements.humidity.textContent = '60%';
        elements.feels.textContent = '27°C';
    }
}

// Converte código WMO para descrição e ícone
function getWeatherInfo(code) {
    const weatherCodes = {
        0: { description: 'Céu limpo', icon: 'fas fa-sun' },
        1: { description: 'Predominantemente limpo', icon: 'fas fa-sun' },
        2: { description: 'Parcialmente nublado', icon: 'fas fa-cloud-sun' },
        3: { description: 'Nublado', icon: 'fas fa-cloud' },
        45: { description: 'Neblina', icon: 'fas fa-smog' },
        48: { description: 'Neblina com geada', icon: 'fas fa-smog' },
        51: { description: 'Garoa leve', icon: 'fas fa-cloud-rain' },
        53: { description: 'Garoa moderada', icon: 'fas fa-cloud-rain' },
        55: { description: 'Garoa intensa', icon: 'fas fa-cloud-rain' },
        61: { description: 'Chuva leve', icon: 'fas fa-cloud-showers-heavy' },
        63: { description: 'Chuva moderada', icon: 'fas fa-cloud-showers-heavy' },
        65: { description: 'Chuva intensa', icon: 'fas fa-cloud-showers-heavy' },
        71: { description: 'Neve leve', icon: 'fas fa-snowflake' },
        73: { description: 'Neve moderada', icon: 'fas fa-snowflake' },
        75: { description: 'Neve intensa', icon: 'fas fa-snowflake' },
        80: { description: 'Pancadas leves', icon: 'fas fa-cloud-sun-rain' },
        81: { description: 'Pancadas moderadas', icon: 'fas fa-cloud-sun-rain' },
        82: { description: 'Pancadas fortes', icon: 'fas fa-cloud-showers-heavy' },
        95: { description: 'Tempestade', icon: 'fas fa-bolt' },
        96: { description: 'Tempestade com granizo', icon: 'fas fa-cloud-bolt' },
        99: { description: 'Tempestade forte', icon: 'fas fa-cloud-bolt' }
    };

    return weatherCodes[code] || { description: 'Indefinido', icon: 'fas fa-question' };
}

// ========================================
// Scroll Spy para Navegação Interna
// ========================================
function initScrollSpy() {
    const navLinks = document.querySelectorAll('.internal-nav-link');
    const sections = [];

    // Verifica se existem links de navegação interna
    if (navLinks.length === 0) return;

    // Coleta as seções referenciadas pelos links
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const section = document.querySelector(href);
            if (section) {
                sections.push({
                    id: href.substring(1),
                    element: section,
                    link: link
                });
            }
        }
    });

    if (sections.length === 0) return;

    // Função para atualizar link ativo
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 150; // Offset para considerar header sticky

        let currentSection = sections[0];

        // Encontra a seção atual baseada no scroll
        sections.forEach(section => {
            const sectionTop = section.element.offsetTop;
            const sectionHeight = section.element.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section;
            }
        });

        // Remove 'active' de todos os links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Adiciona 'active' ao link da seção atual
        if (currentSection && currentSection.link) {
            currentSection.link.classList.add('active');

            // Scroll horizontal para manter o link visível em mobile
            const nav = document.querySelector('.internal-nav');
            if (nav) {
                const linkRect = currentSection.link.getBoundingClientRect();
                const navRect = nav.getBoundingClientRect();
                
                if (linkRect.left < navRect.left || linkRect.right > navRect.right) {
                    currentSection.link.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
            }
        }
    }

    // Throttle para performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Atualiza ao carregar
    updateActiveLink();

    // Smooth scroll ao clicar nos links internos
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 140; // Altura do header + nav interna
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Navegação Mês a Mês
// ========================================
function initMonthNav() {
    const monthBtns = document.querySelectorAll('.month-btn');
    const monthContents = document.querySelectorAll('.month-content');
    const prevBtn = document.querySelector('.month-nav-prev');
    const nextBtn = document.querySelector('.month-nav-next');
    const scrollContainer = document.querySelector('.month-nav-scroll');

    if (monthBtns.length === 0) return;

    // Clique nos botões de mês
    monthBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const monthId = btn.dataset.month;

            // Remove 'active' de todos os botões
            monthBtns.forEach(b => b.classList.remove('active'));
            // Adiciona 'active' ao botão clicado
            btn.classList.add('active');

            // Esconde todos os conteúdos
            monthContents.forEach(content => content.classList.remove('active'));
            // Mostra o conteúdo do mês selecionado
            const targetContent = document.getElementById(`mes-${monthId}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Scroll para manter o botão visível
            btn.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        });
    });

    // Navegação com setas
    if (scrollContainer) {
        const scrollAmount = 200;

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                scrollContainer.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                scrollContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        }
    }
}
