import { Router } from 'express'
import * as businessCtrl from '../controllers/businesses.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
const router = Router()

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, businessCtrl.index)
router.get('/:id',checkAuth, businessCtrl.show)
router.post('/', businessCtrl.create)
router.put('/:id', checkAuth, businessCtrl.update)
router.delete('/:id', checkAuth, businessCtrl.delete)
router.post('/:id/reviews', checkAuth, businessCtrl.addReview)
router.delete('/:id/:reviewId', checkAuth, businessCtrl.deleteReview)

export {
  router
}
