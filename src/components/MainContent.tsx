import { useEffect, useState } from 'react';
import { useFilter } from '../shared/FilterContext';
import { Tally3 } from 'lucide-react';
import { useDropdown } from './hooks/useDropdown';
import axios from 'axios';

const FILTER_OPTIONS = ['cheap', 'expensive', 'popular'];

const MainContent = () => {
    const {
        searchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        maxPrice,
        keyword
    } = useFilter();

    const { dropdownOpen, setDropdownOpen } = useDropdown()

    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);


    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;

    useEffect(() => {
        const controller = new AbortController();

        const fetchProducts = async () => {
            try {
                let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${startIndex}`;
                if (keyword) {
                    url = `https://dummyjson.com/products/search?q=${keyword}`;
                }

                const response = await axios.get(url, { signal: controller.signal });
                setProducts(response.data.products);

            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('The request has been cancelled:', error.message);
                } else {
                    console.error('Error downloading:', error);
                }
            }
        };

        fetchProducts();

        return () => {
            controller.abort();
        };
    }, [startIndex, keyword]);

    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    const handleFilterChange = (filterType: string) => {
        setFilter(filterType);
        setDropdownOpen(false);
    };

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
                    {/**BookCard */}
                    {products.length > 0 && products.map((product) => {
                        return <div className=''>
                            <h1>{product.title}</h1>
                        </div>
                    })}
                </div>
            </div>
        </section>
    );
};

export default MainContent;
