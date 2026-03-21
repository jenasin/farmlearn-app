// Tomato Questions - English
const tomatoQuestions = {
    "tomato_level1": [
        {
            question: "How much sunlight do tomatoes need?",
            options: [
                { text: "6-8 hours of sun per day", isCorrect: true, icon: "☀️" },
                { text: "Darkness only", isCorrect: false, icon: "🌙" },
                { text: "Only 1 hour", isCorrect: false, icon: "☀️" },
                { text: "They don't need sun", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Tomatoes need adequate sunlight - 6 to 8 hours per day."
        },
        {
            question: "How are tomatoes planted?",
            options: [
                { text: "First in nursery, then transplanted", isCorrect: true, icon: "🌱" },
                { text: "Directly in field without nursery", isCorrect: false, icon: "🌱" },
                { text: "In water", isCorrect: false, icon: "💧" },
                { text: "On rocks", isCorrect: false, icon: "🪨" }
            ],
            explanation: "Tomatoes are started in nursery then transplanted to the field."
        },
        {
            question: "What spacing is needed between tomato plants?",
            options: [
                { text: "45-60 centimeters", isCorrect: true, icon: "📏" },
                { text: "5 centimeters", isCorrect: false, icon: "📏" },
                { text: "10 meters", isCorrect: false, icon: "📏" },
                { text: "1 millimeter", isCorrect: false, icon: "📏" }
            ],
            explanation: "45-60 centimeter spacing gives tomatoes good room to grow."
        },
        {
            question: "How should tomatoes be watered?",
            options: [
                { text: "Regularly but not excessively", isCorrect: true, icon: "💧" },
                { text: "Lots of water every day", isCorrect: false, icon: "💧" },
                { text: "They don't need water", isCorrect: false, icon: "🚫" },
                { text: "Once per month", isCorrect: false, icon: "💧" }
            ],
            explanation: "Moderate watering is best - too much water causes diseases."
        },
        {
            question: "How many weeks before tomatoes start producing?",
            options: [
                { text: "8-12 weeks after transplanting", isCorrect: true, icon: "📅" },
                { text: "3 days", isCorrect: false, icon: "📅" },
                { text: "2 years", isCorrect: false, icon: "📅" },
                { text: "1 week", isCorrect: false, icon: "📅" }
            ],
            explanation: "Tomatoes start producing fruit 8 to 12 weeks after transplanting."
        }
    ],
    "tomato_level2": [
        {
            question: "How does blight disease affect tomatoes?",
            options: [
                { text: "Leaves and fruits rot", isCorrect: true, icon: "🍂" },
                { text: "Yields increase", isCorrect: false, icon: "📈" },
                { text: "Leaves become greener", isCorrect: false, icon: "🟢" },
                { text: "More flowers", isCorrect: false, icon: "🌸" }
            ],
            explanation: "Blight causes leaves and fruits to rot and spoil."
        },
        {
            question: "How does staking help tomatoes?",
            options: [
                { text: "Supports plants and prevents diseases", isCorrect: true, icon: "🌿" },
                { text: "Reduces yield", isCorrect: false, icon: "❌" },
                { text: "Attracts pests", isCorrect: false, icon: "🐛" },
                { text: "No benefit", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Stakes help tomatoes stand upright and prevent soil diseases."
        },
        {
            question: "What fertilizer is suitable for tomatoes?",
            options: [
                { text: "NPK and manure", isCorrect: true, icon: "🧪" },
                { text: "Salt only", isCorrect: false, icon: "🧂" },
                { text: "Oil", isCorrect: false, icon: "🛢️" },
                { text: "Tomatoes don't need fertilizer", isCorrect: false, icon: "🚫" }
            ],
            explanation: "NPK and manure provide all nutrients tomatoes need."
        },
        {
            question: "How does pruning help tomatoes?",
            options: [
                { text: "Increases fruit size", isCorrect: true, icon: "✂️" },
                { text: "Reduces fruits", isCorrect: false, icon: "❌" },
                { text: "Kills the plant", isCorrect: false, icon: "🔥" },
                { text: "No benefit", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Pruning directs energy to fruits, making them larger."
        },
        {
            question: "Which pests attack tomatoes?",
            options: [
                { text: "Aphids, whiteflies, and caterpillars", isCorrect: true, icon: "🐛" },
                { text: "Elephants", isCorrect: false, icon: "🐘" },
                { text: "Fish", isCorrect: false, icon: "🐟" },
                { text: "Lions", isCorrect: false, icon: "🦁" }
            ],
            explanation: "Small insects like aphids and caterpillars are dangerous to tomatoes."
        }
    ],
    "tomato_level3": [
        {
            question: "How do you know when tomatoes are ripe?",
            options: [
                { text: "Red or yellow color depending on variety", isCorrect: true, icon: "🍅" },
                { text: "Green color", isCorrect: false, icon: "🟢" },
                { text: "Blue color", isCorrect: false, icon: "🔵" },
                { text: "Black color", isCorrect: false, icon: "⚫" }
            ],
            explanation: "Ripe tomatoes become red or yellow depending on the variety."
        },
        {
            question: "How should tomatoes be stored?",
            options: [
                { text: "In a cool, dry place", isCorrect: true, icon: "🌡️" },
                { text: "In direct sunlight", isCorrect: false, icon: "☀️" },
                { text: "In water", isCorrect: false, icon: "💧" },
                { text: "Near fire", isCorrect: false, icon: "🔥" }
            ],
            explanation: "Tomatoes should be stored in a cool, dry place."
        },
        {
            question: "How is bacterial wilt spread?",
            options: [
                { text: "Through contaminated soil and water", isCorrect: true, icon: "🦠" },
                { text: "By sunshine", isCorrect: false, icon: "☀️" },
                { text: "By moonlight", isCorrect: false, icon: "🌙" },
                { text: "It doesn't spread", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Bacteria spread through contaminated soil and water."
        },
        {
            question: "How does a greenhouse help tomatoes?",
            options: [
                { text: "Controls climate and pests", isCorrect: true, icon: "🏠" },
                { text: "Reduces yield", isCorrect: false, icon: "❌" },
                { text: "Causes excessive heat", isCorrect: false, icon: "🔥" },
                { text: "No benefit", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Greenhouse helps control environment and protect against pests."
        },
        {
            question: "What causes blossom end rot?",
            options: [
                { text: "Calcium deficiency", isCorrect: true, icon: "🧪" },
                { text: "Too much water", isCorrect: false, icon: "💧" },
                { text: "Too much sun", isCorrect: false, icon: "☀️" },
                { text: "Strong wind", isCorrect: false, icon: "🌬️" }
            ],
            explanation: "Calcium deficiency causes the bottom of tomatoes to rot."
        }
    ]
};

window.tomatoQuestions = tomatoQuestions;
