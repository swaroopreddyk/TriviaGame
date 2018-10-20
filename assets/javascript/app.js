$(document).ready(() => {
  $("#audioTag").trigger('load');
  $("#audioTag").trigger('play');
  $("#questionSection").hide();

  let index = 0;
  // records the right answer
  let rightAnswer = '';

  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    questions: {
      q1: "Which cousin invited Ross to her wedding, but not Monica?",
      q2: "What was Monica's nickname when she was a field-hockey goalie?",
      q3: "What is Joey's favorite food?",
      q4: "What dessert did Rachel try to make for Thanksgiving?",
      q5: "What part of New York is Rachel from?"
    },
    options: {
      o1: ["FRANNY", "BETH", "MONA", "ANNA"],
      o2: ["BENCHWARMER MON", "SAC OF POTATOES", "BIG FAT GOALIE", "MONICA THE BEAST"],
      o3: ["SANDWICHES", "CHOCOLATE CAKE", "PIZZA", "SPAGHETTI AND MEATBALLS"],
      o4: ["SOUFFLE", "COOKIES", "CAKE", "TRIFLE"],
      o5: ["BRONX", "LONG ISLAND", "STATEN ISLAND", "WESTCHESTER"]
    },
    answers: {
      a1: "FRANNY",
      a2: "BIG FAT GOALIE",
      a3: "SANDWICHES",
      a4: "TRIFLE",
      a5: "LONG ISLAND"
    }
  }

  let correctImages = ["https://media.giphy.com/media/g7shkYchjuRBm/giphy.gif",
    "https://media.giphy.com/media/ld1RKulOqeeaI/giphy.gif",
    "https://media.giphy.com/media/xThuWp2hJABbmc20Ew/giphy.gif",
    "https://media.giphy.com/media/DxA688OXGUMSI/giphy.gif",
    "https://media.giphy.com/media/113PoJxEaRxKbm/giphy.gif"
  ];
  let inCorrectImages = ["https://media.giphy.com/media/L0aWDywDu1ziw/giphy.gif",
    "https://media.giphy.com/media/X4YqmJEl6wJoY/giphy.gif",
    "https://media.giphy.com/media/XJCL959KwYbE4/giphy.gif",
    "https://media.giphy.com/media/up34B0awEJuVy/giphy.gif",
    "https://media.giphy.com/media/L20E2bh3ntSCc/giphy.gif"
  ];
  let unansweredImages = ["https://media.giphy.com/media/Hvga7JOtsLcli/giphy.gif",
    "https://media.giphy.com/media/xT0BKgqxLJLHtUsRJ6/giphy.gif",
    "https://media.giphy.com/media/oaEcH0gKPJ2wM/giphy.gif",
    "https://media.giphy.com/media/eHQQGL3dGOyQM/giphy.gif",
    "https://media.giphy.com/media/26FPxK7LVhEHammiY/giphy.gif"
  ];


  let countDown = {
    time: 10,
    // reset the counter
    resetClock: function () {
      this.time = 10;
      $('#timer').text(countDown.time + ' seconds remaining');
    },
    // start the counter
    start: function () {
      counter = setInterval(countDown.count, 1000);
    },
    // stop the counter
    stop: function () {
      clearInterval(counter);
    },
    // what happens when the counter reaches 0
    count: function () {
      countDown.time--;
      if (countDown.time >= 0) {
        $('#timer').text(countDown.time + ' seconds remaining');
      } else {
        // if (index < Object.values(trivia.questions).length) {
        if (index < 10) {
          answerNotFound();
        } else {
          reset();
        }
      }
    }
  };

  // Function to display the question on the screen.
  const displayQuestion = function (index) {
    if (index < Object.values(trivia.questions).length) {
      let correct_option = Object.values(trivia.answers)[index];
      let all_options = Object.values(trivia.options)[index];
      all_options.sort(); // for randomizing the options
      $('#questions').text('');
      $('#options').text('');
      let question = '';
      $('#questions').append(`<p>${index + 1}.  ${Object.values(trivia.questions)[index]} </p>`)
      all_options.forEach((option) => {
        if (option === correct_option) {
          rightAnswer = correct_option;
          $('#options').append(`<li><button class="choice correct" type="button" style="background:transparent; border:none;"> ${option} </button></li>`)
        } else {
          $('#options').append(`<li><button class="choice incorrect" type="button" style="background:transparent; border:none;"> ${option} </button></li>`)
        }
      });

      $('#timer').css('visibility', 'visible');
      countDown.start(); // Start the timer when question gets displayed.
    } else {
      reset();
    }
  };

  // ajax call to get and display GIFs on the page
  const getGIF = function (word) {
    let randomIndex = Math.floor(Math.random() * 5);
    let gifSrc = '';
    if (word === "wrong") {
      gifSrc = inCorrectImages[randomIndex];
    } else if (word === "correct") {
      gifSrc = correctImages[randomIndex];
    } else {
      gifSrc = unansweredImages[randomIndex];
    }

    $('#options').append(`<img class="gif" src="${gifSrc}" alt="">`);
  }

  // no option selected
  const answerNotFound = function () {
    $('#timer').css('visibility', 'hidden');
    $('#questions').text('');
    $('#options').text('');
    $('#questions').text('No Option Selected !!');
    $('#questions').append(`<p>The correct answer is - ${rightAnswer.trim()}</p>`);
    getGIF("wrong");
    countDown.stop();
    countDown.resetClock();
    index = index + 1;
    trivia.unanswered++;
    // delay between answer and next question
    setTimeout(displayQuestion, 2000, index);
  };

  // incorrect answer method
  const answerWrong = function () {
    $('#timer').css('visibility', 'hidden');
    $('#questions').text('');
    $('#options').text('');
    $('#questions').text('You are Wrong !!');
    $('#questions').append(`<p>The correct answer is - ${rightAnswer.trim()}</p>`);
    getGIF("wrong");
    $("#modalLoginAvatarDemo").show();
    countDown.stop();
    countDown.resetClock();
    index = index + 1;
    // delay between answer and next question
    setTimeout(displayQuestion, 2000, index);
  };

  // correct answer method
  const answerRight = function () {
    $('#timer').css('visibility', 'hidden');
    $('#questions').text('');
    $('#options').text('');
    $('#questions').text('You are Right !!');
    $('#questions').append(`<p>The correct answer is - ${rightAnswer.trim()}</p>`);
    getGIF("right");
    countDown.stop();
    countDown.resetClock();
    index = index + 1;
    // delay between answer and next question
    setTimeout(displayQuestion, 2000, index);
  };

  // reset method 
  const reset = function () {
    $('#timer').css('visibility', 'hidden');
    $('#questions').text('');
    $('#options').text('');
    $('#options').append(`<p class="over"> Game Over </p>`)
    $('#options').append(`<p class="score"> Your Score </p>`)
    $('#options').append(`<p class="score"> Total Questions : ${Object.values(trivia.questions).length} </p>`)
    $('#options').append(`<p class="score"> No. of Correct : ${trivia.correct} </p>`)
    $('#options').append(`<p class="score"> No. of Incorrect : ${trivia.incorrect} </p>`)
    $('#options').append(`<p class="score"> No. of Unanswered : ${trivia.unanswered} </p>`)
    $('#options').append(`<button class="reset" type="button"> Click here to play again.... </button>`)
    countDown.stop();
    countDown.resetClock();
  };

  //begin game
  $('#startGame').click(function () {
    $('#game-intro').remove();
    $("#questionSection").show();
    $("#timer").show();
    displayQuestion(index);
  });

  //answer selected
  $(document).on('click', '.choice', function () {
    // console.log($(this));
    if ($(this).hasClass("correct")) {
      trivia.correct++;
      answerRight();
    } else if ($(this).hasClass("incorrect")) {
      trivia.incorrect++;
      answerWrong();
    }
  });

  // restart game when reset button is clicked
  $(document).on('click', '.reset', function () {
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    index = 0;
    rightAnswer = '';
    displayQuestion(index);
  });

  $("#btn_playPause").on("click", () => {
    var audio = document.getElementById("audioTag");
    var btn_playPause = document.getElementById("btn_playPause");
    var isPaused = audio.paused;
    isPaused? audio.play(): audio.pause();
    btn_playPause.style.backgroundPosition = "0 " + (isPaused ? "-32px" : "0px");
  });
});