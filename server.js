const express=require('express');
const app=express();
const axios=require('axios');
var bodyParser = require('body-parser')
const expresslayouts=require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
app.set('view engine','ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
app.use(expresslayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true)
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
  }));  
app.use(flash());




app.get('/',(req,res)=>{
    axios.all([axios.get('https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv'),axios.get('https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv')])
    .then((resp)=>{

        arr1=resp[0]['data'].split('\n');
        arr2=(resp[1]['data'].split('\n'));
        arr1.pop();
        arr1.shift();
        arr2.pop();
        arr2.shift();
        data=[...arr1,...arr2]
        if(req.session.book_arr){
            data.push(...req.session.book_arr);
        }
        req.session.books_data=[...data].sort();
        res.render('index.ejs',{books:data.sort()});
    })
})

app.get('/add_book',(req,res)=>{
    res.render('add_book.ejs',{message:req.flash('message')});
})

app.post('/add_book',urlencodedParser,(req,res)=>{
    let data=req.body;
    if(!req.session.book_arr){
        req.session.book_arr=[];
    }
    req.session.book_arr.push(data.title+';'+data.isbn+';'+data.author+';'+data.description);
    req.flash('message', 'The book has been added');
    req.session.books_data.push(data.title+';'+data.isbn+';'+data.author+';'+data.description);
    req.session.books_data.sort();
    res.redirect('/add_book');
})

app.get('/export',(req,res)=>{
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'file.csv',
    header: [
        {id: 'title', title: 'TITLE'},
        {id: 'isbn', title: 'ISBN'},
        {id:'authors',title:'AUTHORS'},
        {id: 'descriptionpublishedat',title:'DESCRIPTION/PUBLISHED AT'}
    ]
});


const records = [];
req.session.books_data.sort();
for(let i of req.session.books_data){
    let temp=i.split(';');
    records.push({title:temp[0],isbn:temp[1],authors:temp[2],descriptionpublishedat:temp[3]});
}
 
csvWriter.writeRecords(records)       
    .then(() => {
        console.log('...Done');
        res.download('file.csv');
    });
})

app.listen(3000,()=>{console.log("Server started")})