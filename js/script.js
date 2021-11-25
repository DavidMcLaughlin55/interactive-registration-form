/* Treehouse Techdegree: Interactive Registration Form */

//GLOBAL VARIABLES
const nameInput = document.querySelector('#name');
const otherJobRole = document.querySelector('#other-job-role');
const jobRole = document.querySelector('#title');
const colorSelect = document.querySelector('#color');
const shirtDesign = document.querySelector('#design');
const allColors = colorSelect.children;

//FORM INIT ON LOAD
window.onload = () => {
    nameInput.focus();
    otherJobRole.style.display = 'none';
    colorSelect.disabled = true;
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


//EVENT LISTENERS
jobRole.addEventListener('change', otherJob);
shirtDesign.addEventListener('change', (e) => {
    colorSelect.disabled = false
    for (let i = 1; i < allColors.length; i++) {
        let designTheme = e.target.value;
        let colorTheme = allColors[i].getAttribute('data-theme');
        if (designTheme === colorTheme) {
            allColors[i].hidden = false;
            allColors[i].setAttribute('selected', 'true');
        } else {
            allColors[i].hidden = true;
            allColors[i].removeAttribute('selected', 'false');
        };
    };
});
