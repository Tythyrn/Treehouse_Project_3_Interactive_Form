/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
*/
const titleSelector = document.getElementById('title');
const otherTitleTextBox = document.getElementById('other-title');
const nameTextBox = document.getElementById('name');
const designSelector = document.getElementById('design');
const colorDiv = document.getElementById('shirt-colors');
const colorSelectorOptions = document.getElementById('color').children;
const activities = document.querySelector('.activities');
const activityCheckboxes = document.querySelectorAll('.activities input');

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
activities.addEventListener('click', (e) => {    
    const clicked = e.target;
    const clickedDayAndTime = clicked.getAttribute('data-day-and-time');

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

//Initial Page Load set up below
function init() {
    colorDiv.style.display = 'none';
    designSelector.firstElementChild.hidden = true;
    nameTextBox.focus();
    otherTitleTextBox.style.display = 'none';
}

init();