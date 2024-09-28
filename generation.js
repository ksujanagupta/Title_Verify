// List of disallowed words
const disallowedWords = ["Police", "Crime", "Corruption", "CBI", "CID", "Army", "The", "News", "Samachar"];

// Sample existing titles
const existingTitles = ["Hindu Indian Express", "Samachar Times", "India News", "Daily Chronicle", "Morning Times"];

// Simple synonym map for word replacement
const synonymMap = {
    "Tracker": ["Monitor", "Log", "Recorder"],
    "Expression": ["Emotion", "Sentiment", "Statement"],
    "System": ["Network", "Platform", "Service"],
    "Generation": ["Creation", "Formation", "Production"],
    "Title": ["Heading", "Name", "Label"]
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

    // Step 4: Rebuild the title with random ordering
    let generatedTitle = reorderForTitle(keywords);

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
    const ignoreWords = ["i", "want", "a", "for", "my", "project", "the", "title", "this", "create", "generate", "lets", "build", "is"];
    
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

// Function to reorder extracted keywords to form a meaningful title
function reorderForTitle(keywords) {
    // Randomly shuffle the keywords for more varied title generation
    for (let i = keywords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [keywords[i], keywords[j]] = [keywords[j], keywords[i]];
    }
    // Return the shuffled keywords as the title
    return keywords.join(" ");
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
