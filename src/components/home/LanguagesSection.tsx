export default function LanguagesSection() {
    const languages = [
        "Python",
        "JavaScript",
        "TypeScript",
        "Java",
        "C++",
        "C#",
        "Go",
        "Rust",
        "Swift",
        "Kotlin",
        "Ruby",
        "PHP",
        "SQL",
        "Y mucho más...",
    ];

    return (
        <div className="container mx-auto px-6 py-20">
            <h2 className="text-5xl font-bold text-center mb-16">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                    Lenguajes Disponibles
                </span>
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
                {languages.map((lang, index) => (
                    <div
                        key={lang}
                        className="group relative px-8 py-4 bg-gray-900 border-2 border-green-500/30 rounded-lg hover:border-green-500 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/50 cursor-pointer animate-fade-in-up"
                        style={{
                            animationDelay: `${index * 50}ms`,
                        }}
                    >
                        <span className="text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors">
                            {lang}
                        </span>
                        <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
