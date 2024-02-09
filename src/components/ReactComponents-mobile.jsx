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
                    <a key={index} href={item.url} className="text-sm text-stone-400 bg-stone-900 block w-full py-3 px-8">
                        {item.text}
                    </a>
                ))}
            </div>
        </>
    );
};

const MobileNav = ({ dropdownMenus }) => {
    return (
        <>
            {dropdownMenus.map((menu, index) => (
                <NavigationItem key={index} {...menu} />
            ))}
        </>
    );
};

export default MobileNav;
