////////////////////////////////
// Upload files to Cloudinary //
////////////////////////////////
const multer = require('multer')
const stream = require('stream')
const cloudinary = require('cloudinary')

// if (!process.env.CLOUDINARY_URL) {
//     console.error('*******************************************************************************')
//     console.error('*******************************************************************************\n')
//     console.error('You must set the CLOUDINARY_URL environment variable for Cloudinary to function\n')
//     console.error('\texport CLOUDINARY_URL="cloudinary:// get value from heroku"\n')
//     console.error('*******************************************************************************')
//     console.error('*******************************************************************************')
//     process.exit(1)
// }

if (!process.env.CLOUDINARY_URL) {
    process.env.CLOUDINARY_URL = "CLOUDINARY_URL=cloudinary://733716392639921:0N7vPwQTgA9M6-x1ancfUvsyBDs@hcluweggq";
}

cloudinary.config({
    cloud_name: 'hcluweggq',
    api_key: '733716392639921',
    api_secret: '0N7vPwQTgA9M6-x1ancfUvsyBDs'
});

const doUpload = (publicId, req, res, next) => {

	const uploadStream = cloudinary.uploader.upload_stream(result => {    	
         // capture the url and public_id and add to the request
         req.fileurl = result.url
         req.fileid = result.public_id
         next()
	}, { public_id: req.body[publicId]})

	

	// multer can save the file locally if we want
	// instead of saving locally, we keep the file in memory
	// multer provides req.file and within that is the byte buffer

	// we create a passthrough stream to pipe the buffer
	// to the uploadStream function for cloudinary.
	const s = new stream.PassThrough()

	// console.log(uploadStream)

	s.end(req.file.buffer)

	s.pipe(uploadStream)
	s.on('end', uploadStream.end)
	// and the end of the buffer we tell cloudinary to end the upload.
}

// multer parses multipart form data.  Here we tell
// it to expect a single file upload named 'image'
// Read this function carefully so you understand
// what it is doing!
const uploadImage = (publicId) => (req, res, next) =>
     multer().single('image')(req, res, () => 
               doUpload(publicId, req, res, next))

///////////////////////////////////////////////////////////////////////////////
// These three functions are examples to validate that uploading works
// You do not want them in your final application
// 
module.exports = uploadImage
// 
// then to use in profile.js do (see comment in getImage about the string 'avatar')
//     const uploadImage = require('./uploadCloudinary')
//     app.put('/avatar', uploadImage('avatar'), uploadAvatar)
//
///////////////////////////////////////////////////////////////////////////////

