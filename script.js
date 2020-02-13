const lifeApp = {};

const $body = $("body");
const $mainPage = $(".mainPage");
const $menuButton = $(".menuButton");
const $sleepButton = $(".sleep");
const $runButton = $(".run");
const $goalButton = $(".goals");
const $cubingButton = $(".cubing");

lifeApp.sleepOneHtml = `
    <section class="sleepOne">
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

$sleepButton.on('click', function () {

});









lifeApp.init = () => {

}

$(function () {
    lifeApp.init();
});