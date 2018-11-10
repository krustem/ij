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
        tasks: [],
        isChecked: true,
        isSorted:false,
        isPressedBtn:'',
        checked_tasks:[],
        nextTodoId:3,
        idDefine: 10000 ,
        editedWord: "",
        counter: 0,
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
            this.tasks.splice(this.allTasks.indexOf(task), 1);
            todoStorage.save(this.allTasks);
            console.log(this.allTasks);
        },
        moveToTrash: function(ch_tasks){
            var tAfterRemovingComplT = this.allTasks.filter(function(element) {
                return ch_tasks.indexOf(element) === -1;
            });
            this.allTasks = tAfterRemovingComplT;
            this.checked_tasks = [];    
            todoStorage.save(this.allTasks);
            
        },
        filterTheActives: function(todo) {
            if (this.checked_tasks.includes(todo)){
                this.checked_tasks.splice(this.checked_tasks.indexOf(todo),1);
                this.tasks.push(todo);
            }
            else{
                this.checked_tasks.push(todo);
                this.tasks.splice(this.tasks.indexOf(todo),1);
            }
            // this.checked_tasks.push(todo);
            console.log(this.checked_tasks);
            var ch_t = this.checked_tasks;
            var filteredActive = this.allTasks.filter(function(element) {
                return ch_t.indexOf(element) === -1;
            });
            this.tasks = filteredActive;
            console.log("After checking chB:", this.tasks);
            // this.checked_tasks = [];
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
            this.isPressedBtn = 2;

        },
        showActiveTasks:function(ch_t){
            // var ch_tSet = this.tasks.reduce(function(previous, element) {
            //     previous[element] = true;
            //     return previous;
            //  }, {});
            //  var filteredActive = this.allTasks.filter(function(element) {
            //    return !(element in ch_tSet);
            //  });
            // var checked_ts = this.checked_tasks;
            console.log(this.allTasks);
            console.log(this.tasks);
            console.log(this.checked_tasks);
            // console.log(filteredActive);
            var filteredActive = this.allTasks.filter(function(element) {
                return ch_t.indexOf(element) === -1;
            });
            console.log("All tasks: ", this.allTasks);
            console.log("Active tasks: ", this.tasks);
            console.log("Checked tasks: ", this.checked_tasks);
            console.log("Filtered Active tasks:", filteredActive);
            this.tasks = filteredActive; 
            // this.allTasks = this.tasks;
            this.isPressedBtn = 3;

        },
        showAllTasks:function(tasks){
            console.log("Show all tasks!", this.allTasks);
            this.isPressedBtn = 1;
        },
        funcao: function(todo){
            this.idDefine = todo.id;
          },
          SaveEditedValue: function(todo){
            this.idDefine = todo.id-1.1;
            todoStorage.save(this.tasks);
       }
            
    },
    mounted: function() {
        // this.allTasks = todoStorage.fetch();
        this.showAllTasks();
        // console.log(this.checked_tasks);
        // console.log(this.checked_tasks);
    }
}); 