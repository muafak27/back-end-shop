const router = require('express').Router()
const deliveryAddressController = require('./controller')
const {police_check} = require('../../middleware/index')

router.post('/delivery-address', 
    // police_check('create', 'DeliveryAddresses'),
    deliveryAddressController.store
)
router.put('/delivery-address/:id', deliveryAddressController.update)
router.delete('/delivery-address/:id', deliveryAddressController.destroy)
router.get('/delivery-address',
    police_check('view', 'DeliveryAddress'),
    deliveryAddressController.index
)
module.exports = router