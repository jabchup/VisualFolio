import { useState } from 'react';

const Career = () => {
    const [selectedExpId, setSelectedExpId] = useState(1);

    const experienceData = [
        {
            id: 1,
            role: 'UAV Software',
            company: 'RobotX @ SIT',
            period: 'March 2026 - Present',
            location: 'Singapore',
            description: 'Developing autonomous flight control and onboard vision software for a UAV platform using pymavlink and Jetson Orin Nano.',
            highlights: [
                'Built an autonomous hover-and-observe mission system using pymavlink with 6-mode RC arbitration, physical E-STOP, and controlled LAND on exit',
                'Integrated Jetson Orin Nano with Pixhawk 6X over USB serial for onboard compute and real-time telemetry',
                'Developed a vision pipeline with bounding-box normalization, drift tracking, and structured UDP map payloads to a companion vessel',
                'Implemented FCU parameter validation, geofence checks, and failsafe enforcement informed by a real flight incident',
            ],
            technologies: ['pymavlink', 'ArduPilot', 'Jetson Orin Nano', 'Pixhawk 6X', 'OpenCV', 'UDP Networking'],
        },
        {
            id: 2,
            role: 'Robotics Process Automation (RPA) Developer',
            company: 'KLP LLP Pte Ltd',
            period: 'September 2023 - February 2024',
            location: 'Singapore',
            description: 'Built and maintained two RPA workflows for audit processes, both still in active use across the firm.',
            highlights: [
                'Developed, debugged, and tested RPA solutions using UiPath and Excel VBA, reducing repetitive audit tasks by 50%',
                'Authored process documentation to ensure maintainability across the team',
                'Collaborated with auditors to scope requirements and design automation workflows for new and existing audit processes',
                'Analyzed and mapped audit procedures into structured automatic logic, adapting workflows to varying project contexts',
            ],
            technologies: ['UiPath', 'Excel VBA', 'C#', 'M-Language'],
        },
        {
            id: 3,
            role: 'Retail Associate',
            company: 'Challenger',
            period: 'October 2022 - January 2024',
            location: 'Singapore',
            description: 'Front-of-house sales and technical advisory for consumer electronics.',
            highlights: [
                'Advised customers on consumer electronics, translating technical specifications into accessible recommendations',
                'Resolved customer queries and delivered tailored product solutions to drive satisfaction and repeat business',
            ],
            technologies: ['Customer Advisory', 'Product Knowledge', 'Sales Support'],
        },
        {
            id: 4,
            role: 'Warehouse Assistant',
            company: 'Ikano',
            period: 'July 2022, December 2023',
            location: 'Singapore',
            description: 'Coordinated order fulfilment and dispatch operations alongside full-time and part-time warehouse staff.',
            highlights: [
                'Processed and staged online orders for timely and safe handoff to dispatch drivers',
                'Identified workflow improvements to accelerate order-to-dispatch turnaround',
            ],
            technologies: ['Order Fulfilment', 'Logistics Coordination', 'Process Improvement'],
        },
    ];

    const currentData = experienceData;
    const selectedId = selectedExpId;
    const setSelectedId = setSelectedExpId;
    const selectedItem = currentData.find(item => item.id === selectedId) || currentData[0];

    return (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    <span className="text-gray-500">&lt;</span>
                    Career
                    <span className="text-gray-500">/&gt;</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    <span className="text-cyber-cyan">//</span> My professional journey
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6">
                <div className="bg-glass-dark backdrop-blur-md p-4 rounded-lg border border-glass-border space-y-2 max-h-[60vh] overflow-y-auto">
                    {currentData.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedId(item.id)}
                            className={`
                w-full text-left p-4 rounded-lg transition-all duration-300
                ${selectedId === item.id
                                    ? 'bg-white/10 border-l-2 border-l-white/60'
                                    : 'hover:bg-white/5'
                                }
              `}
                        >
                            <p className={`font-medium text-sm mb-1 whitespace-pre-line ${selectedId === item.id ? 'text-white' : 'text-gray-300'}`}>
                                {item.role}
                            </p>

                            <p className="text-gray-400 text-xs mb-2">
                                {item.company}
                            </p>

                            <div className="flex items-center justify-between text-xs">
                                <span className={selectedId === item.id ? 'text-gray-300' : 'text-gray-500'}>
                                    {item.period}
                                </span>
                                <span className="text-gray-500">
                                    {item.location}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="bg-glass-dark backdrop-blur-md p-6 lg:p-8 rounded-lg border border-glass-border">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-white mb-2 whitespace-pre-line">
                            {selectedItem.role}
                        </h3>
                        <p className="text-gray-400">
                            {selectedItem.company}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-sm">
                            <span className="text-gray-500">{selectedItem.period}</span>
                            <span className="text-gray-700">�</span>
                            <span className="text-gray-500">{selectedItem.location}</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="text-gray-400 leading-relaxed">
                            {selectedItem.description}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h4 className="text-xs text-gray-600 uppercase tracking-wider mb-3">
                            Key Achievements
                        </h4>
                        <ul className="space-y-2">
                            {selectedItem.highlights.map((highlight, i) => (
                                <li key={i} className="text-gray-400 text-sm flex items-start gap-3">
                                    <span className="text-gray-600 mt-0.5">?</span>
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs text-gray-600 uppercase tracking-wider mb-3">
                            Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedItem.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2.5 py-1 text-xs bg-white/5 text-gray-400 border border-gray-700 rounded"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Career;
