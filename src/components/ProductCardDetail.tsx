import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "./MainContent";
import axios from "axios";

const ProductCardDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchProductById = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const response = await axios.get<Product>(`https://dummyjson.com/products/${id}`, { signal });
                setProduct(response.data);
                setError(null);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("Request canceled");
                } else {
                    setError("Error loading the product");
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProductById();

        return () => controller.abort();
    }, [id]);

    return (
        <div className="p-4">
            <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-800 text-white rounded mb-4"
            >
                ← Назад
            </button>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {product && (
                <div className="border w-[50%] p-4 rounded shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-center">{product.title}</h1>
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-auto object-contain mx-auto"
                    />
                    <p className="mt-2">{product.description}</p>
                    <div className="flex items-center mt-2">
                        <p className="text-lg font-semibold">${product.price}</p>
                        <p className="ml-10 font-semibold">Rating: {product.rating}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCardDetail;
