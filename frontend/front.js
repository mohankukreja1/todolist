function gettodos(cb) {
    $.get('/todos',(todos)=>{
        cb(todos);
    })
}
function addtodos(task,cb) {
    $.post('/todos',{
        task:task
    },(todos)=>{
        cb(todos)
    })
}
function settododone(todoid,done,cb) {
    $.post(`/todos/${todoid}`,{
        done:done
    },(todos)=>{
    cb(todos)
    })

}

$(function () {
    let button=$('#button');
    let list=$('#list');
    let text=$('#textbox');
    function referesh(todos) {
        list.empty();
        for(todo of todos){
            let input=$(`<input type="checkbox" data-id="${todo.id}" id="check" onchange="setdone(this)">`)
            if(todo.done){
                input.prop('checked',true);
            }
            let newele=$(`

    <br><span>${todo.task}</span><br>
        `)
            newele.prepend(input);
            list.prepend(newele);
        }


    }
     window.setdone=function(el) {
        let todoid=$(el).attr('data-id')
        console.log(el)
        if(el.checked){
            settododone(todoid,true,(todos)=>{
                referesh(todos);
            });
        }else{
            settododone(todoid,false,(todos)=>{
                referesh(todos);
            });
        }
    }

    gettodos((todos)=>{
        referesh(todos);
    })
    button.click(function () {
        let val=$('#textbox').val();
        addtodos(val,(todos)=>{
            referesh(todos);
        })
    })
})