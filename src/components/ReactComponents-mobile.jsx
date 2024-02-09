import React, { useState, useRef, useEffect } from 'react';

const NavigationItem = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleSubmenu = (e) => {
        console.log(`${title} isOpen:`, !isOpen); // Log the expected new value since setState is async

        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <>
            <a href="#" onClick={toggleSubmenu} className="text-stone-300 block w-full py-3 px-4">
                {title}
            </a>

            {isOpen && <div className="ml-4">
                {items.map((item, index) => (
                    <a key={index} href={item.url} className="text-stone-300 block w-full py-3 px-4">
                        {item.text}
                    </a>
                ))}
            </div>}
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