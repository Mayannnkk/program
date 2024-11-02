import React from 'react';
import { useParams } from 'react-router-dom';

function PostDetail({ posts }) {
    const { postId } = useParams();
    const post = posts.find(p => p.id === parseInt(postId));

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="mt-2">{post.description}</p>
            <h2 className="mt-4 text-xl">Code:</h2>
            <pre className="bg-gray-100 p-2 rounded">{post.code}</pre>
            <div className="mt-4">
                <h3 className="font-semibold">Likes: {post.likes}</h3>
                <h3 className="font-semibold">Comments:</h3>
                <ul>
                    {post.comments.map((comment, index) => (
                        <li key={index} className="border-b py-2">{comment}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PostDetail;