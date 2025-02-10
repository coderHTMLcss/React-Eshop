import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    buttons: (number | string)[];
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, buttons }) => {

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-2">
            <button
                className="px-4 py-2 bg-black hover:bg-gray-900 text-white rounded disabled:opacity-50"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            <div className="flex flex-wrap justify-center gap-1">
                {buttons.length > 0 && buttons.map((page, index) =>
                    typeof page === 'number' ? (
                        <button
                            key={index}
                            onClick={() => onPageChange(page)}
                            className={`border px-4 py-2 rounded-full transition-all duration-300
                                ${page === currentPage ? 'bg-black text-white' : 'hover:bg-gray-200'}
                            `}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={index} className="px-2 py-1 text-gray-500">...</span>
                    )
                )}
            </div>

            <button
                className="px-4 py-2 bg-black hover:bg-gray-900 text-white rounded disabled:opacity-50"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
