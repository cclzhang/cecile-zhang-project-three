const lifeApp = {};

const $body = $("body");
const $wrapper = $(".wrapper");
const $menuButton = $(".menuButton");
const $sleepButton = $(".sleep");
const $runButton = $(".run");
const $goalsButton = $(".goals");
const $cubingButton = $(".cubing");
const $addSleep = $(".addSleep");
const $bedTime = $("#bedTime");
const $wakeTime = $("#wakeTime");
const $insertSleep = $(".insertSleep");
const $sleepForm = $(".sleepTwo form");



// -------------------- SLEEP -----------------------//
const dayOfWeek = new Date().getDay();

lifeApp.averageSleep = 7;

// sleepArray[index] -> localStorage.getItem("day" + index);

lifeApp.sleepOneHtml = `
    <section class="sleepOne">
        <h2>sleep breakdown</h2>
        <h3>${lifeApp.averageSleep}hrs</h3>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <button class="addSleep">Add Sleep</button>
    </section>
`;

lifeApp.sleepTwoHtml = `
    <section class="sleepTwo">
        <form>
            <label for="bedTime">What time did you sleep?</label>
            <input id="bedTime" type="time" name="bedTime" required>
            <label for="wakeTime">What time did you sleep?</label>
            <input id="wakeTime" type="time" name="wakeTime" required>
            <button type="submit">populate</button>
        </form>
    </section>
`;

$sleepButton.on("click", function(){
    $wrapper.html(lifeApp.sleepOneHtml);
    //console.log(localStorage.getItem("kys"));
    lifeApp.updateGraph();  
});

$wrapper.on("click", ".addSleep", function(){
    $wrapper.html(lifeApp.sleepTwoHtml);
});

$wrapper.on("submit", $sleepForm, function(e){
    e.preventDefault();
    const $bedTime = $("#bedTime").val();
    const $wakeTime = $("#wakeTime").val();
    //console.log($bedTime, $wakeTime);
    //console.log(typeof $bedTime);
    const bedTime = lifeApp.convertTime($bedTime);
    const wakeTime = lifeApp.convertTime($wakeTime);
    //console.log(lifeApp.timeSlept(bedTime, wakeTime));
    $wrapper.html(lifeApp.sleepOneHtml);
    localStorage.setItem("day" + dayOfWeek, lifeApp.timeSlept(bedTime, wakeTime));
    lifeApp.updateGraph();
});


// function to convert inputted time (string) into hours (num)
lifeApp.convertTime = (inputtedTime) => {
    const hour = parseInt(inputtedTime.split(":")[0]);
    const min = parseInt(inputtedTime.split(":")[1]) / 60;
    return hour + min;
};

// function to calculate total time slept
lifeApp.timeSlept = (sleep, wake) => {
    const diff = wake - sleep;
    if (diff < 0) {
        return (diff + 24).toFixed(2);
    } else {
        return diff.toFixed(2);
    };
};

// function to push time slept into sleep array


// function to update graph
lifeApp.updateGraph = () => {
    $(".sleepOne li").each(function (index, li) {
        $(li).height(localStorage.getItem("day" + index) * 25);
    })
};


// function to calculate average time slept
lifeApp.averageSlept = () => {

}


// -------------------- GOALS -----------------------//

const goalsCompleted = 10;
const $goalsForm = $(".goalsOne form");

lifeApp.goalsOneHtml = `
    <section class="goalsOne">
        <h2>goals breakdown</h2>
        <h3>${goalsCompleted}</h3>
        <form>
            <label for="goal">Enter a goal</label>
            <input type="text" id="goal" placeholder="Eat more cake">
            <button type="submit">Add a new goal</button>
        </form>
        <div id="goalsError">Cannot enter a blank goal</div>
        <ul class="list"></ul>
    </section>
`;

$goalsButton.on("click", function () {
    $wrapper.html(lifeApp.goalsOneHtml);
});



$wrapper.on("submit", ".goalsOne form", function(e){
    e.preventDefault();
    let goal = $('.goalsOne input').val();
    console.log(goal);

    // to delete goal
    const deleteGoalButton = `<button class="goalDeleteButton"><i class="fas fa-trash-alt"></i></button>`;

    if (goal.replace(/\s/g, '').length) {
        $('#goalsError').hide();
        $('.goalsOne ul').append(`<li>${goal}${deleteGoalButton}</li>`);
        $('.goalsOne input').val('');
    }else{
        $('#goalsError').show();
    };
});


$wrapper.on("click", ".goalsOne li", function () {
    $(this).toggleClass("strikethrough");
});

$wrapper.on("click", ".goalDeleteButton", function(){
    const goalListItem = $(this).parent();
    goalListItem.remove();
});




lifeApp.init = () => {
    //localStorage.clear();
    for (i = 0; i < 7; i++) {
        if (localStorage.getItem("day" + i) == null) {
            localStorage.setItem("day" + i, 0);
        }
    }
}

$(function () {
    lifeApp.init();
});