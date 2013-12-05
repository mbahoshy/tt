TRADE.Router = Backbone.Router.extend({
    routes: {
        "": "classroomFunction", //displays classes
        "class/:classid": "classFunction", //displays chapters
        "chapter/:chapterid": "chapterFunction", //displays lessons
        "slides/:lessonid": "slideFunction"
    },

    classroomFunction: function () {
        $('#main_wrapper').html(''); //clear html
        $('#title_wrapper').html(''); //clear html

        $.get("/getClasses", function(data, status){
            var classCollection1 = new TRADE.ClassCollection();
            classCollection1.reset(data);
            var classCollectionView1 = new TRADE.ClassCollectionView ({collection: classCollection1});
            classCollectionView1.render();
            $('#main_wrapper').append(classCollectionView1.$el);
            console.dir(data);
        });
    },

    classFunction: function (classid) {
        $('#main_wrapper').html(''); //clear html
        $('#title_wrapper').html(''); //clear html
        TRADE.NavData.classid = classid;

        $.get("/getNav/" + classid, function(data, status){
            TRADE.NavObj = data;
            renderChapters();
        });

        $.get("/user", function(data, status){ //get user info and render user card

            //creates user card and renders
            var user1 = new TRADE.User (data);
            var cardView1 = new TRADE.UserView ({model: user1});
            cardView1.render();
            $('#main_wrapper').append(cardView1.$el);
            console.dir(data);
            
            //sets user data to variable
            console.log(classid);
            TRADE.UserData = data;
            var x = _.where(data.progress, {classid: classid, completed:true});
            console.dir(x);
          
        });

        function renderChapters () {
            //creates classroom title view and renders
            // var class1 = new TRADE.ClassModel (TRADE.NavObj);
            // var classview1 = new TRADE.ClassTitleView ({model: class1});
            // classview1.render();
            
            //creates chapter list view and render chapter cards
            var ChapterCollection1 = new TRADE.ChapterCollection ();
            ChapterCollection1.reset(TRADE.NavObj.chapters);
            var ChapterListView1 = new TRADE.ChapterListView ({collection: ChapterCollection1});
            ChapterListView1.render();

            //append to dom
            $('#main_wrapper').prepend(ChapterListView1.$el);
            // $('#title_wrapper').append(classview1.$el);
        }
    },

    chapterFunction: function (chapterid) {

        //clear html
        $('#main_wrapper').html('');
        $('#title_wrapper').html('');
        TRADE.NavData.chapterid = chapterid;

        $( document ).ready(function() {
            $('#main_wrapper').append("<div id='lesson_list_container'></div>");

            if(TRADE.NavObj == '') {
                $.get("/getNav/reset", function(data, status){ //get chapter info and render chapter cards
                    TRADE.NavObj = data;
                    renderLessons();      
                });
            } else {
                renderLessons();
            }
            if(TRADE.UserData == ''){
                $.get("/session/classid", function(data, status){
                    TRADE.NavData.classid = data;
                                       
                    (function () {
                        $.get("/user", function(data, status){ //get user info and render user card

                            TRADE.UserData = data;
                            renderUserLesson();
                         });   
                    })();

                });

                          
            } else {
                renderUserLesson();
            }
        });

        function renderLessons () {
            //uses TRADE.NavData to find chapter -- uses TRADE.UserData to find user progress for chapter
            var record = _.findWhere(TRADE.NavObj.chapters, {chapterid: chapterid});

            //creates chapter title view and renders
            var chaptertitle1 = new TRADE.ChapterModel (record);
            var chaptertitleview1 = new TRADE.ChapterTitleView ({model: chaptertitle1});
            chaptertitleview1.render();
            
            //creates lesson list view and renders
            var LessonCollection1 = new TRADE.LessonCollection ();
            LessonCollection1.reset(record.lessons); //loads collection with lessons from chapter
            var LessonListView1 = new TRADE.LessonListView ({collection: LessonCollection1});
            LessonListView1.render();

            //append to dom
            
            $('#lesson_list_container').append(LessonListView1.$el);
            $('#title_wrapper').append(chaptertitleview1.$el);
        }

        function renderUserLesson () {
            console.log(chapterid);
            // var userrecord = _.findWhere(TRADE.UserData.progress, {chapterid: chapterid});
            // console.dir(userrecord);
            //creates chapter title view and renders
            var userchapter1 = new TRADE.User (TRADE.UserData);
            var userchapterview1 = new TRADE.UserChapterView ({model: userchapter1});
            userchapterview1.render();
            $('#lesson_list_container').append(userchapterview1.$el);
        }
        

    },

    slideFunction: function (lessonnum) {

        //clear html
        $('#main_wrapper').html('');
        $('#title_wrapper').html('');



        if(TRADE.NavObj == '') { //if NavObj is empty request new navdata from server
            $.get("/session/lessonid", function(data, status){ //refreshes lessonid
                TRADE.NavData.lessonid = data;
                resetLessonType();
            });
            function resetLessonType() {
                $.get("/session/lessontype", function(data, status){
                    TRADE.NavData.lessontype = data;
                    slideTemplate();
                });
            }
        } else {
            var record = _.findWhere(TRADE.NavObj.chapters, {chapterid: TRADE.NavData.chapterid});
            var lesson_record = _.findWhere(record.lessons, {lessonid: lessonnum});
            TRADE.NavData.lessonid = lesson_record.slides;
            TRADE.NavData.lessontype = lesson_record.lessontype;
            console.log(TRADE.NavData.lessontype);
            slideTemplate();
        }

        //loads outer slide template after json is complete
        function slideTemplate () {
            $.get('/slideTemplate/' + TRADE.NavData.lessontype, function(data, status) {
              var template = $(data).html();
                $("#main_wrapper").prepend(_.template(template));
                slides();
            });
        } 

        //loads individual slides after slide template is loaded
        function slides () {
            $.get('/slides/' + TRADE.NavData.lessonid + '/' + TRADE.NavData.lessontype, function(data, status){

                $('#main_wrapper').append('<div class="hidden">' + data + '</div>');
                var slides = $('#slide_holder > .slide');

                var template = $(slides[0]).html();
                TRADE.GameData.slideindex = 0; //keeps track of current slide
                
                $("#slide_container").html(_.template(template));
                if (TRADE.NavData.lessontype === 'lesson') {
                    
                    $('.slide-left').on('click', TRADE.FUNC.slideChange);
                    $('.slide-right').on('click', TRADE.FUNC.slideChange);
                    TRADE.FUNC.slideIndexNav();
                    $('#slide_nav_' + TRADE.GameData.slideindex).addClass('slide-active');
                    
                } else if (TRADE.NavData.lessontype === 'problem') {
                    TRADE.FUNC.problemIndexNav();

                    //creates answer list view and render answer cards
                    var answercollection1 = new TRADE.AnswerCollection ();
                    answercollection1.reset(TRADE.GameData.answeroptions);
                    var answerlistview1 = new TRADE.AnswerListView ({collection: answercollection1});
                    answerlistview1.render();

                    //append to dom
                    $('#answer_categories').append(answerlistview1.$el);
                    $('#answer_question').on('click', function () {
                        $('#answer_container').slideToggle(function(){
                            $('#answer_options').html('');
                            $('.bold').removeClass('bold');
                        });
                    });
                    $('#shadow').on('click', function () {
                        $(this).fadeToggle();
                        $('#correct').css('display', 'none');
                        $('#incorrect').css('display', 'none');
                    });
                }
            });
        }
       
        //TRADE.Lesson = lessonid;
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

    // HVACChapterListView: function (classid) {

    //     $('.wrapper').html(''); //clear html
    //     $('#title_wrapper').html(''); //clear html

    //     $( document ).ready(function() {
    //         if(TRADE.NavObj == '') {
                
    //             $.get("/class/" + classid, function(data, status){ //get chapter info and render chapter cards
    //                 TRADE.NavObj = data;
    //                 console.dir(TRADE.NavObj);
    //                 TRADE.NavData.classid = classid; // manage with cookies
    //                 renderChapters();        
    //             });
    //         } else {
                
    //             renderChapters();
    //         }
            

    //     });
  
    //     function renderChapters () {
    //         //creates classroom title view and renders
    //         var class1 = new TRADE.ClassModel (TRADE.NavObj);
    //         var classview1 = new TRADE.ClassTitleView ({model: class1});
    //         classview1.render();
            
    //         //creates chapter list view and render chapter cards
    //         var ChapterCollection1 = new TRADE.ChapterCollection ();
    //         ChapterCollection1.reset(TRADE.NavObj.chapters);
    //         var ChapterListView1 = new TRADE.ChapterListView ({collection: ChapterCollection1});
    //         ChapterListView1.render();

    //         //append to dom
    //         $('.wrapper').append(ChapterListView1.$el);
    //         $('#title_wrapper').append(classview1.$el);
    //     }


    // },