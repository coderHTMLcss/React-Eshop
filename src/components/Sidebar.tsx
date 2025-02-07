import React from 'react'

interface Product {
    category: string;
}

interface FetchResponse {
    products: Product[];
}
const Sidebar = () => {
    const [categories, setCategories] = React.useState<string[]>([]);
    const [keywords] = React.useState<string[]>([
        'apple',
        'watch',
        'fashion',
        'trend',
        'shoes',
        'shirt'
    ]);

    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data: FetchResponse = await response.json();
                const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)));
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching product', error)
            }
        }

        fetchCategories();
    }, []);

    return (
        <div className='w-64 p-5 h-screen'>
            <h1 className='text-2xl font-bold mb-10 mt-4'>Online Store</h1>
            <section>
                <input
                    type="text"
                    className='border-2 rounded px-2 sm:mb-0'
                    placeholder='Search Product...'
                />
                <div className='flex justify-center items-center'>
                    <input type="text" className='border-2 mr-2 px-5 py-3 mb-3 w-full' placeholder='Min' />
                    <input type="text" className='border-2 mr-2 px-5 py-3 mb-3 w-full' placeholder='Max' />
                </div>

                <section>
                    <div className='mb-5'>
                        <h2 className='text-xl font-semibold mb-3'>Categories</h2>
                    </div>
                    {categories.length > 0 && categories.map(category => {
                        return <label key={category} className='block mb-2'>
                            <input
                                type="radio"
                                name={category}
                                value={category}
                                className='mr-2 w-[16px] h-[16px]'
                            />
                            {category.toUpperCase()}
                        </label>
                    })}
                </section>

                <section>
                    <div className='mb-5 mt-4'>
                        <h2 className='text-xl font-semibold mb-3'>Keywords</h2>
                    </div>

                    {keywords.length > 0 && keywords.map(keyword => {
                        return <button
                            key={keyword}
                            className='block mb-2 py-2 px-2 w-full text-left border-2 rounded-md'
                        >
                            {keyword.toUpperCase()}
                        </button>
                    })}
                </section>

            </section>
        </div >
    )
}

export default Sidebar


