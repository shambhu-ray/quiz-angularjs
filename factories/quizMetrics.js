// Angular Factory
(function () {
    angular
        .module("appModule")
        .factory("quizMetrics", QuizMetrics);

    QuizMetrics.$inject = ['dataService'];

    function QuizMetrics(dataService) {
        var quizObject = {
            quizActive: false,
            resultsActive: false,
            correctAnswers: [],
            numCorrect: 0,
            markQuiz: markQuiz,
            changeState: changeState
        };
        return quizObject;

        function changeState(metric, state) {
            if (metric === "quiz") {
                quizObject.quizActive = state;
            } else if (metric === "results") {
                quizObject.resultsActive = state
            } else {
                return false;
            }
        }

        function markQuiz() {
            quizObject.correctAnswers = dataService.correctAnswers;
            var i = 0;
            var length = dataService.quizQuestions.length;
            for (i; i < length; i++) {
                if (dataService.quizQuestions[i].selected === dataService.correctAnswers[i]) {
                    dataService.quizQuestions[i].correct = true;
                    quizObject.numCorrect++;
                } else {
                    dataService.quizQuestions[i].correct = false;
                }
            }
        }
    }

})();