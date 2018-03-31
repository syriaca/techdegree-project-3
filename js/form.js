const nameInput = document.getElementById('name');
const basicInfoFieldset = document.getElementById('basic-info');
const selectTitle =  document.getElementById('title');
const otherTitleInput = document.getElementById('other-title');
const selectDesign = document.getElementById('design');
const selectColor = document.getElementById('color');
const colorOption = document.querySelectorAll('#color option');
const colorDropdownMenu = document.getElementById('colors-js-puns');
const punsOptionArray = [];
const heartOptionArray = [];

// On document fully loaded do what's below
document.addEventListener("DOMContentLoaded", function(event) {
    nameInput.focus();
    const selectColorPlaceholder = document.createElement('option');
    selectColorPlaceholder.textContent = "Please select a T-shirt theme";
    selectColorPlaceholder.selected = "selected";
    selectColorPlaceholder.className = "placeholder";
    selectColor.appendChild(selectColorPlaceholder);
    for(var i = 0; i < colorOption.length; i += 1) {
        colorOption[i].style.display = 'none';
    }
    colorDropdownMenu.style.display = 'none';
})

for(var i = 0; i < colorOption.length; i += 1) {
    if(colorOption[i].textContent.includes('JS Puns')) {
        punsOptionArray.push(colorOption[i]);
    } else if (colorOption[i].textContent.includes('I ♥ JS')) {
        heartOptionArray.push(colorOption[i]);
    }
}

// Check change on title select input
selectTitle.addEventListener('change', (e) => {
    const selectedOption = e.target.selectedOptions[0].value;    
    // Detect if selected is other & display text field with id "other-title" and placeholder "Your Job Role"
    if(selectedOption === 'other') {
        otherTitleInput.className = '';
    } else {
        otherTitleInput.className = 'is-hidden';
    }
});

// Select color options
selectDesign.addEventListener('click', (e) => {
    const selectedOption = e.target.selectedOptions[0].value;  

    // Dropdown color menu is shown when a design is selected
    if(selectedOption === 'js puns' || selectedOption === 'heart js') {
        colorDropdownMenu.style.display = "block";
    } else {
        colorDropdownMenu.style.display = "none";
    }

    // If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
    if(selectedOption === 'js puns') {
        for(var i = 0; i < punsOptionArray.length; i += 1) {
            punsOptionArray[i].style.display = 'block';
        }
    } else {
        for(var i = 0; i < punsOptionArray.length; i += 1) {
            punsOptionArray[i].style.display = 'none';
        }
    }

    // If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
    if(selectedOption === 'heart js') {
        for(var i = 0; i < heartOptionArray.length; i += 1) {
            heartOptionArray[i].style.display = 'block';
        }
    } else {
        for(var i = 0; i < heartOptionArray.length; i += 1) {
            heartOptionArray[i].style.display = 'none';
        }
    }

    if(e.target.selectedOptions[0].textContent === "Select Theme") {
        const selectColorPlaceholder = document.querySelector(".placeholder");
        selectColorPlaceholder.selected = true;
    }
});







