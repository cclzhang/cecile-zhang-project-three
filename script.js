const lifeApp = {};

const $body = $("body");
const $wrapper = $(".wrapper");
const $menuButton = $(".menuButton");
const $sleepButton = $(".sleep");
const $runButton = $(".run");
const $goalButton = $(".goals");
const $cubingButton = $(".cubing");
const $addSleep = $(".addSleep");
const $bedTime = $("input[name=bedTime]");
const $wakeTime = $("input[name=wakeTime]");


lifeApp.averageSleep = 7;

lifeApp.sleepOneHtml = `
    <section class="sleepOne">
        <h2>week to date</h2>
        <h3>${lifeApp.averageSleep}hrs</h3>
        <ul>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
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
            <button type="submit" class="insertSleep">calculate</button>
        </form>
    </section>
`;

$sleepButton.on('click', function(){
    $wrapper.html(lifeApp.sleepOneHtml);
});

$wrapper.on('click', '.addSleep', function(){
    $wrapper.html(lifeApp.sleepTwoHtml);
});

$wrapper.on('click', '.insertSleep', function () {
    $wrapper.html(lifeApp.sleepOneHtml);
    console.log($bedTime.val(), $wakeTime.val());
});









lifeApp.init = () => {

}

$(function () {
    lifeApp.init();
});