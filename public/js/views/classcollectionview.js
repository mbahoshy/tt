TRADE.ClassroomCardList = Backbone.View.extend({
        tagName: 'div',
        className: 'classroom-card-list',
        template:_.template('<h2>Welcome back username</h2><h3>Choose a class to get started.</h3>'),
 
        render : function () {
                this.$el.html( this.template);
                this.collection.forEach(this.addOne, this);
        },

        addOne: function (model) {
                model.user = this.collection.user;
                if (model.toJSON().active === true) {
                    var ClassView1 = new TRADE.ClassView({ model: model });
                } else {
                    var ClassView1 = new TRADE.ClassViewInactive({ model: model }); 
                }

                this.$el.append(ClassView1.render().el);
        }
});

TRADE.ClassCollectionReport = Backbone.View.extend({
        tagName: 'div',
        className: 'report_card_holder',
        template: _.template('<div id="report_card_header"><span class="report-label">NAME:</span> <%= firstName %> <%= lastName %><br><%= name %><br><span class="report-label">LESSONS COMPLETED:</span> <%= lessonscompleted %><br><span class="report-label">LESSONS REMAINING:</span> <%= lessonsremain %><br><span class="report-label">PROBLEMS COMPLETED:</span> <%= problemscompleted %><br><span class="report-label">AVERAGE ATTEMPTS:</span> <%= averageattempts %></div>'),

        events: {

        },
        initialize : function () {

        },
        render : function (user) {
                var progress = {};
                progress.lessonscompleted = user.lessonProgress.length;
                progress.firstName = user.firstName;
                progress.lastName = user.lastName;
                var problemscompleted = 0;
                _.each(user.problemProgress, function (element, index){
                    if (element.numberOfQuestions == element.unlocked.length) {
                        problemscompleted ++;
                    }
                });
                progress.problemscompleted = problemscompleted;

                var totalquestions = 0;
                var totalattempts = 0;
                var totallessons = 0;
                
                _.each(this.collection.models, function (element, index) {
                    _.each(element.attributes.chapters, function (element, index) {
                        totallessons += element.lessons.length;
                    });
                });
                progress.lessonsremain = (totallessons - progress.lessonscompleted);
                _.each(user.problemProgress, function (element, index){
                    totalquestions += element.score.length;
                    var attempts = _.reduce(element.score, function(memo, num) {return memo + num;}, 0);
                    totalattempts += attempts;
                })

             
                var averageattempts = (Math.floor((totalattempts / totalquestions) * 100)/100);
                progress.averageattempts = averageattempts;
                $(this.el).prepend(this.template(progress));
                this.user = user;
                this.collection.models.forEach(this.addOne, this);
                

        },

        addOne: function (model) {

                var lessonscompleted = _.where(this.user.lessonProgress, {classid: model.attributes._id}).length;
                model.attributes.lessonscompleted = lessonscompleted
                var classproblems = _.where(this.user.problemProgress, {classid: model.attributes._id});
                
                var problemscompleted = 0;
                _.each(classproblems, function (element, index){
                    if (element.numberOfQuestions == element.unlocked.length) {
                        problemscompleted ++;
                    }
                });
                var totalquestions = 0;
                var totalattempts = 0;
                var totallessons = 0;
                
                _.each(model.attributes.chapters, function(element, index) {
                    totallessons += element.lessons.length;
                });
                model.attributes.lessonsremain = (totallessons - lessonscompleted);
                // console.log('total lessons ' + totallessons);
                _.each(classproblems, function (element, index){
                    totalquestions += element.score.length;
                    var attempts = _.reduce(element.score, function(memo, num) {return memo + num;}, 0);
                    totalattempts += attempts;
                })

                
                var averageattempts = (Math.floor((totalattempts / totalquestions) * 100)/100);
                model.attributes.averageattempts = averageattempts;
                model.attributes.problemscompleted = problemscompleted;

                var ChapterReportView1 = new TRADE.ChapterReportView({ model: model });
                this.$el.append(ChapterReportView1.render().el);   

                // this.$el.append( this.template(model.attributes));

                

                // var ClassView1 = new TRADE.ClassView({ model: model });
                // this.$el.append(ClassView1.render().el);
        }


});