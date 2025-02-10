import { useFilter } from '../shared/FilterContext';
import { Tally3 } from 'lucide-react';
import { useDropdown } from '../hooks/useDropdown';
import { useFetchProduct } from '../hooks/useFetchProducts';
import { useFilterProducts } from '../hooks/useFilterProducts';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { usePagination } from '../hooks/usePagination';

const FILTER_OPTIONS: string[] = ['cheap', 'expensive', 'popular'];
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
};
const MainContent = () => {
    const { keyword } = useFilter();
    const { dropdownOpen, setDropdownOpen, toggleDropdown } = useDropdown();
    const { currentPage,
        handlePageChange,
        paginationButtons,
        startIndex,
        itemsPerPage,
        totalPages
    } = usePagination();
    const products: Product[] = useFetchProduct(keyword, startIndex, itemsPerPage);

    const { filter, handleFilterChange, filteredProducts } = useFilterProducts({
        products,
        callback: () => setDropdownOpen(false)
    });

    return (
        <section className='xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5'>
            <div className='mb-5'>
                <div className='flex flex-col sm:flex-row justify-between items-center'>
                    <div className='relative mb-5 mt-5'>
                        <button
                            className='border px-4 py-2 rounded-full flex items-center'
                            onClick={toggleDropdown}
                        >
                            <Tally3 />
                            {filter === 'all' ? 'Filter' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                        {dropdownOpen && (
                            <div className='dropdown-container absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40'>
                                {FILTER_OPTIONS.map(option => (
                                    <button
                                        key={option}
                                        onClick={() => handleFilterChange(option)}
                                        className='block px-4 py-2 w-full text-left hover:bg-gray-300'
                                    >
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className='grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5'>
                    {filteredProducts.length > 0 && filteredProducts.map((product) => {
                        return <ProductCard
                            key={product.id}
                            product={product}
                        />
                    })}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    buttons={paginationButtons}
                />
            </div>
        </section>
    );
};

export default MainContent;
