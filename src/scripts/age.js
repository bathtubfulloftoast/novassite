document.addEventListener('DOMContentLoaded', async function() {
    const birthTimestamp = 1181368800 * 1000; // Convert Unix timestamp to milliseconds
    const currentTimestamp = Date.now();

    // Calculate the difference in milliseconds
    const timeDifference = currentTimestamp - birthTimestamp;

    // Convert milliseconds to years
    const years = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

// Display the age
const currentAge = `${Math.floor(years)} year`;
document.getElementById("age").innerHTML = currentAge; 
});
