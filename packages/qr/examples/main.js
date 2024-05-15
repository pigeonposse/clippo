import { qrcode } from '@clippo/qr'
( async () => {

	try {

		const qrString = await qrcode( 'https://clippo.pigeonposse.com' )
		console.log( qrString )
	
	} catch ( error ) {

		console.error( 'Error generating QR code:', error )
	
	}

} )()
