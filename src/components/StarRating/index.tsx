import { useState } from 'react';

const StarRating = ({ rating }) => {
    const [hover, setHover] = useState(0);

    return (
        <span className="flex items-center gap-2 text-[10px]">
            <span className='mt-1'>
                {Number(rating).toFixed(1)}
            </span>
            <span>
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            key={index}
                            type="button"
                            className={`text-sm ${index <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            &#9733;
                        </button>
                    );
                })}
            </span>
            <span>(2.327)</span>
        </span>
    );
};

export default StarRating;
