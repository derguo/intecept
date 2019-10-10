var obj = {
    a:10,
    f:func.bind(null),
    f1:function(){
        console.log(this.toString());
    }
}

function func(){
    console.log(this.toString());
}

obj.f();

obj.f1.bind(null)();

new func.bind(null)();