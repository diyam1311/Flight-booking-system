import { proxyAuthPost } from '../../../../../server/proxyAuthPost.js'

export default function handler(request, response) {
  return proxyAuthPost(request, response, 'social/google/challenge', 'Could not start Google sign-in. Please try again.')
}
