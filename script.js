const lifeApp = {};

const $body = $("body");
const $wrapper = $(".wrapper");
const $menuButton = $(".menuButton");
const $sleepButton = $(".sleep");
const $runButton = $(".run");
const $goalButton = $(".goals");
const $cubingButton = $(".cubing");
const $addSleep = $(".addSleep");
const $bedTime = $("#bedTime");
const $wakeTime = $("#wakeTime");
const $insertSleep = $(".insertSleep");
const $sleepForm = $(".sleepTwo form");



lifeApp.sleepTracker = [8, 6, 15, 0, 0, 0, 0];

lifeApp.averageSleep = 7;

lifeApp.sleepOneHtml = `
    <section class="sleepOne">
        <h2>week to date</h2>
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

$sleepButton.on('click', function(){
    $wrapper.html(lifeApp.sleepOneHtml);
});

$wrapper.on('click', '.addSleep', function(){
    $wrapper.html(lifeApp.sleepTwoHtml);
});

$wrapper.on('submit', $sleepForm, function(e){
    e.preventDefault();
    const $bedTime = $("#bedTime").val();
    const $wakeTime = $("#wakeTime").val();
    console.log($bedTime, $wakeTime);
    console.log(typeof $bedTime);
    const bedTime = lifeApp.convertTime($bedTime);
    const wakeTime = lifeApp.convertTime($wakeTime);
    console.log(lifeApp.calculateTime(bedTime, wakeTime));
    $wrapper.html(lifeApp.sleepOneHtml);
    lifeApp.updateSleep();
});



// function to convert inputted time (string) into hours (num)
lifeApp.convertTime = (inputtedTime) => {
    const hour = parseInt(inputtedTime.split(":")[0]);
    const min = parseInt(inputtedTime.split(":")[1]) / 60;
    return hour + min;
};

// function to calculate total time slept
lifeApp.calculateTime = (sleep, wake) => {
    const diff = wake - sleep;
    if (diff < 0) {
        return (diff + 24).toFixed(2);
    } else {
        return diff.toFixed(2);
    };
};

// function to push time slept into sleep tracker array


// function to update graph
lifeApp.updateSleep = () => {
    $(".sleepOne li").each(function (index, li) {
        $(li).height(lifeApp.sleepTracker[index] * 25);
    })
};



// function to calculate average time slept




lifeApp.init = () => {

}

$(function () {
    lifeApp.init();
});