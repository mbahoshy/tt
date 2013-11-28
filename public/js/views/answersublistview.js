TRADE.AnswerSubListView = Backbone.View.extend({
        tagName: 'div',
        className: 'answer-sub-list hidden',
        template: _.template(""),
        events: {
                "click": "expand"
        },
        render : function () {
                this.collection.forEach(this.addOne, this);
        },

        addOne: function (model) {

                var answersubview1 = new TRADE.AnswerSubView({
                    model: model
                });
                this.$el.append(answersubview1.render().el);
        },
        expand: function () {
                
        }
});