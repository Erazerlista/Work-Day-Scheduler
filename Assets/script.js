$(function() {
  // Wrap all code that interacts with the DOM in a call to jQuery.
  
  $(".saveBtn").on("click", function() { 
    // Get text input from textarea
    var description = $(this).siblings(".description").val().trim();
  
    // Get id of the parent time-block
    var timeBlockId = $(this).parent().attr("id");
    
    // Save the description to local storage with timeBlockId
    localStorage.setItem(timeBlockId, description);
  });

  // Current hour
  var currentHour = dayjs().hour();

  // Loop through each time-block
  $(".time-block").each(function() {
    // Get the hour from block id
    var timeBlockHour = parseInt($(this).attr('id').split("-")[1]);
  
    // Compare block with current hour and add class
    if (timeBlockHour < currentHour) {
      $(this).removeClass('present future').addClass('past');
    } else if (timeBlockHour === currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });

  // Retrieve saved events from storage and display
  $(".time-block").each(function() {
    var timeBlockId = $(this).attr("id");
    var savedEvent = localStorage.getItem(timeBlockId);
    $(this).find(".description").val(savedEvent);
  });

  // Add code to display the current date in the header of the page
  function displayTime() {
    var today = dayjs();
    $('#currentDay').text(today.format('MMM D, YYYY'));
  }

  displayTime();
});
