/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
*/
const titleSelector = document.getElementById('title');
const otherTitleTextBox = document.getElementById('other-title');
const nameTextBox = document.getElementById('name');
const designSelector = document.getElementById('design');
const colorSelectorOptions = document.getElementById('color').children;

titleSelector.addEventListener('change', (e) => {
    if(e.target.value === 'other') {
        otherTitleTextBox.style.display = '';
    } else {
        otherTitleTextBox.style.display = 'none';
    }
});

designSelector.addEventListener('change', (e) => {
    const selectedDesign = e.target.value;

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

//Initial Page Load set up below
function init() {
    for (let i = 0; i < colorSelectorOptions.length; i++) {
        colorSelectorOptions[i].hidden = true;
    }
    
    designSelector.firstElementChild.hidden = true;
    nameTextBox.focus();
    otherTitleTextBox.style.display = 'none';
}

init();