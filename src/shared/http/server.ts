import app from "./http";

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log('✔ Server is running on', port)
})