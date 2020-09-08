/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
*/
const form = document.getElementsByTagName('form')[0];
const titleSelector = document.getElementById('title');
const otherTitleTextBox = document.getElementById('other-title');
const nameTextBox = document.getElementById('name');
const emailTextBox = document.getElementById('mail');
const designSelector = document.getElementById('design');
const colorDiv = document.getElementById('shirt-colors');
const colorSelectorOptions = document.getElementById('color').children;
const activities = document.querySelector('.activities');
const activitiesTitle = activities.firstElementChild;
const activityCheckboxes = document.querySelectorAll('.activities input');
const total = document.querySelector('[data-total]');
const paymentSelector = document.getElementById('payment');
const creditCardDiv = document.getElementById('credit-card');
const creditCardField = document.getElementById('cc-num');
const zipField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const submitButton = document.querySelector('[type=submit]');;

//This function validates if the name field is empty or not.  Learned from FSJS Form Input Validation Warm up
const nameValidator = () => {
    const nameValue = nameTextBox.value;

    if (nameValue.length > 0) {
        nameTextBox.style.borderColor = 'rgb(111, 157, 220)';
        return true;
    } else {
        nameTextBox.style.borderColor = 'rgb(255, 0, 0)';
        return false;
    }
}
nameTextBox.addEventListener('keyup', nameValidator);

//This function validates if email has characters before and after the '@' symbol.  Learned from FSJS Form Input Validation Warm up
const emailValidator = () => {

    const emailValue = emailTextBox.value;
    const atIndex = emailValue.indexOf('@');
    const periodIndex = emailValue.lastIndexOf('.');

    if (atIndex > 1 && periodIndex > (atIndex + 1)){
        emailTextBox.style.borderColor = 'rgb(111, 157, 220)';
        return true;
    } else {
        emailTextBox.style.borderColor = 'rgb(255, 0, 0)';
        return false;
    } 
}
emailTextBox.addEventListener('keyup', emailValidator);

//This event listener shows or hides the other title textbox if 'other' is selected in the dropdown
titleSelector.addEventListener('change', (e) => {
    if(e.target.value === 'other') {
        otherTitleTextBox.style.display = '';
    } else {
        otherTitleTextBox.style.display = 'none';
    }
});

//This event listener triggers when a design is chosen and then displays the shirt colors depending on which design was selected
designSelector.addEventListener('change', (e) => {
    const selectedDesign = e.target.value;
    colorDiv.style.display = '';

    if (selectedDesign === 'js puns'){
        for( let i = 0; i < colorSelectorOptions.length; i++) {
            if(colorSelectorOptions[i].value === 'cornflowerblue' || colorSelectorOptions[i].value === 'darkslategrey' || colorSelectorOptions[i].value === 'gold'){
                colorSelectorOptions[i].hidden = false;
            } else {
                colorSelectorOptions[i].hidden = true;
            }
        }
        colorSelectorOptions[1].selected = true;
    } else {
        for( let i = 0; i < colorSelectorOptions.length; i++) {
            if(colorSelectorOptions[i].value === 'tomato' || colorSelectorOptions[i].value === 'steelblue' || colorSelectorOptions[i].value === 'dimgrey'){
                colorSelectorOptions[i].hidden = false;
            } else {
                colorSelectorOptions[i].hidden = true;
            }
        }
        colorSelectorOptions[4].selected = true;
    }
});


//This event listener checks if the clicked checkbox has any matching day and time checkboxes in the same fieldset.  This was learned through the FSJS Checkboxes Warm Up
activities.addEventListener('change', (e) => {    
    const clicked = e.target;
    const clickedDayAndTime = clicked.getAttribute('data-day-and-time');
    let currentTotal = parseInt(total.textContent);
    const clickedCost = parseInt(clicked.getAttribute('data-cost'));

    if(clicked.checked) {
        currentTotal += clickedCost;
    } else {
        currentTotal -= clickedCost;
    }
    total.innerHTML = currentTotal.toString();

    for(let i = 0; i < activityCheckboxes.length; i++) {
        const checkboxDayAndTime = activityCheckboxes[i].getAttribute('data-day-and-time');

        if(clickedDayAndTime === checkboxDayAndTime && clicked !== activityCheckboxes[i]) {

            if(clicked.checked) {
                activityCheckboxes[i].disabled = true;
                activityCheckboxes[i].parentNode.classList.add('grey-out')
            } else {
                activityCheckboxes[i].disabled = false;
                activityCheckboxes[i].parentNode.classList.remove('grey-out')
            }
        }
    }
});

//This function checks how many activities were selected then returns false and colors the legend red if none were selected.
const activitiesValidator = () => {
    let numChecked = 0;
    for (let i = 0; i < activityCheckboxes.length; i++ ) {
        if (activityCheckboxes[i].checked) {
            numChecked += 1;
        }
    }

    if (numChecked > 0) {
        activitiesTitle.style.color = 'rgba(6, 49, 68, 0.9)';
        return true;
    } else {
        activitiesTitle.style.color = 'rgb(255, 0, 0)';
        return false;
    }
}

paymentSelector.addEventListener('change', (e) => {
    const paymentType = e.target.value;

    if (paymentType === 'credit card') {
        creditCardDiv.style.display = '';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    } else if (paymentType === 'paypal') {
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = '';
        bitcoinDiv.style.display = 'none';
    }else if (paymentType === 'bitcoin') {
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = '';
    }
});

//This function validates if credit card field has between 13 and 16 numbers
const creditCardNumValidator = () => {
    const numbers = /^[0-9]+$/g;
    let value = creditCardField.value;

    if(value.match(numbers) || value === ''){
        if(value.length >= 13 && value.length <= 16){
            creditCardField.style.borderColor = 'rgb(111, 157, 220)'
            return true;
        } else {
            creditCardField.style.borderColor = 'rgb(255, 0, 0)';
            return false;
        }
    } else {
        creditCardField.value = value.slice(0, -1);
    }
}
creditCardField.addEventListener('keyup', creditCardNumValidator);

//This function validates if zipcode field has 5 numbers
const zipNumValidator = () => {
    const numbers = /^[0-9]+$/g;
    let value = zipField.value;

    if(value.match(numbers) || value === ''){
        if(value.length === 5){
            zipField.style.borderColor = 'rgb(111, 157, 220)'
            return true;
        } else {
            zipField.style.borderColor = 'rgb(255, 0, 0)';
            return false;
        }
    } else {
        zipField.value = value.slice(0, -1);
    }
}
zipField.addEventListener('keyup', zipNumValidator);

//This function validates if cvv field has 3 numbers
const ccvNumValidator = () => {
    const numbers = /^[0-9]+$/g;
    let value = cvvField.value;

    if(value.match(numbers) || value === ''){
        if(value.length === 3){
            cvvField.style.borderColor = 'rgb(111, 157, 220)'
            return true;
        } else {
            cvvField.style.borderColor = 'rgb(255, 0, 0)';
            return false;
        }
    } else {
        cvvField.value = value.slice(0, -1);
    }
}
cvvField.addEventListener('keyup', ccvNumValidator);

form.addEventListener('submit', (e) => {
    if(!nameValidator()) {
        e.preventDefault();
    }
    if(!emailValidator()) {
        e.preventDefault();
    }
    if(!activitiesValidator()) {
        e.preventDefault();
    }
    if(!creditCardNumValidator()) {
        e.preventDefault();
    }
    if(!zipNumValidator()) {
        e.preventDefault();
    }
    if(!ccvNumValidator()) {
        e.preventDefault();
    }
});

//Initial Page Load set up below
function init() {
    colorDiv.style.display = 'none';
    designSelector.firstElementChild.hidden = true;
    paymentSelector.firstElementChild.hidden = true;
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
    nameTextBox.focus();
    otherTitleTextBox.style.display = 'none';
}

init();