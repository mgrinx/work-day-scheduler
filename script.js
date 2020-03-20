$(function() {

    //  work day hours
    let startHour = 9;
    let endHour = 17;
    let saveName = "WDSData"; //the name our local storage item is going to use

    let hour = moment().hour(); //the current hour
    let save = JSON.parse(localStorage.getItem(saveName)); //load savedata

    //set the header date text
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    //check if we loaded anything
    if (!save) {
        //if not, make a clean slate
        save = { };
        for (let i = startHour; i <= endHour; i++) {
            save[i] = "";
        }
        localStorage.setItem(saveName, JSON.stringify(save));
    }

    //generate timeblocks
    for (let i = startHour; i <= endHour; i++) {

        //create new element for timeblock
        let newTimeBlock = $("<form>");
        newTimeBlock.attr("class", "time-block row"); //set style
        newTimeBlock.attr("data-hour", i);
        if (hour > i) {
            newTimeBlock.addClass("past");
        } else if (hour === i) {
            newTimeBlock.addClass("present");
        } else {
            newTimeBlock.addClass("future");
        }

        // make all the elements for the time block
        let newHourLabel = $("<div>");
        newHourLabel.attr("class", "hour col-2 col-xl-1");
        //convert 24 hr time to 12 hr
        newHourLabel.text((((i - 1) % 12) + 1) + (i % 12 === i ? "AM" : "PM"));

        let newTextArea = $("<textarea>");
        newTextArea.attr("class", "description col-8 col-sm-9 col-xl-10");
        newTextArea.attr("name", i);
        newTextArea.val(save[i]); //load the saved event description

        let newSaveBtn = $("<button>");
        newSaveBtn.attr("class", "saveBtn btn btn-primary btn-lg col-2 col-sm-1");
        newSaveBtn.attr("type", "submit");
        newSaveBtn.attr("aria-label", "Save changes");
        newSaveBtn.append($("<i>").attr("class", "fas fa-save")); // add save icon

        //combine and append everything to the page
        newTimeBlock.append(newHourLabel, newTextArea, newSaveBtn);
        $(".container").append(newTimeBlock);
    }

    //save button listener
    $(".time-block").submit(function() {
        //index array containing object with textarea name and value as properties
        let input = $(this).serializeArray()[0];

        //update the save object
        save[input.name] = input.value;

        localStorage.setItem(saveName, JSON.stringify(save)); //saved

        return false; //prevent default
    });

});