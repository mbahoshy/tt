TRADE.Router = Backbone.Router.extend({
    routes: {
        ":classid": "HVACChapterListView",
        "lessons/:chapterid": "HVACLessonListView",
        "slides/:lessonid": "HVACSlideView"
    },

    HVACChapterListView: function (classid) {

        $('#wrapper').html(''); //clear html
        $('#title_wrapper').html(''); //clear html

        $.get("/class/" + classid, function(data, status){ //get chapter info and render chapter cards

            //creates classroom title view and renders
            var class1 = new TRADE.Classroom (data);
            var classview1 = new TRADE.ClassTitleView ({model: class1});
            classview1.render();

            //creates chapter list view and render chapter cards
            var ChapterCollection1 = new TRADE.ChapterCollection ();
            ChapterCollection1.reset(data.chapters);
            var ChapterListView1 = new TRADE.ChapterListView ({collection: ChapterCollection1});
            ChapterListView1.render();

            //append to dom
            $('#wrapper').append(ChapterListView1.$el);
            $('#title_wrapper').append(classview1.$el);

            //sets nav data to variable
            TRADE.NavData = data;
            TRADE.Class = classid;
        });
      
        $.get("/users/2", function(data, status){ //get user info and render user card

            //creates user card and renders
            var user1 = new TRADE.User (data);
            var cardView1 = new TRADE.UserView ({model: user1});
            cardView1.render();
            $('#wrapper').append(cardView1.$el);

            //sets user data to variable
            TRADE.UserData = _.findWhere(data.progress, {classroomid: classid});

        });

    },

    HVACLessonListView: function (chapterid) {

        //clear html
        $('#wrapper').html('');
        $('#title_wrapper').html('');

        console.dir(TRADE.UserData.progress);
        var record = _.findWhere(TRADE.NavData.chapters, {chapterid: chapterid});
        var userrecord = _.findWhere(TRADE.UserData.progress, {chapterid: chapterid});
        console.dir(TRADE.UserData.progress);

        //creates chapter title view and renders
        TRADE.chaptertitle1 = new TRADE.Chapter (record);
        TRADE.chaptertitleview1 = new TRADE.ChapterTitleView ({model: TRADE.chaptertitle1});
        TRADE.chaptertitleview1.render();

        //creates lesson list view and renders
        TRADE.LessonCollection1 = new TRADE.LessonCollection ();
        TRADE.LessonCollection1.reset(record.lessons);
        TRADE.LessonListView1 = new TRADE.LessonListView ({collection: TRADE.LessonCollection1});
        TRADE.LessonListView1.render();

        //creates chapter title view and renders
        TRADE.userchapter1 = new TRADE.User (userrecord);
        TRADE.userchapterview1 = new TRADE.UserChapterView ({model: TRADE.userchapter1});
        TRADE.userchapterview1.render();


        //append to dom
        $('#wrapper').append(TRADE.LessonListView1.$el);
        $('#wrapper').append(TRADE.userchapterview1.$el);
        $('#title_wrapper').append(TRADE.chaptertitleview1.$el);

        TRADE.Chapter = chapterid;

    },

    HVACSlideView: function (lessonid) {

        $('#wrapper').html('');
        $('#title_wrapper').html('');

        var record = _.findWhere(TRADE.NavData.chapters, {chapterid: TRADE.Chapter});
        var lesson_record = _.findWhere(record.lessons, {lessonid: lessonid});

        console.dir(lesson_record.slides[0]);

        var template = $("#slide1").html();
        
        $('#wrapper').append("<div id='level_container'></div>");
        $("#wrapper").prepend(_.template(template,{lesson_record: lesson_record}));

        TRADE.Lesson = lessonid;
    }
});

TRADE.router = new TRADE.Router();
Backbone.history.start({root: "/"});



        //get class info and render title card
        /*$.get("/find/" + classid, function(data, status){
            TRADE.class1 = new TRADE.Classroom (data);
            TRADE.classview1 = new TRADE.ClassTitleView ({model: TRADE.class1});
            TRADE.classview1.render();
            $('#wrapper').prepend(TRADE.classview1.$el);
            this.classid = data.id;
            this.classname = data.name;
        });*/