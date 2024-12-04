const profileIcon = document.getElementById("profileIcon");
const profileModal = document.getElementById("profileModal");
const closeModal = document.getElementById("closeModal");
const profileForm = document.getElementById("profileForm");
const profilePicInput = document.getElementById("profilePic");
const profilePicPreview = document.createElement("img");

// Show modal when profile icon is clicked
profileIcon.addEventListener("click", () => {
    profileModal.style.display = "block";
});

// Close modal when the close button is clicked
closeModal.addEventListener("click", () => {
    profileModal.style.display = "none";
});

// Handle image preview on profile picture input
profilePicInput.addEventListener("change", () => {
    const file = profilePicInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePicPreview.src = e.target.result;
            profilePicPreview.style.width = "100%";
            profilePicPreview.style.height = "100%";
            profilePicPreview.style.objectFit = "cover";
            // Replace profile icon in modal with the uploaded image
            document.getElementById("profileIcon").innerHTML = "";
            document.getElementById("profileIcon").appendChild(profilePicPreview);
        };
        reader.readAsDataURL(file);
    }
});

// Save form data
profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const phone = document.getElementById("phone").value;
    const profilePic = document.getElementById("profilePic").files[0];

    console.log("Name:", name);
    console.log("DOB:", dob);
    console.log("Phone:", phone);
    console.log("Profile Picture:", profilePic);

    // Optionally, show success message
    showSuccessMessage();
    profileModal.style.display = "none";
});

// Show success message after profile form submission
document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Show success message inside the form
    const saveMessage = document.getElementById('saveMessage');
    saveMessage.classList.remove('hidden'); // Show success message

    // Optionally, hide the form or reset it
    const profileModal = document.getElementById('profileModal');
    profileModal.style.display = 'none'; // Hide profile modal

    // Reset the form (if needed)
    this.reset(); // Reset form fields

    // You can add additional logic to save profile data here if needed
});

// Optionally hide the success message after a few seconds
setTimeout(() => {
    document.getElementById('saveMessage').classList.add('hidden');
}, 3000);

// Close modal if clicked outside
window.addEventListener("click", (event) => {
    if (event.target === profileModal) {
        profileModal.style.display = "none";
    }
});

// Start Button Redirection
document.getElementById("start-button").addEventListener("click", function () {
    // Redirect to the desired HTML page
    window.location.href = "game.html";
});
