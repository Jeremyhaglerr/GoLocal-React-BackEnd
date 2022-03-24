import { Router } from 'express'
import * as businessCtrl from '../controllers/businesses.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
const router = Router()

/*---------- Public Routes ----------*/
router.get('/', businessCtrl.index)
router.get('/:id', businessCtrl.show)
router.post('/', businessCtrl.create)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.put('/:id', checkAuth, businessCtrl.update)
router.delete('/:id', checkAuth, businessCtrl.delete)

export {
  router
}
