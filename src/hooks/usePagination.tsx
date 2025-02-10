import { useState } from "react";

export const usePagination = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;

    const totalProducts = 100;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const getPaginationButtons = () => {
        const buttons: (number | string)[] = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            buttons.push(1);
            if (startPage > 2) buttons.push('...');
        }

        for (let page = startPage; page <= endPage; page++) {
            buttons.push(page);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) buttons.push('...');
            buttons.push(totalPages);
        }

        return buttons;
    };

    const paginationButtons = getPaginationButtons();

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return {
        currentPage,
        handlePageChange,
        paginationButtons,
        startIndex,
        itemsPerPage,
        totalPages
    }
};