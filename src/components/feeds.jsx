import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Feeds({ post }) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    const handleLike = () => {
        setLiked(!liked);
    };

    const handleSave = () => {
        setSaved(!saved);
    };

    const handleClick = () => {
        navigate(`/post/${post.id}`); // Navigate to the post detail page
    };

    return (
        <div className="relative bg-white rounded m-4 shadow-md mb-4 overflow-hidden" onClick={handleClick}>
            {/* Title Section */}
            <h3 className="text-lg h-40 text-gray-800 font-bold p-4">title 1 </h3>

            {/* Description Section */}
            <div className="relative p-4">
                <p className="description-text line-clamp-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quo nemo doloremque sit sapiente nesciunt debitis qui, veritatis aut eos voluptas quas illo. Illum commodi quasi sunt minima placeat eos pariatur atque.
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            {/* Action Icons */}
            <div className="flex justify-start p-4 space-x-4">
                <button onClick={handleLike} className="flex items-center">
                    <svg
                        className={`w-6 h-6 ${liked ? 'text-red-500' : 'text-gray-400'}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </button>


                {/* Comment Button */}
                <button className="flex items-center">
                    <svg
                        className="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M20 2H4C2.9 2 2 2.9 2 4v12c0 1.1.9 2 2 2h2v4l4-4h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                </button>

                {/* Save Button */}
                <button onClick={handleSave} className="flex items-center">
                    <svg
                        className={`w-6 h-6 ${saved ? 'text-blue-500' : 'text-gray-400'}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-4 7 4V5c0-1.1-.9-2-2-2z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Feeds;