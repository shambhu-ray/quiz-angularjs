(function () {
    angular
        .module("appModule")
        .controller("quizCtrl", QuizController);

    QuizController.$inject = ['quizMetrics', 'dataService'];

    function QuizController(quizMetrics, dataService) {
        var vm = this;

        vm.quizMetrics = quizMetrics;
        vm.dataService = dataService;
        vm.activeQuestion = 0;
        vm.error = false;
        vm.finalise = false;

        //Methods
        vm.setActiveQuestion = setActiveQuestion;
        vm.questionAnswered = questionAnswered;
        vm.selectAnswer = selectAnswer;
        vm.finaliseAnswers = finaliseAnswers;

        var numQuestionAnswered = 0;

        function questionAnswered() {
            var quizLength = dataService.quizQuestions.length;
            if (dataService.quizQuestions[vm.activeQuestion].selected !== null) {
                numQuestionAnswered++
                if (numQuestionAnswered >= quizLength) {
                    var i = 0;
                    for (i; i< quizLength; i++){
                        if(dataService.quizQuestions[i].selected === null){
                            setActiveQuestion(i);
                            return;
                        }
                    }
                    vm.error = false;
                    vm.finalise = true;
                    return;

                }
            }
            vm.setActiveQuestion();
        }

        function setActiveQuestion(index) {

            if (index === undefined){
                var breakOut = false;
                var quizLength = dataService.quizQuestions.length - 1;

                while (!breakOut) {
                    vm.activeQuestion = vm.activeQuestion < quizLength ? ++vm.activeQuestion : 0;
                    if(vm.activeQuestion === 0){
                        vm.error = true;
                    }
                    if(dataService.quizQuestions[vm.activeQuestion].selected === null){
                        breakOut = true
                    }
                }
            } else {
                vm.activeQuestion = index
            }

        }
        
        function selectAnswer(index) {
            dataService.quizQuestions[vm.activeQuestion].selected = index;
        }

        function finaliseAnswers() {
            vm.finalise = false;
            numQuestionAnswered = 0;
            vm.activeQuestion = 0;
            quizMetrics.markQuiz();
            quizMetrics.changeState("quiz", false);
            quizMetrics.changeState("results", true);
        }
    }
})();