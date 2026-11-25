import { proxyAuthPost } from '../../../server/proxyAuthPost.js'

export default function handler(request, response) {
  return proxyAuthPost(request, response, 'login', 'Could not connect to the login server. Please try again.')
}
