export default function FeaturesSection() {
    const features = [
        {
            icon: "🎯",
            title: "Ejercicios Reales",
            description:
                "Practica con ejercicios típicos de entrevistas técnicas",
        },
        {
            icon: "🤖",
            title: "Corrección IA",
            description:
                "Recibe feedback detallado y personalizado al instante",
        },
        {
            icon: "📊",
            title: "Progreso & Stats",
            description: "Monitorea tu evolución y mejora continua",
        },
        {
            icon: "💻",
            title: "Editor Integrado",
            description: "Escribe código directamente en la plataforma",
        },
    ];

    return (
        <div className="container mx-auto px-6 py-20">
            <h2 className="text-5xl font-bold text-center mb-16">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                    ¿Por qué InterCodeView?
                </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="group relative bg-gray-900 p-8 rounded-xl border border-green-500/20 hover:border-green-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30 animate-fade-in-up"
                        style={{
                            animationDelay: `${index * 100 + 1000}ms`,
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>

                        <div className="relative z-10">
                            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-green-400 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400">
                                {feature.description}
                            </p>
                        </div>

                        {/* Animated Corner Accents */}
                        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-green-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-xl"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-green-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-xl"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
