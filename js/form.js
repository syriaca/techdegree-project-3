const nameInput = document.getElementById('name');
const basicInfoFieldset = document.getElementById('basic-info');
const selectTitle =  document.getElementById('title');
const otherTitleInput = document.getElementById('other-title');
const selectDesign = document.getElementById('design');
const selectColor = document.getElementById('color');
const colorOption = document.querySelectorAll('#color option');
const paymentSelect = document.getElementById('payment');
const paymentSelectOption = document.querySelectorAll("#payment option");
const paypalDisclaimer = document.getElementById('paypal');
const bitcoinDisclaimer = document.getElementById('bitcoin');
const creditCardForm = document.getElementById('credit-card');
const colorDropdownMenu = document.getElementById('colors-js-puns');
const activitiesFieldset = document.querySelector('.activities');
const activitiesLabel = document.querySelectorAll('.activities label');
const activitiesCheckboxes = document.querySelectorAll('.activities input[type="checkbox"]');
const submitFormButton = document.querySelector('button[type="submit"]');
const name = document.getElementById('name');
const email = document.getElementById('mail');
const creditCardOption = document.querySelector('#payment option[value="credit card"]');
const ccNumber = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const punsOptionArray = [];
const heartOptionArray = [];
const checkedBoxes = [];
let total = 0;

// Regular expression
const activityNameRegEx = /(?:[^\—]*)/ig;
const activityDayRegEx = /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/ig;
const activityStartingHourRegEx = /(.am-)|(.pm-)/ig;
const activityEndingHourRegEx = /(-.*\pm)/ig;
const activityPriceRegEx = /(?:[^\$]*)$/ig;
const validEmailRegEx = /^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/g;
const ccNumberRegEx = /\d{16}/g;
const zipRegEx = /\d{5}/g;
const cvvRegEx = /\d{3}/g;

// Function to add pricing div to HTML
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

// Function to create paymenthtml div
function paymentDiv(paymentOption){
    let paymentDivHtml = '';
    paymentDivHtml = document.createElement('div');
    paymentDivHtml.id = 'totalPrice';
}

 // Simple addition function
function add(number) {
    total += number;
    return pricingDiv(total);
 }
 
 // Simple substraction function
 function substract(number) {
     total -= number;
     return pricingDiv(total);
 }

// Function to display an error message
function errorMessage(element, text) {
    let errorMessage = document.createElement('span');
    errorMessage.className = 'error'
    errorMessage.textContent = text;
    element.previousElementSibling.appendChild(errorMessage);
}

// On document fully loaded do what's below
document.addEventListener('DOMContentLoaded', function(event) {
    let errorMessages = document.querySelectorAll('.error');
    nameInput.focus();
    const selectColorPlaceholder = document.createElement('option');
    selectColorPlaceholder.textContent = '<---- Please select a T-shirt theme';
    selectColorPlaceholder.selected = 'selected';
    selectColorPlaceholder.className = 'placeholder';
    selectColor.appendChild(selectColorPlaceholder);
    for(let i = 0; i < colorOption.length; i += 1) {
        colorOption[i].style.display = 'none';
    }
    // colorDropdownMenu.style.display = 'none';
    paypalDisclaimer.style.display = 'none';
    bitcoinDisclaimer.style.display = 'none';
    otherTitleInput.style.display = 'none';
});


 // Get activity information according regular expressions and add or substract total for activity price
for(let i = 0; i < activitiesCheckboxes.length; i += 1) {
    activitiesCheckboxes[i].addEventListener('change', (e) => {
        let activityText = e.target.parentNode.textContent;
        let activityName = activityNameRegEx.test(activityText) ? activityText.match(activityNameRegEx).toString() : '';
        let activityDay =  activityDayRegEx.test(activityText) ? activityText.match(activityDayRegEx).toString() : '';
        let activityStartingHour = activityStartingHourRegEx.test(activityText) ? activityText.match(activityStartingHourRegEx).toString() : '';
        let activityEndingHour = activityEndingHourRegEx.test(activityText) ? activityText.match(activityEndingHourRegEx).toString() : '';
        let activityPrice = activityPriceRegEx.test(activityText) ? parseInt(activityText.match(activityPriceRegEx)) : '';

        if(e.target.checked == true) {
            for(let i = 0; i < activitiesLabel.length; i += 1) {
                if(activitiesLabel[i].textContent.includes(activityStartingHour) && activitiesLabel[i].textContent.includes(activityDay) && activityStartingHour != ""){
                        activitiesLabel[i].firstChild.disabled = true;
                        activitiesLabel[i].style.color = 'gray';
                        e.target.disabled = false;
                        e.target.parentNode.style.color = '';
                }
            }
            add(activityPrice);
        } else {
            for(let i = 0; i < activitiesLabel.length; i += 1) {
                if(activitiesLabel[i].textContent.includes(activityStartingHour) && activitiesLabel[i].textContent.includes(activityDay) && activityStartingHour != ""){
                    activitiesLabel[i].style.color = '';
                    activitiesLabel[i].firstChild.disabled = false;
                }
            }
            substract(activityPrice);
        }
    });
};

// Create arrays according to color options
for(let i = 0; i < colorOption.length; i += 1) {
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
        otherTitleInput.style.display = 'block';
    } else {
        otherTitleInput.style.display = 'none';
    }
});

// Select color options event listener
selectDesign.addEventListener('click', (e) => {
    const selectedOption = e.target.selectedOptions[0].value; 

    // If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
    if(selectedOption === 'js puns') {
        for(let i = 0; i < punsOptionArray.length; i += 1) {
            punsOptionArray[i].style.display = 'block';
            punsOptionArray[0].selected = true;
        }
    } else {
        for(let i = 0; i < punsOptionArray.length; i += 1) {
            punsOptionArray[i].style.display = 'none';
        }
    }

    // If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
    if(selectedOption === 'heart js') {
        for(let i = 0; i < heartOptionArray.length; i += 1) {
            heartOptionArray[i].style.display = 'block';
            heartOptionArray[0].selected = true;
        }
    } else {
        for(let i = 0; i < heartOptionArray.length; i += 1) {
            heartOptionArray[i].style.display = 'none';
            const selectColorPlaceholder = document.querySelector(".placeholder");
            selectColorPlaceholder.style.display = 'none';
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
});

//Form validation scripting
submitFormButton.addEventListener('click', (e) => {
    let errorMessages = document.querySelectorAll('.error');
    let hasCheckedBox = false;

    if(errorMessages.length != 0) {
        errorMessages.forEach(errorMessages => {
            errorMessages.parentNode.removeChild(errorMessages);
        })
    }

    for(let i = 0; i < activitiesCheckboxes.length; i += 1) {
        if(activitiesCheckboxes[i].checked === true) {
            hasCheckedBox = true;
        }
    }

    if(name.value === '' || !email.value.match(validEmailRegEx) || hasCheckedBox === false) {
        if(name.value === '') {
            errorMessage(name, 'You must fill the name input before submitting form');
        }

        if(email.value === "") {
            errorMessage(email, 'An email adress is needed !');
        } else if(email.value.match(validEmailRegEx)) {
            errorMessage(email, 'You must fill a valid adress email');
        }

        if(hasCheckedBox === false) {            
            const fieldsetHeading = activitiesFieldset.firstElementChild;            
            let errorMessage = document.createElement('span');
            errorMessage.className = 'error'
            errorMessage.textContent = 'You must register for an activity';
            fieldsetHeading.appendChild(errorMessage);
        }
        e.preventDefault();
    }     

    if(creditCardOption.checked = true && creditCardForm.style.display != 'none') {
        if(!(ccNumber.value.match(ccNumberRegEx) && zip.value.match(zipRegEx) && cvv.value.match(cvvRegEx))) {
            if(!ccNumber.value.match(ccNumberRegEx)) {
                errorMessage(ccNumber, 'You must fill a valid credit card number');
            }
            if(!zip.value.match(zipRegEx)) {
                errorMessage(zip, 'You must fill a zip');
            }
            if(!cvv.value.match(cvvRegEx)) {
                errorMessage(cvv, 'You must fill a CVV');
            }
            e.preventDefault();
        } 
    }    
});

// Form validation scripting on keyup
email.addEventListener('keyup', (e)=> {
    if(!email.value.match(validEmailRegEx)) {
        if(!email.previousElementSibling.firstElementChild) {
            errorMessage(email, 'You must fill a valid email adress');
        }
    } else {
        if(email.previousElementSibling.firstElementChild) {
            let removeChild = email.previousElementSibling.firstElementChild;
            email.previousElementSibling.removeChild(removeChild);
        }
    }
});





