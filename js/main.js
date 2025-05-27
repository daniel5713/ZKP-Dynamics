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

    function createHeptadecagon(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
    
        container.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                border: 2px solid var(--primary-color);
                border-radius: 50%;
                box-shadow: 0 0 10px rgba(0, 255, 157, 0.3);
                position: relative;
            ">
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 60%;
                    height: 60%;
                    border: 1px solid var(--primary-color);
                    border-radius: 50%;
                    opacity: 0.5;
                "></div>
            </div>
        `;
    }

    // Create heptadecagons for both header and footer
    // Small delay to ensure elements are rendered
    setTimeout(() => {
        createHeptadecagon('heptadecagon');
        createHeptadecagon('footer-heptadecagon');
    }, 100);

    // Recreate heptadecagons on window resize to maintain proper scaling
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            createHeptadecagon('heptadecagon');
            createHeptadecagon('footer-heptadecagon');
        }, 250);
    });
});
