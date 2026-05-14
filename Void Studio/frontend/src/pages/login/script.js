const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
 
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});
 
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
 
// Form Validation Functions
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
 
const validatePassword = (password) => {
    return password.length >= 6;
};
 
const validateName = (name) => {
    return name.trim().length >= 2;
};
 
// Clear error messages
const clearErrors = (formType) => {
    const errors = document.querySelectorAll(`#${formType}Form .error-message`);
    errors.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
};
 
const showError = (elementId, message) => {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
};
 
const showSuccess = (elementId, message) => {
    const successElement = document.getElementById(elementId);
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 3000);
    }
};
 
// Sign Up Form Validation and Submission
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors('signup');
 
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
 
    let isValid = true;
 
    // Validate Name
    if (!validateName(name)) {
        showError('nameError', 'Name must be at least 2 characters');
        isValid = false;
    }
 
    // Validate Email
    if (!email) {
        showError('signupEmailError', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('signupEmailError', 'Please enter a valid email');
        isValid = false;
    }
 
    // Validate Password
    if (!password) {
        showError('signupPasswordError', 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError('signupPasswordError', 'Password must be at least 6 characters');
        isValid = false;
    }
 
    // Validate Confirm Password
    if (!confirmPassword) {
        showError('confirmPasswordError', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        isValid = false;
    }
 
    // If all validations pass
    if (isValid) {
        // Here you would typically send data to a server
        console.log('Sign up data:', { name, email, password });
        showSuccess('signupSuccess', '✓ Account created successfully!');
        
        // Reset form
        setTimeout(() => {
            signupForm.reset();
            clearErrors('signup');
        }, 1500);
    }
});
 
// Sign In Form Validation and Submission
const signinForm = document.getElementById('signinForm');
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors('signin');
 
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;
 
    let isValid = true;
 
    // Validate Email
    if (!email) {
        showError('signinEmailError', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('signinEmailError', 'Please enter a valid email');
        isValid = false;
    }
 
    // Validate Password
    if (!password) {
        showError('signinPasswordError', 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError('signinPasswordError', 'Password must be at least 6 characters');
        isValid = false;
    }
 
    // If all validations pass
    if (isValid) {
        // Here you would typically send data to a server
        console.log('Sign in data:', { email, password });
        showSuccess('signinSuccess', '✓ Login successful!');
        
        // Reset form
        setTimeout(() => {
            signinForm.reset();
            clearErrors('signin');
        }, 1500);
    }
});
 
// Real-time validation feedback
document.getElementById('signupEmail').addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        showError('signupEmailError', 'Invalid email format');
    } else {
        document.getElementById('signupEmailError').style.display = 'none';
    }
});
 
document.getElementById('signinEmail').addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        showError('signinEmailError', 'Invalid email format');
    } else {
        document.getElementById('signinEmailError').style.display = 'none';
    }
});
 
document.getElementById('signupPassword').addEventListener('blur', function() {
    if (this.value && !validatePassword(this.value)) {
        showError('signupPasswordError', 'Password must be at least 6 characters');
    } else {
        document.getElementById('signupPasswordError').style.display = 'none';
    }
});
 
// Forgot Password Handler
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Password reset link would be sent to your email');
});
 
// Social login handlers (placeholder)
document.querySelectorAll('.social-icons a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = link.querySelector('i').className;
        console.log('Social login attempted with:', provider);
        alert('Social login feature would be implemented here');
    });
});