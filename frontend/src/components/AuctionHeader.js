import { Link } from "react-router-dom";
const AuctionHeader = () => {
    return (
        <nav className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <span className="text-2xl font-black text-black"><Link to={'/'}></Link></span>
                    </div>
                </div>
            </div>
        </nav>
    );
    // why do you need a navbar ? it does not go with the design wait bitch maaaaakibhosdaaaaaaaaaaaaaaaaa 
}

export default AuctionHeader;
