/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Handle dropdown on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('a');
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
});

/* ============================================
   APPLICATION FORM VALIDATION
   ============================================ */

const applicationForm = document.getElementById('applicationForm');
if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const background = document.getElementById('background').value.trim();
        const domain = document.getElementById('domain').value;
        const skillLevel = document.getElementById('skillLevel').value;
        const motivation = document.getElementById('motivation').value.trim();

        let isValid = true;

        // Validation
        if (fullName.length < 2) {
            document.getElementById('fullNameError').textContent = 'Name must be at least 2 characters';
            isValid = false;
        }

        if (!isValidEmail(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }

        if (!isValidPhone(phone)) {
            document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
            isValid = false;
        }

        if (background.length < 3) {
            document.getElementById('backgroundError').textContent = 'Please provide your educational background';
            isValid = false;
        }

        if (!domain) {
            document.getElementById('domainError').textContent = 'Please select a program';
            isValid = false;
        }

        if (!skillLevel) {
            document.getElementById('skillLevelError').textContent = 'Please select your skill level';
            isValid = false;
        }

        if (motivation.length < 20) {
            document.getElementById('motivationError').textContent = 'Please provide at least 20 characters';
            isValid = false;
        }

        if (isValid) {
            // Save form data to localStorage (for demo purposes)
            const formData = {
                fullName,
                email,
                phone,
                background,
                domain,
                skillLevel,
                motivation,
                submittedAt: new Date().toLocaleString()
            };
            localStorage.setItem('applicationData', JSON.stringify(formData));

            // Show success message
            applicationForm.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('appliedEmail').textContent = email;

            // Scroll to success message
            document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Pre-fill domain from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const domain = urlParams.get('domain');
    if (domain) {
        document.getElementById('domain').value = domain;
    }
}

/* ============================================
   CONTACT FORM VALIDATION
   ============================================ */

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Get form values
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        // Validation
        if (name.length < 2) {
            document.getElementById('contactNameError').textContent = 'Name must be at least 2 characters';
            isValid = false;
        }

        if (!isValidEmail(email)) {
            document.getElementById('contactEmailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }

        if (!subject) {
            document.getElementById('subjectError').textContent = 'Please select a subject';
            isValid = false;
        }

        if (message.length < 10) {
            document.getElementById('messageError').textContent = 'Please provide at least 10 characters';
            isValid = false;
        }

        if (isValid) {
            // Save contact data to localStorage
            const contactData = {
                name,
                email,
                subject,
                message,
                submittedAt: new Date().toLocaleString()
            };
            localStorage.setItem('contactData', JSON.stringify(contactData));

            // Show success message
            contactForm.style.display = 'none';
            document.getElementById('contactSuccessMessage').style.display = 'block';
            document.getElementById('contactSuccessMessage').scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/* ============================================
   CERTIFICATE VERIFICATION
   ============================================ */

const verificationForm = document.getElementById('verificationForm');
if (verificationForm) {
    verificationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const certId = document.getElementById('certId').value.trim().toUpperCase();
        verifyCertificate(certId);
    });
}

// Mock database of certificates
const certificateDatabase = {
    'SKILLHUB-FED-2025-001': {
        name: 'Priya Sharma',
        domain: 'Frontend Development',
        duration: '1 Month',
        date: 'December 15, 2025',
        status: 'Completed'
    },
    'SKILLHUB-PYT-2025-042': {
        name: 'Arjun Verma',
        domain: 'Python Development',
        duration: '1 Month',
        date: 'November 20, 2025',
        status: 'Completed'
    },
    'SKILLHUB-FST-2026-015': {
        name: 'Sarah Khan',
        domain: 'Full Stack Development',
        duration: '1 Month',
        date: 'January 8, 2026',
        status: 'Completed'
    }
};

function verifyCertificate(certId) {
    const resultDiv = document.getElementById('verificationResult');
    const detailsDiv = document.getElementById('certificateDetails');
    const errorDiv = document.getElementById('errorDetails');
    const statusIcon = document.getElementById('statusIcon');
    const statusText = document.getElementById('statusText');

    // Validate format
    const certPattern = /^SKILLHUB-[A-Z]{2,3}-\d{4}-\d{3}$/;
    if (!certPattern.test(certId)) {
        detailsDiv.style.display = 'none';
        errorDiv.style.display = 'block';
        document.getElementById('errorMessage').textContent = 'Invalid certificate format. Please use format: SKILLHUB-XXX-YYYY-ZZZ';
        statusIcon.classList.add('error');
        statusIcon.classList.remove('success');
        statusText.textContent = 'Invalid Format';
        resultDiv.style.display = 'block';
        return;
    }

    // Check if certificate exists
    if (certificateDatabase[certId]) {
        const cert = certificateDatabase[certId];
        detailsDiv.style.display = 'block';
        errorDiv.style.display = 'none';
        statusIcon.classList.add('success');
        statusIcon.classList.remove('error');
        statusText.textContent = 'Certificate Verified ✓';

        // Populate details
        document.getElementById('resultCertId').textContent = certId;
        document.getElementById('resultName').textContent = cert.name;
        document.getElementById('resultDomain').textContent = cert.domain;
        document.getElementById('resultDuration').textContent = cert.duration;
        document.getElementById('resultDate').textContent = cert.date;
        document.getElementById('resultStatus').textContent = cert.status;
    } else {
        detailsDiv.style.display = 'none';
        errorDiv.style.display = 'block';
        document.getElementById('errorMessage').textContent = 'Certificate not found in our database. Please check the ID and try again.';
        statusIcon.classList.add('error');
        statusIcon.classList.remove('success');
        statusText.textContent = 'Certificate Not Found';
    }

    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

function resetVerification() {
    document.getElementById('verificationForm').reset();
    document.getElementById('verificationResult').style.display = 'none';
}

function testVerify(certId) {
    document.getElementById('certId').value = certId;
    verifyCertificate(certId);
}

/* ============================================
   FORM UTILITIES
   ============================================ */

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Simple validation - at least 10 digits
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function resetContactForm() {
    document.getElementById('contactForm').style.display = 'block';
    document.getElementById('contactSuccessMessage').style.display = 'none';
    document.getElementById('contactForm').reset();
}

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

/* ============================================
   LAZY LOADING ANIMATION
   ============================================ */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply to cards
document.querySelectorAll('.feature-card, .program-card, .testimonial-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

/* ============================================
   UTILITY: PRINT FRIENDLY STYLES
   ============================================ */

@media print {
    .navbar,
    .footer,
    .cta-section,
    .btn {
        display: none;
    }

    body {
        background-color: white;
    }

    .container {
        max-width: 100%;
    }
}

/* ============================================
   CONSOLE LOG FOR DEBUGGING
   ============================================ */

console.log('SkillHub Website Loaded Successfully');
console.log('All interactive features are enabled');
