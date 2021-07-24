import app from './controllers/server'

const port = process.env.PORT || 3000


app.listen(port, () => {
	console.log('Server is running on:http://localhost:%s', port)
})
