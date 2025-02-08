import { useState, useEffect, } from "react";

export const useDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest('.dropdown-container')) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return { dropdownOpen, setDropdownOpen }
}