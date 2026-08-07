import about2 from '../assets/polaroids/about2.jpg';
import sitIcon from '../assets/icons/SIT.jpg';

const AboutMe = () => {
    const polaroids = [
        { id: 1, src: about2, alt: 'About polaroid 1', position: 'object-top' },
    ];

    return (
        <div className="min-h-screen px-4 sm:px-6 lg:px-8 max-w-[92rem] mx-auto">
            <div className="min-h-[82vh] flex items-center py-6 sm:py-8">
                <div className="w-full grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-6 items-start">
                    <aside className="order-2 lg:order-1">
                        <div className="grid grid-cols-2 gap-4 w-full lg:hidden">
                            <a href="https://drive.google.com/file/d/1Z25SNvlwLeiQTM-l8rCZ-nJFsLCmaDBc/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
                                <span className="w-11 h-11 rounded-full border border-glass-border bg-glass-dark flex items-center justify-center">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 3h7l5 5v13H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3v5h5" />
                                    </svg>
                                </span>
                                <span className="text-xs text-gray-300">Resume</span>
                            </a>
                            <a href="https://www.linkedin.com/in/muas-jabar-abdullah" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
                                <span className="w-11 h-11 rounded-full border border-glass-border bg-glass-dark flex items-center justify-center">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zM8 8h3.83v2.19h.05C12.41 9.16 13.95 8 16.16 8 20.42 8 21 10.8 21 14.44V24h-4v-8.08c0-1.93-.03-4.41-2.69-4.41-2.69 0-3.11 2.1-3.11 4.27V24H7.2V8H8z" /></svg>
                                </span>
                                <span className="text-xs text-gray-300">LinkedIn</span>
                            </a>
                            <a href="https://github.com/jabchup" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
                                <span className="w-11 h-11 rounded-full border border-glass-border bg-glass-dark flex items-center justify-center">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                </span>
                                <span className="text-xs text-gray-300">GitHub</span>
                            </a>
                        </div>

                        <div className="hidden lg:flex lg:flex-col gap-3 w-full">
                            <a href="https://drive.google.com/file/d/1yLLBFkJQWu2OpY_YWH34T_GdbeA8MKp9/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="retro-button w-full flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 3h7l5 5v13H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3v5h5" />
                                </svg>
                                Resume
                            </a>
                            <a href="https://www.linkedin.com/in/muas-jabar-abdullah" target="_blank" rel="noopener noreferrer" className="retro-button w-full flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zM8 8h3.83v2.19h.05C12.41 9.16 13.95 8 16.16 8 20.42 8 21 10.8 21 14.44V24h-4v-8.08c0-1.93-.03-4.41-2.69-4.41-2.69 0-3.11 2.1-3.11 4.27V24H7.2V8H8z" /></svg>
                                LinkedIn
                            </a>
                            <a href="https://github.com/jabchup" target="_blank" rel="noopener noreferrer" className="retro-button w-full flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                GitHub
                            </a>
                        </div>
                    </aside>

                    <div className="order-1 lg:order-2 bg-glass-dark p-6 sm:p-8 lg:p-10 rounded-lg border border-glass-border w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-8 items-start">
                            <div>
                                <div className="mb-6">
                                    <span className="text-gray-500 text-sm">$ whoami</span>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-gray-400 text-lg">
                                        <span className="text-gray-500">&gt;</span> Hello, World! I am
                                    </p>

                                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight text-white">
                                        Muas Jabar
                                        <span className="text-gray-500 cursor-blink ml-1"></span>
                                    </h1>

                                    <div className="mt-6 space-y-5 text-sm sm:text-base text-gray-400 leading-relaxed max-w-3xl">
                                        <p>Applied AI / Robotics Engineer focused on real-time perception, autonomous navigation, and edge-deployed inference — building toward full-stack autonomous systems.</p>
                                    </div>

                                    <div className="mt-4 space-y-2 text-sm text-gray-300">
                                        <div className="grid grid-cols-[110px_1fr] items-center gap-2">
                                            <span className="text-gray-500">Currently at</span>
                                            <span className="inline-flex items-center gap-2">
                                                <img
                                                    src={sitIcon}
                                                    alt="SIT icon"
                                                    className="w-4 h-4 object-cover rounded-sm border border-white/20 shrink-0"
                                                />
                                                <span>RobotX-SIT</span>
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[110px_1fr] items-center gap-2">
                                            <span className="text-gray-500">Role</span>
                                            <span>UAV Software</span>
                                        </div>
                                        <div className="pt-2 mt-2 border-t border-white/10 grid grid-cols-[110px_1fr] gap-2">
                                            <span className="text-gray-500">Education</span>
                                            <span>BSc in Computer Science (Hons), Singapore Institute of Technology</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <aside className="w-full max-w-xs mx-auto lg:max-w-none lg:mx-0 lg:mt-4 lg:-ml-10">
                                <div className="grid grid-cols-1 gap-3">
                                    {polaroids.map((note) => (
                                        <div
                                            key={note.id}
                                            className={`bg-white p-1.5 rounded-sm shadow-lg border border-black/10 w-44 sm:w-48 md:w-52 mx-auto relative ${
                                                note.id === 1 ? 'rotate-[-4deg] top-0 left-3 z-20' :
                                                'rotate-[3deg] -top-5 -left-6 z-10'
                                            }`}
                                        >
                                            <img
                                                src={note.src}
                                                alt={note.alt}
                                                className={`aspect-square w-full object-cover ${note.position} rounded-sm border border-black/10`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
