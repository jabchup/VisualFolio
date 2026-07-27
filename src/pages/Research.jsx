const Research = () => {
    return (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    <span style={{ fontFamily: "'Playfair Display', serif" }}>Research</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <article className="bg-glass-dark border border-glass-border border-dashed rounded-lg p-10 text-center">
                    <p className="text-gray-400 text-lg mb-2">Publications — Coming Soon</p>
                    <p className="text-gray-500 text-sm">Research in progress. Stay tuned.</p>
                </article>
            </div>
        </div>
    );
};

export default Research;
