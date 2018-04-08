const nameInput = document.getElementById('name');
const basicInfoFieldset = document.getElementById('basic-info');
const selectTitle =  document.getElementById('title');
const otherTitleInput = document.getElementById('other-title');
const selectDesign = document.getElementById('design');
const selectColor = document.getElementById('color');
const colorOption = document.querySelectorAll('#color option');
const paymentSelect = document.getElementById('payment');
const paypalDisclaimer = document.getElementById('paypal');
const bitcoinDisclaimer = document.getElementById('bitcoin');
const creditCardForm = document.getElementById('credit-card');
const colorDropdownMenu = document.getElementById('colors-js-puns');
const punsOptionArray = [];
const heartOptionArray = [];
const activitiesFieldset = document.querySelector('.activities');
const activitiesLabel = document.querySelectorAll('.activities label');
const activitiesCheckboxes = document.querySelectorAll('.activities input[type="checkbox"]');
const checkedBoxes = [];
let total = 0;

// Regular expression
const activityNameRegEx = /(?:[^\—]*)/ig;
const activityDayRegEx = /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/ig;
const activityStartingHourRegEx = /(.am-)|(.pm-)/ig;
const activityEndingHourRegEx = /(-.*\pm)/ig;
const activityPriceRegEx = /(?:[^\$]*)$/ig;

// On document fully loaded do what's below
document.addEventListener('DOMContentLoaded', function(event) {
    nameInput.focus();
    const selectColorPlaceholder = document.createElement('option');
    selectColorPlaceholder.textContent = 'Please select a T-shirt theme';
    selectColorPlaceholder.selected = 'selected';
    selectColorPlaceholder.className = 'placeholder';
    selectColor.appendChild(selectColorPlaceholder);
    for(var i = 0; i < colorOption.length; i += 1) {
        colorOption[i].style.display = 'none';
    }
    colorDropdownMenu.style.display = 'none';
    paypalDisclaimer.style.display = 'none';
    bitcoinDisclaimer.style.display = 'none';
})

function pricingDiv (total) {
    let pricingDivHtml = '';
    pricingDivHtml = document.createElement('div');
    pricingDivHtml.id = 'totalPrice';
    let pricingDivHtmlSpan = document.createElement('strong');
    pricingDivHtmlSpan.id = 'totalPriceAmount';
    pricingDivHtml.appendChild(pricingDivHtmlSpan);
    pricingDivHtmlSpan.textContent = 'Total: $'+total;  
 
    if(total > 0) {
        if (!document.getElementById('totalPrice')) {        
            activitiesFieldset.appendChild(pricingDivHtml);
        } else {
            document.getElementById('totalPriceAmount').textContent = 'Total: $'+total;            
        }
    } else {
        activitiesFieldset.removeChild(document.getElementById('totalPrice'));
    }
}

function paymentDiv(paymentOption){
    let paymentDivHtml = '';
    paymentDivHtml = document.createElement('div');
    paymentDivHtml.id = 'totalPrice';

}

function add(number) {
    total += number;
    return pricingDiv(total);
 }
 
 function substract(number) {
     total -= number;
     return pricingDiv(total);
 }

for(var i = 0; i < activitiesCheckboxes.length; i += 1) {
    activitiesCheckboxes[i].addEventListener('change', (e) => {
        let activityText = e.target.parentNode.textContent;
        let activityName = activityNameRegEx.test(activityText) ? activityText.match(activityNameRegEx).toString() : '';
        let activityDay =  activityDayRegEx.test(activityText) ? activityText.match(activityDayRegEx).toString() : '';
        let activityStartingHour = activityStartingHourRegEx.test(activityText) ? activityText.match(activityStartingHourRegEx).toString() : '';
        let activityEndingHour = activityEndingHourRegEx.test(activityText) ? activityText.match(activityEndingHourRegEx).toString() : '';
        let activityPrice = activityPriceRegEx.test(activityText) ? parseInt(activityText.match(activityPriceRegEx)) : '';

        if(e.target.checked) {
            for(var i = 0; i < activitiesLabel.length; i += 1) {
                if(activitiesLabel[i].textContent.includes(activityStartingHour) && activityStartingHour != ""){
                        activitiesLabel[i].firstChild.disabled = true;
                        activitiesLabel[i].style.color = 'gray';
                        e.target.disabled = false;
                        e.target.parentNode.style.color = '';
                }
            }
            add(activityPrice);
        } else {
            for(var i = 0; i < activitiesLabel.length; i += 1) {
                activitiesLabel[i].style.color = '';
                activitiesLabel[i].firstChild.disabled = false;
            }
            substract(activityPrice);
        }
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
        colorDropdownMenu.style.display = 'block';
    } else {
        colorDropdownMenu.style.display = 'none';
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

// Display payment sections based on the payment option chosen in the select menu
paymentSelect.addEventListener("change", (e) => {
    let option = e.target.value;
    switch(option) {
        case "paypal" :
            creditCardForm.style.display = 'none';
            paypalDisclaimer.style.display = 'block';
            break;

        case "bitcoin" :
            creditCardForm.style.display = 'none';
            paypalDisclaimer.style.display = 'none';
            bitcoin.style.display = 'block';
            break;

        default:
            creditCardForm.style.display = 'block';
            paypalDisclaimer.style.display = 'none';
            bitcoin.style.display = 'none';
            break;
    }
})





