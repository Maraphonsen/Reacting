import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';

const PostIdePage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostsById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });

    const [fetchComents, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostsById(params.id);
        fetchComents(params.id);
    }, [params.id]);

    return (
        <div>
            <h1>Post ID = {params.id}</h1>
            {isLoading
                ? <Loader />
                : post && (
                    <div>
                        {post.id}. {post.title}
                    </div>
                )
            }
            <h1>Comments</h1>
            {isComLoading
                ? <Loader />
                : <div>
                    {comments.map(comment => (
                        <div key={comment.id} style={{ marginTop: 15 }}>
                            <h5>{comment.email}</h5>
                            <div>{comment.body}</div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default PostIdePage;