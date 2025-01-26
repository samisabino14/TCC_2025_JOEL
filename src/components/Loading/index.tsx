interface ComponentProps {
    size: number
}

export default function Loading({ size }: ComponentProps) {

    return (
        <div className='flex justify-center items-center mb-4 text-sm rounded-lg h-[10vh]'>

            <svg
                className={`animate-spin h-${size} w-${size} text-amber-400 right-3`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
            </svg>
        </div>
    )
}