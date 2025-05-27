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
});
