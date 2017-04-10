$(document).foundation();

function surveyResultToScore(result) {
  switch(result) {
    case "Strongly agree":
      return 2;
    case "Agree":
      return 1;
    case "Neutral":
      return 0;
    case "Disagree":
      return -1;
    case "Strongly disagree":
      return -2;
    default:
      console.error("Erroneous survey result: "+$(this).val());
  }
}

$("#surveyForm").submit(function(event) {
  var total = 0;
  $(".positive .surveyQuestion").each(function() {
    var value = surveyResultToScore($(this).val());
    total += value;
  });
  $(".negative .surveyQuestion").each(function() {
    var value = surveyResultToScore($(this).val());
    total -= value;
  });
  if (total > 0) {
    $('#surveyModalYes').foundation('open');
  }
  else {
    $('#surveyModalNo').foundation('open');
  }
  event.preventDefault();
});
