// Pie de misión: coordenadas, contacto y estado de sistemas
export default function LandingFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-[rgba(234,224,204,0.16)] bg-[#0f0c08]">
            <div className="grid grid-cols-1 gap-10 px-4 py-14 md:grid-cols-4 md:px-10 lg:px-24">
                <div>
                    <p className="icv-display text-lg text-[#eae0cc]">
                        ICV<span className="icv-blink text-[#ffb000]">▮</span>
                    </p>
                    <p className="icv-label mt-3 leading-relaxed">
                        SIMULADOR DE ENTREVISTAS
                        <br />
                        TÉCNICAS CON IA
                    </p>
                </div>

                <div>
                    <p className="icv-label mb-3 !text-[#eae0cc]">COMUNICACIONES</p>
                    <a
                        href="mailto:miguelgp789@gmail.com"
                        className="icv-link"
                        data-cursor-label="ESCRIBIR"
                    >
                        Contacto
                    </a>
                </div>

                <div>
                    <p className="icv-label mb-3 !text-[#eae0cc]">BASE</p>
                    <p className="icv-label leading-relaxed tabular-nums">
                        40.4168°N · 3.7038°O
                        <br />
                        MADRID, ES
                    </p>
                </div>

                <div>
                    <p className="icv-label mb-3 !text-[#eae0cc]">ESTADO</p>
                    <p className="icv-label leading-relaxed">
                        <span className="icv-blink mr-2 inline-block h-2 w-2 bg-[#ffb000] align-middle" />
                        TODOS LOS SISTEMAS OPERATIVOS
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(234,224,204,0.16)] px-4 py-5 md:px-10 lg:px-24">
                <p className="icv-label">
                    © {year} INTERCODEVIEW — FIN DE LA TRANSMISIÓN
                </p>
                <p className="icv-label">
                    HECHO PARA CANDIDATOS QUE NO IMPROVISAN
                </p>
            </div>
        </footer>
    );
}
