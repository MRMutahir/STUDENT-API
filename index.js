import { error } from "console";
import Express, { json } from "express"
import fs, { read } from 'fs'
import { writeFile } from "fs/promises";
import { start } from "repl";
let readdata = fs.readFileSync('./MOCK_DATA.json','utf-8');
let readatoursdata = JSON.parse(fs.readFileSync("./tours.json",'utf-8'))
// console.log(readatoursdata);
let convertJSON  = JSON.parse(readdata);

// console.log(convertJSON);
let app = Express();
app.use(Express.json())

//>>>>>>>>>>>>>>>>>>>>>>>>>  Get request >>>>>>>>>>>>>>>>>>
app.get('/student',(req,res)=>{
let html = `<ul>${convertJSON.Data.map(item=>{
    let names = item.first_name.join(',')
    // console.log(item.first_name);
   return `<li>${names}</li>`
})}</ul>`
res.send(html)
})
app.get('/api/student',(req,res)=>{
    res.json(convertJSON)
})
// >>>>>>>>>>>>>>>>>>>> delete request >>>>>>>>>
app.delete('/api/student/:id',(req,res)=>{
let paramsid = req.params.id
console.log(paramsid);
let filter = readatoursdata.data.filter(tour=> tour.id !== (paramsid * 1))
// console.log(filter);
readatoursdata.data = filter
console.log(readatoursdata.data = filter);

fs.writeFile('./tours.json',JSON.stringify(readatoursdata),(error)=>{
res.status(200).send({status: "success",data: "Successfully Deleted ok "})})

})

// >>>>>>>>>>>>> post request 
app.post('/api/student',(req,res)=>{
// req.body('hi')
    // res.status(200).send({status: "success",data: "Successfully post ok"})
let postdata = {
    id: readatoursdata.data.length + 1 ,
    ...req.body
}
    // name:'Muhammad Mutahir'
readatoursdata.data.push(postdata);
writeFile('./tours.json',JSON.stringify(readatoursdata),()=>{
    console.log('ok post is work ');
})    
res.status(200).send({status: "success",data: "Successfully post ok"})
console.log(postdata);
})

app.put('/api/student/:id',(req,res)=>{

    let id  = req.params.id *1
// console.log(id);
    // console.log(readatoursdata.data.id === id*1);
    let putId  = readatoursdata.data.filter(item =>  item.id === id)
    // console.log(putId);
    //   console.log(req.body);
      let putbody =  req.body
      let indexnum 
readatoursdata.data.forEach((element,indexNumber,leght) => {
    // console.log(element,indexNumber);
    // console.log(indexNumber);
    // console.log(legth);
    if(element.id === id){
        indexnum = indexNumber
    }
    
});
console.log(indexnum);
readatoursdata.data.splice(indexnum,1,putbody)
console.log(readatoursdata.data);

   
    fs.writeFile('./tours.json',JSON.stringify(readatoursdata),(error,data)=>{
        console.log('ok ',data);
    })

})


app.listen(8000,(error)=>{
    console.log("server start");
})
