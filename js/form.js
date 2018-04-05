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
const activities = document.querySelectorAll('.activities label');
const activitiesCheckboxes = document.querySelectorAll('.activities input[type="checkbox"]');
const checkedBoxes = [];

// Regular expression
const activityNameRegEx = /(?:[^\—]*)/ig;
const activityDayRegEx = /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/ig;
const activityStartingHourRegEx = /(.am-)/ig;
const activityEndingHourRegEx = /(-.*\pm)/ig;
const activityPriceRegEx = /(?:[^\$]*)$/ig;

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

for(var i = 0; i < activitiesCheckboxes.length; i += 1) {
    activitiesCheckboxes[i].addEventListener("click", (e) => {
        let activityText = e.target.parentNode.textContent;
        let activityName = activityNameRegEx.test(activityText) ? activityText.match(activityNameRegEx) : "";
        let activityDay =  activityDayRegEx.test(activityText) ? activityText.match(activityDayRegEx) : "";
        let activityStartingHour = activityStartingHourRegEx.test(activityText) ? activityText.match(activityStartingHourRegEx) : "";
        let activityEndingHour = activityEndingHourRegEx.test(activityText) ? activityText.match(activityEndingHourRegEx) : "";
        let activityPrice = activityPriceRegEx.test(activityText) ? activityText.match(activityPriceRegEx) : "";

    console.log(e.target);

        if(e.target.checked) {
            checkedBoxes.push(activityText);
        }

        console.log(checkedBoxes);
    });
};

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







