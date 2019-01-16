import express from 'express';
import bodyParser from 'body-parser';
import rout from './routes/route';
const app = express();
import cors from 'cors';
 
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/',  (req, res) => {
    res.send({
        message:"welcome to fast food app"
    }) 
})

    app.use('/api/v1', rout)

 //added route to catch all errors
app.use('*',  (req, res) => {
    res.status(404);
    res.json({      
        status:"failed",
        message:"page not found"

    });
});

app.listen(port, (req,res) =>{

    console.log(`application listening on port ${port}...`)
});


export default app;
