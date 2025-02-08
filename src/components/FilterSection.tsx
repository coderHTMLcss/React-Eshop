interface FilterSectionProps {
    title: string;
    children: React.ReactNode;
}

const FilterSection = ({ title, children }: FilterSectionProps) => (
    <section className='mb-5 mt-4'>
        <h2 className='text-xl font-semibold mb-3'>{title}</h2>
        {children}
    </section>
);

export default FilterSection;