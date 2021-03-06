TRADE.AnswerSubView = Backbone.View.extend({
        tagName: 'li',
        className: '',
        template: _.template("<%= txt %>"),
        events: {
                "click": "answerCheck"
        },

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        },

        answerCheck: function () {
                var unlock;
                var level = $('#answer_container').data('level');
                var problemname = $('#answer_container').data('problemname');
                var problemid = $('#answer_container').data('problemid');
                var chapterid = $('#answer_container').data('chapterid');
                var answerid = $('#answer_container').data('answerid');
                var optionid = this.model.attributes.answerid;
                var classid = $('#answer_container').data('classid');
                var problemnumber = TRADE.GameData.slideindex;
                var slides = $('#slide_holder > .slide'); // get slide array
                var slidesNumber = slides.length;
                var attemptCounter;

                attemptCounter = $('#attempt_counter').html();
                attemptCounter ++;
                $('#attempt_counter').html(attemptCounter);


                $.post('/problem/' + classid + '/' + chapterid + '/' + problemid + '/' + answerid + '/' + optionid + '/' + problemnumber + '/' + problemname + '/' + level + '/' + slidesNumber, function (data) {
                        console.log('problem successfully updated');
                        console.dir('data');
                        console.dir(data);
                        unlock = data.unlock;
                        updateProblem ();
                });

                function updateProblem () {
                        if (unlock === true) {
                                $('#attempt_counter').html('0');
                                
                                console.log("Correct Answer!");
                                TRADE.GameData.slideindex ++;
                                
                                if (slidesNumber === TRADE.GameData.slideindex) {
                                        console.log("last problem");
                                        
                                } else {
                                        
                                        $('.problem-nav-active').removeClass('problem-nav-active');
                                        $("#slide_nav_" + TRADE.GameData.slideindex).addClass('problem-nav-active');
                                        $("#level_container").html('');
                                        $("#slide_nav_" + TRADE.GameData.slideindex).addClass('unlocked');
                                        $('#answer_question').trigger('click');
                                        // $('#shadow').fadeToggle();
                                        // $('#correct').fadeToggle();
                                        $('#answer_result').html('<h3 class="correct">Correct!</h3>');
                                        
                                        var template = $(slides[TRADE.GameData.slideindex]).html();
                                        
                                        $("#slide_container").html(_.template(template));
                                }
                        } else {
                                unlock = false;
                                // $('#shadow').fadeToggle();
                                // $('#incorrect').fadeToggle();
                                $('#answer_result').html('<h3 class="incorrect">Incorrect</h3>');
                        }
                }

                //console.dir(this.model.attributes.answerid);

        }
});