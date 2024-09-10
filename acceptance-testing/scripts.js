// Function to process the acceptance test
function processAcceptanceTest() {
    const result = document.getElementById('testResult').value;

    if (result === "pass") {
        return "The product works as expected. It is accepted!";
    } else if (result === "fail") {
        return "The product has problems. It is rejected.";
    } else {
        return "Please select a result.";
    }
}

// Handle the user's choice
document.getElementById('acceptanceButton').addEventListener('click', function() {
    const feedback = processAcceptanceTest();
    const feedbackElement = document.getElementById('acceptanceFeedback');
    feedbackElement.textContent = feedback;

    // Add animation for better user feedback
    gsap.fromTo(feedbackElement, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
});

// GSAP Animations for Page Load
window.onload = function() {
    gsap.fromTo('#pageTitle', { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    gsap.fromTo('#pageSubtitle', { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2 });
    gsap.fromTo('#introTitle', { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, delay: 0.5 });
    gsap.fromTo('#introText', { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.8 });
    gsap.fromTo('#interactiveSection', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, delay: 1 });
}
