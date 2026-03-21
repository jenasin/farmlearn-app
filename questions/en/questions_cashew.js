// Cashew Cultivation Questions - English
const cashewQuestions = {
    "cashew_level1": [
        {
            question: "What type of crop is cashew?",
            options: [
                { text: "A perennial tree crop", isCorrect: true, icon: "🌳" },
                { text: "A seasonal crop", isCorrect: false, icon: "🌾" },
                { text: "A vegetable", isCorrect: false, icon: "🥬" },
                { text: "Grass", isCorrect: false, icon: "🌿" }
            ],
            explanation: "Cashew is a tree that lives for many years."
        },
        {
            question: "Where does cashew originate from?",
            options: [
                { text: "Brazil (South America)", isCorrect: true, icon: "🇧🇷" },
                { text: "India", isCorrect: false, icon: "🇮🇳" },
                { text: "Tanzania", isCorrect: false, icon: "🇹🇿" },
                { text: "China", isCorrect: false, icon: "🇨🇳" }
            ],
            explanation: "Cashew originated in Brazil and spread worldwide."
        },
        {
            question: "Which part of cashew is edible?",
            options: [
                { text: "The nut and the apple (fruit)", isCorrect: true, icon: "🥜" },
                { text: "Leaves only", isCorrect: false, icon: "🍃" },
                { text: "Tree bark", isCorrect: false, icon: "🪵" },
                { text: "Flowers only", isCorrect: false, icon: "🌸" }
            ],
            explanation: "The cashew nut is important food, and the apple can be eaten or made into juice."
        },
        {
            question: "How many years can a cashew tree live?",
            options: [
                { text: "30-50 years", isCorrect: true, icon: "📅" },
                { text: "5-10 years", isCorrect: false, icon: "📅" },
                { text: "1-2 years", isCorrect: false, icon: "📅" },
                { text: "100+ years", isCorrect: false, icon: "📅" }
            ],
            explanation: "A cashew tree can live between 30 to 50 years with good care."
        },
        {
            question: "What climate does cashew thrive in?",
            options: [
                { text: "Warm with moderate humidity", isCorrect: true, icon: "☀️" },
                { text: "Very cold", isCorrect: false, icon: "❄️" },
                { text: "Heavy rain all year", isCorrect: false, icon: "🌧️" },
                { text: "Mountains with snow", isCorrect: false, icon: "🏔️" }
            ],
            explanation: "Cashew loves warm weather with moderate humidity."
        }
    ],
    "cashew_level2": [
        {
            question: "When is the best time to plant cashew?",
            options: [
                { text: "At the start of rainy season", isCorrect: true, icon: "🌧️" },
                { text: "Middle of dry season", isCorrect: false, icon: "☀️" },
                { text: "During extreme cold", isCorrect: false, icon: "❄️" },
                { text: "During floods", isCorrect: false, icon: "🌊" }
            ],
            explanation: "Planting at the start of rains helps seedlings get enough water."
        },
        {
            question: "What spacing is needed between cashew trees?",
            options: [
                { text: "8-10 meters", isCorrect: true, icon: "📏" },
                { text: "1-2 meters", isCorrect: false, icon: "📏" },
                { text: "50 meters", isCorrect: false, icon: "📏" },
                { text: "30 centimeters", isCorrect: false, icon: "📏" }
            ],
            explanation: "Cashew trees need 8-10 meters spacing to grow well."
        },
        {
            question: "What soil is suitable for cashew?",
            options: [
                { text: "Sandy soil with good drainage", isCorrect: true, icon: "🏖️" },
                { text: "Waterlogged soil", isCorrect: false, icon: "💧" },
                { text: "Rocky soil only", isCorrect: false, icon: "🪨" },
                { text: "Hard red soil", isCorrect: false, icon: "🧱" }
            ],
            explanation: "Cashew prefers soil that drains water well."
        },
        {
            question: "What size should the planting hole be for cashew?",
            options: [
                { text: "60cm x 60cm x 60cm", isCorrect: true, icon: "📐" },
                { text: "10cm x 10cm x 10cm", isCorrect: false, icon: "📐" },
                { text: "2m x 2m x 2m", isCorrect: false, icon: "📐" },
                { text: "5cm x 5cm x 5cm", isCorrect: false, icon: "📐" }
            ],
            explanation: "A 60cm hole on all sides gives good space for root development."
        },
        {
            question: "What should be done before planting cashew seedlings?",
            options: [
                { text: "Dig hole and add manure 2 weeks before", isCorrect: true, icon: "🕳️" },
                { text: "Burn the entire area", isCorrect: false, icon: "🔥" },
                { text: "Add lots of water", isCorrect: false, icon: "💧" },
                { text: "No preparation needed", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Good hole preparation with manure helps seedlings establish well."
        }
    ],
    "cashew_level3": [
        {
            question: "How often should cashew be watered during dry season?",
            options: [
                { text: "1-2 times per week", isCorrect: true, icon: "💧" },
                { text: "5 times every day", isCorrect: false, icon: "💧" },
                { text: "Once per month", isCorrect: false, icon: "💧" },
                { text: "No water needed", isCorrect: false, icon: "💧" }
            ],
            explanation: "Moderate watering of 1-2 times per week is best during dry season."
        },
        {
            question: "What does pruning cashew help with?",
            options: [
                { text: "Increasing yield and tree health", isCorrect: true, icon: "✂️" },
                { text: "Killing the tree", isCorrect: false, icon: "✂️" },
                { text: "Reducing yield", isCorrect: false, icon: "✂️" },
                { text: "No benefit", isCorrect: false, icon: "✂️" }
            ],
            explanation: "Pruning removes bad branches and helps the tree produce more."
        },
        {
            question: "When is the best time to prune cashew?",
            options: [
                { text: "After harvest", isCorrect: true, icon: "📅" },
                { text: "During flowering", isCorrect: false, icon: "📅" },
                { text: "During fruiting", isCorrect: false, icon: "📅" },
                { text: "During heavy rains", isCorrect: false, icon: "📅" }
            ],
            explanation: "Pruning after harvest gives the tree time to recover before next season."
        },
        {
            question: "What fertilizer is suitable for cashew?",
            options: [
                { text: "NPK and manure", isCorrect: true, icon: "🧪" },
                { text: "Salt only", isCorrect: false, icon: "🧂" },
                { text: "Motor oil", isCorrect: false, icon: "🛢️" },
                { text: "Cashew doesn't need fertilizer", isCorrect: false, icon: "🚫" }
            ],
            explanation: "A mix of NPK and manure provides all required nutrients."
        },
        {
            question: "How many years before cashew starts producing?",
            options: [
                { text: "3-5 years", isCorrect: true, icon: "📅" },
                { text: "6 months", isCorrect: false, icon: "📅" },
                { text: "20 years", isCorrect: false, icon: "📅" },
                { text: "2 weeks", isCorrect: false, icon: "📅" }
            ],
            explanation: "Cashew starts producing some yield after 3-5 years."
        }
    ]
};

window.cashewQuestions = cashewQuestions;
