

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // when the save button is clicked for each specific time block; that information is saved into the local storage to be recalled later
  $(document).on('click', '.saveBtn', function() {
    var timeBlockId = $(this).closest('.time-block').attr('id');
    console.log('Clicked Save for', timeBlockId);

    var userInput = $(this).siblings('.description').val();
    console.log('User Input:', userInput);

    localStorage.setItem(timeBlockId, userInput);
    console.log('Stored in Local Storage:', localStorage.getItem(timeBlockId));
  });
  

  // calls the current hour using day.js
  var currentHour = dayjs().hour();

  // applies past, present, or future to each time block to change to corresponding colors
  var timeblocks = document.querySelectorAll('.time-block');
  timeblocks.forEach(function(timeblock){
    var timeblockHour = parseInt(timeblock.id.split('-')[1]);

    if (timeblockHour < currentHour) {
      timeblock.classList.add('past');
    } else if (timeblockHour === currentHour){
      timeblock.classList.add('present');
    } else {
      timeblock.classList.add('future');
    }
  })
  
  
// recalls the information that was saved into the local storage for each timeblock
  timeblocks.forEach(function(timeblock) {
    var timeBlockId = timeblock.id;
    var userInput = localStorage.getItem(timeBlockId);

    if (userInput) {
      timeblock.querySelector('.description').value = userInput;
    }
  });
  
  // TODO: Add code to display the current date in the header of the page.

    // calls the current day using day.js in the format I selected below
    var currentDay =dayjs().format('dddd, MMMM D, YYYY');
    // updates the content in the HTML 'current-day'
    document.getElementById('current-day').textContent = currentDay;
  


});
