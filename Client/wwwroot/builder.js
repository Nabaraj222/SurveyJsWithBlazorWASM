var SurveyHelper = SurveyHelper || {};
SurveyHelper.ShowSurvey = function (dotNetObject, creatorText) {

    var creatorOptions = {
        showLogicTab: false,
        showJSONEditorTab: false
    };
    var creator = new SurveyCreator.SurveyCreator(creatorOptions);
    creator.render("creatorElement");
    creator.showToolbox = "right";
    creator.showPropertyGrid = "right";
    creator.rightContainerActiveItem("toolbox");

    //Automatically save survey definition on changing. Hide "Save" button
    //creator.isAutoSave = true;
    //Show state button here
    //creator.showState = true;

    //Setting this callback will make visible the "Save" button
    creator.saveSurveyFunc = function (saveNo, callback) {
        //save the survey JSON
        //console.log(creator.text);
        //You can store in your database JSON as text: creator.text  or as JSON: creator.JSON

        dotNetObject.invokeMethodAsync('SaveSurvey', creator.text);

        //We assume that we can't get error on saving data in local storage
        //Tells creator that changing (saveNo) saved successfully.
        //Creator will update the status from Saving to saved
        callback(saveNo, true);
    }

    var defaultJSON = {
        pages: [
            {
                name: 'page1',
                elements: [
                    {
                        type: 'text',
                        name: "Your First Question.."
                    }
                ]
            }
        ]
    };
    if (!creatorText)
        creatorText = JSON.stringify(defaultJSON);
    creator.text = creatorText;

    //If you get JSON from your database then you can use creator.JSON property
    //creator.JSON = yourJSON;
};