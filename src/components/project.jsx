import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa'; // Import the download icon
import { FaHeart, FaComment, FaSave, FaStar } from 'react-icons/fa'; // Importing icons from react-icons

const ProjectDetail = () => {
    const { id } = useParams(); // Get the project ID from the URL parameters
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ratings, setRating] = useState(0); // To store the rating
    const [feedback, setFeedback] = useState(''); // To store the feedback
    const [isProfessor, setIsProfessor] = useState(false); // To check if the user is a professor
    const [likes, setLikes] = useState(0); // To store likes count
    const [showCommentInput, setShowCommentInput] = useState(false); // To toggle comment input visibility
    const [comment, setComment] = useState(''); // To store the comment
    const [comments, setComments] = useState([]); // To store all comments

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.isProfessor) {
            setIsProfessor(true);
        }

        const fetchProjectDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/projects/${id}`); // Fetch project details by ID
                setProject(response.data); // Set the project data
                setLikes(response.data.likes); // Initialize likes count
                setComments(response.data.comments); // Initialize comments
            } catch (error) {
                console.error('Error fetching project details:', error);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchProjectDetail(); // Call the fetch function
    }, [id]); // Run the effect when the ID changes

    const handleRatingChange = (rating) => {
        setRating(rating);
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSubmitFeedback = async () => {
        // Here you can handle the feedback submission logic (e.g., send to backend)
        console.log('Feedback submitted:', feedback);
        console.log('Rating submitted:', ratings);

        // Send updated feedback and rating to the backend
        await axios.put(`http://localhost:5000/projectfeedback/${id}`, {
            feedback: feedback,
            rating: ratings,
        });
    };

    const handleLike = async () => {
        const updatedLikes = likes + 1; // Increase likes count
        setLikes(updatedLikes); // Update local state

        // Send updated likes count to the backend
        await axios.put(`http://localhost:5000/projectlike/${id}`, { likes: updatedLikes });
    };

    const handleCommentIconClick = () => {
        setShowCommentInput(!showCommentInput); // Toggle comment input visibility
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitComment = async () => {
        if (comment.trim()) {
            const updatedComments = [...comments, comment]; // Add new comment to the comments array
            setComments(updatedComments); // Update local state
            setComment(''); // Clear the comment input
            setShowCommentInput(false); // Hide the comment input

            // Send updated comments to the backend
            await axios.put(`http://localhost:5000/projectcomment/${id}`, { comments: updatedComments });
        }
    };

    if (loading) {
        return <div className="text-center text-lg text-gray-500">Loading project details...</div>; // Loading state
    }

    if (!project) {
        return <div className="text-center text-lg text-red-500">No project found.</div>; // Handle case where project is not found
    }

    return (
        <>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <img src={project.imageFile} alt={project.projectTitle} className="w-full h-64 object-cover rounded-t-lg" />
                <div className="p-4">
                    <h2 className="text-3xl font-bold text-gray-800 mt-4">{project.projectTitle}</h2>
                    <p className="text-gray-600 mt-2">{project.projectDescription}</p>
                    <p className="text-gray-500 mt-2">Submitted by: <span className="font-semibold">{project.studentName}</span></p>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                            <button onClick={handleLike} className="flex items-center text-blue-600 hover:text-blue-800">
                                <FaHeart className="mr-1" /> {likes} Likes
                            </button>
                            <button onClick={handleCommentIconClick} className="flex items-center text-blue-600 hover:text-blue-800 ml-4">
                                <FaComment className="mr-1" /> {comments.length} Comments
                            </button>
                        </div>
                        <button className="flex items-center text-green-600 hover:text-green-800">
                            <FaSave className="mr-1" /> Save
                        </button>
                    </div>
                    <a
                        href={project.zipFileUrl} // Ensure this URL points to your ZIP file
                        download
                        className="flex items-center m-2 text-blue-600 hover:text-blue-800 mt-4 inline-block bg-blue-100 p-2 rounded shadow-md transition duration-200"
                    >
                        <FaDownload className="mr-2" /> {/* Download icon */}
                        Download Project ZIP
                    </a>
                    {/* Comment Input Section */}
                    {/* // Replace the comment rendering section in the return statement with this code */}

                    <div className="mb-4 ">
                        <h2 className="text-lg font-bold">Comments</h2>
                        <ul className="list-none mb-4">
                            {comments.map((comment, index) => (
                                <li key={index} className="mb-2 p-2 border rounded bg-gray-100">
                                    <p className="text-gray-800">{comment}</p>
                                </li>
                            ))}
                        </ul>

                        {showCommentInput ? (
                            <div className="flex mb-4">
                                <input
                                    type="text"
                                    value={comment}
                                    onChange={handleCommentChange}
                                    placeholder="Write a comment..."
                                    className="w-full p-2 pl-10 text-sm text-gray-700 border rounded"
                                />
                                <button
                                    onClick={handleSubmitComment}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                                >
                                    Post
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleCommentIconClick}
                                className="bg-gray-200 flex flex-align-center hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded"
                            >
                                <FaComment size={18} />
                                <span className="ml-2">Add a Comment</span>
                            </button>
                        )}
                    </div>

                    {/* Rating and Feedback Section */}
                    {isProfessor && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold">Rate this project:</h3>
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={`cursor-pointer ${ratings >= star ? 'text-yellow-500' : ' text-gray-400'}`}
                                        onClick={() => handleRatingChange(star)}
                                    />
                                ))}
                            </div>
                            <h3 className="text-lg font-semibold mt-4">Leave your feedback:</h3>
                            <textarea
                                value={feedback}
                                onChange={handleFeedbackChange}
                                placeholder="Type your feedback..."
                                className="w-full p-2 border rounded"
                                rows="3"
                            />
                            <button
                                onClick={handleSubmitFeedback}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2"
                            >
                                Submit Feedback
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>{`
            body {
    background: linear-gradient(to right, #2d3748, #1a202c); /* This corresponds to from-gray-800 to gray-900 */
  }
          `}</style>
        </>
    );
};

export default ProjectDetail;