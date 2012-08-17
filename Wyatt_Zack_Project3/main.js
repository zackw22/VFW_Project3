//Project 3
//Visual Frameworks
//Zack Wyatt
//Mobile Development


//Waiting for DOM

window.addEventListener("DOMContentLoaded", function(){
        
    
    //Get Element byID function
    function $(x){  
        var theElement= document.getElementById(x);    
        return theElement;
    }
    

    //Create select field

    function makeTask(){
        var formTag= document.getElementsByTagName("form"),
            selectLi= $("select"),
            makeSelect = document.createElement("select"); 
            makeSelect.setAttribute("id", "taskSelect");
        for(var i=0, j=taskType.length; i<j; i++){
            var makeOption= document.createElement("option");
            var optText= taskType[i];
                makeOption.setAttribute("value", optText);
                makeOption.innerHTML= optText;
                makeSelect.appendChild(makeOption);
        }  
        selectLi.appendChild(makeSelect);
        
        
    }
    //Finding the value of selected radio button

    function getSelectedRadio(){
        var radios= document.forms[0].ttopic;
        console.log(radios);
        for (var i=0; i<radios.length; i++){
            if(radios[i].checked){
                topicValue= radios[i].value;
            
            }
        }
    }
    
    function toggleControls(n){
        switch(n){
                case "on":
                    $("taskForm").style.display= "none";
                    $("clear").style.display="inline";
                    $("view").style.display= "none";
                    $("addNew").style.display= "inline";
                    break;
                case "off":
                    $("taskForm").style.display= "block";
                    $("clear").style.display="inline";
                    $("view").style.display= "inline";
                    $("addNew").style.display= "none";
                    $("items").style.display= "none";
                    
                    break;
                default:
                    return false;
                    
                    
        }
    }
    
    
    function storeData(key){
        //If there is no key this means this is a brand new item and need a new key
        if(!key){
            var id               =Math.floor(Math.random()*1000001);
        }else{
            id= key;
        }
        getSelectedRadio();
        var item         ={};
            item.task        =["Task Type:", $("select").value];
            item.tdate       =["Date:", $("tdate").value];
            item.tname       =["Assign Task:", $("tname").value];
            item.tcomments   =["Comments:", $("tcomments").value];
            item.trating     =["Rating:", $("rating").value];
            item.ttopic      =["Task Topic:",topicValue];

        //Saved Data

        localStorage.setItem(id, JSON.stringify(item));
        alert("Your task has been added!");
    }

        function getData(){
            toggleControls("on");
                var makeDiv= document.createElement("div");
                makeDiv.setAttribute("id","items");
                var makeList= document.createElement("ul");
                makeDiv.appendChild(makeList);
                document.body.appendChild(makeDiv);
                $("items").style.display= "block";
                for(var i=0, j=localStorage.length; i<j; i++){
                    var makeLi= document.createElement("li");
                    var linksLi= document.createElement("li");
                    makeList.appendChild(makeLi);
                    var key= localStorage.key(i);
                    var value= localStorage.getItem(key);
                    //Convert the string from local storage value back to an object
                    var obj= JSON.parse(value);
                    var makeSubList= document.createElement("ul");
                    makeLi.appendChild(makeSubList);
                    for(var n in obj){
                        var makeSubli= document.createElement("li");
                        makeSubList.appendChild(makeSubli);
                        var optSubText= obj[n][0]+ " " +obj[n][1];
                        makeSubli.innerHTML=optSubText;
                        makeSubList.appendChild(linksLi);
                    }
                   makeItemLinks(localStorage.key(i), linksLi); 
            }
                
        }
        //Make Item links 
        function makeItemLinks(key, linksLi){
            //add edit single item link
            var editLink= document.createElement("a");
            editLink.href= "#";
            editLink.key= key;
            var editText= "Edit Task";
            editLink.addEventListener("click", editItem);
            editLink.innerHTML= editText;
            linksLi.appendChild(editLink);
            
            var breakTag= document.createElement("br");
            linksLi.appendChild(breakTag);
            
            var deleteLink= document.createElement("a");
                deleteLink.href= "#";
            deleteLink.key= key;
            var deleteText= "Delete Task";
            deleteLink.addEventListener("click", clearItem);
            deleteLink.innerHTML= deleteText;
            linksLi.appendChild(deleteLink);
        }
        
        function editItem(){
            var value= localStorage.getItem(this.key);
            var item= JSON.parse(value);
            
            toggleControls("off");
            
            //populate the form fields with current localStorage values.
            
            $("select").value= item.task[1];
            $("tdate").value= item.tdate[1];
            $("tname").value= item.tname[1];
            $("tcomments").value= item.tcomments[1];
            $("rating").value=  item.trating[1];
           /* var radios= document.forms[0].ttopic;
            for(var i=0; i<radios.length; i++){
                if(radios[i].value=== ){
                

            }
            
            
        }
        */
        function deleteItem(){
            var ask= confirm("Are you sure you want to delete this task.");
            if(ask){
                localStorage.removeItem(this.key);
                window.location.reload();
                return false;
            }else{
                alert("Task has NOT been deleted.")
            }
        }
        
        
        function clearLocal(){
            if (localStorage.length === 0){
            alert("There are no tasks to clear.");
           }else{
            localStorage.clear();
            alert("All tasks have been cleared.");
            window.location.reload();
            return false;
        }
        
    }
        
        function validate(e){
            //Elements we want to check
            var getTname= $("tname");
            
            //Reset error messages
            errMsg.innerHTML = "";
            getTname.style.border= "1 px solid black";
            
            
        } 
        //Name field validation
        var messageAry= [];
        if(getTname.value=== ""){
            var tNameError= "Please enter a name";
            getTname.style.border= "1 px solid red";
            messageAry.push(tNameError);
        }
        
        //Error messages
        if(messageAry.length >= 1){
           for (var i=0, j= messageAry.length; i<j; i++){
                var txt= document.createElement("li");
                txt.innerHTML= messageAry[i];
                errMsg.appendChild(txt);
            }
            e.preventDefault();
            return false;
        }else{
            
            
            storeData(this.key);
        }
        
    

    }
    
    //Variable

    var taskType = ["--Choose a task--","study","homework","test","clean","errand","walk the dog","project","other"],
        topicValue;
        makeTask(),
        errMsg= $("errors");
        
        
    
    //Link and Submit Click Events

    var viewTask= $("view");
        viewTask.addEventListener("click", getData);
    var clearItem= $("clear");
        clearItem.addEventListener("click", clearItem);
    var save= $("submit");
        save.addEventListener("click", storeData);


});