// Beans Questions - English
const beansQuestions = {
    "beans_level1": [
        {
            question: "What type of crop are beans?",
            options: [
                { text: "A legume crop", isCorrect: true, icon: "🫘" },
                { text: "A large tree", isCorrect: false, icon: "🌳" },
                { text: "Grass", isCorrect: false, icon: "🌿" },
                { text: "Mushroom", isCorrect: false, icon: "🍄" }
            ],
            explanation: "Beans are legumes that help enrich the soil with nitrogen."
        },
        {
            question: "How do beans help the soil?",
            options: [
                { text: "They add nitrogen to the soil", isCorrect: true, icon: "🌱" },
                { text: "They burn the soil", isCorrect: false, icon: "🔥" },
                { text: "They remove all water", isCorrect: false, icon: "💧" },
                { text: "They don't help", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Beans have bacteria on their roots that convert atmospheric nitrogen into fertilizer."
        },
        {
            question: "At what depth should beans be planted?",
            options: [
                { text: "3-5 centimeters", isCorrect: true, icon: "📏" },
                { text: "1 meter", isCorrect: false, icon: "📏" },
                { text: "1 millimeter", isCorrect: false, icon: "📏" },
                { text: "50 centimeters", isCorrect: false, icon: "📏" }
            ],
            explanation: "A depth of 3-5 centimeters is ideal for beans to germinate well."
        },
        {
            question: "How many days do beans take to mature?",
            options: [
                { text: "60-90 days", isCorrect: true, icon: "📅" },
                { text: "7 days", isCorrect: false, icon: "📅" },
                { text: "3 years", isCorrect: false, icon: "📅" },
                { text: "300 days", isCorrect: false, icon: "📅" }
            ],
            explanation: "Most beans mature within 60 to 90 days."
        },
        {
            question: "What types of beans exist?",
            options: [
                { text: "Climbing and bush varieties", isCorrect: true, icon: "🫘" },
                { text: "Flying varieties only", isCorrect: false, icon: "🫘" },
                { text: "Swimming varieties", isCorrect: false, icon: "🫘" },
                { text: "Only one type", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Beans have two main types: climbing (pole) and bush varieties."
        }
    ],
    "beans_level2": [
        {
            question: "What fertilizer is best for beans?",
            options: [
                { text: "More phosphorus than nitrogen", isCorrect: true, icon: "🧪" },
                { text: "Salt only", isCorrect: false, icon: "🧂" },
                { text: "Oil", isCorrect: false, icon: "🛢️" },
                { text: "No fertilizer needed", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Beans produce their own nitrogen, so they need more phosphorus."
        },
        {
            question: "What does angular leaf spot disease affect?",
            options: [
                { text: "Leaves - creates angular spots", isCorrect: true, icon: "🍂" },
                { text: "Increases yield", isCorrect: false, icon: "📈" },
                { text: "Increases flowers", isCorrect: false, icon: "🌸" },
                { text: "Has no effect", isCorrect: false, icon: "🚫" }
            ],
            explanation: "This disease causes angular spots on leaves and reduces yields."
        },
        {
            question: "Which pests attack beans?",
            options: [
                { text: "Aphids, whiteflies, and caterpillars", isCorrect: true, icon: "🐛" },
                { text: "Elephants", isCorrect: false, icon: "🐘" },
                { text: "Fish", isCorrect: false, icon: "🐟" },
                { text: "Lions", isCorrect: false, icon: "🦁" }
            ],
            explanation: "Small insects like aphids and caterpillars are dangerous to beans."
        },
        {
            question: "How should beans be watered?",
            options: [
                { text: "Moderately - not too much or too little", isCorrect: true, icon: "💧" },
                { text: "Lots of water every day", isCorrect: false, icon: "💧" },
                { text: "They don't need water", isCorrect: false, icon: "🚫" },
                { text: "Once per year", isCorrect: false, icon: "💧" }
            ],
            explanation: "Moderate watering is best - too much water causes diseases."
        },
        {
            question: "What is bean inoculation?",
            options: [
                { text: "Adding nitrogen-fixing bacteria to seeds", isCorrect: true, icon: "🦠" },
                { text: "Animal vaccination", isCorrect: false, icon: "💉" },
                { text: "Burning seeds", isCorrect: false, icon: "🔥" },
                { text: "Nothing", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Inoculation adds bacteria that help beans produce nitrogen fertilizer."
        }
    ],
    "beans_level3": [
        {
            question: "How do you know when beans are mature?",
            options: [
                { text: "Pods dry out and change color", isCorrect: true, icon: "🫘" },
                { text: "Pods become greener", isCorrect: false, icon: "🟢" },
                { text: "Pods become watery", isCorrect: false, icon: "💧" },
                { text: "Flowers continue blooming", isCorrect: false, icon: "🌸" }
            ],
            explanation: "When pods dry out and change color, beans are ready for harvest."
        },
        {
            question: "How are beans harvested?",
            options: [
                { text: "Pull or cut plants, then thresh", isCorrect: true, icon: "👋" },
                { text: "Burn the field", isCorrect: false, icon: "🔥" },
                { text: "Add lots of water", isCorrect: false, icon: "💧" },
                { text: "They can't be harvested", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Plants are pulled or cut, then beans are threshed from the pods."
        },
        {
            question: "To what moisture level should beans be dried?",
            options: [
                { text: "Below 14%", isCorrect: true, icon: "💧" },
                { text: "50%", isCorrect: false, icon: "💧" },
                { text: "90%", isCorrect: false, icon: "💧" },
                { text: "0% completely", isCorrect: false, icon: "💧" }
            ],
            explanation: "Moisture below 14% prevents mold and pests in storage."
        },
        {
            question: "How are bruchids (storage pests) controlled?",
            options: [
                { text: "Proper storage and using ash or pesticides", isCorrect: true, icon: "🏠" },
                { text: "Soaking beans in water", isCorrect: false, icon: "💧" },
                { text: "Leaving in sun for two weeks", isCorrect: false, icon: "☀️" },
                { text: "No way to control them", isCorrect: false, icon: "🚫" }
            ],
            explanation: "Good storage with ash or pesticides helps prevent storage pests."
        },
        {
            question: "How do PICS bags help store beans?",
            options: [
                { text: "They prevent air and pests from entering", isCorrect: true, icon: "🛍️" },
                { text: "They increase heat", isCorrect: false, icon: "🔥" },
                { text: "They increase moisture", isCorrect: false, icon: "💧" },
                { text: "They don't help", isCorrect: false, icon: "🚫" }
            ],
            explanation: "PICS bags block air, so pests die without oxygen."
        }
    ]
};

window.beansQuestions = beansQuestions;
