/* Treehouse Techdegree: Interactive Registration Form */

//GLOBAL VARIABLES
const nameInput = document.querySelector('#name');

const otherJobRole = document.querySelector('#other-job-role');
const jobRole = document.querySelector('#title');

const colorSelect = document.querySelector('#color');
const shirtDesign = document.querySelector('#design');
const allColors = [...colorSelect.children];

const registerForActivities = document.querySelector('#activities');
const totalActivities = document.querySelector('#activities-cost');
let activitiesTotalCost = 0;

const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

//FORM INIT ON LOAD
window.onload = () => {
    nameInput.focus();
    otherJobRole.style.display = 'none';
    colorSelect.disabled = true;
    payment.value = 'credit-card';
    payPal.hidden = true;
    bitcoin.hidden = true;
};

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
--choosePayment--
    - Changes payment method displayed based on payment selected from dropdown menu. 
    - If payment is selected the form updates to display the associated payment field and hides those unrelated.
*/
function choosePayment(e) {
    let paymentSelected = e.target.value;
    const paymentMethods = [creditCard, payPal, bitcoin]
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


function selectColor(e) {
    colorSelect.disabled = false
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


//EVENT LISTENERS
jobRole.addEventListener('change', otherJob);

/* Enables Color selection once design theme chosen. Enables the selection of available colors for the chosen design theme. */
shirtDesign.addEventListener('change', selectColor);



registerForActivities.addEventListener('change', activitiesCost);
payment.addEventListener('change', choosePayment);