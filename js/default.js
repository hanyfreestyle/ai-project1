// Select important elements
const header = document.querySelector('.main-header');
const fullScreenMenu = document.getElementById('fullScreenMenu');
const hamburgerMenu = document.querySelector('.hamburger-menu');

const horizontalTabs = document.querySelector('.horizontal-tabs');
const tabs = document.querySelectorAll('.horizontal-tabs .tab');
const sections = document.querySelectorAll('.category__container__section section');


// Function to toggle the 'scrolled' class on header
function toggleHeaderScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    header.classList.toggle('scrolled', scrollTop > 50);
}

// Function to toggle the full-screen menu
function toggleMenu() {
    fullScreenMenu.classList.toggle('active');
    hamburgerMenu.classList.toggle('open');
}

// Function to highlight active tab based on scroll position
function highlightActiveTab() {
    let currentSectionId = '';
    const headerOffset = header.offsetHeight + horizontalTabs.offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerOffset;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
            currentSectionId = section.id;
        }
    });

    tabs.forEach(tab => {
        const href = tab.getAttribute('href').substring(1);
        tab.classList.toggle('active', href === currentSectionId);
    });
}

// Function to smooth scroll to section when clicking on a tab
function scrollToSection(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    const headerOffset = header.offsetHeight + horizontalTabs.offsetHeight;
    const targetPosition = targetSection.offsetTop - headerOffset;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}


// Function to handle tab scrolling
function handleTabScroll() {
    const maxScroll = horizontalTabs.scrollWidth - horizontalTabs.clientWidth;
}

// Event Listeners
window.addEventListener('scroll', () => {
    toggleHeaderScroll();
    highlightActiveTab();
});

tabs.forEach(tab => tab.addEventListener('click', scrollToSection));
horizontalTabs.addEventListener('scroll', handleTabScroll);

// Initial calls
toggleHeaderScroll();
highlightActiveTab();


// Intersection Observer for more accurate section tracking
const observerOptions = {
    root: null,
    rootMargin: `-${header.offsetHeight + horizontalTabs.offsetHeight}px 0px 0px 0px`,
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            tabs.forEach(tab => {
                const href = tab.getAttribute('href').substring(1);
                tab.classList.toggle('active', href === id);
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));
