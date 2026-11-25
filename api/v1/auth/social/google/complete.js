import { proxyAuthPost } from '../../../../../server/proxyAuthPost.js'

export default function handler(request, response) {
  return proxyAuthPost(request, response, 'social/google/complete', 'Google sign-in failed. Please try again.')
}
