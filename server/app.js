import express from 'express';
import myRoute from './routes/routes';
const app = express();
import bodyParser from 'body-Parser';
const port = process.env.port || 8000;

app.get('/',  (req, res) => {
    res.send({
        message:"welcome to fast food app"
    })

    
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/v1', myRoute)


app.listen(port, (req,res) =>{

    console.log(`application listening on port ${port}...`)
})