TRADE.TestSlides = Backbone.View.extend({
        tagName: 'div',
        className: 'test-holder',
        template: _.template("<div class='question-txt'><%= questiontxt %></div>"),
        optiontemplate: _.template("<div data-optionid='<%= optionid %>' class='option-txt'><%= optionid %>. <%= optiontxt %></div>"),
        navtemplate: _.template("<div class='option-nav'>QUESTION <%= (currentquestion + 1) %> OF <%= numquestions %></div>"),
        submittemplate: _.template("<div class='option-submit'><div id='submit_option'>Submit</div></div>"),
        events: {
                "mouseover .option-txt": "lessonMouseover",
                "mouseout .option-txt": "lessonMouseout",
                "click .option-txt": "selectOption",
                "click .active-submit-option": "submitOption"
        },
        lessonMouseover: function (e) {
                $(e.currentTarget).addClass('option-hover');

        },
        lessonMouseout: function (e) {
                $(e.currentTarget).removeClass('option-hover');

        },
        selectOption: function (e) {
                var answer = $(e.currentTarget).data('optionid');
                $('.active-option').removeClass('active-option');
                $(e.currentTarget).addClass('active-option');
                $('#submit_option').addClass('active-submit-option');
                $('#submit_option').data('optionid', answer);
                console.log(answer);
        },
        submitOption: function (e) {
                var optionid = $('#submit_option').data('optionid');
                console.dir(optionid);
        },
        render : function (questionindex) {
                console.dir(this.collection.models[questionindex]);
                var questiontxt = this.collection.models[questionindex].attributes.qtxt;
                var numquestions = this.collection.models.length;
                this.$el.append(this.template({questiontxt: questiontxt}));
                var options = this.collection.models[questionindex].attributes.options;
                options.forEach(this.renderOptions, this);
                this.$el.append(this.submittemplate);
                this.$el.append(this.navtemplate({currentquestion: questionindex, numquestions: numquestions}));
        },

        renderOptions: function (model) {
            this.$el.append(this.optiontemplate(model));
        },
        expand: function () {
                
        }
});