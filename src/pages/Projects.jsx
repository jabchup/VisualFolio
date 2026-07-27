import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import GlassSegment from '../components/GlassSegment';
import { projects } from '../data/projects';
import { trackButtonClick, trackClarityEvent } from '../utils/analytics';

// Import the technical analysis HTML content
import ocrAnalysisHtml from '../assets/Technical Analysis_OCR-lighting.html?raw';
import pix2depthAnalysisHtml from '../assets/Technical_Analysis_Pix2Depth.html?raw';

// Import BogoBeauty slideshow images
import bogo1 from '../assets/BogoBeauty/1.png';
import bogo2 from '../assets/BogoBeauty/2.png';
import bogo3 from '../assets/BogoBeauty/3.png';
import bogo4 from '../assets/BogoBeauty/4.png';
import dismantleTransformerThumb from '../assets/thumbnails/dismantle-transformer.png';
import evolutionaryFusionThumb from '../assets/thumbnails/evolutionary-model-fusion.png';
import eagleThumb from '../assets/thumbnails/Eagle.png';
import landSharkPreviewVideo from '../assets/thumbnails/LandShark.mp4';
import turtlebot3PreviewVideo from '../assets/thumbnails/turtlebot3-preview.webm';
import rosInspectionPreviewVideo from '../assets/thumbnails/ros-inspection-preview.webm';

const bogoBeautySlides = [bogo1, bogo2, bogo3, bogo4];

const projectThumbnails = {
    'Dismantling Transformers': dismantleTransformerThumb,
    'Breeding Neural Networks': evolutionaryFusionThumb,
    'Semantics Compressor': eagleThumb,
};

const projectPreviewMedia = {
    'Project Land Shark': {
        type: 'video',
        title: 'Project Land Shark Preview',
        src: landSharkPreviewVideo,
    },
    'TurtleBot3 Autonomous Maze Navigation': {
        type: 'video',
        title: 'TurtleBot3 Maze Navigation Preview',
        src: turtlebot3PreviewVideo,
    },
    'ROS Inspection Robot System': {
        type: 'video',
        title: 'ROS Inspection Robot Preview',
        src: rosInspectionPreviewVideo,
    },
};

const Projects = () => {
    const [showModal, setShowModal] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalType, setModalType] = useState('html'); // 'html' | 'slideshow' | 'video'
    const [modalMediaSrc, setModalMediaSrc] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [copyFeedback, setCopyFeedback] = useState(null); // project id or null

    const topProjects = projects.slice(0, 6);
    const moreProjects = projects.slice(6);

    // Deep linking logic
    useEffect(() => {
        const docs = searchParams.get('docs');
        if (docs) {
            if (docs === 'ocr-lighting') {
                openHtmlModal('OCR-lighting Technical Docs', ocrAnalysisHtml, 'ocr-lighting', false);
            } else if (docs === 'pix2depth') {
                openHtmlModal('Pix2Depth Technical Docs', pix2depthAnalysisHtml, 'pix2depth', false);
            } else if (docs === 'bogo-beauty') {
                openSlideshow('Bogo Beauty Slides', false);
            }
        }
    }, [searchParams]);

    const openHtmlModal = (title, content, slug, updateUrl = true) => {
        trackClarityEvent('project_modal_open', {
            project_panel: slug,
            panel_type: 'technical_docs',
            page_path: `${window.location.pathname}${window.location.hash}`,
        });
        setModalTitle(title);
        setModalContent(content);
        setModalType('html');
        setIsClosing(false);
        setShowModal(true);
        if (updateUrl && slug) setSearchParams({ docs: slug });
    };

    const openSlideshow = (title, updateUrl = true) => {
        trackClarityEvent('project_modal_open', {
            project_panel: 'bogo_beauty',
            panel_type: 'slideshow',
            page_path: `${window.location.pathname}${window.location.hash}`,
        });
        setModalTitle(title);
        setModalType('slideshow');
        setCurrentSlide(0);
        setIsClosing(false);
        setShowModal(true);
        if (updateUrl) setSearchParams({ docs: 'bogo-beauty' });
    };

    const openVideoModal = (title, mediaSrc) => {
        trackClarityEvent('project_modal_open', {
            project_panel: title,
            panel_type: 'video',
            page_path: `${window.location.pathname}${window.location.hash}`,
        });
        setModalTitle(title);
        setModalType('video');
        setModalMediaSrc(mediaSrc);
        setIsClosing(false);
        setShowModal(true);
    };

    const closeModal = () => {
        trackClarityEvent('project_modal_close', {
            project_panel: modalTitle,
            panel_type: modalType,
            page_path: `${window.location.pathname}${window.location.hash}`,
        });
        setIsClosing(true);
        setTimeout(() => {
            setShowModal(false);
            setIsClosing(false);
            setSearchParams({});
        }, 500);
    };

    const handleCopyLink = (docsSlug, projectId) => {
        const baseUrl = window.location.href.split('?')[0];
        const shareUrl = `${baseUrl}?docs=${docsSlug}`;
        navigator.clipboard.writeText(shareUrl);
        setCopyFeedback(projectId);
        setTimeout(() => setCopyFeedback(null), 2000);
    };

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bogoBeautySlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + bogoBeautySlides.length) % bogoBeautySlides.length);

    return (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    <span style={{ fontFamily: "'Playfair Display', serif" }}>
                        Projects
                    </span>
                </h2>
            </div>

            <div className="text-left mb-4">
                <h3 className="text-sm uppercase tracking-wider text-gray-500">Pinned</h3>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topProjects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        onTechnicalDocs={
                            project.title === 'OCR-lighting'
                                ? () => openHtmlModal('OCR-lighting Technical Docs', ocrAnalysisHtml, 'ocr-lighting')
                                : project.title === 'Pix2Depth'
                                    ? () => openHtmlModal('Pix2Depth Technical Docs', pix2depthAnalysisHtml, 'pix2depth')
                                    : project.title === 'Bogo Beauty'
                                        ? () => openSlideshow('Bogo Beauty Slides')
                                        : null
                        }
                        onCopyLink={
                            project.title === 'OCR-lighting'
                                ? () => handleCopyLink('ocr-lighting', project.id)
                                : project.title === 'Pix2Depth'
                                    ? () => handleCopyLink('pix2depth', project.id)
                                    : project.title === 'Bogo Beauty'
                                        ? () => handleCopyLink('bogo-beauty', project.id)
                                        : null
                        }
                        copyFeedback={copyFeedback === project.id}
                        previewImage={projectThumbnails[project.title] || null}
                        previewMedia={projectPreviewMedia[project.title] || null}
                        onPreviewOpen={
                            projectPreviewMedia[project.title]?.type === 'video'
                                ? () =>
                                    openVideoModal(
                                        projectPreviewMedia[project.title].title,
                                        projectPreviewMedia[project.title].src
                                    )
                                : null
                        }
                    />
                ))}
            </div>

            {moreProjects.length > 0 && (
                <details className="mt-8 bg-glass-dark border border-glass-border rounded-lg p-4">
                    <summary
                        onClick={() => trackButtonClick('toggle_other_projects', 'projects_section')}
                        className="cursor-pointer list-none flex items-center justify-between text-gray-300 hover:text-white transition-colors"
                    >
                        <span className="text-sm uppercase tracking-wider">Other Projects</span>
                        <span className="text-xs text-gray-500">+{moreProjects.length}</span>
                    </summary>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {moreProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onTechnicalDocs={
                                    project.title === 'OCR-lighting'
                                        ? () => openHtmlModal('OCR-lighting Technical Docs', ocrAnalysisHtml, 'ocr-lighting')
                                        : project.title === 'Pix2Depth'
                                            ? () => openHtmlModal('Pix2Depth Technical Docs', pix2depthAnalysisHtml, 'pix2depth')
                                            : project.title === 'Bogo Beauty'
                                                ? () => openSlideshow('Bogo Beauty Slides')
                                                : null
                                }
                                onCopyLink={
                                    project.title === 'OCR-lighting'
                                        ? () => handleCopyLink('ocr-lighting', project.id)
                                        : project.title === 'Pix2Depth'
                                            ? () => handleCopyLink('pix2depth', project.id)
                                            : project.title === 'Bogo Beauty'
                                                ? () => handleCopyLink('bogo-beauty', project.id)
                                                : null
                                }
                                copyFeedback={copyFeedback === project.id}
                                previewImage={projectThumbnails[project.title] || null}
                                previewMedia={projectPreviewMedia[project.title] || null}
                                onPreviewOpen={
                                    projectPreviewMedia[project.title]?.type === 'video'
                                        ? () =>
                                            openVideoModal(
                                                projectPreviewMedia[project.title].title,
                                                projectPreviewMedia[project.title].src
                                            )
                                        : null
                                }
                            />
                        ))}
                    </div>
                </details>
            )}

            {/* Project count */}
            <div className="text-center mt-10">
                <p className="text-sm text-gray-500">
                    Showing <span className="text-cyber-cyan">{topProjects.length}</span> of{' '}
                    <span className="text-cyber-green">{projects.length}</span> projects
                </p>
            </div>

            {/* Technical Docs Modal - Right Sliding Panel rendered via Portal */}
            {showModal && createPortal(
                <div
                    className={`fixed inset-0 z-[10001] ${isClosing ? 'opacity-0 transition-opacity duration-500' : 'animate-backdrop-in'}`}
                    onClick={closeModal}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(8px)'
                    }}
                >
                    <div
                        className={`absolute top-0 right-0 h-full w-full ${modalType === 'slideshow' ? 'max-w-4xl' : 'max-w-2xl'} bg-gray-900 shadow-2xl flex flex-col transition-all duration-500 ${isClosing ? 'translate-x-full' : 'translate-x-0'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                        style={{ borderLeft: '1px solid rgba(0, 255, 255, 0.2)' }}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-deep-space/50 backdrop-blur-md">
                            <div>
                                <h3 className="text-xl font-bold text-cyber-cyan tracking-wider uppercase">
                                    {modalTitle}
                                </h3>
                            </div>
                            <button
                                onClick={() => {
                                    trackButtonClick('close_project_modal', 'project_modal', {
                                        modal_title: modalTitle,
                                        modal_type: modalType,
                                    });
                                    closeModal();
                                }}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all border border-transparent hover:border-white/10"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-grow overflow-hidden flex flex-col">
                            {modalType === 'html' ? (
                                <div className="flex-grow bg-white overflow-hidden relative group">
                                    <iframe
                                        srcDoc={modalContent}
                                        className="w-full h-full border-0"
                                        title="Technical Docs"
                                    />
                                    {/* Subtle overlay for premium feel */}
                                    <div className="absolute inset-0 pointer-events-none border-inset border-8 border-gray-900/5 transition-opacity group-hover:opacity-0"></div>
                                </div>
                            ) : modalType === 'video' ? (
                                <div className="flex-grow bg-black flex items-center justify-center p-4">
                                    <video
                                        src={modalMediaSrc}
                                        controls
                                        playsInline
                                        className="w-full h-auto max-h-full rounded-md border border-white/10"
                                    />
                                </div>
                            ) : (
                                <div className="flex-grow overflow-y-auto bg-black/40 scroll-smooth">
                                    <div className="w-full space-y-0">
                                        {bogoBeautySlides.map((slide, index) => (
                                            <div key={index} className="group relative">
                                                <img
                                                    src={slide}
                                                    alt={`Bogo Beauty Slide ${index + 1}`}
                                                    className="w-full h-auto brightness-90 hover:brightness-100 transition-all duration-500"
                                                />
                                                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-xs font-mono text-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                                                    IMAGE_{String(index + 1).padStart(2, '0')}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

const ProjectCard = ({
    project,
    index,
    onTechnicalDocs,
    onCopyLink,
    copyFeedback,
    previewImage,
    previewMedia,
    onPreviewOpen,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const previewHref = project.link || project.github || null;
    const projectName = project.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_|_$/g, '');
    const trackProjectClick = (action, additionalParameters = {}) => {
        trackButtonClick(`${projectName}_${action}`, 'projects_section', {
            action,
            project_title: project.title,
            ...additionalParameters,
        });
    };

    return (
        <GlassSegment
            hover
            className="p-6 flex flex-col h-full group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="mb-4">
                {onPreviewOpen ? (
                    <button
                        type="button"
                        onClick={() => {
                            trackProjectClick('open_preview');
                            onPreviewOpen();
                        }}
                        className="block w-full text-left"
                    >
                        <div className="relative aspect-video rounded-lg overflow-hidden border border-glass-border bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
                            {previewMedia?.type === 'video' ? (
                                <video
                                    src={previewMedia.src}
                                    muted
                                    loop
                                    autoPlay
                                    playsInline
                                    preload="metadata"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : previewImage ? (
                                <img
                                    src={previewImage}
                                    alt={`${project.title} thumbnail`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.45),transparent_40%)]" />
                            )}
                            {!previewImage && (
                                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent">
                                    <p className="text-xs uppercase tracking-wider text-gray-200">Preview</p>
                                </div>
                            )}
                        </div>
                    </button>
                ) : previewHref ? (
                    <a
                        href={previewHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProjectClick('open_preview_link', {
                            destination: project.link ? 'project_website' : 'github',
                        })}
                        className="block"
                    >
                        <div className="relative aspect-video rounded-lg overflow-hidden border border-glass-border bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt={`${project.title} thumbnail`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.45),transparent_40%)]" />
                            )}
                            {!previewImage && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-black/55 border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                            {!previewImage && (
                                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent">
                                    <p className="text-xs uppercase tracking-wider text-gray-200">Preview</p>
                                </div>
                            )}
                        </div>
                    </a>
                ) : (
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-glass-border bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
                        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.45),transparent_40%)]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-black/55 border border-white/30 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-xs uppercase tracking-wider text-gray-200">Placeholder Preview</p>
                        </div>
                    </div>
                )}
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-cyan transition-colors">
                {project.title}
            </h3>

            <p className="text-gray-400 text-sm mb-4 flex-grow">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-deep-space border border-glass-border text-gray-400 rounded"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-glass-border">
                {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProjectClick('open_project', {
                            destination: 'project_website',
                        })}
                        className="flex items-center gap-2 text-sm text-cyber-cyan hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {project.title === 'Dismantling Transformers' ? 'See Website' : 'Technical Docs'}
                    </a>
                )}
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProjectClick('open_source', {
                            destination: 'github',
                        })}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        Source
                    </a>
                )}
                {onTechnicalDocs && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                trackProjectClick('open_technical_docs');
                                onTechnicalDocs();
                            }}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Technical Docs
                        </button>
                        {onCopyLink && (
                            <button
                                onClick={(e) => {
                                    trackProjectClick('copy_direct_link');
                                    e.stopPropagation();
                                    onCopyLink();
                                }}
                                className={`p-1 rounded transition-all duration-300 ${copyFeedback ? 'bg-cyber-cyan/20 text-cyber-cyan shadow-glow' : 'text-gray-500 hover:text-cyber-cyan'}`}
                                title="Copy direct link"
                            >
                                {copyFeedback ? (
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                )}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </GlassSegment>
    );
};

export default Projects;
