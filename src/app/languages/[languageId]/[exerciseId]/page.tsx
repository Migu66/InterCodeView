import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/languages/Navbar";

export default function ExercisePage() {
    return (
        <AuthGuard>
            <div className="min-h-screen bg-black text-white">
                <Navbar />
                <div className="pt-24 px-6">
                    <h1 className="text-4xl font-bold text-center mb-8">
                        Ejercicio de programación
                    </h1>
                </div>
            </div>
        </AuthGuard>
    );
}
