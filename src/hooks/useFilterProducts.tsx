import { useMemo, useState } from "react";
import { Product } from "../components/MainContent";
import { useFilter } from "../shared/FilterContext";

interface UseFilterProductsProps {
    products: Product[];
    callback: (value: boolean) => void;
}

interface FilteredProducts {
    filter: string;
    handleFilterChange: (filterType: string) => void;
    filteredProducts: Product[];
}

export const useFilterProducts = ({ products, callback }: UseFilterProductsProps): FilteredProducts => {
    const [filter, setFilter] = useState<string>('all');
    const {
        searchQuery,
        selectedCategory,
        minPrice,
        maxPrice,
    } = useFilter();

    const handleFilterChange = (filterType: string) => {
        setFilter(filterType);
        callback(false);
    };

    const filteredProducts = useMemo(() => {
        const lowerCasedQuery = searchQuery?.toLowerCase() || '';

        let result = products.filter(product =>
            (!selectedCategory || product.category === selectedCategory) &&
            (!minPrice || product.price >= minPrice) &&
            (!maxPrice || product.price <= maxPrice) &&
            (!searchQuery || product.title.toLowerCase().includes(lowerCasedQuery))
        );

        if (filter === 'cheap') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (filter === 'expensive') {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (filter === 'popular') {
            result = [...result].sort((a, b) => b.rating - a.rating);
        }

        return result;
    }, [products, selectedCategory, minPrice, maxPrice, searchQuery, filter]);

    return { filter, handleFilterChange, filteredProducts };
};
