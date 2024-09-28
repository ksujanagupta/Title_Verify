<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title Generation</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css"> <!-- Change 'styles.css' to your actual CSS file name -->
    <style>
        body {
            background-color: #f8f9fa;
        }
        .container {
            margin-top: 50px;
        }
        .navbar-brand {
            font-weight: bold;
        }
        .btn-home {
            margin-top: 30px;
        }
        .suggestion-box {
            margin-top: 20px;
        }
    </style>
</head>
<body>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Title Verification System</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About Us</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Learn More</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">FAQs</a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Title Generation Form -->
    <div class="container text-center">
        <h1>Title Generation</h1>
        <p class="lead">Enter a prompt for title generation:</p>

        <form id="titleGenForm">
            <div class="form-group">
                <input type="text" id="promptInput" class="form-control" placeholder="Enter Prompt" required>
            </div>
            <button type="submit" class="btn btn-primary">Generate Title</button>
        </form>

        <!-- Feedback for generated title -->
        <div id="suggestion" class="suggestion-box alert alert-info mt-3" style="display: none;"></div>

        <!-- Home Button -->
        <a href="index.html" class="btn btn-secondary btn-home">Home</a>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="generation.js"></script>
</body>
</html>.....
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
