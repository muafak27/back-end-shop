const {Schema, model} = require('mongoose')

const deliveruAddressSchema = Schema({
    nama: {
        type: String,
        required: [true, 'nama alamat harus diisi'],
        maxlength: [255, 'panjang maksimal nama alamat adalah 255 karakter']
    },

    kelurahan: {
        type: String,type: String,
        required: [true, 'kelurahan harus diisi'],
        maxlength: [255, 'panjang maksimal nama kelurahan adalah 255 karakter']
    },

    kecamatan: {
        type: String,
        required: [true, 'kecamatan harus diisi'],
        maxlength: [255, 'panjang maksimal nama kecamatan adalah 255 karakter']
    },

    kabupaten: {
        type: String,
        required: [true, 'kabupaten harus diisi'],
        maxlength: [255, 'panjang maksimal nama kabupaten adalah 255 karakter']
    },

    provinsi: {
        type: String,
        required: [true, 'provinsi harus diisi'],
        maxlength: [255, 'panjang maksimal provinsi adalah 255 karakter']
    },

    detail: {
        type: String,
        required: [true, 'detail harus diisi'],
        maxlength: [1000, 'panjang maksimal detail adalah 1000 karakter']
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

module.exports = model('DeliveryAddress', deliveruAddressSchema)