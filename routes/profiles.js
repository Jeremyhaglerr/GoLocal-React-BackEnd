import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/:id', checkAuth, profilesCtrl.show)
router.post('/:id', checkAuth, profilesCtrl.addList)
router.delete('/:id/:listId', checkAuth, profilesCtrl.deleteList)
router.put('/:id', checkAuth, profilesCtrl.addToList)
router.put('/:id/remove', checkAuth, profilesCtrl.removeFromList)


export { router }
