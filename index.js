const express =require('express');
const port = 8000;
const path = require('path');

const db =require('./config/mongoose');
const Contact =require('./models/contact');

const app =express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


 



app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contact form db');
            return;
        }
        return res.render('home',{
            title:"Contact List",
            contact_list: contacts        
         });
    });
   
    
});



app.get('/practice',function(req,res){

    return res.render('practice',{
        title:"play with ejs"
    });
});
    


app.post('/create-contact',function(req,res){
   // contactList.push({
   //     name:req.body.name,
  //      phone:req.body.phone
   // });
   Contact.create({
       name:req.body.name,
       phone:req.body.phone
   },function(err,newContact){
       if(err){
           console.log('error in  creating a contact');
           return;
       }
       console.log('**********',newContact);
       return res.redirect('back');
   })
    
    //return res.redirect('/');
});

app.get('/delete-contact',function(req,res){
    //get the id from query in the url 
    let id=req.query.id;
    //finfd the contact in the data base using id 

   Contact.findByIdAndDelete(id,function(err){
       if(err){
           console.log('errrrrorr');
           return;
       }
       return res.redirect('back');
   })
    


})


app.listen(port,function(err){
    if (err)
    {
        console.log(err);
    }
    console.log(port);
});