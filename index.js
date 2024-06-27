const express = require('express');
console.log('backend script');

const app=express();
app.use(express.json());

var task =[
  //initializing with two sample tasks
  {id:1,title:'first task ',desc:'this is first task!'},
  {id:2,title:'second task ',desc:'this is second task!'},
];


app.get('/tasks',(req,resp)=>{
  resp.json(task).status(200);
})


app.get('/tasks/:id',(req,resp)=>{
  var {id}=req.params;
id=parseInt(id)
console.log(id)
  var filtTask=task.filter((task)=>task.id===id);
  console.log(filtTask)
  if(filtTask.length===0){
    resp.json('task for this number is not present').status(404);
  }
  else
  resp.json(filtTask).status(200);

})

app.post('/tasks', (req, res) => {
  const { title, desc } = req.body;
  if (!title || !desc) {
      return res.json('Title and description are required').status(400);
  }
  const newTask = { id: (task.length+1), title, desc };
  task.push(newTask);
  res.json(task).status(200);
});

app.put('/tasks/:id', (req, res) => {
var  { title, desc } = req.body;
  var id=parseInt(req.params);
  console.log(id);
  const ftask = task.find(t => t.id === parseInt(req.params.id));
  if (!ftask) {
      return res.json('Task not found').status(404);
  }
  
  if (!title || !desc) {
      return res.json('Title and description are required').status(400);
  }
  ftask.title = title;
  ftask.desc = desc;
  res.json(task).status(200);
});

app.delete('/tasks/:id', (req, res) => {
  var id=parseInt(req.params.id);
  const taskno = task.findIndex(t => t.id === id);
  if (taskno === -1) {
      return res.json({ error: 'Task not found' }).status(404);
  }
  task=task.filter((task)=>task.id!==id);

  res.send(task).status(200);
});

app.listen(3000, () => {
  console.log(`Task API is running at http://localhost:3000`);
});
