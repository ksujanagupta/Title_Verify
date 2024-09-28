// List of disallowed words
const disallowedWords = ["Police", "Crime", "Corruption", "CBI", "CID", "Army", "The", "News", "Samachar"];

// Sample existing titles
const existingTitles = ["Hindu Indian Express", "Samachar Times", "India News", "Daily Chronicle", "Morning Times"];

// Simple synonym map for word replacement based on context
const synonymMap = {
    "India": ["Hindustan", "Bharat"],
    "Newspaper": ["Chronicle", "Times", "Journal", "Herald"],
    "Mars": ["Fourth Planet", "Red Planet", "Ares"],
    "Project": ["Task", "Assignment", "Endeavor"],
    "Morning": ["Dawn", "Daybreak", "Sunrise"]
};

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

    // Step 3: Replace words with synonyms where applicable
    keywords = replaceWithSynonyms(keywords);

    // Step 4: Identify the context and adjust the title generation logic accordingly
    let context = identifyContext(keywords);
    let generatedTitle = reorderForTitle(keywords, context);

    // Step 5: If the title is less than 6 characters or empty, reject it
    if (generatedTitle.length < 6) {
        return { valid: false, message: "Generated title is too short after filtering disallowed words. Please try again." };
    }

    // Step 6: Check if the generated title matches any existing title
    if (existingTitles.includes(generatedTitle)) {
        return { valid: false, message: "Generated title already exists. Please try again." };
    }

    // Step 7: Return the valid title
    return { valid: true, title: generatedTitle };
}

// Function to extract significant keywords from the prompt
function extractKeywords(prompt) {
    // Define words to ignore (common English words)
    const ignoreWords = ["i", "want", "a", "for", "my", "the", "title", "this", "create", "generate", "lets", "build", "is"];
    
    // Convert the prompt to lowercase, split into words, and filter out ignored words
    let words = prompt.toLowerCase().split(" ");
    let keywords = words.filter(word => !ignoreWords.includes(word));
    
    // Capitalize the first letter of each keyword (e.g., "expression" => "Expression")
    return keywords.map(word => word.charAt(0).toUpperCase() + word.slice(1));
}

// Function to replace certain words with synonyms
function replaceWithSynonyms(keywords) {
    return keywords.map(word => {
        if (synonymMap[word]) {
            // Randomly select a synonym
            let synonyms = synonymMap[word];
            return synonyms[Math.floor(Math.random() * synonyms.length)];
        }
        return word;
    });
}

// Function to identify context (newspaper, project, etc.)
function identifyContext(keywords) {
    // Check for keywords that indicate context
    if (keywords.includes("Newspaper") || keywords.includes("Times") || keywords.includes("Chronicle")) {
        return "newspaper";
    } else if (keywords.includes("Project") || keywords.includes("Task")) {
        return "project";
    } else if (keywords.includes("Mars") || keywords.includes("Planet")) {
        return "mars";
    }
    // Default to a general context
    return "general";
}

// Function to reorder extracted keywords to form a meaningful title based on context
function reorderForTitle(keywords, context) {
    if (context === "newspaper") {
        // Example: For a newspaper, we might use "India Morning" or "Morning Times"
        if (keywords.includes("India")) {
            return "India " + (keywords.includes("Morning") ? "Morning" : "Times");
        } else {
            return keywords.join(" ") + " Times";
        }
    } else if (context === "project") {
        // Example: For a project, we can create titles like "Fourth Planet Exploration"
        let projectIndex = keywords.indexOf("Project");
        if (projectIndex !== -1) {
            keywords.splice(projectIndex, 1); // Remove "Project"
        }
        return keywords.join(" ");
    } else if (context === "mars") {
        return "Project " + keywords.join(" ");
    } else {
        // Default case: General context, just return the keywords
        return keywords.join(" ");
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
