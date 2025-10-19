export default function AnimatedCodeWindow() {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up animation-delay-800">
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-green-500/30 shadow-2xl shadow-green-500/20">
                <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-green-500/30">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse animation-delay-100"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse animation-delay-200"></div>
                    </div>
                    <span className="text-xs text-green-400 ml-4 font-mono">
                        code-challenge.js
                    </span>
                </div>
                <div className="p-6 font-mono text-sm text-left">
                    <div className="space-y-2">
                        <div className="flex">
                            <span className="text-gray-500 select-none w-8">
                                1
                            </span>
                            <span>
                                <span className="text-purple-400">
                                    function{" "}
                                </span>
                                <span className="text-blue-400">
                                    reverseString
                                </span>
                                <span className="text-gray-400">
                                    (text) {"{"}
                                </span>
                            </span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-500 select-none w-8">
                                2
                            </span>
                            <span className="text-gray-400 ml-4">
                                {"//"} Your solution here...
                            </span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-500 select-none w-8">
                                3
                            </span>
                            <span className="ml-4">
                                <span className="text-purple-400">return </span>
                                <span className="text-gray-400">text.</span>
                                <span className="text-yellow-400">split</span>
                                <span className="text-gray-400">(</span>
                                <span className="text-green-400">
                                    &apos;&apos;
                                </span>
                                <span className="text-gray-400">).</span>
                                <span className="text-yellow-400">reverse</span>
                                <span className="text-gray-400">().</span>
                                <span className="text-yellow-400">join</span>
                                <span className="text-gray-400">(</span>
                                <span className="text-green-400">
                                    &apos;&apos;
                                </span>
                                <span className="text-gray-400">);</span>
                            </span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-500 select-none w-8">
                                4
                            </span>
                            <span className="text-gray-400">{"}"}</span>
                        </div>
                        <div className="flex mt-4">
                            <span className="text-gray-500 select-none w-8">
                                5
                            </span>
                            <span className="text-gray-500">
                                {"//"} AI Feedback:
                            </span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-500 select-none w-8">
                                6
                            </span>
                            <span className="text-green-400 ml-4 animate-pulse">
                                ✓ ¡Excelente solución! 🎉
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
