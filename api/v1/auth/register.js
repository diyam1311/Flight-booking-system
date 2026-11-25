import { proxyAuthPost } from '../../../server/proxyAuthPost.js'

export default function handler(request, response) {
  return proxyAuthPost(request, response, 'register', 'Could not connect to the registration server. Please try again.')
}
