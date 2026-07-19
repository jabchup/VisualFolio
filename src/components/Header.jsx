import { useState, useEffect } from 'react';
import { trackButtonClick } from "../utils/analytics";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('about');

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = ['about', 'research', 'projects'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 'about', label: 'About' },
        { id: 'research', label: 'Research' },
        { id: 'projects', label: 'Projects' },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isScrolled
                    ? 'bg-deep-space/90 backdrop-blur-lg shadow-glow border-b border-glass-border'
                    : 'bg-transparent'
                }
      `}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo / Site Title */}
                    <div className="flex-shrink-0">
                        <a
                            href="#about"
                            onClick={(e) => {
                                trackButtonClick('portfolio_logo', 'header_navigation', {
                                    button_text: "Alexi's Portfolio",
                                });
                                e.preventDefault();
                                scrollToSection('about');
                            }}
                            className="flex items-center gap-2 group"
                        >
                            <span className="text-cyber-cyan text-xl font-bold tracking-wider group-hover:animate-pulse-glow">
                                [
                            </span>
                            <span className="text-white font-semibold text-lg tracking-wide">
                                Alexi&apos;s Portfolio
                            </span>
                            <span className="text-cyber-cyan text-xl font-bold tracking-wider group-hover:animate-pulse-glow">
                                ]
                            </span>
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => {
                                    trackButtonClick(link.id, 'header_navigation', {
                                        button_text: link.label,
                                    });
                                    scrollToSection(link.id);
                                }}
                                className={`
                  px-4 py-2 text-sm font-medium tracking-wider uppercase
                  transition-all duration-300 relative
                  ${activeSection === link.id
                                        ? 'text-cyber-cyan'
                                        : 'text-gray-400 hover:text-white'
                                    }
                `}
                            >
                                <span className="relative z-10">
                                    <span className="text-cyber-cyan opacity-50">&lt;</span>
                                    {link.label}
                                    <span className="text-cyber-cyan opacity-50">/&gt;</span>
                                </span>

                                {/* Active indicator */}
                                {activeSection === link.id && (
                                    <span
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyber-cyan shadow-glow"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                </div>
            </nav>
        </header>
    );
};

export default Header;
