/* ========================================
   Smart Intern Hub - Vanilla JavaScript
   ======================================== */

// =============== Mobile Menu Toggle ===============
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });

        // Close menu when link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
            });
        });
    }
});

// =============== Validation Functions ===============

// Validate full name
function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(name.trim());
}

// Validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

// Validate phone number (10-15 digits)
function validatePhone(phone) {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Sanitize input to prevent XSS
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// =============== Application Form Handling ===============
const applyForm = document.getElementById('applyForm');
if (applyForm) {
    applyForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const background = document.getElementById('background').value.trim();
        const domain = document.getElementById('domain').value;
        const skillLevel = document.getElementById('skillLevel').value;
        const motivation = document.getElementById('motivation').value.trim();
        const agreement = document.getElementById('agreement').checked;

        // Clear previous errors
        clearErrors(['fullNameError', 'emailError', 'phoneError', 'backgroundError', 'domainError', 'skillLevelError', 'motivationError', 'agreementError']);

        // Validation logic
        let isValid = true;

        if (!validateName(fullName)) {
            showError('fullNameError', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }

        if (!validateEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        if (!validatePhone(phone)) {
            showError('phoneError', 'Please enter a valid phone number (10-15 digits)');
            isValid = false;
        }

        if (background.length < 10) {
            showError('backgroundError', 'Please provide at least 10 characters about your background');
            isValid = false;
        }

        if (!domain || domain === '') {
            showError('domainError', 'Please select an internship domain');
            isValid = false;
        }

        if (!skillLevel || skillLevel === '') {
            showError('skillLevelError', 'Please select your skill level');
            isValid = false;
        }

        if (motivation.length < 20) {
            showError('motivationError', 'Please provide at least 20 characters about your motivation');
            isValid = false;
        }

        if (!agreement) {
            showError('agreementError', 'You must agree to the terms to continue');
            isValid = false;
        }

        // If valid, show success message
        if (isValid) {
            // Display success message
            const successMessage = document.getElementById('applySuccessMessage');
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }

            // Reset form
            applyForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
            }, 5000);
        }
    });
}

// =============== Contact Form Handling ===============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const contactName = document.getElementById('contactName').value.trim();
        const contactEmail = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        // Clear previous errors
        clearErrors(['contactNameError', 'contactEmailError', 'subjectError', 'messageError']);

        // Validation logic
        let isValid = true;

        if (!validateName(contactName)) {
            showError('contactNameError', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }

        if (!validateEmail(contactEmail)) {
            showError('contactEmailError', 'Please enter a valid email address');
            isValid = false;
        }

        if (!subject || subject === '') {
            showError('subjectError', 'Please select a subject');
            isValid = false;
        }

        if (message.length < 10) {
            showError('messageError', 'Please write at least 10 characters in your message');
            isValid = false;
        }

        // If valid, show success message
        if (isValid) {
            const successMessage = document.getElementById('contactSuccessMessage');
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }

            contactForm.reset();

            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
            }, 5000);
        }
    });
}

// =============== Show Error Message ===============
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';

        // Add error class to associated input
        const fieldName = elementId.replace('Error', '');
        const inputField = document.getElementById(fieldName);
        if (inputField) {
            inputField.classList.add('input-error');
            inputField.addEventListener('focus', function () {
                inputField.classList.remove('input-error');
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            });
        }
    }
}

// =============== Clear Errors ===============
function clearErrors(errorIds) {
    errorIds.forEach(id => {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    });
}

// =============== Copy to Clipboard ===============
function copyToClipboard(text, buttonId) {
    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = document.getElementById(buttonId);
        if (copyBtn) {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');

            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.classList.remove('copied');
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    });
}

// =============== Certificate Verification ===============

// Mock database of certificates (for demonstration)
const certificateDatabase = [
    {
        id: 'SIH-FED-20260110-001',
        name: 'Rajesh Kumar',
        domain: 'Frontend Development',
        issueDate: '2026-01-10',
        status: 'Active'
    },
    {
        id: 'SIH-PYT-20260108-002',
        name: 'Priya Singh',
        domain: 'Python Programming',
        issueDate: '2026-01-08',
        status: 'Active'
    },
    {
        id: 'SIH-FST-20260105-003',
        name: 'Arjun Sharma',
        domain: 'Full Stack Development',
        issueDate: '2026-01-05',
        status: 'Active'
    }
];

// Verify certificate
function verifyCertificate() {
    const certId = document.getElementById('certId').value.trim().toUpperCase();
    const resultContainer = document.getElementById('verificationResult');
    const errorElement = document.getElementById('verificationError');

    if (!resultContainer) return;

    // Validate format
    const formatRegex = /^SIH-[A-Z]{3}-\d{8}-\d{3}$/;
    if (!formatRegex.test(certId)) {
        if (errorElement) {
            errorElement.textContent = 'Invalid certificate format. Use format: SIH-XXX-XXXXXXXX-XXX';
            errorElement.style.display = 'block';
        }
        resultContainer.style.display = 'none';
        return;
    }

    // Search in database
    const certificate = certificateDatabase.find(cert => cert.id === certId);

    if (certificate) {
        if (errorElement) {
            errorElement.style.display = 'none';
        }

        // Display certificate details
        resultContainer.innerHTML = `
            <div class="verification-success">
                <h3>✓ Certificate Verified</h3>
                <div class="cert-details">
                    <p><strong>Certificate ID:</strong> ${sanitizeInput(certificate.id)}</p>
                    <p><strong>Holder Name:</strong> ${sanitizeInput(certificate.name)}</p>
                    <p><strong>Domain:</strong> ${sanitizeInput(certificate.domain)}</p>
                    <p><strong>Issue Date:</strong> ${sanitizeInput(certificate.issueDate)}</p>
                    <p><strong>Status:</strong> <span class="status-active">${sanitizeInput(certificate.status)}</span></p>
                </div>
            </div>
        `;
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    } else {
        if (errorElement) {
            errorElement.textContent = 'Certificate not found. Please check the ID and try again.';
            errorElement.style.display = 'block';
        }
        resultContainer.style.display = 'none';
    }
}

// Demo verification
function demoVerify(certId) {
    document.getElementById('certId').value = certId;
    verifyCertificate();
}

// Reset verification
function resetVerification() {
    document.getElementById('certId').value = '';
    const resultContainer = document.getElementById('verificationResult');
    const errorElement = document.getElementById('verificationError');

    if (resultContainer) {
        resultContainer.style.display = 'none';
    }
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Attach verification form listener
document.addEventListener('DOMContentLoaded', function () {
    const verificationForm = document.getElementById('verificationForm');
    if (verificationForm) {
        verificationForm.addEventListener('submit', function (e) {
            e.preventDefault();
            verifyCertificate();
        });
    }

    // Get domain from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const domain = urlParams.get('domain');
    if (domain) {
        const domainSelect = document.getElementById('domain');
        if (domainSelect) {
            domainSelect.value = domain;
        }
    }
});

// =============== Real-time Form Validation ===============
document.addEventListener('DOMContentLoaded', function () {
    const formInputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea, select');

    formInputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('focus', function () {
            clearFieldError(this);
        });
    });
});

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    const errorElementId = fieldId + 'Error';

    let isValid = true;
    let errorMessage = '';

    if (fieldId === 'fullName' || fieldId === 'contactName') {
        if (!validateName(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid name';
        }
    } else if (fieldId === 'email' || fieldId === 'contactEmail') {
        if (!validateEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email';
        }
    } else if (fieldId === 'phone') {
        if (!validatePhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    } else if (fieldId === 'background') {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Please provide at least 10 characters';
        }
    } else if (fieldId === 'motivation') {
        if (value.length < 20) {
            isValid = false;
            errorMessage = 'Please provide at least 20 characters';
        }
    } else if (fieldId === 'message') {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Please provide at least 10 characters';
        }
    }

    if (!isValid && errorElementId) {
        showError(errorElementId, errorMessage);
        field.classList.add('input-error');
    } else if (isValid && field.value.length > 0) {
        field.classList.remove('input-error');
        const errorElement = document.getElementById(errorElementId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('input-error');
    const errorElementId = field.id + 'Error';
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// =============== Smooth Scrolling ===============
document.addEventListener('DOMContentLoaded', function () {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// =============== Security: Prevent form data from being stored ===============
// Note: All form data is cleared after submission. No sensitive data is stored in localStorage.
window.addEventListener('beforeunload', function () {
    // Ensure forms are cleared when leaving the page
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.reset();
    });
});

console.log('Smart Intern Hub - JavaScript Loaded. All functionality is client-side only. No data is persisted.');
