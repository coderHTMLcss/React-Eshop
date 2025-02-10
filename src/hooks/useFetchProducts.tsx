import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../components/MainContent";
export const useFetchProduct = (keyword: string | undefined, startIndex: number, itemsPerPage: number) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchProducts = async () => {
            try {
                let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${startIndex}`;
                if (keyword) {
                    url = `https://dummyjson.com/products/search?q=${keyword}`;
                }

                const response = await axios.get<{ products: Product[] }>(url, { signal: controller.signal });
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
    }, [startIndex, itemsPerPage, keyword]);

    return products
}