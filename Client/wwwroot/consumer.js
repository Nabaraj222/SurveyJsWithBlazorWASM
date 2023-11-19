var AssessmentHelper = AssessmentHelper || {};

var json = {};
var assessmentObj = {};

AssessmentHelper.ShowAssessment = function (dotNetObject, surveyQuestion, assessment) {

    if (surveyQuestion)
        json = JSON.parse(surveyQuestion);
    if (assessment)
        assessmentObj = JSON.parse(assessment);

    const survey = new Survey.Model(json);

    //Load the initial state
    survey.data = assessmentObj;

    ko.applyBindings({
        model: survey
    }, document.getElementById("surveyElement"));

    survey
        .onComplete
        .add(function (sender, callback) {

            dotNetObject.invokeMethodAsync('SaveAssessment', JSON.stringify(sender.data));

            callback(sender, true);
        });
}