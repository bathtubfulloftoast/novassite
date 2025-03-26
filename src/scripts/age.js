document.addEventListener('DOMContentLoaded', async function() {
    const birthTimestamp = 1181368800 * 1000; // Convert Unix timestamp to milliseconds
    const currentTimestamp = Date.now();

    // Calculate the difference in milliseconds
    const timeDifference = currentTimestamp - birthTimestamp;

    // Convert milliseconds to years
    const years = timeDifference / (1000 * 60 * 60 * 24 * 365.25); // Approximate years (365.25 to account for leap years)

// Display the age
const currentAge = `${Math.floor(years)} year`;
const ageElement = document.getElementById("age");

if (ageElement) {
    ageElement.innerHTML = currentAge; // Update the element if it exists
} else {
    console.error('Element with ID "age" not found.');
}
});
