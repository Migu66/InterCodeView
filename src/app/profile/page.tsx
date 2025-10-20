import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
    return (
        <AuthGuard>
            <div className="min-h-screen bg-black text-white">
                <Navbar />
                <div className="pt-24 px-6">
                    <h1 className="text-4xl font-bold text-center mb-8">
                        Mi Perfil
                    </h1>
                </div>
            </div>
        </AuthGuard>
    );
}
