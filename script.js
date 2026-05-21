let tasks=JSON.parse(localStorage.getItem('tasks'))||[];
let filter='all';

function save(){
localStorage.setItem('tasks',JSON.stringify(tasks));
}

function addTask(){
let text=taskInput.value;
let date=deadline.value;

if(text.trim()==='') return;

tasks.push({
id:Date.now(),
text,
date,
completed:false
});

save();
taskInput.value='';
renderTasks();
}

function removeTask(id){
tasks=tasks.filter(t=>t.id!==id);
save();
renderTasks();
}

function toggle(id){
tasks=tasks.map(t=>{
if(t.id===id) t.completed=!t.completed;
return t;
});
save();
renderTasks();
}

function setFilter(type){
filter=type;
renderTasks();
}

function renderTasks(){
let keyword=search.value.toLowerCase();
let list=document.getElementById('taskList');
list.innerHTML='';

let data=tasks
.filter(t=>{
if(filter==='done') return t.completed;
if(filter==='active') return !t.completed;
return true;
})
.filter(t=>t.text.toLowerCase().includes(keyword));

if(data.length===0){
list.innerHTML='<p>Chưa có công việc</p>';
}

data.forEach(t=>{
list.innerHTML+=`
<div class='task'>
<div class='left'>
<input type='checkbox' ${t.completed?'checked':''}
 onchange='toggle(${t.id})'>
<div>
<div class='${t.completed?'done':''}'>${t.text}</div>
<small>📅 ${t.date||'Không deadline'}</small>
</div>
</div>
<button class='delete' onclick='removeTask(${t.id})'>Xóa</button>
</div>`;
});

updateProgress();
}

function updateProgress(){
let done=tasks.filter(t=>t.completed).length;
let total=tasks.length;
let percent=total?Math.round(done/total*100):0;

status.innerText=`Đã hoàn thành ${done}/${total} (${percent}%)`;
bar.style.width=percent+'%';
}

darkBtn.onclick=()=>{
document.body.classList.toggle('dark');
darkBtn.innerText=document.body.classList.contains('dark')?'☀️ Light':'🌙 Dark';
}

renderTasks();