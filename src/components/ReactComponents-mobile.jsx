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
            <a href="#" onClick={toggleSubmenu} className="text-sm text-stone-200 block w-full py-3 px-4 cursor-pointer">
                {title}
            </a>
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
                    className={`text-sm text-stone-400 bg-stone-900 block w-full py-3 px-8 ${index < items.length - 1 ? 'border-b border-stone-700' : ''}`}
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
            <button id="menuBtn" className="lg:hidden flex flex-col h-4 w-5 z-10 justify-between items-center" onClick={toggleNav}>
                <span className="inline-block h-0.5 w-full bg-gray-700 duration-300"></span>
                <span className="inline-block h-0.5 w-full bg-gray-700 duration-300"></span>
                <span className="inline-block h-0.5 w-full bg-gray-700 duration-300"></span>
            </button>
            <nav id="mobileNav" className={`fixed top-0 right-0 ${isNavOpen ? '' : 'hidden'} h-screen w-52 flex-col justify-start overflow-y-scroll bg-black/[0.65] border-zinc-600 border-solid text-white`}>
                {dropdownMenus.map((menu, index) => (
                    <NavigationItem key={index} {...menu} />
                ))}
            </nav>
        </>
    );
};

export default MobileNav;