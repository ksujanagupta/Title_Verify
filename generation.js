
// List of disallowed words
const disallowedWords = ["Police", "Crime", "Corruption", "CBI", "CID", "Army", "The", "News", "Samachar"];

// Sample existing titles
const existingTitles = ["Hindu Indian Express", "Samachar Times", "India News", "Daily Chronicle", "Morning Times"];

// Extract important keywords and form a meaningful title
function generateTitleFromPrompt(prompt) {
    // Basic validation for minimum length of the prompt
    if (!prompt || prompt.length < 6) {
        return { valid: false, message: "Prompt is too short. Please try again with a longer phrase." };
    }

    // Step 1: Extract significant words from the prompt
    let keywords = extractKeywords(prompt);

    // Step 2: Remove disallowed words
    keywords = keywords.filter(word => !disallowedWords.includes(word));

    // Step 3: Rebuild the title (for example, 'Project Expression Tracker')
    let generatedTitle = reorderForTitle(keywords);

    // Step 4: If the title is less than 6 characters or empty, reject it
    if (generatedTitle.length < 6) {
        return { valid: false, message: "Generated title is too short after filtering disallowed words. Please try again." };
    }

    // Step 5: Check if the generated title matches any existing title
    if (existingTitles.includes(generatedTitle)) {
        return { valid: false, message: "Generated title already exists. Please try again." };
    }

    // Step 6: Return the valid title
    return { valid: true, title: generatedTitle };
}

// Function to extract significant keywords from the prompt
function extractKeywords(prompt) {
    // Define words to ignore (common English words)
    const ignoreWords = ["i", "want", "a", "for", "my", "project", "the", "title", "this","create","generate","lets","build","is"];
    
    // Convert the prompt to lowercase, split into words, and filter out ignored words
    let words = prompt.toLowerCase().split(" ");
    let keywords = words.filter(word => !ignoreWords.includes(word));
    
    // Capitalize the first letter of each keyword (e.g., "expression" => "Expression")
    return keywords.map(word => word.charAt(0).toUpperCase() + word.slice(1));
}

// Function to reorder extracted keywords to form a meaningful title
function reorderForTitle(keywords) {
    // Check if 'Project' is one of the keywords and move it to the front
    let projectIndex = keywords.indexOf("Project");
    if (projectIndex !== -1) {
        // Move "Project" to the front
        keywords.splice(projectIndex, 1);
        return "Project " + keywords.join(" ");
    } else {
        // If "Project" isn't present, prepend "Project" to the title
        return "Project " + keywords.join(" ");
    }
}

// Event listener for form submission
document.getElementById('titleGenForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userPrompt = document.getElementById('promptInput').value.trim();

    // Call the title generation logic
    const result = generateTitleFromPrompt(userPrompt);

    // Display feedback based on the result
    if (result.valid) {
        document.getElementById('suggestion').style.display = 'block';
        document.getElementById('suggestion').innerHTML = "Generated Title: " + result.title;
    } else {
        document.getElementById('suggestion').style.display = 'none';
        alert(result.message);
    }
});

