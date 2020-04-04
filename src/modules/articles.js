import axios from 'axios'

const articles = async () => {
  debugger
  let response = await axios.get("/articles")
  return response.data
}

export {articles}