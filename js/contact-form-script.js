// Contact Form Submission Validation

// Get all the form fields, submit button element and message elements
let contactNameField = document.querySelector('#contact-name-field');
let contactEmailField = document.querySelector('#contact-email-field');
let contactMessageField = document.querySelector('#contact-message-field');
let contactSubmitBtn = document.querySelector('#contact-submit-btn');

let contactNameMessage = document.querySelector('#contact-name-message');
let contactEmailMessage = document.querySelector('#contact-email-message');
let contactMessageMessage = document.querySelector('#contact-message-message');
let contactSubmitMessage = document.querySelector('#contact-submit-message');

// Track validity of each field
let contactNameFieldValid = false;
let contactEmailFieldValid = false;
let contactMessageFieldValid = false;

// Initialize form fields and button state
contactNameField.value = "";
contactEmailField.value = "";
contactMessageField.value = "";
contactEmailField.setAttribute('placeholder', 'youremail@example.com');
contactSubmitBtn.disabled = true;

// Name Validation 

contactNameField.addEventListener('input', (e) => {
  contactNameMessage.style.color = 'red';
  contactNameFieldValid = false;
  if (e.target.value === "") {
    // Empty username
    contactNameMessage.textContent = "Please provide a name";
    contactSubmitBtn.setAttribute("disabled", true);
  } else if (e.target.value.length < 3) {
    // Username too short
    contactNameMessage.textContent = "Please provide a name with more than 2 characters";
  } else {
    // Username valid
    contactNameMessage.style.color = 'green';
    contactNameMessage.textContent = "Name looks good";
    contactNameFieldValid = true;
  }
  contactSubmitBtn.disabled = !(contactNameFieldValid && contactEmailFieldValid && contactMessageFieldValid);
});

//  Email validation 
contactEmailField.addEventListener('input', (e) => {
  contactEmailMessage.style.color = 'red';
  contactEmailFieldValid = false;
  if (e.target.value === "") {
    // Empty email
    contactEmailMessage.textContent = "Please provide your email";
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
    // Invalid email format
    contactEmailMessage.textContent = "Please provide a valid email";
  } else {
    // Email valid
    contactEmailMessage.style.color = 'green';
    contactEmailMessage.textContent = "Email looks good.";
    contactEmailFieldValid = true;
  }
  contactSubmitBtn.disabled = !(contactNameFieldValid && contactEmailFieldValid && contactMessageFieldValid);
});

// Message Validation
contactMessageField.addEventListener('input', (e) => {
    contactMessageMessage.style.color = 'red';
    contactMessageFieldValid = false;
    if (e.target.value == "" || e.target.value.length < 5) {
        // Empty Message Field
        contactMessageMessage.textContent = "Please type in your message";
    } else {
        // Message is valid
        contactMessageMessage.style.color = 'green';
        contactMessageMessage.textContent = 'Message looks good.'
        contactMessageFieldValid = true;
    }
    contactSubmitBtn.disabled = !(contactNameFieldValid && contactEmailFieldValid && contactMessageFieldValid);
});

// Handle form submission

document.getElementById("user-contact-form").addEventListener('submit', 
    async function(e) {
        e.preventDefault(); 
        console.log("Submitting");
        if (contactNameFieldValid && contactEmailFieldValid && contactMessageFieldValid) { // If all field contents are valid            
            const form = e.target;
            const formData = new FormData(form);  // Obtain data from form
            

            try {
                // Submit data
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {   // If message submission successful
                    contactSubmitMessage.style.color = "green";
                    contactSubmitMessage.textContent = "Message sent successfully!"
                    form.reset();
                } else {        // If message submission is not successful
                    contactSubmitMessage.style.color = "red";
                    contactSubmitMessage.textContent = `Error: {data.message}`;
                } 
            } catch(error) {
                contactSubmitMessage.style.color = "red";
                    contactSubmitMessage.textContent = "Network error. Please try again.";
            }
        }
    }
)

