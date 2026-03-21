// Drought & Climate Adaptation Questions - English
const droughtQuestions = {
    "drought_level1": [
        {
            question: "What is drought?",
            options: [
                { text: "A long period without enough rain", isCorrect: true, icon: "🏜️" },
                { text: "Too much rain", isCorrect: false, icon: "🌧️" },
                { text: "Heavy snow", isCorrect: false, icon: "❄️" },
                { text: "Major floods", isCorrect: false, icon: "🌊" }
            ],
            explanation: "Drought is when there is not enough rain for a long time."
        },
        {
            question: "How does drought affect crops?",
            options: [
                { text: "Plants wilt and die", isCorrect: true, icon: "🥀" },
                { text: "Plants become greener", isCorrect: false, icon: "🌿" },
                { text: "More flowers appear", isCorrect: false, icon: "🌸" },
                { text: "Yields increase", isCorrect: false, icon: "📈" }
            ],
            explanation: "Without enough water, plants wilt and eventually die."
        },
        {
            question: "What is the first sign of drought stress in plants?",
            options: [
                { text: "Leaves wilt and curl", isCorrect: true, icon: "🍂" },
                { text: "Leaves get bigger", isCorrect: false, icon: "🟢" },
                { text: "More flowers", isCorrect: false, icon: "🌸" },
                { text: "Bigger fruits", isCorrect: false, icon: "🥜" }
            ],
            explanation: "Leaves start wilting and curling when plants lack water."
        },
        {
            question: "How long can drought last?",
            options: [
                { text: "Weeks, months, or even years", isCorrect: true, icon: "📅" },
                { text: "One day only", isCorrect: false, icon: "📅" },
                { text: "One hour", isCorrect: false, icon: "📅" },
                { text: "Ten minutes", isCorrect: false, icon: "📅" }
            ],
            explanation: "Drought can last for a long time - weeks, months, or years."
        },
        {
            question: "How can farmers know drought is coming?",
            options: [
                { text: "Listen to weather forecasts", isCorrect: true, icon: "📻" },
                { text: "Listen to music", isCorrect: false, icon: "🎵" },
                { text: "Watch movies", isCorrect: false, icon: "📺" },
                { text: "No way to know", isCorrect: false, icon: "🙈" }
            ],
            explanation: "Weather forecasts help farmers know and prepare."
        }
    ],
    "drought_level2": [
        {
            question: "How does mulching help during drought?",
            options: [
                { text: "Retains moisture in the soil", isCorrect: true, icon: "💧" },
                { text: "Increases heat", isCorrect: false, icon: "🔥" },
                { text: "Brings rain", isCorrect: false, icon: "🌧️" },
                { text: "No benefit", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Mulching prevents water from evaporating quickly from soil."
        },
        {
            question: "What materials are good for mulching?",
            options: [
                { text: "Dry leaves, grass, or husks", isCorrect: true, icon: "🌿" },
                { text: "Large rocks", isCorrect: false, icon: "🪨" },
                { text: "Black plastic", isCorrect: false, icon: "🛢️" },
                { text: "Bricks", isCorrect: false, icon: "🧱" }
            ],
            explanation: "Natural materials like leaves and grass are best for mulching."
        },
        {
            question: "When is the best time to water during drought?",
            options: [
                { text: "Morning or evening", isCorrect: true, icon: "🌅" },
                { text: "At noon", isCorrect: false, icon: "☀️" },
                { text: "During peak heat", isCorrect: false, icon: "🌡️" },
                { text: "Never", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Watering morning or evening reduces water loss through evaporation."
        },
        {
            question: "How is rainwater harvesting done?",
            options: [
                { text: "Collecting water from roofs into tanks", isCorrect: true, icon: "🏠" },
                { text: "Waiting for water to fall from clouds", isCorrect: false, icon: "☁️" },
                { text: "Going swimming", isCorrect: false, icon: "🏊" },
                { text: "It's impossible", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Rainwater can be collected from roofs and stored in tanks."
        },
        {
            question: "What is the benefit of drip irrigation?",
            options: [
                { text: "Uses little water but efficiently", isCorrect: true, icon: "💧" },
                { text: "Uses lots of water", isCorrect: false, icon: "🌊" },
                { text: "Increases heat", isCorrect: false, icon: "🔥" },
                { text: "No benefit", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Drip irrigation delivers water directly to roots without waste."
        }
    ],
    "drought_level3": [
        {
            question: "Which crop tolerates drought well?",
            options: [
                { text: "Sorghum", isCorrect: true, icon: "🌾" },
                { text: "Rice", isCorrect: false, icon: "🍚" },
                { text: "Lettuce", isCorrect: false, icon: "🥬" },
                { text: "Watermelon", isCorrect: false, icon: "🍉" }
            ],
            explanation: "Sorghum can tolerate drought better than many other crops."
        },
        {
            question: "Why are cowpeas good during drought?",
            options: [
                { text: "They tolerate drought and enrich soil", isCorrect: true, icon: "🌿" },
                { text: "They need lots of water", isCorrect: false, icon: "💧" },
                { text: "They prefer cold weather", isCorrect: false, icon: "❄️" },
                { text: "They're not good", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Cowpeas tolerate drought and add nitrogen to soil."
        },
        {
            question: "Why does cassava tolerate drought?",
            options: [
                { text: "Large roots that store water", isCorrect: true, icon: "🥔" },
                { text: "Small leaves", isCorrect: false, icon: "🍃" },
                { text: "It's a tall tree", isCorrect: false, icon: "🌳" },
                { text: "It doesn't tolerate drought", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Cassava's large roots store water and nutrients."
        },
        {
            question: "What type of maize is suitable for drought areas?",
            options: [
                { text: "Early-maturing and drought-tolerant varieties", isCorrect: true, icon: "🌽" },
                { text: "Regular varieties", isCorrect: false, icon: "🌽" },
                { text: "Long-duration varieties", isCorrect: false, icon: "🌽" },
                { text: "Any variety", isCorrect: false, icon: "🌽" }
            ],
            explanation: "Early-maturing varieties finish before drought becomes severe."
        },
        {
            question: "What is the benefit of mixed cropping during drought?",
            options: [
                { text: "Reduces risk - if one fails, another survives", isCorrect: true, icon: "🌿" },
                { text: "Reduces yield", isCorrect: false, icon: "📉" },
                { text: "Attracts pests", isCorrect: false, icon: "🐛" },
                { text: "No benefit", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Mixed cropping reduces the risk of losing all crops."
        }
    ]
};

window.droughtQuestions = droughtQuestions;
