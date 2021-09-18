const path=require('path')
const express=require('express')
const hbs = require('hbs');
const req =require('request')
 
const geo =require('./utils/geoGode');
const forecast=require('./utils/weather');
console.log(__dirname)


//define paths for express config
const viewPath= path.join(__dirname,'../templates/views')
const publicPath = path.join(__dirname,'../public')
const partialsPath= path.join(__dirname,'../templates/partials')



const app = express()
const port=process.env.PORT || 3000

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath);
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicPath))
 

app.get('', (req,res) => {
    res.render('index',{
        title: 'weather',
          name: 'Tharulela'})
})

app.get('/help', (req,res) =>
{
    
    res.render('help',{
        title: 'Help Page',
     message: 'this is a help page we encountered an error when loading your file ',
     name: 'Tharulela'})
})

app.get('/weather', (req,res) =>
{
    if(!req.query.address)
    {
        return res.send(
            {
                error :'Address must be entered!!'
            }
        )
    }
    geo(req.query.address, (error,{longitude,lattitude,location}={})=>
    {
        
		if(error){

           return res.send(
                {
                     error
                }
            )
        }
        else{
            forecast(longitude, lattitude, (error,{weatherdescription, temperature,feelslike }={}
                ) => {
                if(error){

                   return  res.send(
                        {
                             error
                        }
                    )
                }  else{            
                        res.send({
                         location,
                        description : "Today is " + weatherdescription + ". The temperature is " + temperature + " althought is feels like it is " +feelslike
                      

                         }
                        )
                        }
                    });
        }
    })
   
})
app.get('/products', (req,res) =>{
    if(!req.query.search)
    {
      return   res.send(
            {
                error: 'you must provide a search time'
            }
        )
    }
    console.log(req.query.search)
    res.send(
        {
            products : []
        }
    )
})

app.get('/about', (req,res) =>
{
    res.render('about',{
             title: 'About Me',
          name: 'Tharulela'})
})
app.get('/help/*',(req,res) =>
{ 
    res.render('pageNotFound',{
        title: 'Help Page',
     message: 'Help article not found',
     name: 'Tharulela'})
})
app.get('*', (req,res) => {
    
    res.render('pageNotFound',{
        title: 'Help Page',
     message: 'The requested page is not found ',
     name: 'Tharulela'})
})

app.listen(port, ( ) => {
    console.log('server is running at port ' + port)
})


