const express = require('express');
const app = express();

//Here this line we have to search what does this line do internally 
//As it enables the body object for POST requests 
//why is require not used here and what is use
app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

app.get('/', (req, res) => {
    res.send('Hello World..!!');
});

//Get all courses
app.get('/api/courses', (req,res) => {
    res.send(courses);
});

//Get courses by id 
app.get('/api/courses/:id', (req, res) => {
    // const course = courses.find(function(c){
    //     console.log(c);
    //     if(c.id ===parseInt(req.params.id)){
    //         return c;
    //     };        
    // });
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course){
        res.status(404).send(`The course with id ${req.params.id} was not found`);
    }
    else{
        res.send(course);
    }
    
});

//How to handle POST requests 
app.post('/api/courses',(req,res)=>{

    //validation 
    if(!req.body.name || req.body.name.length <= 3){
        res.status(400).send('Name is required and its length should be greater than 3');
        return;
    }
    const course = {
        id: courses.length +1,
        //here the body object is not enabled in the node js by default. 
        //We have to explicitly require it 
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

//Get request can have more than one params
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

//Get request can have query params which includes the parameters after question mark
app.get('/api/postsQuery/:year/:month', (req, res) => {
    res.send(req.query);
});

//PORT from the Environment Variable where we declare JAV_HOME or JRE_HOME
const port = process.env.NODE_EXAMPLE_PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}...`));