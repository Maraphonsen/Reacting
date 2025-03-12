import React from "react";
import MyButton from "./UI/button/MyButton";
import { useNavigate } from 'react-router-dom'; // Используем useNavigate вместо useHistory

const PostItem = (props) => {
  const navigate = useNavigate(); // Заменяем useHistory на useNavigate

  return (
    <div className="post">
      <div className="post__content">
        <strong>{props.post.id}. {props.post.title}</strong>
        <div>
          {props.post.body}
        </div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}> {/* Используем navigate */}
          Открыть
        </MyButton>
        <MyButton onClick={() => props.remove(props.post)}>
          Удалить
        </MyButton>
      </div>
    </div>
  );
};

export default PostItem;