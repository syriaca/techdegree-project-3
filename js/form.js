const nameInput = document.getElementById('name');
const basicInfoFieldset = document.getElementById('basic-info');
const selectTitle =  document.getElementById('title');
const otherTitleInput = document.getElementById('other-title');

// On document fully loaded do what's below
document.addEventListener("DOMContentLoaded", function(event) {
    nameInput.focus();
})

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




