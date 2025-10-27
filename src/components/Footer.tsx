export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-green-500/30 bg-black/50 backdrop-blur-sm py-8 mt-20">
            <div className="container mx-auto px-6 text-center text-gray-500">
                <p>
                    &copy; {currentYear} InterCodeView. Preparándote para el
                    éxito.
                </p>
                <p className="mt-2">
                    <a
                        href="mailto:miguelgp789@gmail.com"
                        className="text-green-400 hover:text-green-300 transition-colors"
                    >
                        Contacto
                    </a>
                </p>
            </div>
        </footer>
    );
}
