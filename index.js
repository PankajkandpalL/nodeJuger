const express = require("express")
const { connection } = require("./config/db")
const { userRoute } = require("./routes/user.route")
const { postRoute } = require("./routes/post.route")
const { rateLimiter } = require("./middleware/rateLimiter.middleware")

const app = express()
app.use(express.json())
app.use("/posts", rateLimiter)

app.use("/users", userRoute)
app.use("/posts", postRoute)

app.listen(3030, async()=>{
    try{
        await connection();
    }catch(err){
        console.log(err)
    }
    console.log("Server is running...")
})

module.exports={app}