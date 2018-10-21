
$(document).ready(initializeApp);

var student_array = [];
var gradeAverage = null;

function initializeApp(){
    addClickHandlersToElements();
}

function addClickHandlersToElements(){
    $('#button1').on('click', handleAddClicked);
    $('#button2').on('click', handleCancelClick);
    $('#button3').on('click', handleServerClick);
}

function handleAddClicked(){
    addStudent();
}

function handleCancelClick(){
    clearAddStudentFormInputs();
}

function addStudent(){
    var studentName = $('#studentName').val();
    var courseName = $('#course').val();
    var studentGrade = $('#studentGrade').val();
     var student = {
         api_key: "nwlHxOXLdQ", name: studentName, course: courseName, grade: studentGrade
    }

    student_array.push(student);
     addingManual(student);
    updateStudentList(student_array);
    clearAddStudentFormInputs();
}

function clearAddStudentFormInputs(){

    $('#course').val('');
    $('#studentName').val('');
    $('#studentGrade').val('');
}

function renderStudentOnDom(studentObj){
    var manualDeletedData = {};
   var name = $('<td>').text(studentObj.name);
    var course = $('<td>').text(studentObj.course);
    var grade  = $('<td>').text(studentObj.grade);
    var index = student_array.indexOf(studentObj);
    var deleteButton = $('<td>').html("<button type ='button' class= 'btn btn-danger btn-xs'> Delete </button> ").click(function(){
        manualDeletedData.api_key = "nwlHxOXLdQ";
        manualDeletedData.student_id = studentObj.id;
        deletingManual(manualDeletedData);
        tr.remove();
        student_array.splice(index, 1);
        updateStudentList(student_array);

    });
    var tr = $('<tr>');
    tr.append(name, course, grade, deleteButton);
    $('tbody').append(tr);
}

function updateStudentList(array){
    $('tbody').empty();
    for (var studentListIndex = 0; studentListIndex < array.length; studentListIndex++){
        renderStudentOnDom(array[studentListIndex]);
    }

  var gradeAverage = calculateGradeAverage(array);
  renderGradeAverage(gradeAverage);
}

function calculateGradeAverage(bigArray){
    var average = null;
    for (calculateIndex = 0; calculateIndex < bigArray.length; calculateIndex++){
        average += parseInt(bigArray[calculateIndex].grade);
    }
    average = average / (bigArray.length);
    return average;
}

function renderGradeAverage(average){
    $('.avgGrade').text(average);
}

function handleServerClick(){
    var myData = {api_key: "nwlHxOXLdQ"}
    var ajaxConfig = {
        dataType: 'json',
        url: "http://s-apis.learningfuze.com/sgt/get",
        method: "Post",
        data: myData,
        success: function(response){
            student_array = response.data;
            updateStudentList(student_array);
            console.log("get data function worked " + response);
        },
    }
    $.ajax(ajaxConfig);
}

function addingManual(student){
    var ajaxConfig = {
        dataType: 'json',
        url: "http://s-apis.learningfuze.com/sgt/create",
        method: "Post",
        data: student,
        success: function(response){
            console.log('hi',response);
        }
    }
    $.ajax(ajaxConfig);
}

function deletingManual(student){
    var ajaxConfig = {
        dataType: 'json',
        url: "http://s-apis.learningfuze.com/sgt/delete",
        method: "Post",
        data: student,
        success: function(response){
            console.log('hi',response);
        }
    }
    $.ajax(ajaxConfig);
}


