/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 */
var student_array = [];
var gradeAverage = null;
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */

/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
    addClickHandlersToElements();
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){
    $('#button1').on('click', handleAddClicked);
    $('#button2').on('click', handleCancelClick);
    $('#button3').on('click', handleServerClick)
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
    addStudent();
}


/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
    clearAddStudentFormInputs();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){
    var studentName = $('#studentName').val();
    var courseName = $('#course').val();
    var studentGrade = $('#studentGrade').val();
     var student = {
        name: studentName, course: courseName, grade: studentGrade
    }

    student_array.push(student);
    updateStudentList(student_array);
    clearAddStudentFormInputs();
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){

    $('#course').val('');
    $('#studentName').val('');
    $('#studentGrade').val('');
}

/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(index){

   var name = $('<td>').text(student_array[index].name);
    var course = $('<td>').text(student_array[index].course);
    var grade  = $('<td>').text(student_array[index].grade);
    var deleteButton = $('<td>').html("<button type ='button' class= 'btn btn-danger btn-xs'> Delete </button> ").click(function(){
        course.remove();
        grade.remove();
        deleteButton.remove();
        name.remove();
        tr.remove();
        student_array.splice(index, 1);
        updateStudentList(student_array);

    });
    var tr = $('<tr>');
    tr.append(name, course, grade, deleteButton);
    $('tbody').append(tr);
}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(array){
    $('tbody').empty();
    for (var studentListIndex = 0; studentListIndex < array.length; studentListIndex++){
        renderStudentOnDom(studentListIndex);
    }

  var gradeAverage = calculateGradeAverage(array);
  renderGradeAverage(gradeAverage);
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(bigArray){
    var average = null;
    for (calculateIndex = 0; calculateIndex < bigArray.length; calculateIndex++){
        average += parseInt(bigArray[calculateIndex].grade);
    }
    average = average / (bigArray.length);
    return average;

}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(average){
    $('.avgGrade').text(average);

}

function handleServerClick(){
    var ajaxConfig = {
        dataType: 'json',
        url: 's-apis.learningfuze.com/sgt/get',
        success: function(result) {
        }
    }

}




