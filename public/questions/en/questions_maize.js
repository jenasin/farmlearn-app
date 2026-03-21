// Maize/Corn Questions - English
const maizeQuestions = {
    "maize_level1": [
        {
            question: "What type of soil does maize need?",
            options: [
                { text: "Fertile soil with good drainage", isCorrect: true, icon: "🌱" },
                { text: "Rocky soil", isCorrect: false, icon: "🪨" },
                { text: "Dry sandy soil", isCorrect: false, icon: "🏜️" },
                { text: "Waterlogged soil", isCorrect: false, icon: "💧" }
            ],
            explanation: "Maize needs fertile soil that drains water well."
        },
        {
            question: "When is the best time to plant maize?",
            options: [
                { text: "At the start of rainy season", isCorrect: true, icon: "🌧️" },
                { text: "Middle of dry season", isCorrect: false, icon: "☀️" },
                { text: "During extreme cold", isCorrect: false, icon: "❄️" },
                { text: "At night in darkness", isCorrect: false, icon: "🌙" }
            ],
            explanation: "Planting at the start of rains provides enough water for maize."
        },
        {
            question: "What spacing is needed between maize rows?",
            options: [
                { text: "75-90 centimeters", isCorrect: true, icon: "📏" },
                { text: "10 centimeters", isCorrect: false, icon: "📏" },
                { text: "5 meters", isCorrect: false, icon: "📏" },
                { text: "5 millimeters", isCorrect: false, icon: "📏" }
            ],
            explanation: "75-90 centimeter spacing gives maize good room to grow."
        },
        {
            question: "How much rainfall does maize need?",
            options: [
                { text: "500-800 millimeters per season", isCorrect: true, icon: "💧" },
                { text: "Only 50 millimeters", isCorrect: false, icon: "💧" },
                { text: "10 meters of water", isCorrect: false, icon: "💧" },
                { text: "No water needed", isCorrect: false, icon: "💧" }
            ],
            explanation: "Maize needs adequate water - 500-800 millimeters per season."
        },
        {
            question: "How many days does maize take to mature?",
            options: [
                { text: "90-120 days", isCorrect: true, icon: "📅" },
                { text: "7 days", isCorrect: false, icon: "📅" },
                { text: "2 years", isCorrect: false, icon: "📅" },
                { text: "500 days", isCorrect: false, icon: "📅" }
            ],
            explanation: "Most maize varieties mature within 90 to 120 days."
        }
    ],
    "maize_level2": [
        {
            question: "What fertilizer is suitable for maize?",
            options: [
                { text: "DAP at planting, CAN later", isCorrect: true, icon: "🧪" },
                { text: "Salt only", isCorrect: false, icon: "🧂" },
                { text: "Motor oil", isCorrect: false, icon: "🛢️" },
                { text: "Maize doesn't need fertilizer", isCorrect: false, icon: "🚫" }
            ],
            explanation: "DAP provides phosphorus at planting, CAN provides nitrogen later."
        },
        {
            question: "When should the first weeding be done?",
            options: [
                { text: "2-3 weeks after germination", isCorrect: true, icon: "🌱" },
                { text: "After harvest", isCorrect: false, icon: "📅" },
                { text: "During heavy rain", isCorrect: false, icon: "🌧️" },
                { text: "No need to weed", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Early weeding helps maize grow without competition from weeds."
        },
        {
            question: "Which pests attack maize?",
            options: [
                { text: "Stalk borer", isCorrect: true, icon: "🐛" },
                { text: "Elephants", isCorrect: false, icon: "🐘" },
                { text: "Fish", isCorrect: false, icon: "🐟" },
                { text: "Large birds", isCorrect: false, icon: "🦅" }
            ],
            explanation: "Stalk borer is a dangerous pest for maize."
        },
        {
            question: "What are signs of nitrogen deficiency?",
            options: [
                { text: "Lower leaves turn yellow", isCorrect: true, icon: "🟡" },
                { text: "Leaves turn blue", isCorrect: false, icon: "🔵" },
                { text: "Higher yields", isCorrect: false, icon: "📈" },
                { text: "More flowers", isCorrect: false, icon: "🌸" }
            ],
            explanation: "Lower leaves turn yellow when there's nitrogen deficiency."
        },
        {
            question: "How does planting maize in rows help?",
            options: [
                { text: "Easier weeding and harvesting", isCorrect: true, icon: "✅" },
                { text: "Reduces yield", isCorrect: false, icon: "❌" },
                { text: "Attracts pests", isCorrect: false, icon: "🐛" },
                { text: "No benefit", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Rows make farm work easier and more efficient."
        }
    ],
    "maize_level3": [
        {
            question: "How do you know when maize is mature?",
            options: [
                { text: "Leaves dry out and kernels harden", isCorrect: true, icon: "🌾" },
                { text: "Leaves become greener", isCorrect: false, icon: "🟢" },
                { text: "Kernels become soft", isCorrect: false, icon: "🫘" },
                { text: "Flowers continue blooming", isCorrect: false, icon: "🌸" }
            ],
            explanation: "Maize is mature when leaves are dry and kernels are hard."
        },
        {
            question: "To what moisture level should maize be dried?",
            options: [
                { text: "Below 13%", isCorrect: true, icon: "💧" },
                { text: "50%", isCorrect: false, icon: "💧" },
                { text: "90%", isCorrect: false, icon: "💧" },
                { text: "0% completely", isCorrect: false, icon: "💧" }
            ],
            explanation: "Moisture below 13% prevents mold and pests in storage."
        },
        {
            question: "What does good maize storage require?",
            options: [
                { text: "Dry, clean store with ventilation", isCorrect: true, icon: "🏠" },
                { text: "Humid place", isCorrect: false, icon: "💧" },
                { text: "Direct sunlight", isCorrect: false, icon: "☀️" },
                { text: "Near fire", isCorrect: false, icon: "🔥" }
            ],
            explanation: "A good store is dry, clean, and has adequate ventilation."
        },
        {
            question: "Which pest damages stored maize?",
            options: [
                { text: "Weevil", isCorrect: true, icon: "🐛" },
                { text: "Elephant", isCorrect: false, icon: "🐘" },
                { text: "Fish", isCorrect: false, icon: "🐟" },
                { text: "Lion", isCorrect: false, icon: "🦁" }
            ],
            explanation: "Weevil is a dangerous pest that damages stored maize."
        },
        {
            question: "How does crop rotation help?",
            options: [
                { text: "Reduces diseases and improves soil", isCorrect: true, icon: "🔄" },
                { text: "Reduces yield", isCorrect: false, icon: "❌" },
                { text: "Increases pests", isCorrect: false, icon: "🐛" },
                { text: "No benefit", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Crop rotation helps soil recover and reduces diseases."
        }
    ]
};

window.maizeQuestions = maizeQuestions;
