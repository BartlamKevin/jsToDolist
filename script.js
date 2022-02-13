
const toDoForm = document.querySelector("form");
const list = document.getElementById("list");
const itemInput = document.getElementById("input");
const savedList = JSON.parse(localStorage.getItem("saves")) || [];

for (let x = 0; x < savedList.length; x++){
    const newLi = document.createElement("li");
    const remove = document.createElement("button");
    const newSpan = document.createElement("span");
    newSpan.textContent = savedList[x].saves;
    newLi.complete = savedList[x].complete ? true : false; //is the item marked as complete?
    if (newLi.complete){
        newSpan.classList.add("cross-out");
    }
    remove.innerText = "Remove";
    newLi.append(newSpan, remove);
    list.appendChild(newLi);
    remove.setAttribute("data-id", [x]); //give each button the id to delete
    newSpan.setAttribute("data-id", [x]);
};

toDoForm.addEventListener("submit",function(event){
    event.preventDefault();
    const newLi = document.createElement("li");
    const newSpan = document.createElement("span");
    const liVal = document.getElementById("input").value;
    const remove = document.createElement("button");
    newSpan.textContent = liVal;
    newLi.complete = false;
    if (newSpan.textContent == ""){
        return false; //no empty to do list entries
    }
    else{
        const itemId = savedList.length;
        newLi.append(newSpan,remove);//add button
        list.appendChild(newLi); //add li
        remove.innerText = "Remove";
        remove.setAttribute("data-id", itemId); //set the id to how long the list is starting at 0
        newSpan.setAttribute("data-id", itemId);
        savedList.push({saves : newSpan.textContent, complete : false});//deletes the text of the button so it doesn't show in the stored list
        localStorage.setItem("saves", JSON.stringify(savedList));
        itemInput.value="";//resets the todo input
    }
});

list.addEventListener("click",function(event){
    const clicked = event.target;
    const clickId = clicked.getAttribute("data-id");
    if (event.target.tagName === "BUTTON"){
        savedList.splice(clickId,1);//removes item from array
        const newIdButtton = list.getElementsByTagName("button");
        const newIdSpan = list.getElementsByTagName("span")
        for(let x = 0; x < newIdButtton.length; x++){
            newIdButtton[x].setAttribute("data-id",[x-1]);
            newIdSpan[x].setAttribute("data-id",[x-1]);
        }
        localStorage.setItem("saves", JSON.stringify(savedList));
        event.target.parentNode.remove();//deletes item
    } 
    if (event.target.tagName === "SPAN"){
        event.target.classList.toggle("cross-out"); //let's you decide that a tast is not complete
        if(event.target.classList.contains("cross-out")){//checks to see if an item is crossed out
            savedList[clickId].complete = true;
        }else{
            savedList[clickId].complete = false;
        }
        localStorage.setItem("saves", JSON.stringify(savedList));
    };
});