(function () {
    angular
        .module("appModule")
        .controller('resultsCtrl', ResultsController);

    ResultsController.$inject = ['quizMetrics', 'dataService'];

    function ResultsController(quizMetrics, dataService) {
        var vm = this;

        vm.activeQuestion = 0;
        vm.calculatePer = calculatePer;
        vm.reset = reset;
        vm.quizMetrics = quizMetrics;
        vm.dataService = dataService;
        vm.setActiveQuestion = setActiveQuestion;
        vm.getAnswerClass = getAnswerClass;

        function calculatePer() {
            return quizMetrics.numCorrect/ dataService.quizQuestions.length*100;
        }

        function getAnswerClass(index) {
            if (index === quizMetrics.correctAnswers[vm.activeQuestion]){
                return "bg-success";
            } else if(index === dataService.quizQuestions[vm.activeQuestion].selected) {
                return "bg-danger";
            }
        }

        function setActiveQuestion(index) {
            vm.activeQuestion = index;
        }

        function reset() {
            quizMetrics.changeState("results", false);
            quizMetrics.numCorrect = 0;

            for (var i in dataService.quizQuestions){
                var data = dataService.quizQuestions[i];
                data.selected = null;
                data.correct = null;
            }
        }
    }


})();