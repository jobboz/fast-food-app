import express from 'express';
import bodyParser from 'body-parser';
import myRoute from './routes/get';
import route from './routes/create';
import router from './routes/modify';
import myRouter from './routes/delete';
import rout from './routes/route';
const app = express();
const port = process.env.PORT || 5000;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/',  (req, res) => {
    res.send({
        message:"welcome to fast food app"
    }) 
})

app.use('/api/v1', rout)
 //app.use('/api/v1', myRoute)
 // app.use('/api/v1', route)
// app.use('/api/v1', router)
// app.use('/api/v1', myRouter)

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
