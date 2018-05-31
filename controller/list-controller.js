(function () {
    angular.module('appModule')
        .controller("listCtrl", ListController);
    ListController.$inject = ['quizMetrics'];

    function ListController(quizMetrics) {
        var vm = this;

        vm.search = '';
        vm.quizMetrics = quizMetrics;
        vm.questions = myQuestions;
        vm.activateQuiz = activateQuiz;
        vm.quizActive = false

        function activateQuiz() {
            quizMetrics.changeState("quiz",true)
        }
    }

    var myQuestions = [
        {
            question: "Who is the strongest?",
            answers: {
                a: "Superman",
                b: "The Terminator",
                c: "Waluigi, obviously"
            },
            correctAnswer: "c"
        },
        {
            question: "What is the best site ever created?",
            answers: {
                a: "SitePoint",
                b: "Simple Steps Code",
                c: "Trick question; they're both the best"
            },
            correctAnswer: "c"
        },
        {
            question: "Where is Waldo really?",
            answers: {
                a: "Antarctica",
                b: "Exploring the Pacific Ocean",
                c: "Sitting in a tree",
                d: "Minding his own business, so stop asking"
            },
            correctAnswer: "d"
        }
    ];
})()