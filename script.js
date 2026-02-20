// Initialize AOS
AOS.init({
    duration: 1000,
    once: false,
    offset: 100
});

// ============================================
// MOSAIC BLUR REVEAL EFFECT - UNBLURS ON SCROLL
// ============================================

const canvas = document.getElementById('mosaicCanvas');
const ctx = canvas.getContext('2d');
const heroImg = document.getElementById('heroImg');
const heroSection = document.getElementById('heroSection');
const scrollTrigger = document.getElementById('scrollTrigger');
const mainContent = document.getElementById('mainContent');

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Draw mosaic pixelation effect
function drawMosaic(pixelSize) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (pixelSize <= 0) return;

    // Draw pixelated blocks
    for (let x = 0; x < canvas.width; x += pixelSize) {
        for (let y = 0; y < canvas.height; y += pixelSize) {
            // Get random color for pixelation
            const avgColor = getAverageColor(x, y, pixelSize);
            
            ctx.fillStyle = `rgba(${avgColor.r}, ${avgColor.g}, ${avgColor.b}, ${0.7 + pixelSize / 50})`;
            ctx.fillRect(x, y, pixelSize, pixelSize);
            
            // Draw border
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.3})`;
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y, pixelSize, pixelSize);
        }
    }
}

// Helper function to get average color (for mosaic effect)
function getAverageColor(x, y, size) {
    return {
        r: Math.random() * 80 + 50,
        g: Math.random() * 80 + 50,
        b: Math.random() * 80 + 50
    };
}

// Scroll event - clear mosaic as you scroll
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const triggerHeight = scrollTrigger.offsetHeight;
    
    // Calculate progress from 1 (fully mosaic) to 0 (fully clear)
    const progress = Math.max(0, 1 - (scrolled / triggerHeight));
    
    // Pixel size decreases as you scroll (effect clears)
    const pixelSize = Math.max(0, progress * 50);
    
    // Draw mosaic
    drawMosaic(pixelSize);
    
    // Update hero image brightness as mosaic clears
    const brightness = 0.6 + (1 - progress) * 0.4;
    heroImg.style.filter = `brightness(${brightness}) contrast(1.2) grayscale(1)`;
});

// Initial draw
drawMosaic(50);

// ============================================
// POSTER SPOTLIGHT EFFECT
// ============================================

const posterSpotlight = document.getElementById('posterSpotlight');
const posterContainer = document.querySelector('.poster-container');

window.addEventListener('scroll', () => {
    if (posterContainer) {
        const rect = posterContainer.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
            const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
            const maxDistance = window.innerHeight / 2 + rect.height / 2;
            const proximity = Math.max(0, 1 - distance / maxDistance);
            
            posterSpotlight.style.opacity = proximity * 0.7;
        } else {
            posterSpotlight.style.opacity = 0;
        }
    }
});

// ============================================
// SMOOTH SCROLL OFFSET FOR NAVBAR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 40;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

console.log('PSI Film Website - Hero Background with Overlaid Content');