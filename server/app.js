import express from 'express';
import bodyParser from 'body-parser';
import myRoute from './routes/routes';


const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/',  (req, res) => {
    res.send({
        message:"welcome to fast food app"
    }) 
})
app.use('*',  (req, res) => {
    res.status(404).send({       //added route to catch all error
        message:"bad request"
    }) 
})

app.use('/api/v1', myRoute)

app.listen(port, (req,res) =>{

    console.log(`application listening on port ${port}...`)
})


export default app;