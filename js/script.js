/* Treehouse Techdegree: Interactive Registration Form */

//GLOBAL VARIABLES
const form = document.querySelector('form');

/* User Info Section */
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const otherJobRole = document.querySelector('#other-job-role');
const jobRole = document.querySelector('#title');

/* Shirt Design Section */
const colorSelect = document.querySelector('#color');
const shirtDesign = document.querySelector('#design');
const allColors = [...colorSelect.children];

/* Activities Section */
const registerForActivities = document.querySelector('#activities');
const activitiesBox = document.querySelector('#activities-box');
const totalActivities = document.querySelector('#activities-cost');
const activitySelection = registerForActivities.querySelectorAll('input[type="checkbox"]');
let activitiesTotalCost = 0;

/* Payments Section */
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

/* Credit Card Inputs */
const cardNumberInput = document.querySelector('#cc-num');
const cardZipCodeInput = document.querySelector('#zip');
const cardCVVInput = document.querySelector('#cvv');

//FUNCTIONS

/* 
--otherJob--
-Hides otherJobRole if "Other" not selected from Job Role dropdown 
*/
function otherJob() {
    if (jobRole.value === 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    };
};

/* 
--selectColor--
    -Enables Color selection once design theme chosen. 
    -Enables the selection of available colors for the chosen design theme. 
*/
function selectColor(e) {
    colorSelect.disabled = false;
    allColors.forEach(color => {
        let designTheme = e.target.value;
        let colorTheme = color.getAttribute('data-theme');
        if (designTheme === colorTheme) {
            color.hidden = false;
            color.setAttribute('selected', 'true');
        } else {
            color.hidden = true;
            color.removeAttribute('selected', 'false');
        };
    });
};

/* 
--activitiesCost--
    -Adjusts total activities cost based on selected activities and their pricing. 
*/
function activitiesCost(e) {
    let targetCost = e.target.getAttribute('data-cost');
    if (e.target.checked === true) {
        activitiesTotalCost = parseInt(activitiesTotalCost) + parseInt(targetCost);
    } else if (e.target.checked !== true) {
        activitiesTotalCost = parseInt(activitiesTotalCost) - parseInt(targetCost);
    };
    totalActivities.innerHTML = `Total: $${activitiesTotalCost}`;
};

/*
--choosePayment--
    - Changes payment method displayed based on payment selected from dropdown menu. 
    - If payment is selected the form updates to display the associated payment field and hides those unrelated.
*/
function choosePayment(e) {
    let paymentSelected = e.target.value;
    const paymentMethods = [creditCard, payPal, bitcoin];
    paymentMethods.forEach(method => {
        if (method.id === paymentSelected) {
            method.hidden = false;
            method.setAttribute('selected', 'true');
        } else {
            method.hidden = true;
            method.setAttribute('selected', 'false');
        };
    })
};

/*
--validationPassed & validationFailed--
    -Each function provides information on validation state to user upon submission.
*/
function validationPassed(field) {
    field.parentElement.classList.add('valid');
    field.parentElement.classList.remove('not-valid');
    field.parentElement.lastElementChild.classList.add('hint')
}

function validationFailed(field) {
    field.parentElement.classList.add('not-valid');
    field.parentElement.classList.remove('valid');
    field.parentElement.lastElementChild.classList.remove('hint');
}

//Form Validation Tests
const nameValidation = () => {
    const name = nameInput.value;
    const validName = /^[a-z]+\s[a-z]+$/i.test(name);
    return validName;
};

const emailValidation = () => {
    const email = emailInput.value;
    const validEmail = /[^@]+@[^@.]+\.com$/.test(email);
    return validEmail;
};

const activityValidation = () => {
    let selectedActivities = [];
    activitySelection.forEach(activity => {
        if (activity.checked === true) {
            selectedActivities.push(activity);
        };
    });
    if (selectedActivities.length > 0) {
        return true;
    };
};

const cardNumberValidation = () => {
    const cardNumber = cardNumberInput.value;
    const validCardNumber = /^\d{13,16}$/.test(cardNumber);
    return validCardNumber;
};

const cardZipCodeValidation = () => {
    const cardZipCode = cardZipCodeInput.value;
    const validZipCode = /^\d{5}$/.test(cardZipCode);
    return validZipCode;
};

const cardCVVValidation = () => {
    const cardCVV = cardCVVInput.value;
    const validCVV = /^\d{3}$/.test(cardCVV);
    return validCVV;
};

/* Accessibility (Focus & Blur) for Activities Section */
activitySelection.forEach(activity => {
    activity.addEventListener('focus', () => {
        activity.parentElement.classList = 'focus';
    });
    activity.addEventListener('blur', () => {
        activity.parentElement.classList.remove('focus');
    });
});


//EVENT LISTENERS
jobRole.addEventListener('change', otherJob);
shirtDesign.addEventListener('change', selectColor);
registerForActivities.addEventListener('change', activitiesCost);
payment.addEventListener('change', choosePayment);


/* Checks if form submission is valid */
form.addEventListener('submit', e => {
    let errors = [];

    if (!nameValidation()) {
        errors.push(nameInput);
        validationFailed(nameInput);
    } else {
        validationPassed(nameInput);
    };

    if (!emailValidation()) {
        errors.push(emailInput);
        validationFailed(emailInput);
    } else {
        validationPassed(emailInput);
    };

    if (!activityValidation()) {
        errors.push(activitySelection);
        validationFailed(activitiesBox);
    } else {
        validationPassed(activitiesBox);
    };

    if (payment.value === 'credit-card') {
        if (!cardNumberValidation()) {
            errors.push(cardNumberInput);
            validationFailed(cardNumberInput);
        } else {
            validationPassed(cardNumberInput);
        };
        if (!cardZipCodeValidation()) {
            errors.push(cardZipCodeInput);
            validationFailed(cardZipCodeInput);
        } else {
            validationPassed(cardZipCodeInput);
        };
        if (!cardCVVValidation()) {
            errors.push(cardCVVInput);
            validationFailed(cardCVVInput);
        } else {
            validationPassed(cardCVVInput);
        };
    };
    if (errors.length > 0) {
        e.preventDefault();
    };
});

/* Form Init on load */
window.onload = () => {
    nameInput.focus();
    otherJobRole.style.display = 'none';
    colorSelect.disabled = true;
    payment.value = 'credit-card';
    payPal.hidden = true;
    bitcoin.hidden = true;
};