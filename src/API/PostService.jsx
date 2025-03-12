import axios from "axios";

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _limit: limit,
              _page: page
            }
          });
          return response;
        } catch (error) {
          console.error("Ошибка при загрузке постов:", error);
          throw error; // Пробросьте ошибку дальше, чтобы её можно было обработать в компоненте
        }
      }
    static async getById(id) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id);
        return response;
    }

    static async getCommentsByPostId(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        return response;
    }
}