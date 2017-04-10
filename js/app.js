$(document).foundation();
$('#surveyForm').validate();

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
  var recommended;
  if (total > 0) {
    recommended = 'recommended';
    $('#surveyModalYes').foundation('open');
  }
  else {
    recommended = 'not recommended';
    $('#surveyModalNo').foundation('open');
  }

  var answers = "";
  $(".surveyQuestion").each(function() {
    // Get the text of the label without the text of the <select> options.
    var question = $(this).parent().clone().children().remove().end().text().trim();

    answers += question + " " + $(this).val() + "<br/>";
  });
  console.log(answers);
  var emailFields = {
    "name": $('#nameField').val(),
    "recommended": recommended,
    "email": $('#emailField').val(),
    "score": total,
    "answers": answers
  };
  console.log(emailFields);
  // emailjs.send("mailgun", "survey_response", emailFields)
  event.preventDefault();
});
