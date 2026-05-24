import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import AboutMe from './pages/AboutMe'
import Research from './pages/Research'
import Projects from './pages/Projects'
import FadeInSection from './components/FadeInSection'
import RoboticsPath from './pages/RoboticsPath/RoboticsPath'
import EnhancementPath from './pages/EnhancementPath/EnhancementPath'
import AgentPath from './pages/AgentPath/AgentPath'
import systems1 from './assets/polaroids/systems1.jpg'
import systems2 from './assets/polaroids/systems2.jpg'
import systems3 from './assets/polaroids/systems3.jpg'
import system4 from './assets/polaroids/system4.jpg'
import system5 from './assets/polaroids/system5.jpg'

const PolaroidBand = () => {
    const cards = [
        { id: 1, label: 'prototype', src: systems1 },
        { id: 2, label: 'testing', src: systems2 },
        { id: 3, label: 'iteration', src: systems3 },
        { id: 4, label: 'deployment', src: system4 },
        { id: 5, label: 'learning', src: system5 },
    ];

    return (
        <section className="min-h-screen flex items-center py-8 sm:py-10">
            <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
                <div className="border-t border-white/15 mb-10" />

                <p
                    className="text-gray-300 text-2xl sm:text-3xl tracking-wide mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    learning to build, building to learn
                </p>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    {cards.map((card, idx) => (
                        <div
                            key={card.id}
                            className={`bg-white p-2.5 rounded-sm shadow-lg border border-black/10 w-52 sm:w-56 md:w-60 relative ${
                                idx % 2 === 0 ? '-rotate-2' : 'rotate-2'
                            }`}
                            style={{ marginLeft: idx === 0 ? 0 : '-10px' }}
                        >
                            {card.src ? (
                                <img
                                    src={card.src}
                                    alt={`${card.label} polaroid`}
                                    className="aspect-square w-full object-cover rounded-sm border border-black/10"
                                />
                            ) : (
                                <div className="aspect-square w-full bg-gray-300 rounded-sm border border-black/10" />
                            )}
                        </div>
                    ))}
                </div>

                <p
                    className="text-gray-300 text-2xl sm:text-3xl tracking-wide mt-10"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    applied research and systems engineering
                </p>
            </div>
        </section>
    );
};

const MainPortfolio = () => {
    return (
        <div className="min-h-screen relative">
            <Header />

            <main className="pt-20">
                {/* About Section */}
                <section id="about">
                    <FadeInSection>
                        <AboutMe />
                    </FadeInSection>
                </section>

                <FadeInSection>
                    <PolaroidBand />
                </FadeInSection>

                {/* Projects Section */}
                <section id="research" className="py-10">
                    <FadeInSection>
                        <Research />
                    </FadeInSection>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-10">
                    <FadeInSection>
                        <Projects />
                    </FadeInSection>
                </section>
            </main>
        </div>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/robotics_path" element={<RoboticsPath />} />
                <Route path="/enhancement_path" element={<EnhancementPath />} />
                <Route path="/agent_path" element={<AgentPath />} />
                <Route path="*" element={<MainPortfolio />} />
            </Routes>
        </Router>
    )
}
export default App
