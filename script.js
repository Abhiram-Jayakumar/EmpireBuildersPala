// Enhanced Animations for Index Page
const enhancedIndexAnimations = {
    // Initialize GSAP plugins and set defaults
    init() {
        gsap.registerPlugin(ScrollTrigger, TextPlugin);
        gsap.config({
            nullTargetWarn: false,
        });
    },

    // Create dynamic background effect
    createDynamicBackground() {
        const hero = document.querySelector('.hero');
        hero.innerHTML += `<div class="dynamic-bg"></div>`;
        
        gsap.to('.dynamic-bg', {
            backgroundPosition: '100% 100%',
            duration: 20,
            repeat: -1,
            ease: "none"
        });
    },

    // Enhanced loading overlay
    showLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loader-content">
            
                <div class="loader-text">
                    <span>E</span><span>m</span><span>p</span><span>i</span><span>r</span><span>e</span>
                    <span>B</span><span>u</span><span>i</span><span>l</span><span>d</span><span>e</span><span>r</span><span>s</span>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Animate loader text
        gsap.from('.loader-text span', {
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out"
        });
    },

    // Smooth hide loading overlay
    hideLoadingOverlay() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            gsap.to(overlay, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => overlay.remove()
            });
        }
    },

    // Enhanced hero section animation
    animateHeroSection() {
        const heroTimeline = gsap.timeline();

        heroTimeline
            .from('.hero', {
                duration: 1.5,
                clipPath: "circle(0% at 50% 50%)",
                ease: "power3.inOut"
            })
            .from('.hero h1', {
                duration: 1,
                y: 100,
                opacity: 0,
                ease: "back.out(1.7)",
                stagger: 0.2
            }, "-=0.5")
            .from('.hero p', {
                duration: 0.8,
                y: 50,
                opacity: 0,
                ease: "back.out(1.5)"
            }, "-=0.3")
            .from('.hero .btn', {
                duration: 0.5,
                scale: 0,
                opacity: 0,
                ease: "back.out(2)"
            }, "-=0.2");
    },

    
    // Scroll animations
    initScrollAnimations() {
        // Sustainable approach section animation
        gsap.from('.bg-light .card', {
            duration: 1,
            opacity: 0,
            y: 50,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.bg-light',
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        // Section headers animation
        gsap.utils.toArray('section h2').forEach(header => {
            gsap.from(header, {
                duration: 1,
                opacity: 0,
                y: 30,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    },

    // Navbar animation
    animateNavbar() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                gsap.to(navbar, {
                    y: '-100%',
                    duration: 0.3,
                    ease: "power3.out"
                });
            } else {
                gsap.to(navbar, {
                    y: '0%',
                    duration: 0.3,
                    ease: "power3.out"
                });
            }
            
            lastScroll = currentScroll;
        });
    },

    // Floating chat buttons animation
    animateChatButtons() {
        gsap.to('.position-fixed .btn', {
            y: -10,
            duration: 1.5,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.2
        });
    }
};

// Add required styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .circular-loader {
        width: 60px;
        height: 60px;
        animation: rotate 2s linear infinite;
    }

    .loader-path {
        fill: none;
        stroke: #007bff;
        stroke-width: 3;
        stroke-dasharray: 150, 200;
        stroke-dashoffset: 0;
        animation: dash 1.5s ease-in-out infinite;
    }

    .dynamic-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, rgba(0,123,255,0.2), rgba(0,123,255,0), rgba(0,123,255,0.2));
        z-index: -1;
        background-size: 200% 200%;
    }

    .hero {
        position: relative;
        background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), 
                    url('https://i.postimg.cc/sXFgJSDf/photo-1565008447742-97f6f38c985c.avif') center/cover;
        overflow: hidden;
    }

    .card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        overflow: hidden;
    }

    .card-img-top {
        transition: transform 0.3s ease;
    }

    @keyframes rotate {
        100% { transform: rotate(360deg); }
    }

    @keyframes dash {
        0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
        50% { stroke-dasharray: 89, 200; stroke-dashoffset: -35; }
        100% { stroke-dasharray: 89, 200; stroke-dashoffset: -124; }
    }
`;

document.head.appendChild(styleSheet);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP and plugins
    enhancedIndexAnimations.init();
    
    // Show loading overlay
    enhancedIndexAnimations.showLoadingOverlay();

    // Start animation sequence
    setTimeout(() => {
        enhancedIndexAnimations.hideLoadingOverlay();
        enhancedIndexAnimations.createDynamicBackground();
        enhancedIndexAnimations.animateHeroSection();
        enhancedIndexAnimations.animateCards();
        enhancedIndexAnimations.initScrollAnimations();
        enhancedIndexAnimations.animateNavbar();
        enhancedIndexAnimations.animateChatButtons();
    }, 2000);
});









 // Chatbot functionality
 const chatbot = {
    toggleChatbot() {
        const chatbotElement = document.getElementById('chatbot');
        if (chatbotElement.style.display === 'none') {
            chatbotElement.style.display = 'block';
            document.getElementById('userInput').focus();
        } else {
            chatbotElement.style.display = 'none';
        }
    },

    sendMessage() {
        const userInput = document.getElementById('userInput');
        const chatbotMessages = document.getElementById('chatbotMessages');
        const message = userInput.value.trim();

        if (message) {
            // Add user message
            this.appendMessage('user', message);
            userInput.value = '';

            // Simulate bot response
            setTimeout(() => {
                const response = this.getBotResponse(message);
                this.appendMessage('bot', response);
            }, 1000);
        }
    },

    appendMessage(sender, text) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        
        if (sender === 'user') {
            messageDiv.className = 'alert alert-primary text-end mb-2';
        } else {
            messageDiv.className = 'alert alert-info mb-2';
        }
        
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },

    getBotResponse(message) {
        const responses = {
            'hello': 'Hi! How can I help you today?',
            'hi': 'Hello! How may I assist you?',
            'contact': 'You can reach us at info@empirebuilders.com or call us at +1 (555) 123-4567.',
            'location': 'We are located at 123 Eco Street, Green City, 12345.',
            'hours': 'Our business hours are Monday-Friday 9AM-6PM, Saturday 10AM-2PM, and we are closed on Sundays.',
            'services': 'We offer sustainable architectural design, consultation, and project management services.',
            'quote': 'Please fill out our contact form with your project details, and we\'ll get back to you with a quote.',
            'bye': 'Thank you for chatting with us! Have a great day!'
        };

        message = message.toLowerCase();
        for (let key in responses) {
            if (message.includes(key)) {
                return responses[key];
            }
        }

        return "I'm not sure how to help with that. Would you like to speak with one of our representatives?";
    }
};

// Add window chatbot to global scope
window.chatbot = chatbot;




// Form handling script
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const submitText = submitBtn.querySelector('.submit-text');
    const spinner = submitBtn.querySelector('.spinner-border');

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    spinner.classList.remove('d-none');

    try {
        const response = await fetch(this.action, {
            method: 'POST',
            body: new FormData(this)
        });

        const data = await response.json();

        if (response.status === 200) {
            // Show success message
            showToast('Success!', 'Your message has been sent successfully.', 'success');
            
            // Reset form
            this.reset();
            this.classList.remove('was-validated');
            
            // Optional: Redirect to thank you page
            // window.location.href = 'thank-you.html';
        } else {
            throw new Error(data.message || 'Something went wrong!');
        }
    } catch (error) {
        showToast('Error!', error.message, 'danger');
    } finally {
        // Restore button state
        submitBtn.disabled = false;
        submitText.textContent = 'Send Message';
        spinner.classList.add('d-none');
    }
});

// Toast notification function
function showToast(title, message, type = 'success') {
    const toastContainer = document.querySelector('.toast-container');
    const toastHtml = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-${type} text-white">
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toast = new bootstrap.Toast(toastContainer.lastElementChild);
    toast.show();

    // Remove toast after it's hidden
    toastContainer.lastElementChild.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}