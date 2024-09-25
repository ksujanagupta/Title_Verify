document.getElementById('titleForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const titleInput = document.getElementById('titleInput').value.trim().toLowerCase();
    const disallowedWords = ['police', 'crime', 'corruption', 'cbi', 'cid', 'army'];
    const prefixesSuffixes = ['the', 'india', 'samachar', 'news'];
    const existingTitles = ['hindu', 'indian express']; // Example of existing titles in the database
    
    let feedback = '';
    let probabilityScore = 100;
    let isTitleCorrect = true;
    let cleanedTitle = titleInput; // Variable to hold the suggested cleaned version of the title

    // Check for minimum length of 6 characters
    if (titleInput.length < 6) {
        feedback = 'The title is too short. It must be at least 6 characters long.';
        probabilityScore = 0;
        isTitleCorrect = false;
        document.getElementById('feedback').className = 'alert alert-danger'; // Red background
        document.getElementById('feedback').innerText = feedback;
        document.getElementById('probability').innerText = `Verification Probability: ${probabilityScore}%`;
        document.getElementById('suggestion').innerHTML = ''; // No suggestion in this case
        document.getElementById('probabilityBar').style.width = `${probabilityScore}%`;
        document.getElementById('probabilityBar').ariaValueNow = probabilityScore;
        return; // Stop further checks if the title is too short
    }

    // Remove disallowed words from the title
    for (let word of disallowedWords) {
        if (cleanedTitle.includes(word)) {
            feedback = `The title contains a disallowed word: "${word}"`;
            probabilityScore = 0;
            isTitleCorrect = false;
            cleanedTitle = cleanedTitle.replace(word, '').trim();
        }
    }

    // Remove disallowed prefixes or suffixes from the title
    for (let ps of prefixesSuffixes) {
        if (cleanedTitle.startsWith(ps)) {
            feedback = `The title contains a disallowed prefix: "${ps}"`;
            probabilityScore -= 20;
            isTitleCorrect = false;
            cleanedTitle = cleanedTitle.replace(ps, '').trim();
        }
        if (cleanedTitle.endsWith(ps)) {
            feedback = `The title contains a disallowed suffix: "${ps}"`;
            probabilityScore -= 20;
            isTitleCorrect = false;
            cleanedTitle = cleanedTitle.replace(ps, '').trim();
        }
    }

    // Remove existing titles from the string
    for (let existingTitle of existingTitles) {
        if (cleanedTitle.includes(existingTitle)) {
            feedback = `The title is too similar to an existing title: "${existingTitle}"`;
            probabilityScore -= 30;
            isTitleCorrect = false;
            cleanedTitle = cleanedTitle.replace(existingTitle, '').trim();
        }
    }

    // Provide feedback based on the cleaned title and verification probability
    if (isTitleCorrect && probabilityScore > 70) {
        feedback = 'The title is correct and unique!';
        document.getElementById('feedback').className = 'alert alert-success'; // Green background
    } else {
        if (!feedback) {
            feedback = 'The title violates guidelines or is too similar to an existing one.';
        }
        document.getElementById('feedback').className = 'alert alert-danger'; // Red background
    }

    // Display feedback and probability score
    document.getElementById('feedback').innerText = feedback;
    document.getElementById('probability').innerText = `Verification Probability: ${probabilityScore}%`;

    // If the cleaned title is less than 6 characters, ask the user to "Try again"
    if (cleanedTitle.length < 6) {
        document.getElementById('suggestion').innerHTML = 'Try again. ';
    } else if (cleanedTitle !== titleInput) {
        // Show suggested cleaned title if parts were removed and it's longer than 6 characters
        document.getElementById('suggestion').innerHTML = `Suggested Title: <strong>${cleanedTitle}</strong>`;
    } else {
        document.getElementById('suggestion').innerHTML = '';
    }

    // Update the progress bar dynamically
    document.getElementById('probabilityBar').style.width = `${probabilityScore}%`;
    document.getElementById('probabilityBar').ariaValueNow = probabilityScore;
});
