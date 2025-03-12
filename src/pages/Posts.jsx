import { useEffect, useRef, useState } from "react";
import '../styles/App.css';
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/myModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/loader/Loader";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    try {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]); // Добавляем новые посты к существующим
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
    } catch (error) {
      console.error("Ошибка при загрузке постов:", error);
    }
  });
  useObserver(lastElement, page < totalPages && !isPostLoading, isPostLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  };

  return (
    <div className='App'>
      <MyButton style={{ marginTop: 15 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postError &&
        <h1>Произошла ошибка {postError}</h1>
      }
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title='Список постов про JS'
      />
      {isPostLoading &&
        <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
          <Loader />
        </div>
      }
      <div ref={lastElement} style={{ height: 20, background: 'transparent' }} />
      <Pagination
        page={page}
        changePage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;