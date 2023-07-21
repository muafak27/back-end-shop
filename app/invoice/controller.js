const {subject} = require('@casl/ability')
const Invoice = require('./model')
const {PolicyFor} = require('../../utils/index')

const show = async(req, res, next) => {
    try {
        let {order_id} = req.params
        let invoice = await Invoice
            .findOne({order: order_id})
            .populate('order')
            .populate('user')

        let policy = PolicyFor(req.user)
        let subjectInvoice = subject('Invoice', {...invoice, user_id: invoice.user._id})
        if(!policy.can('read', subjectInvoice)) {
            return res.json({
                error: 1,
                message: 'anda tidak memiliki akses untuk melihat invoice ini'
            })
        }

        // if(!policy.can('read', 'Invoice')) {
        //     return res.json({
        //         error: 1,
        //         message: 'you are not allowed to perform this action'
        //     })
        // }

        return res.json(invoice)
    } catch (err) {
        if (err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        };
        next(err)
    }
}

module.exports = {
    show
}