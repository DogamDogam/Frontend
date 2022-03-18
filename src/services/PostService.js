import axios from 'axios'
const POST_API_BASE_URL = 'http://localhost:9090/api/posts'

class PostService {
  getPosts () {
    return axios.get(POST_API_BASE_URL)
  }
}

export default new PostService()
