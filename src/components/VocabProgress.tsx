interface VocabProgressProps{
    total: number;
    current: number;
    title?: string;
}

const VocabProgress = ({total, current, title}: VocabProgressProps) => {
 const segments = Array.from({ length: total });

  return (
    <div className="flex flex-col">
        <div className="flex border border-gray-200">
        {segments.map((_, index) => (
            <div
            key={index}
            className={`h-4 flex-1 ${
                index < current ? 'bg-primary-1' : 'bg-white'
            }`}
            ></div>
        ))}
        </div>
        {title && <span className="text-base-16 font-medium dark:text-white">{title}</span>}
    </div>
  );
}

export default VocabProgress