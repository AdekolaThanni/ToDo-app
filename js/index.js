$(".header__theme-button").on("click", function(){
    $("body").toggleClass("change-background-color");
    $("body").toggleClass("change-background-image");
    $(".new-input").toggleClass("change-background-color");
    $(".new-input input").toggleClass("change-text-color");
    $(".list__item").toggleClass("change-background-color");
    $(".list__item").toggleClass("change-text-color");
    $(".attribution").toggleClass("change-text-color");
    $(".list__item path").toggleClass("change-fill");
    $(".list__details").toggleClass("change-background-color");
    $(".header__theme-button svg:first-child").toggleClass("change-display");
    $(".header__theme-button svg:last-child").toggleClass("change-display");
})


// Todo workflow

// Create list array
var list = [];

// Function to create list items html elements
function createItemElement(item){
    if ($("body").hasClass("change-background-color")){
        $(".list").append('<li draggable=true class="list__item active change-background-color change-text-color" id="n' + list.indexOf(item) + '"><span class="check-circle"><svg class="change-display" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></span><p class="list__item-text">' + item + '</p><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path class="change-fill" fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></li>')
    }
    else {
        $(".list").append('<li draggable=true class="list__item active" id="n' + list.indexOf(item) + '"><span class="check-circle"><svg class="change-display" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></span><p class="list__item-text">' + item + '</p><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path  fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></li>')
    }
}

function itemsCount() {
    var count = $(".list > .list__item.active").length;
    $(".list__items-left").text(count + " items left");
}

// To check an item 
$(".list").on("click", ".list__item .check-circle", function(){
    const parentId = $(this).parent().attr("id");
    
    $("#" + parentId).toggleClass("completed");
    $("#" + parentId).toggleClass("active");
    $("#" + parentId  + " .check-circle").toggleClass("circle-background-image");
    $("#" + parentId  + " .check-circle svg").toggleClass("change-display");
    $("#" + parentId  + " .list__item-text").toggleClass("line-through");

    itemsCount();

    if ($(".all-link").hasClass("current")){
        showAllItems();
    }

    if ($(".active-link").hasClass("current")){
        showAllActiveItems();
    }

    if ($(".completed-link").hasClass("current")){
        showAllCompletedItems();
    }
})


// To delete an element
$(".list").on("click", ".list__item > svg", function(){
    const parentId = $(this).parent().attr("id");
    $("#" + parentId).remove();
    const index = Number(parentId.substr(-1));
    list.splice(index,1);
    itemsCount();
})

function showAllActiveItems(){
    $(".list__item.completed").hide();
    $(".list__item.active").show();
}

function showAllCompletedItems(){
    $(".list__item.active").hide();
    $(".list__item.completed").show();
}

function showAllItems(){
    $(".list__item.active").show();
    $(".list__item.completed").show();
}


$(".list__link").click(function(){
    $(".list__link.current").removeClass("current");
    $(this).addClass("current");
})

function clearCompleted() {
    $(".list__item.completed").remove();
    itemsCount();
}

// Create function to add new list item
function addNewListItem(){
    const newItem = $(".new-input input").val();
    if (newItem !== ""){
        list.push(newItem);
        $(".new-input input").val("");
        createItemElement(newItem);
        itemsCount();

        if ($(".all-link").hasClass("current")){
            showAllItems();
        }

        if ($(".active-link").hasClass("current")){
            showAllActiveItems();
        }

        if ($(".completed-link").hasClass("current")){
            showAllCompletedItems();
        }
    }    
}

$(".new-input").submit(function(event){
    event.preventDefault();
    addNewListItem();
})

$(".new-input span").click(function(){
    addNewListItem();
})

// $(".list").on("click", ".list__item", function(){
    
// })    

function handleDragStart(event){
    setTimeout(function(){
        $(this).hide();
    }, 0);
    window.event.dataTransfer.setData("text",event.target.id);
    window.event.dataTransfer.setData("text/html",event.target.outerHTML);
}

function handleDragEnter(event) {
    event.preventDefault();
    $(this).addClass("drag-enter");
}

function handleDragOver(event) {
    event.preventDefault();
    $(this).addClass("drag-enter");
}

function handleDragLeave(event) {
    $(this).removeClass("drag-enter");
}

function handleDrop(event) {
    $(this).removeClass("drag-enter");
    event.stopPropagation();
    var elementID = window.event.dataTransfer.getData("text");
    var elementHTML = window.event.dataTransfer.getData("text/html");
    if ($(this).attr("id") != elementID){
        $("#" + elementID).remove();
        $(elementHTML).insertBefore($(this));
    }
}

$(".list").on("dragstart", ".list__item", handleDragStart);
$(".list").on("dragenter", ".list__item", handleDragEnter);
$(".list").on("dragover", ".list__item", handleDragOver);
$(".list").on("dragleave", ".list__item", handleDragLeave);
$(".list").on("drop", ".list__item", handleDrop);