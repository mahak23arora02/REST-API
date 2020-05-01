const express = require('express');
const members =require('./members');
const app = express();

app.use(express.json());

app.get('/api/members',(req,res)=>{
    res.json(members)
});

app.get('/api/members/:id',(req,res)=>{
    // function check(user) {
    //     if(user.id === parseInt(req.params.id))
    //     return true;
    // }
    // const found = members.some(check);
    //OR const found neeche wali line
    const found = members.some(member=> member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member=>member.id === parseInt(req.params.id)));

    }
    else{
        res.status(400).json("Member not found");

    }
})

//post method
app.post('/',(req,res)=>{
    const newMember = {
        id:5,
        name:req.body.name,
        email: req.body.email,
        status : "inactive"
    }
    members.push(newMember);
    res.json(members);
})


//Update method
app.put('/api/members/:id',(req,res)=>{
    const found = members.some(member=>member.id === parseInt(req.params.id));
    if(found){
       members.forEach(member=>{
           if(member.id === parseInt(req.params.id)){
               member.name = req.body.name;
               member.email =req.body.email;
               res.json({msg: 'Message updated',member:member});
           }
       })
       }
    else{    
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});  
    }

})

// //Delete method
 app.delete('/api/members/:id',(req,res)=>{

    const found = members.some(member=>member.id === parseInt(req.params.id));
    if(found){
    //   const index =members.indexOf(member);
    //   members.splice(index,1);
    //   res.send(member);
        res.json({
            msg:`member deleted`,
            members:members.filter(member=>member.id != parseInt(req.params
            .id) )
        })

        

       }
    else{    
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});  
    }

 })



const PORT =3000;
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
});
