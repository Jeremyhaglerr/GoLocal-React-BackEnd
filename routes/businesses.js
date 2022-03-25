import { Router } from 'express'
import * as businessCtrl from '../controllers/businesses.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
const router = Router()

/*---------- Public Routes ----------*/
router.get('/', businessCtrl.index)
router.get('/:id', businessCtrl.show)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', businessCtrl.create)
router.put('/:id', checkAuth, businessCtrl.update)
router.delete('/:id', checkAuth, businessCtrl.delete)

export {
  router
}
