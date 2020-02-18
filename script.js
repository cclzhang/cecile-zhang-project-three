const lifeApp = {};

const $body = $("body");
const $wrapper = $(".wrapper");
const $homeButton = $(".home");
const $sleepButton = $(".sleep");
const $runButton = $(".run");
const $goalsButton = $(".goals");
const $cubingButton = $(".cubing");
const $addSleep = $(".addSleep");
const $bedTime = $("#bedTime");
const $wakeTime = $("#wakeTime");
const $insertSleep = $(".insertSleep");
const $sleepForm = $(".sleepTwo form");
lifeApp.averageSleep = localStorage.getItem("averageSleep");
// lifeApp.goalsCompleted = localStorage.getItem("goalsCompleted");

// -------------------- HOME ------------------------//
lifeApp.mainHtml = `
    <section class="mainPage">
        <section class="title">
            <h1>dashboard</h1>
            <h2>february</h2>
        </section>
        <button class="category sleep">
            <h2>sleep</h2>
            <h3>--</h3><!-- average -->
        </button>
        <button class="category run">
            <h2>run</h2>
            <h3>--</h3><!-- times per month -->
        </button>
        <button class="category goals">
            <h2>goals</h2>
            <h3>--</h3><!-- amount completed -->
        </button>
        <button class="category cubing incomplete" tabindex="-1">
            <h2>cubing</h2>
            <h3>coming soon</h3><!-- average/total times solved -->
        </button>
    </section>
`;
$homeButton.on('click', function(){
    $wrapper.html(lifeApp.mainHtml);
    $(".sleep.category h3").html(`${localStorage.getItem("averageSleep")} hrs on average`);
    $(".goals.category h3").html(`${localStorage.getItem("goalsLeft")} left`);
    $(".run.category h3").html(`${localStorage.getItem("runTotal")} x`);
})


// -------------------- SLEEP -----------------------//

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth();
let yyyy = today.getFullYear();

const dayOfWeek = today.getDay();


lifeApp.sleepOneHtml = `
    <section class="sleepOne">
        <h2>current week breakdown</h2>
        <h3></h3>
        <ul>
            <li><span>sun</span></li>
            <li><span>mon</span></li>
            <li><span>tue</span></li>
            <li><span>wed</span></li>
            <li><span>thu</span></li>
            <li><span>fri</span></li>
            <li><span>sat</span></li>
        </ul>
        <button class="addSleep">Add Sleep</button>
    </section>
`;

lifeApp.sleepTwoHtml = `
    <section class="sleepTwo">
        <h2>${dd}/${mm}/${yyyy}</h2>
        <form>
            <label for="bedTime">What time did you sleep?</label>
            <input id="bedTime" type="time" name="bedTime" required>
            <label for="wakeTime">What time did you wake up?</label>
            <input id="wakeTime" type="time" name="wakeTime" required>
            <button type="submit">populate</button>
        </form>
    </section>
`;

$sleepButton.on("click", function(){
    $wrapper.html(lifeApp.sleepOneHtml);
    lifeApp.updateGraph();  
});

$wrapper.on("click", ".sleep.category", function () {
    $wrapper.html(lifeApp.sleepOneHtml);
    lifeApp.updateGraph();
});

$wrapper.on("click", ".addSleep", function(){
    $wrapper.html(lifeApp.sleepTwoHtml);
});

$wrapper.on("submit", $sleepForm, function(e){
    e.preventDefault();
    const $bedTime = $("#bedTime").val();
    const $wakeTime = $("#wakeTime").val();
    const bedTime = lifeApp.convertTime($bedTime);
    const wakeTime = lifeApp.convertTime($wakeTime);
    $wrapper.html(lifeApp.sleepOneHtml);
    if(dayOfWeek === 0){
        for (i = 0; i < 7; i++) {
            localStorage.setItem("day" + i, 0);
        }
    }
    localStorage.setItem("day" + dayOfWeek, lifeApp.timeSlept(bedTime, wakeTime));
    localStorage.setItem("averageSleep", lifeApp.averageSlept());
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

// function to update graph
lifeApp.updateGraph = () => {
    $(".sleepOne li").each(function (index, li) {
        $(li).height(localStorage.getItem("day" + index) * 25);
    })
    $(".sleepOne h3").html(`${localStorage.getItem("averageSleep")} hrs on average`);
};


// function to calculate average time slept
lifeApp.averageSlept = () => {
    let sum = 0;
    lifeApp.daysRecorded = 0;
    for (i = 0; i < 7; i++) {
        if(localStorage.getItem("day" + i) > 0){
            sum += localStorage.getItem("day" + i);
            lifeApp.daysRecorded++;
        };
    };
    return (sum / lifeApp.daysRecorded).toFixed(1);
};


// -------------------- GOALS -----------------------//

const $goalsForm = $(".goalsOne form");

lifeApp.goalsOneHtml = `
    <section class="goalsOne">
        <h2>most important list</h2>
        <h3></h3>
        <form>
            <label for="goal">enter a new goal</label>
            <input type="text" id="goal" placeholder="save the world">
            <button type="submit">Add a new goal</button>
        </form>
        <div id="goalsError">Cannot enter a blank goal</div>
        <ul class="list"></ul>
    </section>
`;

lifeApp.clickedGoal = () => {
    $wrapper.html(lifeApp.goalsOneHtml);
    // json.parse converts string back into array
    const list = JSON.parse(localStorage.getItem("goalList"));
    for (i = 0; i < list.length; i++) {
        const deleteGoalButton = `
            <button class="goalDeleteButton">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        $('.goalsOne ul').append(`
            <li>${list[i]}${deleteGoalButton}</li>
        `);
    }
    $(".goalsOne h3").html(localStorage.getItem("goalsLeft"));
}

$goalsButton.on("click", lifeApp.clickedGoal);
$wrapper.on("click", ".goals.category", lifeApp.clickedGoal);


$wrapper.on("submit", ".goalsOne form", function (e) {
    e.preventDefault();
    let goal = $('.goalsOne input').val();
    // to delete goal
    const deleteGoalButton = `
        <button class="goalDeleteButton">
            <i class="fas fa-trash-alt"></i>
        </button>
    `;

    if (goal.replace(/\s/g, '').length) {
        $('#goalsError').hide();
        $('.goalsOne ul').append(`<li>${goal}${deleteGoalButton}</li>`);
        $('.goalsOne input').val('');
        const list = JSON.parse(localStorage.getItem("goalList"));
        list.push(goal);
        localStorage.setItem("goalList", JSON.stringify(list));
        localStorage.setItem("goalsLeft", $(".goalsOne li").length);
        $(".goalsOne h3").html(localStorage.getItem("goalsLeft"));
    } else {
        $('#goalsError').show();
    };
});


$wrapper.on("click", ".goalsOne li", function () {
    $(this).toggleClass("completed");
    const list = JSON.parse(localStorage.getItem("goalList"));
    localStorage.setItem("goalList", JSON.stringify(list));
    // localStorage.setItem("goalsCompleted", $(".completed").length);
});

$wrapper.on("click", ".goalDeleteButton", function () {
    const goalListItem = $(this).parent();
    const list = JSON.parse(localStorage.getItem("goalList"));
    list.splice($(this).index(), 1);
    localStorage.setItem("goalList", JSON.stringify(list));
    goalListItem.remove();
    localStorage.setItem("goalsLeft", $(".goalsOne li").length);
    $(".goalsOne h3").html(localStorage.getItem("goalsLeft"));
});



// -------------------- RUN -----------------------//
lifeApp.runHtml = `
    <section class="runOne">
        <h2>february</h2>
        <h3>--</h3>
        <ul class="calendarLabel">
            <li>mon</li>
            <li>tue</li>
            <li>wed</li>
            <li>thu</li>
            <li>fri</li>
            <li>sat</li>
            <li>sun</li>
        </ul>
        <ul class="calendarDate">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
            <li>12</li>
            <li>13</li>
            <li>14</li>
            <li>15</li>
            <li>16</li>
            <li>17</li>
            <li>18</li>
            <li>19</li>
            <li>20</li>
            <li>21</li>
            <li>22</li>
            <li>23</li>
            <li>24</li>
            <li>25</li>
            <li>26</li>
            <li>27</li>
            <li>28</li>
            <li>29</li>
        </ul>
    </section>
`;


$runButton.on("click", function(){
    $wrapper.html(lifeApp.runHtml);
});

$wrapper.on("click", ".run", function(){
    $wrapper.html(lifeApp.runHtml);
});

$wrapper.on("click", ".calendarDate li", function () {
    $(this).toggleClass("ran");
    localStorage.setItem("runTotal", $('.ran').length);
    $(".runOne h3").html(`${localStorage.getItem("runTotal")} x`);
});


let image = "./assets/warning.png"
// -------------------- RESET -----------------------//
$(".reset button").on("click", function () {
    swal({
        title: "reset data",
        text: "Once reset, you will not be able to recover this data!",
        icon: "./assets/warning.png",
        buttons: true,
        buttons: ["Cancel", "Reset"],
    })
    .then((willDelete) => {
        if (willDelete) {
            localStorage.clear();
            location.reload();
        } else {
            swal("Reset has been cancelled.");
        }
    });
});

// -------------------- INIT & DOC READY -----------------------//
lifeApp.init = () => {
    // localStorage.clear();
    for (i = 0; i < 7; i++) {
        if (localStorage.getItem("day" + i) == null) {
            localStorage.setItem("day" + i, 0);
        }
    }
    // json.stringify converts array into string to store to local storage
    if (localStorage.getItem("goalList") == null) {
        localStorage.setItem("goalList", JSON.stringify([]));
    }
    // if (localStorage.getItem("goalsCompleted") == null) {
    //     localStorage.setItem("goalsCompleted", 0);
    // }
    if (localStorage.getItem("averageSleep") == null) {
        localStorage.setItem("averageSleep", "--");
    }
    if (localStorage.getItem("goalsLeft")==null){
        localStorage.setItem("goalsLeft","--");
    }
    if (localStorage.getItem("runTotal") == null) {
        localStorage.setItem("runTotal", "--");
    }
    $(".sleep.category h3").html(`${localStorage.getItem("averageSleep")} hrs on average`)
    $(".goals.category h3").html(`${localStorage.getItem("goalsLeft")} left`);
    $(".run.category h3").html(`${localStorage.getItem("runTotal")} x`);
}

$(function () {
    lifeApp.init();
});