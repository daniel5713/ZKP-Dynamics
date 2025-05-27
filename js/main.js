document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            authButtons.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Verification demo simulator
    const verifyBtn = document.querySelector('.demo-form .btn-primary');
    const verificationResult = document.querySelector('.verification-result');
    const resultIcon = document.querySelector('.result-icon');
    const walletInput = document.getElementById('wallet-address');
    
    if (verifyBtn) {
        verifyBtn.addEventListener('click', function() {
            if (!walletInput.value) {
                verificationResult.innerHTML = `
                    <div class="result-icon"><i class="fas fa-exclamation-circle" style="color: var(--warning-color);"></i></div>
                    <p>Please enter a wallet address</p>
                `;
                return;
            }
            
            // Simulate verification process
            resultIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            verificationResult.querySelector('p').textContent = 'Verifying...';
            
            setTimeout(() => {
                const isVerified = Math.random() > 0.3; // 70% chance of success for demo
                
                if (isVerified) {
                    verificationResult.innerHTML = `
                        <div class="result-icon"><i class="fas fa-check-circle" style="color: var(--success-color);"></i></div>
                        <p>Verification successful! This wallet holds verified assets.</p>
                    `;
                } else {
                    verificationResult.innerHTML = `
                        <div class="result-icon"><i class="fas fa-times-circle" style="color: var(--danger-color);"></i></div>
                        <p>Verification failed. No verifiable assets found.</p>
                    `;
                }
            }, 2000);
        });
    }

    // Animate on scroll for features
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.2 });
        
        featureCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Blockchain animation for demo section
    const blockchain = document.querySelector('.blockchain-animation');
    if (blockchain) {
        // Add gentle rotation animation
        let angle = 0;
        function rotateBlockchain() {
            angle += 0.2;
            blockchain.style.transform = `rotate(${angle}deg)`;
            requestAnimationFrame(rotateBlockchain);
        }
        
        rotateBlockchain();
    }

    // Fixed Heptadecagon creation functions
    function createHeptadecagon(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Use fixed dimensions that work well with the container
        const containerSize = container.offsetWidth;
        const centerX = containerSize / 2;
        const centerY = containerSize / 2;
        const radius = Math.min(containerSize * 0.35, 15); // Smaller radius
        const innerRadius = Math.min(containerSize * 0.15, 6); // Smaller inner radius
        const sides = 17;

        // Clear existing content
        container.innerHTML = '';

        // Create outer heptadecagon
        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides;
            const nextAngle = ((i + 1) * 2 * Math.PI) / sides;
            
            const x1 = centerX + radius * Math.cos(angle);
            const y1 = centerY + radius * Math.sin(angle);
            const x2 = centerX + radius * Math.cos(nextAngle);
            const y2 = centerY + radius * Math.sin(nextAngle);

            const line = document.createElement('div');
            line.className = 'line';
            
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            
            line.style.width = `${length}px`;
            line.style.left = `${x1}px`;
            line.style.top = `${y1}px`;
            line.style.transform = `rotate(${angleDeg}deg)`;
            
            container.appendChild(line);

            // Create inner lines connecting to center
            const innerLine = document.createElement('div');
            innerLine.className = 'inner-line';
            
            const innerLength = radius - innerRadius;
            const innerX = centerX + innerRadius * Math.cos(angle);
            const innerY = centerY + innerRadius * Math.sin(angle);
            
            innerLine.style.width = `${innerLength}px`;
            innerLine.style.left = `${innerX}px`;
            innerLine.style.top = `${innerY}px`;
            innerLine.style.transform = `rotate(${angle * 180 / Math.PI}deg)`;
            
            container.appendChild(innerLine);
        }
    }

    // Alternative: Simple circular pattern if heptadecagon is too complex
    function createSimplePattern(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const containerSize = container.offsetWidth;
        const centerX = containerSize / 2;
        const centerY = containerSize / 2;
        const radius = containerSize * 0.3;
        const lines = 12; // Simpler pattern

        container.innerHTML = '';

        for (let i = 0; i < lines; i++) {
            const angle = (i * 2 * Math.PI) / lines;
            
            const line = document.createElement('div');
            line.className = 'line';
            
            line.style.width = `${radius}px`;
            line.style.left = `${centerX}px`;
            line.style.top = `${centerY}px`;
            line.style.transform = `rotate(${angle * 180 / Math.PI}deg)`;
            line.style.transformOrigin = '0 center';
            
            container.appendChild(line);
        }
    }

    // Create patterns for both header and footer
    setTimeout(() => {
        // Try the heptadecagon first, fallback to simple pattern if needed
        try {
            createHeptadecagon('heptadecagon');
            createHeptadecagon('footer-heptadecagon');
        } catch (error) {
            console.log('Falling back to simple pattern');
            createSimplePattern('heptadecagon');
            createSimplePattern('footer-heptadecagon');
        }
    }, 100);

    // Recreate patterns on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            try {
                createHeptadecagon('heptadecagon');
                createHeptadecagon('footer-heptadecagon');
            } catch (error) {
                createSimplePattern('heptadecagon');
                createSimplePattern('footer-heptadecagon');
            }
        }, 250);
    });
});
