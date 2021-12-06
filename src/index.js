//to start the server and  configure routes 
import express from 'express';
const app = express();

import path from 'path';
//so we can send patch or put requests 
import methodOverride from 'method-override';
//to generate random ids 
import { v4 as uuidv4 } from 'uuid';
uuidv4();

// render html, helps to embed javascript directory inside html
import 'ejs';

// for parsing application json/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method'));

//to render static assets css/js
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'../views'));

const port = 8080;

const comments =[ {
    id: uuidv4(),
    username: 'TRAVELER1-EVANS',
    comment:'Wow this place is very beautiful'
 },
   {
    id: uuidv4(),
    username: 'TRAVELER2-KAREN',
    comment:'Lol that is actually the way to dive'
 },
   {
    id: uuidv4(),
    username: 'TRAVELER3-THOMAS',
    comment:'hmmm i was thinking of going on a vacation next year and this place is list!!!'
 },
   {
    id: uuidv4(),
    username: 'TRAVELER4-KAZIAH',
    comment:'I visited this place a while back but it was not as beautiful as it is now'
 }
]

//Show all comments
app.get('/comments',(_req,res)=>{
  res.render('index',{comments:comments})
})

//New comments
app.get('/comments/new',(_response,res)=>{
  res.render('new')
})


// redirecting New comments 
app.post('/comments',(req,res)=>{
 const {username, comment}= req.body
 comments.push({username,comment,id:uuidv4()})
 console.log(req.body)
res.redirect("/comments")
});


//New comments
app.get('/comments/:id',(req,res) =>{
  const{id} =req.params;
  const comment = comments.find(c => c.id ===id);
  res.render('details',{comment});
})

app.get('/comments/:id/edit',(req,res)=>{
  const{id} =req.params;
  const comment = comments.find(c => c.id ===id);
  res.render('edit',{comment})
})


app.patch('/comments/:id',(req,res)=>{
  const{id} =req.params;
  const newcommentTEXT= req.body.comment
  const findcomment = comments.find(c => c.id ===id);
  findcomment.comment =  newcommentTEXT;
  res.redirect('/comments')
});

app.delete('/comments/:id',(req,res)=>{
  const{id} =req.params;
  comments =comments.filter(c => c.id !==id);
  res.redirect('/comments')
})



app.listen(port,() =>{
    console.log(`Server is listening on port ${port}`)
});

