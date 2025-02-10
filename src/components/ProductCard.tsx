import { Link } from 'react-router-dom';
import { Product } from './MainContent';

type ProductCardType = {
    product: Product;
}
const ProductCard = ({ product: { id, title, thumbnail, price } }: ProductCardType) => {
    return (
        <div className='border p-4 rounded flex flex-col h-full'>
            <Link to={`/product/${id}`} className='flex flex-col h-full'>
                <img
                    src={thumbnail}
                    alt={title}
                    className='w-full h-32 object-cover mb-2'
                />
                <h2 className='font-bold flex-grow'>{title}</h2>
                <p className='mt-auto font-semibold'>${price}</p>
            </Link>
        </div>
    )
};

export default ProductCard;
