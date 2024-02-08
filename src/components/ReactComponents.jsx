import React, { useState, useRef, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function ReactComponents() {
    const [isOpen, setIsOpen] = useState(false);
    const closeTimeoutId = useRef(null);

    // Function to open the dropdown immediately
    const openDropdown = () => {
        clearTimeout(closeTimeoutId.current); // Clear any pending timeout to close the dropdown
        setIsOpen(true);
    };

    // Function to close the dropdown with a delay
    const closeDropdownDelayed = () => {
        // Set a timeout to close the dropdown
        closeTimeoutId.current = setTimeout(() => {
            setIsOpen(false);
        }, 300); // Delay in milliseconds
    };

    // Cleanup on component unmount
    useEffect(() => {
        return () => clearTimeout(closeTimeoutId.current);
    }, []);

    return (
        <Dropdown 
            isOpen={isOpen}
            showArrow
            offset={20}
            // Add classNames prop to customize the dropdown menu style
            classNames={{
                base: "before:bg-neutral-700", // change arrow background
                content: "bg-neutral-700/65 rounded-none p-0 m-0" // Apply black background to the dropdown menu content
            }}
        >   
            <DropdownTrigger>
                <a href="#" 
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdownDelayed}
                    class="flex items-center whitespace-nowrap block w-full border-b border-gray-300 px-4 py-3 duration-300 will-change-transform hover:text-gray-400 text-sm lg:border-b-0 lg:px-5 lg:py-1 lg:pb-0" target="_blank">
                    關於我們
                </a>
            </DropdownTrigger>
            <DropdownMenu 
                aria-label="Static Actions" 
                style={{padding:0, margin:0}}
                itemClasses={{
                    base: [
                        "text-white",
                        "transition-opacity",
                        "data-[hover=true]:bg-pink-600 data-[hover=true]:text-white rounded-none",
                        "text-center"                    ]
                }} 
                onMouseEnter={openDropdown} onMouseLeave={closeDropdownDelayed}
            >
                <DropdownItem key="new">New file</DropdownItem>
                <DropdownItem key="copy">Copy link</DropdownItem>
                <DropdownItem key="edit">Edit file</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
