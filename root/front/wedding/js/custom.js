// 光箱

(function() {


    // $('.liColor').on('tap', function() {
    //     $.colorbox({
    //         html: '<div class="page1colorbox"><div class="boxtop">創建喜帖</div><div class="boxinside"><div><label for="">姓名</label><div><input type="text" placeholder="男方"><input type="text" placeholder="女方" style="float:right;"></div></div><div><label for="">手機</label><input type="number" placeholder="聯絡人電話"></div><div><label for="">日期</label><input type="month" placeholder="宴會日期"></div><div><label for="">時間</label><input type="time" placeholder="宴會時間"></div><div class="adress"><label for="">地址</label><input type="text" placeholder="宴會地點"></div><button class="caresend">提交</button></div>', //在燈箱中要顯示的html字段
    //         width: '95%', //燈箱中間區塊的寬度
    //         height: '80%', //燈箱中間區塊的高度
    //         onComplete: function() {
    //             // alert('window = ' + $(window).height());
    //             // alert('colorbox = ' + $('#colorbox').height());

    //             var window_height = $(window).height();
    //             var colorbox_height = $('#colorbox').height();
    //             var top_position = 0;

    //             if (window_height > colorbox_height) {
    //                 top_position = (window_height - colorbox_height) / 2;
    //             }

    //             // alert(top_position);
    //             $('#colorbox').css({
    //                 'top': top_position,
    //                 'position': 'fixed'
    //             });
    //         }

    //     });
    // });
    $('#jump2').on('tap', function() {
        $.colorbox({
            html: '<div class="page2colorbox"><div class="boxtop">我要赴宴</div><div class="boxinside"><div><label for="">姓名</label><div><input type="text"  style="float:right;"></div></div><div><label for="">手機</label><input type="number" ></div><div><label for="">人數</label><input type="number"></div><button class="caresend">提交</button></div>', //在燈箱中要顯示的html字段',
            width: '90%', //燈箱中間區塊的寬度
            height: '60%', //燈箱中間區塊的高度
            onClosed: function() { //當燈箱關閉時的callback funtion

            }
        });
    });
    $('.Blessing').on('tap', function() {
        $.colorbox({
            html: '<div class="page3colorbox"><div class="boxtop">送上祝福</div><div class="boxinside"><div><label for="">姓名</label><div><input type="text"  style="float:right;"></div></div><div><label for="">手機</label><input type="number" ></div><div><textarea rows="4" cols="50" placeholder="寫下一些祝福的話 ..."></textarea></div><button class="caresend">提交</button></div>', //在燈箱中要顯示的html字段',
            width: '90%', //燈箱中間區塊的寬度
            height: '70%', //燈箱中間區塊的高度
            onClosed: function() { //當燈箱關閉時的callback funtion

            }
        });
    });
    $('.carewed').on('tap', function() {
        $.colorbox({
            html: '<div class="page2colorbox"><div class="boxtop">我要赴宴</div><div class="boxinside"><div><label for="">姓名</label><div><input type="text"  style="float:right;"></div></div><div><label for="">手機</label><input type="number" ></div><div><label for="">人數</label><input type="number"></div><button class="caresend">提交</button></div>', //在燈箱中要顯示的html字段',
            width: '90%', //燈箱中間區塊的寬度
            height: '60%', //燈箱中間區塊的高度
            onClosed: function() { //當燈箱關閉時的callback funtion

            }
        });
    })


    // 三明治

    $(".sandwich").on("tap", function() {
        $('.allMove').stop(true, false).toggleClass('move');
    });
    $('.menu').on("tap", function() {
        $('.allMove').stop(true, false).toggleClass('move');
    });

    // list

    $('.colorboxlist1').on('tap', function() {
        $('#mobile').animate({
            top: 0
        }, 600, 'easeOutBounce', function() {
            $('.prev,.close').on('tap', function() {
                $('#mobile').animate({
                    top: '-100%'
                });
            });
        });
    });
    $('.colorboxlist2').on('tap', function() {

        $('.friendtable').animate({
            top: 0
        }, 600, 'easeOutBounce', function() {
            $('.prev,.close').on('tap', function() {
                $('.friendtable').animate({
                    top: '-100%'
                }, function() {
                    $('.friendtable textarea').fadeOut();
                });
            });
            $('.Blessingyou').on('click', function() {
                $('.applecolorbox,.friendtable textarea').fadeIn(function() {
                    $('.applecolorbox').on('tap', function() {
                        $('.applecolorbox,.friendtable textarea').fadeOut();
                    });
                });
            });

        });
    });

    // WIP




    // Google Maps

    function initialize() {
        var mapOptions = {
            disableDefaultUI: true,
            center: new google.maps.LatLng(47.4957469, 19.050109700000007),
            zoom: 15,
            panControl: false,
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            scrollwheel: false,
            navigationControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("small-map"), mapOptions);
        var marker = new google.maps.Marker({
            position: map.getCenter(),
            map: map
        });
    }
    initialize(); //Google Maps end
})();
