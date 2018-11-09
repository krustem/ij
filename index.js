var STORAGE_KEY = 'my_todoapp';
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
};

// todoStorage.save(
//     [
//         { "id":"0", "task":"Kitap oqu" },
//         { "id":"1", "task":"Sportpen shugildanu" },
//         { "id":"2", "task":"HTML-di uirenu" },
//     ]
// );
        // axios.get('tasks.json').then(response => (this.tasks = response.data.tasks))


var app = new Vue({
    el: '#app',
    data: {
        newTodoText:"",
        allTasks: todoStorage.fetch(), 
        tasks: todoStorage.fetch(),
        isChecked: true,
        isSorted:false,
        checked_tasks:[],
        nextTodoId:3,
    },
    methods: {
        addingTask: function(t) {
            this.newTodoText = t;
            this.allTasks.push({
                id: this.nextTodoId++,
                task: this.newTodoText
            });
            todoStorage.save(this.allTasks);
            this.newTodoText = "";
        },
        removeTask: function(task) {
            console.log("remove is pressed!")
            this.tasks.splice(this.tasks.indexOf(task), 1);
            todoStorage.save(this.tasks);
            console.log(this.tasks);
        },
        moveToTrash: function(ch_tasks){
            var tAfterRemovingComplT = this.allTasks.filter(function(element) {
                return ch_tasks.indexOf(element) === -1;
            });
            this.allTasks = tAfterRemovingComplT;
            this.checked_tasks = [];    
            todoStorage.save(this.tasks);
            
        },
        checkingChb: function(todo) {
            if(this.checked_tasks.includes(todo.id)){
                var i;
                for(i=0; i < this.checked_tasks.length; i++){
                    console.log(this.checked_tasks[i]);
                    this.checked_tasks.splice(i,1);
                }
            }
            else{
                this.checked_tasks.push({
                    id:todo.id,
                });
            }
        },
        sortTasks: function(tasks){
            this.isSorted = !this.isSorted

            // function for dynamic sorting
            function compareValues(key, order='asc') {
                return function(a, b) {
                if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                    // property doesn't exist on either object
                    return 0; 
                }
            
                const varA = (typeof a[key] === 'string') ? 
                    a[key].toUpperCase() : a[key];
                const varB = (typeof b[key] === 'string') ? 
                    b[key].toUpperCase() : b[key];
            
                let comparison = 0;
                if (varA > varB) {
                    comparison = 1;
                } else if (varA < varB) {
                    comparison = -1;
                }
                return (
                    (order == 'desc') ? (comparison * -1) : comparison
                );
                };
            };

            if(this.isSorted){
                this.allTasks = tasks.sort(compareValues('task'));
            }else{
                this.allTasks = tasks.sort(compareValues('task', "desc"));
            }
            
        },
        showCompletedTasks:function(ch_t){
            this.tasks = ch_t;
        },
        showActiveTasks:function(ch_t){
            var tAfterRemovingComplT = this.tasks.filter(function(element) {
                return ch_t.indexOf(element) === -1;
            });
            this.tasks = tAfterRemovingComplT; 
        },
        showAllTasks:function(tasks){
            console.log("Show all tasks!");
            this.allTasks = todoStorage.fetch();

        }
            
    },
    mounted: function() {
        this.showAllTasks();
        // console.log(this.checked_tasks);
        // console.log(this.checked_tasks);
    }
}); 