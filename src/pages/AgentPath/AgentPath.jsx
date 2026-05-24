import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AgentPath.module.css';
import pathsConfig from '../../config/paths.json';
import alexiPFP from './assets/AlexiPFP.jpg';

// --- DATA CONSTANTS ---
const CAREER_DATA = [
    { 
        date: "Aug 2021 - Jun 2022", 
        co: "Cynapse.AI", 
        role: "AI Software Engineer Intern", 
        focus: "Vision AI & Synthetic Data Generation" 
    },
    { 
        date: "May 2024 - Oct 2024", 
        co: "Cynapse.AI", 
        role: "AI Research Intern", 
        focus: "Generative AI & Spatio-Temporal Models" 
    },
    { 
        date: "Nov 2024 - Aug 2025", 
        co: "SIT x NVIDIA AI Center", 
        role: "Research Assistant", 
        focus: "Multimodal Speech Processing & Optimization" 
    },
    { 
        date: "Nov 2024 - Ongoing", 
        co: "Airborne Lab", 
        role: "Lead Student Engineer", 
        focus: "Unmanned Flight & Drone Flocking Systems" 
    },
    { 
        date: "Dec 2025 - Ongoing", 
        co: "A*STAR", 
        role: "AI Research Engineer", 
        focus: "Agents for Humanoid Actuator FEA" 
    }
];

const PROJECTS_DATA = [
    {
        title: "Multi-Agent Orchestrator",
        id: "Systems / Logic / Orchestrator",
        manifesto: "Orchestrating deterministic outcomes from chaotic asynchronous streams.",
        description: "Engingeered a high-concurrency orchestration layer utilizing Graph-based planning and Vector memory. The system manages large-scale agentic workflows with sub-800ms coordination latency.",
        metrics: [
            { label: "Coordination", value: "800ms" },
            { label: "Throughput", value: "24 RPS" }
        ],
        nodes: ["Input", "Graph", "Direct"],
        subItems: ["Core Architecture", "Memory Sync"],
        subContent: [
            {
                title: "Graph Engine",
                description: "Automated DAG generation for parallel task execution, allowing heterogeneous agents to solve complex dependencies autonomously.",
                metrics: [
                    { label: "Planning", value: "Dynamic" },
                    { label: "Resolution", value: "< 50ms" }
                ],
                nodes: ["Nodes", "Edges", "Solve"]
            },
            {
                title: "Vector Memory",
                description: "Integrated LanceDB for persistent high-speed semantic retrieval, enabling long-term context retention across agent sessions.",
                metrics: [
                    { label: "Retrieval", value: "1.2ms" },
                    { label: "Storage", value: "Vector" }
                ],
                nodes: ["Cache", "Hash", "Retrieval"]
            }
        ]
    },
    {
        title: "CyNeuron VLM",
        id: "Vision / Semantic / Reasoning",
        manifesto: "Bridging the gap between raw optical data and semantic environmental reasoning.",
        description: "Deployed specialized Spatial-Temporal Vision Language Models for the NVIDIA GTC 2025 showcase. Focused on real-time environmental understanding and multimodal navigation.",
        metrics: [
            { label: "Boost", value: "500%" },
            { label: "Recall", value: "0.94" }
        ],
        nodes: ["Vision", "Spatial", "Action"],
        subItems: ["Optimization", "Deployment"],
        subContent: [
            {
                title: "Triton Deployment",
                description: "Leveraged NVIDIA Triton and TensorRT to optimize inference bottlenecks, achieving a 5x increase in frame throughput for complex VLM tasks.",
                metrics: [
                    { label: "Backend", value: "Triton" },
                    { label: "Optim", value: "TensorRT" }
                ],
                nodes: ["Model", "TRT", "Serve"]
            },
            {
                title: "Spatio-Temporal Reasoning",
                description: "Implementing temporal attention mechanisms to allow agents to remember and reason about historical visual context within dynamic environments.",
                metrics: [
                    { label: "Context", value: "Temporal" },
                    { label: "Dim", value: "768D" }
                ],
                nodes: ["T-Gate", "Memory", "Attend"]
            }
        ]
    },
    {
        title: "Actuator Agent",
        id: "Robotics / FEA / Automation",
        manifesto: "Accelerating physical hardware iterations through human-in-the-loop agentic loops.",
        description: "Developed ReAct-based agents to automate Finite Element Analysis (FEA) for humanoid actuator design. Currently in preparation for ICEMS 2026.",
        metrics: [
            { label: "Recall@3", value: "0.97" },
            { label: "Efficiency", value: "81%" }
        ],
        nodes: ["Agent", "Sim", "FEA"]
    }
];

// --- SUB-COMPONENTS ---
const TerminalBreadcrumb = ({ path }) => (
    <div className={styles.breadcrumb}>
        {path}
    </div>
);

const MetricGrid = ({ metrics }) => (
    <div className={styles.metricGrid}>
        {metrics.map((m, i) => (
            <div key={i} className={styles.metricCell}>
                <div className={styles.label}>{m.label}</div>
                <div className={styles.value}>{m.value}</div>
            </div>
        ))}
    </div>
);

const ArchitectureNode = ({ nodes }) => (
    <div className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/5 rounded-sm w-full">
        <svg width="100%" height="100" viewBox="0 0 200 120" className="opacity-30">
            {nodes.map((node, i) => (
                <React.Fragment key={i}>
                    <rect x={10 + i * 65} y="40" width="50" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
                    <text x={35 + i * 65} y="58" textAnchor="middle" fill="currentColor" fontSize="8" className="font-mono">
                        {node}
                    </text>
                    {i < nodes.length - 1 && (
                        <line x1={60 + i * 65} y1="55" x2={75 + i * 65} y2="55" stroke="currentColor" strokeWidth="1" strokeDasharray="3" />
                    )}
                </React.Fragment>
            ))}
        </svg>
    </div>
);

const AgentPath = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentProject, setCurrentProject] = useState(0);
    const [currentSubItem, setCurrentSubItem] = useState(-1);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [glitch, setGlitch] = useState(false);
    
    const containerRef = useRef(null);
    const isEnabled = pathsConfig.paths.agent_path?.enabled;

    const handleNext = useCallback(() => {
        if (currentSlide === 2) {
            const proj = PROJECTS_DATA[currentProject];
            if (proj.subItems && currentSubItem < proj.subItems.length - 1) {
                setCurrentSubItem(prev => prev + 1);
            } else if (currentProject < PROJECTS_DATA.length - 1) {
                setCurrentProject(prev => prev + 1);
                setCurrentSubItem(-1);
            } else {
                setGlitch(true);
                setTimeout(() => setGlitch(false), 150);
            }
        } else {
            setCurrentSlide(prev => (prev < 2 ? prev + 1 : prev));
        }
    }, [currentSlide, currentProject, currentSubItem]);

    const handlePrev = useCallback(() => {
        if (currentSlide === 2) {
            if (currentSubItem > -1) {
                setCurrentSubItem(prev => prev - 1);
            } else if (currentProject > 0) {
                setCurrentProject(prev => prev - 1);
                const prevProj = PROJECTS_DATA[currentProject - 1];
                setCurrentSubItem(prevProj.subItems ? prevProj.subItems.length - 1 : -1);
            } else {
                setCurrentSlide(prev => prev - 1);
            }
        } else {
            setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
        }
    }, [currentSlide, currentProject, currentSubItem]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleNext, handlePrev]);

    if (!isEnabled) {
        return (
            <div className="w-screen h-screen bg-black flex flex-col items-center justify-center font-mono">
                <div className="text-cyber-cyan text-4xl mb-4 animate-pulse">404</div>
                <div className="text-white/20 text-xs tracking-[0.5em] uppercase">Access Restricted</div>
            </div>
        );
    }

    return (
        <div 
            className={`${styles.container} ${glitch ? styles.glitchEffect : ''}`}
            style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` }}
            ref={containerRef}
        >
            <div className={styles.flashlightOverlay} />

            <div className={styles.slidesWrapper} style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
                
                {/* SLIDE 0: IDENTITY */}
                <div className={styles.slide}>
                    <div className={styles.slideContent}>
                        <div className={`flex flex-col md:flex-row items-center gap-16 ${styles.centeredContent} w-full max-w-6xl relative z-10`}>
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-white/5 overflow-hidden ring-1 ring-white/10 p-2">
                                <img src={alexiPFP} className="w-full h-full object-cover rounded-full" alt="PFP" />
                            </motion.div>

                            <div className="flex-1">
                                <div className={styles.label}>Lead Systems Architect</div>
                                <h1 className={styles.sectionHeader} style={{ fontSize: '4rem', margin: '0.5rem 0 2rem' }}>Alexi George</h1>
                                
                                <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                                    <div>
                                        <div className={styles.label}>Core Focus</div>
                                        <div className={styles.value}>Agentic Workflows</div>
                                    </div>
                                    <div>
                                        <div className={styles.label}>Deployment</div>
                                        <div className={styles.value}>Scalable VLM</div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    {["LLM Orchestration", "Hybrid Memory", "JIT Execution"].map((tag, i) => (
                                        <div key={i} className={styles.skillTag}>{tag}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SLIDE 1: CAREER */}
                <div className={styles.slide}>
                    <div className={styles.slideContent}>
                        <div className={`${styles.timeline} ${styles.centeredContent}`}>
                            {CAREER_DATA.map((item, i) => (
                                <div key={i} className={styles.timelineItem}>
                                    <div className={styles.timelineTick} />
                                    <div className={styles.timelineContentWrapper}>
                                        <div className={styles.timelineDate}>{item.date}</div>
                                        <div className={styles.value} style={{ fontSize: '1.2rem', fontWeight: 800 }}>{item.co}</div>
                                        <div className={styles.label} style={{ color: 'var(--cyber-cyan)', marginTop: '0.5rem' }}>{item.role}</div>
                                        <div className="text-[10px] text-gray-500 mt-4 max-w-[150px] leading-relaxed">{item.focus}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SLIDE 2: PROJECTS */}
                <div className={`${styles.slide} ${styles.fullWidthSlide}`}>
                    <div className={styles.slideContentFull}>
                        <div className={styles.projectLayout}>
                            <div className={styles.projectNav}>
                                {PROJECTS_DATA.map((p, idx) => (
                                    <div key={idx}>
                                        <div className={`${styles.navItem} ${currentProject === idx && currentSubItem === -1 ? styles.navItemActive : ''}`} onClick={() => { setCurrentProject(idx); setCurrentSubItem(-1); }}>
                                            {currentProject === idx && currentSubItem === -1 && <motion.div layoutId="scanBar" className={styles.scanningBar} />}
                                            {p.title}
                                        </div>
                                        {currentProject === idx && p.subItems && p.subItems.map((sub, sIdx) => (
                                            <div key={sIdx} className={`${styles.navItem} ${currentSubItem === sIdx ? styles.navItemActive : ''}`} style={{ paddingLeft: '3.5rem', fontSize: '0.65rem', opacity: currentSubItem === sIdx ? 1 : 0.4 }} onClick={() => setCurrentSubItem(sIdx)}>
                                                {currentSubItem === sIdx && <motion.div layoutId="scanBar" className={styles.scanningBar} />}
                                                {sub}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <div className={styles.projectDetails}>
                                <AnimatePresence mode="wait">
                                    {(() => {
                                        const p = PROJECTS_DATA[currentProject];
                                        const content = currentSubItem !== -1 ? p.subContent[currentSubItem] : p;
                                        return (
                                            <motion.div key={`${currentProject}-${currentSubItem}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className={styles.innerDetailSplit}>
                                                <div className={styles.mediaSection}>
                                                    <div className="absolute inset-0 flex items-center justify-center text-white/5 font-mono text-[6vw] select-none opacity-20">
                                                        {p.title.split(' ')[0]}
                                                    </div>
                                                </div>

                                                <div className={styles.descriptionPane}>
                                                    <div className={styles.metadataGutter}>
                                                        <div className="mb-4">
                                                            <div className={styles.label}>Manifesto</div>
                                                            <div className={styles.value} style={{ fontSize: '0.75rem', opacity: 0.8, lineHeight: 1.6 }}>{p.manifesto}</div>
                                                        </div>
                                                        <MetricGrid metrics={content.metrics || p.metrics} />
                                                        <ArchitectureNode nodes={content.nodes || p.nodes} />
                                                    </div>

                                                    <div className={styles.mainDescription}>
                                                        <TerminalBreadcrumb path={p.id} />
                                                        <h2 className={styles.sectionHeader} style={{ fontSize: '1.8rem' }}>{content.title || p.title}</h2>
                                                        <p className="text-gray-400 text-sm leading-relaxed max-w-lg mb-8">{content.description}</p>
                                                        
                                                        <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-end opacity-40">
                                                            <div>
                                                                <div className={styles.label}>Node Status</div>
                                                                <div className={styles.value} style={{ fontSize: '0.7rem' }}>Active // Secure</div>
                                                            </div>
                                                            <div className="text-[10px] font-mono">{new Date().toLocaleDateString()}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })()}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentPath;
