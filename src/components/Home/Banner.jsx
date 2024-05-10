const Banner = () => {
    return (
        <div className="hero h-[700px]" style={{ backgroundImage: 'url(https://i.imgur.com/KHCDSKO.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-4xl">
                    <h1 className="mb-5 text-5xl font-bold">Study Together, Succeed Together</h1>
                    <p className="mb-5">Join our collaborative online platform for group study with friends! Create assignments, complete them together, and empower each other to achieve academic success. Together, we can make learning more engaging and effective.</p>
                    <button className="btn">Get Started</button>
                </div>
            </div>
        </div>

    );
};

export default Banner;