import { createContext, ReactNode, useContext, useState } from "react";

interface FilterContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    minPrice: number | undefined;
    setMinPrice: (price: number | undefined) => void;
    maxPrice: number | undefined;
    setMaxPrice: (price: number | undefined) => void;
    keyword: string | undefined;
    setKeyword: (keyword: string) => void;
    handleResetFilters: () => void;
};

const FilterContext = createContext<FilterContextType | null>(null);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
    const [keyword, setKeyword] = useState<string>('');

    console.log(selectedCategory);


    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setKeyword('');
    }

    return (
        <FilterContext.Provider value={{
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
        }}>
            {children}
        </FilterContext.Provider>
    )
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) throw new Error("useFilter must be used within a FilterProvider");
    return context;
};