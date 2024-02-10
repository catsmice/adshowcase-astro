import React, { useState, useEffect, useRef } from 'react';

const NavigationItem = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const submenuRef = useRef(null);

    // Toggle function for opening/closing the submenu
    const toggleSubmenu = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // Adjust the maxHeight based on isOpen state
        if (submenuRef.current) {
            if (isOpen) {
                // Set maxHeight to submenu's scrollHeight to open it
                submenuRef.current.style.maxHeight = `${submenuRef.current.scrollHeight}px`;
            } else {
                // Set maxHeight to 0 to close it
                submenuRef.current.style.maxHeight = '0';
            }
        }
    }, [isOpen]); // Depend on isOpen to trigger the effect

    return (
        <>
            <div className="flex justify-between items-center text-sm text-stone-200 w-full py-3 px-4 cursor-pointer">
                <a href="#" onClick={toggleSubmenu}>
                    {title}
                </a>
                {/* Expand button */}
                <button onClick={toggleSubmenu} className="transform duration-300" style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                    <span className="material-symbols-outlined">expand_more</span> {/* Downward arrow character, rotates on toggle */}
                </button>
            </div>
            {/* Submenu container with CSS transition for maxHeight */}
            <div
                ref={submenuRef}
                className="overflow-hidden transition-max-height duration-300 ease-out"
                style={{ maxHeight: '0' }}
            >
                {items.map((item, index) => (
                    <a 
                        key={index} 
                        href={item.url} 
                        className={`block w-full py-3 px-8 text-sm text-stone-400 bg-stone-900 ${index < items.length - 1 ? 'border-b border-stone-700' : ''}`}
                    >
                        {item.text}
                    </a>
                ))}
            </div>
        </>
    );
};

const MobileNav = ({ dropdownMenus }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <>
            {/* Conditional rendering for menu button and close button */}
            {!isNavOpen ? (
                <button id="menuBtn" className="lg:hidden fixed top-6 right-5 z-20 flex flex-col h-4 w-5 justify-between items-center" onClick={toggleNav}>
                    <span className="inline-block h-0.5 w-full bg-gray-700 duration-300"></span>
                    <span className="inline-block h-0.5 w-full bg-gray-700 duration-300"></span>
                    <span className="inline-block h-0.5 w-full bg-gray-700 duration-300"></span>
                </button>
            ) : (
                <button id="closeBtn" className="lg:hidden fixed top-2 right-2 z-20 p-2 text-white" onClick={toggleNav}>
                    <span className="material-symbols-outlined">close</span>                
                </button>
            )}
            
            <nav id="mobileNav" 
                className={`fixed top-0 right-0 h-screen w-52 flex-col justify-start overflow-y-scroll bg-black/[0.65] border-zinc-600 border-solid text-white transform transition-transform duration-300 ease-in-out ${isNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Ensure navigation items are placed below the close button by adjusting padding or margin as necessary */}
                <div className="pt-12">
                    {dropdownMenus.map((menu, index) => (
                        <NavigationItem key={index} {...menu} />
                    ))}
                </div>
            </nav>
        </>
    );
};

export default MobileNav;