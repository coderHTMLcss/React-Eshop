import { ChangeEvent, useEffect, useState } from 'react';
import { useFilter } from '../shared/FilterContext';
import FilterSection from './FilterSection';

interface Product {
    category: string;
}

interface FetchResponse {
    products: Product[];
}

const KEYWORDS = ['apple', 'watch', 'fashion', 'trend', 'shoes', 'shirt'];

const Sidebar = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword,
        handleResetFilters
    } = useFilter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data: FetchResponse = await response.json();
                const uniqueCategories = [...new Set(data.products.map(product => product.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchCategories();
    }, []);

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const value = e.target.value ? parseFloat(e.target.value) : undefined;
        if (type === 'min') {
            setMinPrice(value);
        } else {
            setMaxPrice(value);
        }
    };

    return (
        <div className='w-64 p-5 h-screen'>
            <h1 className='text-2xl font-bold mb-10 mt-4'>Online Store</h1>

            <input
                type='text'
                className='border-2 rounded px-2 sm:mb-0 w-full'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search Product...'
            />

            <div className='flex justify-center items-center mt-4'>
                <input
                    type='number'
                    className='border-2 mr-2 px-2 py-1 w-full'
                    placeholder='Min'
                    value={minPrice || ''}
                    onChange={(e) => handlePriceChange(e, 'min')}
                />
                <input
                    type='number'
                    className='border-2 px-2 py-1 w-full'
                    placeholder='Max'
                    value={maxPrice || ''}
                    onChange={(e) => handlePriceChange(e, 'max')}
                />
            </div>

            <FilterSection title='Categories'>
                {categories.map((category) => (
                    <label key={category} className='block mb-2'>
                        <input
                            type='radio'
                            name='category'
                            value={category}
                            className='mr-2 w-4 h-4 cursor-pointer'
                            checked={selectedCategory === category}
                            onChange={() => setSelectedCategory(category)}
                        />
                        {category.toUpperCase()}
                    </label>
                ))}
            </FilterSection>

            <FilterSection title='Keywords'>
                {KEYWORDS.map((kw) => (
                    <button
                        key={kw}
                        className={`block mb-2 py-2 px-2 w-full text-left border-2 rounded-md hover:bg-gray-300 ${keyword === kw ? 'bg-gray-300' : ''}`}
                        onClick={() => setKeyword(kw)}
                    >
                        {kw.toUpperCase()}
                    </button>
                ))}
            </FilterSection>

            <button
                className='w-full py-2 bg-black text-white rounded mt-5 hover:bg-gray-900'
                onClick={handleResetFilters}
            >
                Reset Filters
            </button>
        </div>
    );
};


export default Sidebar;
