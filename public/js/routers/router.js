TRADE.Router = Backbone.Router.extend({
    routes: {
        "": "displayListOfClassrooms", //displays classes
        "class/:classid/:chapterindex": "displayChapter", //displays chapters
        // "chapter/:chapterid": "chapterFunction", //displays lessons
        "slides/:classid/:chapterid/:lessonid": "slideFunction",
        "problems/:level": "problemListFunction",
        "problemslides/:classid/:chapterid/:problemid/:answerid/:level/:problemname": "problemSlideFunction",
        "report" : "reportFunction",
        "test/:classid/:chapterid/:testid" : "displayTest",
        "testReport/:testid" : "reportTest"
    },


    intervals: {},

    displayListOfClassrooms: function () {
        this.clearBody();

        var classes,
            wait = 0,
            classCollection1 = new TRADE.ClassCollection();

        $.get("/user", function(data, status){
            classCollection1.user = data;
            wait ++;
            renderClasses();
        });   

        $.get("/getClasses", function(data, status){ 
            console.dir(data);

            classCollection1.reset(data);
            wait ++;
            renderClasses();
        });

        function renderClasses() {
            if (wait === 2) {
                var classCollectionView1 = new TRADE.ClassroomCardList ({collection: classCollection1});
                classCollectionView1.render();
                $('#body_container').append(classCollectionView1.$el);
            }
        }
    },

    displayChapter: function (classid, chapterindex) {
        this.clearBody();

        var user,
            nav,
            wait = 0;

        $.get("/getNav/" + classid, function(data, status){
            nav = data;
            wait ++;
            renderChapters();
        });

        $.get("/user", function(data, status){
            user = data;
            wait ++;
            renderChapters();

        });

        function renderChapters () {
            if (wait === 2) {
                var ChapterCollection1 = new TRADE.ChapterCollection ();
                ChapterCollection1.classid = classid;
                console.dir(nav);
                ChapterCollection1.reset(nav.chapters);
                ChapterCollection1.user = user;
                ChapterCollection1.navname = nav.name;
                var ChapterListView1 = new TRADE.ChapterListView ({collection: ChapterCollection1});

                ChapterListView1.render(chapterindex);

                //append to dom
                $('#body_container').prepend(ChapterListView1.$el);
            }
        }
    },

    slideFunction: function (classid, chapterid, lessonid) {

        //clear html
        this.clearBody();

        var template,
            slides,
            wait = 0;

        $.get('/slideTemplate/lesson', function(data, status) {
            var template = $(data).html();
            console.dir(template);
            $("#body_container").append(_.template(template));
            wait ++;
            loadSlides();
        });

        $.get('/slides/' + lessonid, function(data, status){
            $('#body_container').append('<div class="hidden">' + data + '</div>');
            wait ++;
            loadSlides();
        });

        function loadSlides () {
            if (wait === 2) {
                var slides = $('#slide_holder > .slide');

                var currentslide = $(slides[0]).html();
                TRADE.GameData.slideindex = 0; //keeps track of current slide
                $("#slide_container").html(_.template(currentslide));

                $('.slide-left').on('click', function () {
                    TRADE.FUNC.slideChange(classid, chapterid, lessonid, this);
                });
                $('.slide-right').on('click', function  () {
                    TRADE.FUNC.slideChange(classid, chapterid, lessonid, this);
                });
                TRADE.FUNC.slideIndexNav();
                $('#slide_nav_' + TRADE.GameData.slideindex).addClass('slide-active');
            }
        }
    },

    reportFunction: function () {
        this.clearBody();

        var user,
            nav,
            wait = 0;

        $.get("/user", function(data, status){
            user = data;
            wait ++;
            renderReport ();
        });

        $.get("/report", function(data, status){
            console.dir(data);
            nav = data;
            wait ++;
            renderReport ();
        });

        function renderReport () {
            if (wait === 2) {
                var skillCollection = new TRADE.ClassCollection();
                skillCollection.reset(nav);
                var classCollectionReport1 = new TRADE.ReportCardView ({collection: skillCollection});
                classCollectionReport1.render(user);
                $('#body_container').append(classCollectionReport1.$el);

                var bars = $('.progress-green');
                var numbars = bars.length;

                for (var i = 0; i < numbars; i ++) {
                    var width = $(bars[i]).data('width');
                    $(bars[i]).animate({width: width}, 1000, function () {});
                }

            }
        }
    },

    problemSlideFunction: function (classid, chapterid, problemid, answerid, level, problemname) {

        this.clearBody();

        var allSlides,
            user,
            wait = 0;

        $.get("/user", function(data, status){
            TRADE.UserData = data;
            user = data;
            wait ++;
            renderProblemSlide();
        });
         

        $.get('/slideTemplate/problem', function(data, status) {
            template = $(data).html();
            $("#body_container").append(_.template(template));
            //save data about problem, so it can be posted later in answersubview
            $('#answer_container').data('level', level);
            $('#answer_container').data('problemname', problemname);
            $('#answer_container').data('problemid', problemid);
            $('#answer_container').data('chapterid', chapterid);
            $('#answer_container').data('classid', classid);
            $('#answer_container').data('answerid', answerid);

            wait ++;
            renderProblemSlide();
            
        });

        $.get('/problemslides/' + problemid, function(data, status){
            allSlides = data;
            wait ++;
            renderProblemSlide();
        });

        //loads outer slide template after json is complete
        function renderProblemSlide () {
            if (wait === 3) {
                console.log('function called');
                var problemTemplate;
                $('#body_container').append('<div class="hidden">' + allSlides + '</div>');
                var slides = $('#slide_holder > .slide');
                TRADE.FUNC.problemIndexNav();
                var currentProblem = _.findWhere(user.problemProgress, {problemid: problemid});
                if (currentProblem) {
                    var unlockedlength = _.where(currentProblem.score, {unlocked:true}).length;
                    var maxlength = currentProblem.numberOfQuestions;
                    for (var i = 0; i <= unlockedlength; i++) {
                        $("#slide_nav_" + i).addClass('unlocked');
                        if(i === unlockedlength) {
                            $("#slide_nav_" + i).addClass('problem-nav-active');
                           
                            problemTemplate = $(slides[i]).html();
                            TRADE.GameData.slideindex = i; //keeps track of current slide
                        }
                        if (i == maxlength) {
                            problemTemplate = $(slides[(maxlength - 1)]).html();
                            $("#slide_nav_" + (maxlength - 1)).addClass('problem-nav-active');
                        }
                        // $("#slide_nav_0").addClass('problem-nav-active');
                    }
                } else {
                    $("#slide_nav_" + 0).addClass('problem-nav-active');
                    problemTemplate = $(slides[0]).html();
                    TRADE.GameData.slideindex = 0; //keeps track of current slide
                }            

                console.dir(problemTemplate);
                $("#slide_container").html(_.template(problemTemplate));

                

                //creates answer list view and render answer cards
                var answercollection1 = new TRADE.AnswerCollection ();
                answercollection1.reset(TRADE.GameData.answeroptions);
                var answerlistview1 = new TRADE.AnswerListView ({collection: answercollection1});
                answerlistview1.render();

                $("#slide_nav_0").addClass('unlocked');
                
                

                //append to dom
                $('#answer_categories').append(answerlistview1.$el);
                $('#answer_question').on('click', function () {
                    $('#answer_question').toggleClass('answer-question-pressed');
                    $('#answer_container').slideToggle(function(){
                        $('#answer_options').html('');
                        $('.active-category').removeClass('active-category');
                    });
                });
            }
        }               
        
    },

    displayTest: function (classid, chapterid, testid) {
        this.clearBody();

        $.get("/test/" + testid, function(data, status){
            var questioncollection1 = new TRADE.QuestionCollection();
            questioncollection1.reset(data);
            questioncollection1.testid = testid;
            questioncollection1.chapterid = chapterid;
            questioncollection1.classid = classid;
            var testcollectionview = new TRADE.TestSlides({collection: questioncollection1});
            testcollectionview.render(0);
            testcollectionview.setTimer();
            $('#body_container').append(testcollectionview.$el);
            
        });
    },

    reportTest: function (testid) {
        this.clearBody();

        var user;

        $.get("/user", function(data, status){
            user  = data;
            renderReport();
        });  

        function renderReport () {
            var test = _.findWhere(user.testProgress, {testid: testid});
            var questioncollection1 = new TRADE.QuestionCollection();
            questioncollection1.reset(test.score);
            questioncollection1.numberOfQuestions = test.numberOfQuestions;
            questioncollection1.chapterid = test.chapterid;
            questioncollection1.classid = test.classid;
            var testcollectionview = new TRADE.TestReport({collection: questioncollection1});
            testcollectionview.render();     
            $('#body_container').append(testcollectionview.$el);       
            console.dir(test);
        }

        // $.get("/test/" + testid, function(data, status) {
        //     console.dir(data);
        // });
    },

    clearBody: function() {
        $('#body_container').html('');

        var routerIntervals = _.keys(this.intervals);
        var numRouterIntervals = routerIntervals.length;

        if (numRouterIntervals != 0) {
            for (var i = 0; i <numRouterIntervals; i++) {
                clearInterval(this.intervals[routerIntervals[i]]);
            }
        }

        var gameIntervals = _.keys(TRADE.CIRC.Intervals);
        var numGameIntervals = gameIntervals.length;

        if (numGameIntervals != 0) {
            for (var i = 0; i <numGameIntervals; i++) {
                clearInterval(TRADE.CIRC.Intervals[gameIntervals[i]]);
            }
        }

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

    //     chapterFunction: function (chapterid) {

    //     //clear html
    //     $('#main_wrapper').html('');
    //     $('#title_wrapper').html('');
    //     TRADE.NavData.chapterid = chapterid;

    //     $( document ).ready(function() {
    //         $('#main_wrapper').append("<div id='lesson_list_container'></div>");

    //         if(TRADE.NavObj == '') {
    //             $.get("/getNav/reset", function(data, status){ //get chapter info and render chapter cards
    //                 TRADE.NavObj = data;
    //                 renderLessons();      
    //             });
    //         } else {
    //             renderLessons();
    //         }
    //         if(TRADE.UserData == ''){
    //             $.get("/session/classid", function(data, status){
    //                 TRADE.NavData.classid = data;
                                       
    //                 (function () {
    //                     $.get("/user", function(data, status){ //get user info and render user card

    //                         TRADE.UserData = data;
    //                         renderUserLesson();
    //                      });   
    //                 })();

    //             });

                          
    //         } else {
    //             renderUserLesson();
    //         }
    //     });

    //     function renderLessons () {
    //         //uses TRADE.NavData to find chapter -- uses TRADE.UserData to find user progress for chapter
    //         var record = _.findWhere(TRADE.NavObj.chapters, {chapterid: chapterid});

    //         //creates chapter title view and renders
    //         var chaptertitle1 = new TRADE.ChapterModel (record);
    //         var chaptertitleview1 = new TRADE.ChapterTitleView ({model: chaptertitle1});
    //         chaptertitleview1.render();
            
    //         //creates lesson list view and renders
    //         var LessonCollection1 = new TRADE.LessonCollection ();
    //         LessonCollection1.reset(record.lessons); //loads collection with lessons from chapter
    //         var LessonListView1 = new TRADE.LessonListView ({collection: LessonCollection1});
    //         LessonListView1.render();

    //         //append to dom
            
    //         $('#lesson_list_container').append(LessonListView1.$el);
    //         $('#title_wrapper').append(chaptertitleview1.$el);
    //     }

    //     function renderUserLesson () {
    //         console.log(chapterid);
    //         // var userrecord = _.findWhere(TRADE.UserData.progress, {chapterid: chapterid});
    //         // console.dir(userrecord);
    //         //creates chapter title view and renders
    //         var userchapter1 = new TRADE.User (TRADE.UserData);
    //         var userchapterview1 = new TRADE.UserChapterView ({model: userchapter1});
    //         userchapterview1.render();
    //         $('#lesson_list_container').append(userchapterview1.$el);
    //     }
        

    // },


    // problemListFunction: function (id) {
    //     var problems,
    //         wait = 0;

    //     // var activenav = $('#subnav_container').data('problemactivenav'); //grabs active nav
    //     // var exists = $('#problem_subnav').data("exists"); //checks if template exists

    //     // if (!exists && !activenav) { 
    //     //     level = level0;
    //     // } else if (!exists) {//assigns correct level to be shown
    //     //     level = activenav;
    //     // } else {
    //     //     level = level0;
    //     // }
    //     $('#body_container').html('');
    //     $('#lesson_container').html('');

    //     $.get("/problems/" + id , function(data, status){ //gets a list of problems for level
    //         problems = data;
    //         console.dir(problems);
    //         wait ++;
    //         renderProblems();
    //     });

    //     $.get("/user", function(data, status){
    //         TRADE.UserData = data;
    //         wait ++;
    //         renderProblems();
    //     });

    //     $.get("/template/problemlisttemplate", function (data, status){
    //         template = $(data).html();
    //         renderTemplate();
    //         wait ++;
    //         renderProblems();
    //     });

    //     // if (!exists) { //clears html if page does not exists
           
            
    //     // } else {
    //     //     
    //     //     wait ++;
    //     //     renderProblems();
    //     // }

        

    //     function renderProblems () {
    //         if (wait === 3) {
    //             // var findLevel = _.where(problems.list, {problemlevel:"Rookie"});
    //             // $('#subnav_container').data('problemactivenav', level);
    //             var problemCollection1 = new TRADE.ProblemCollection();
    //             problemCollection1.classid = id;
    //             problemCollection1.reset(problems.list);

    //             var ProblemListView1 = new TRADE.ProblemListView ({collection: problemCollection1});
    //             ProblemListView1.render();
    //             $('#body_container').append(ProblemListView1.$el);

    //             $('#level_list').on('click', 'li', function () {
    //                 $('.problem-list-container').html('');
    //                 var level = $(this).data('level');
    //                 var newLevel;
    //                 if (level === 'All') {
    //                     newLevel = problems.list;
    //                 } else {
    //                     newLevel = _.where(problems.list, {problemlevel:level});
    //                 }

    //                 problemCollection1.reset(newLevel);
    //             });
    //             $('#classroom_list').on('click', 'li', function () {
    //                 $('.problem-list-container').html('');
    //                 var newid = $(this).data('classroomid');

    //                 $('.active-problem-nav').removeClass('active-problem-nav');
    //                 $(this).addClass('active-problem-nav');
    //                 $.get("/problems/" + newid , function(data, status){ //gets a list of problems for level

    //                     // $('#current_classroom').html();
    //                     problems = data;
    //                     problemCollection1.classid = newid;
    //                     problemCollection1.reset(data.list);
    //                 });
    //             });
    //         }
    //     }

    //     function renderTemplate () {
    //         var rtemplate = _.template(template);
    //         $('#body_container').prepend(rtemplate);
    //         // $('#problem_subnav').append();
    //     }

    // },
