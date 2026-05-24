const researchPapers = [
    {
        id: 1,
        title: 'Robust Audio-Visual Speech Recognition in Noisy Clinical Environments',
        authors:
            'Akshita Abrol, Ridwan Arefeen, Haotong Yu, Alexi George, Kelvin Zhenghao Li, Zhengkui Wang, Rong Tong',
        venue: 'APSIPA ASC 2025',
        link: 'https://www.apsipa.org/proceedings/2025/papers/APSIPA2025_P302.pdf',
    },
];

const Research = () => {
    return (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    <span style={{ fontFamily: "'Playfair Display', serif" }}>Research</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {researchPapers.map((paper) => (
                    <article
                        key={paper.id}
                        className="bg-glass-dark border border-glass-border rounded-lg p-6"
                    >
                        <h3 className="text-xl font-bold text-white mb-2">{paper.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{paper.authors}</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-4">{paper.venue}</p>
                        <a
                            href={paper.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-cyber-cyan hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                            Open Paper
                        </a>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Research;
