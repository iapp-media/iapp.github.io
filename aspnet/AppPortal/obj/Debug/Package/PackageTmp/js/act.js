﻿ 
$(document).ready(function () {

    //螢幕狀態判斷
    var detectmobile = false;
    (function (a, b) {
        if (!(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))) detectmobile = true
    })(navigator.userAgent || navigator.vendor || window.opera, 'http://detectmobilebrowser.com/mobile');
    if (detectmobile) {
        $(window).resize(function () {
            ifLogin();
            var screenWidth = document.body.clientWidth;
            console.log(screenWidth);
            if (screenWidth <= 768) {
                $('.BarSear').removeAttr('style');
            } else if (screenWidth >= 768) {
                $('.mobileProfileall').hide();
                $('.mobileProfileall').fadeOut(function () {
                    $(this).removeClass('LOlist')
                });
                $('.search-bar').hide();
            }
        });
        function ifLogin() {
                var $login = $('.icon-box');
                if ($login.length == 0) {
                    $('.BarSear').css('width', 'calc((100% - 300px) - 1em)');
                } else if ($('.login-box').length == 0) {
                    $('.BarSear').css('width', 'calc((100% - 400px) - 1em)');
                }
                var screenWidth = document.body.clientWidth;
                console.log(screenWidth);
                if (screenWidth <= 768) {
                    $('.BarSear').removeAttr('style');
                }
            }
        ifLogin();
    } else {
        $('.BarSear').removeAttr('style');

    }

    //判斷微店狀態

    //$('.theme li:contains(哈雷)').click(function () {
    //    console.log(123213)
    //    alert(12312313)
    //    $('html:contains(微創作)').text(哈囉)
    //});

    //Examples of how to assign the Colorbox event to elements

    var boxwidth = "80%";
    if ($(window).width() <= 1000) { boxwidth = "95%"; }
    $(".apps-info").colorbox({
        iframe: true,
        width: boxwidth,
        height: "100%"
    });
    $(".iframe-info").colorbox({
        iframe: true,
        width: "700px",
        height: "600px"
    });

    //$('.jumbotron').hide();
    //$("#user-login").click(function () {
    //    $(".m-profile").animate({
    //        height: 'toggle'
    //    }, 300);
    //    $(".theme").hide();
    //});
    $("#op-search").click(function () {
        $(".search-bar").animate({
            height: 'toggle'
        }, 300);
        $(".theme").hide();
        $(".m-profile").hide();
        
    });
    //$(".bar-text").click(function () {
    //    $('.finder').show();
    //    $(".theme").hide();
    //});
    $(".select").click(function () {
        $(".theme").animate({
            height: 'toggle'
        }, 300);
        $(".m-profile").hide();
        $('.finder').hide();
        $('.mobileProfileall').fadeOut(function () {
            $(this).removeClass('LOlist')
        });
    });
    $(".cancel").click(function () {
        $('.finder').hide();
        $('.search-bar').slideToggle(300);
        hide();
    });
    $(".login-box").click(function () {
        //$('.login-box').hide();
        //$('.icon-box').addClass('openlogin');
    });
    $(".icon-box").click(function () {
        $('.jumbotron').toggleClass('jumbotronAni');
        if ($('.jumbotron').hasClass('jumbotronAni')) {
            $('.user-icon').fadeIn('slow', function () {
                $('.option-user').fadeIn(function () {
                    $('.logout-user').fadeIn();
                });
            });
        } else {
            //$('.user-icon').fadeOut();
            $('.option-user,.user-icon,.logout-user').css('display', 'none');
        }
    });
   

    //手機板登出頁選單淡入淡出
    $('.circle-login').click(function () {
        var LogList = $('.mobileProfileall');
        $('.theme').hide();
        LogList.fadeToggle('fast');
        LogList.toggleClass('LOlist');
    });

    //瀑布流動畫
    var item = $('.item');
    function itemfadeIn() {
        var itemLen = item.length;
            item.each(function (i) {
                console.log('內容個數='+i);
                $(this).velocity(
                   {
                      top: '+=10px',
                      opacity:1
                   }, {
                      duration: 500,
                      delay:300*i
                   });
            }); //end each    
     }
    itemfadeIn();


    var $container = $('#container');

    $container.imagesLoaded(function () {
        $container.masonry({
            itemSelector: '.item',
            columnWidth: 20,
            isAnimated: true,
            isFitWidth: true
        });
    });
    // 在背景取出下一頁的內容, 並將指定的 selector 資料 append 到目前的網頁上
    $container.infinitescroll({
        navSelector: 'div.nav', // selector for the paged navigation 
        nextSelector: 'div.nav a', // selector for the NEXT link (to page 2)
        itemSelector: '.item', // selector for all items you'll retrieve
        loading: {
            img: 'img/6RMhx.gif',
            msgText: 'loading....',
            finishedMsg: 'no more...'
        }

    },
        // trigger Masonry as a callback
        function (newElements) {
            // hide new items while they are loading
            var $newElems = $(newElements).css({
                opacity: 0
            });
            // ensure that images load before adding to masonry layout
            $newElems.imagesLoaded(function () {
                // show elems now they're ready
                $newElems.animate({
                    opacity: 1
                });
                $container.masonry('appended', $newElems, true);
                $(".apps-info").colorbox({
                    iframe: true,
                    width: "80%",
                    height: "100%"
                });
            });
        }
    );

});
  
 
$("#Search").keyup(function () {
    var x = $("#Search").val().length;
    if (x >= 2) {
        $('#listbox').empty();
        $.ajax({
            type: 'GET',
            url: 'search_List.aspx?w=' + $("#Search").val(),
            success: function (word) {
                if (word != "") {
                    $("#listbox").append(word);
                    $('.finder').show();
                    $(".theme").hide();
                }
            },
            error: function () {
                //alert("PassValue Error!!");
            }
        });
    }
});

$("#mSearch").keydown(function () {
    var x = $("#mSearch").val().length;
    if (x >= 2) {
        $('#listbox').empty();
        $.ajax({
            type: 'GET',
            url: 'search_List.aspx?w=' + $("#mSearch").val(),
            success: function (word) {
                if (word != "") {
                    $("#listbox").append(word);
                    $('.finder').show();
                    $(".theme").hide();
                }
            },
            error: function () {
                alert("PassValue Error!!");
            }
        });
    }
});

$("#Search").keypress(function (e) {
    var key = window.event ? e.keyCode : e.which;
    if (key == 13) {
        window.open("portal.aspx?w=" + encodeURI($("#Search").val()), "_self");
    }
});

$("#mSearch").keypress(function (e) {
    var key = window.event ? e.keyCode : e.which;
    if (key == 13) {
        window.open("portal.aspx?w=" + encodeURI($("#mSearch").val()), "_self");
    }
});


function ref() {
    location.reload();
}

function goodit(obj) {
    if (document.cookie.indexOf("iapp_uid=") == -1) { alert('請先登入'); return; }
    var fn = "";
    var apid = obj.id;
    if ($("#" + obj.id).prop("checked") == true) { fn = "&fn=1"; }
    apid = apid.substring(1, apid.length);
    $.ajax({
        type: 'POST',
        url: '../act/good.aspx?i=' + apid + fn,
        success: function (feedback) {
            var cc = parseInt($("#gn" + apid).html());
            if (fn == "") { cc -= 1; } else { cc += 1; }
            $("#gn" + apid).html(cc.toString());
        },
        error: function () {
            alert("error!!");
        }
    });
}

function likeit(obj) {
    if (document.cookie.indexOf("iapp_uid=") == -1) { alert('請先登入'); return; }
    var fn = "";
    var apid = obj.id;
    if ($("#" + obj.id).prop("checked") == true) { fn = "&fn=1"; }
    apid = apid.substring(1, apid.length);
    $.ajax({
        type: 'POST',
        url: '../act/Like.aspx?i=' + apid + fn,
        success: function (feedback) {
            var cc = parseInt($("#kn" + apid).html());
            if (fn == "") { cc -= 1; } else { cc += 1; }
            $("#kn" + apid).html(cc.toString());
        },
        error: function () {
            alert("error!!");
        }
    });
}

function starit(obj) {
    if (document.cookie.indexOf("iapp_uid=") == -1) { alert('請先登入'); return; }
    var fn = "";
    var apid = obj.id;
    if ($("#" + obj.id).prop("checked") == true) { fn = "&fn=1"; }
    apid = apid.substring(1, apid.length);
    $.ajax({
        type: 'POST',
        url: '../act/Favor.aspx?i=' + apid + fn,
        success: function (feedback) {
        },
        error: function () {
            alert("error!!");
        }
    });
}

function toggleMy() {
    if (getValue("fn") == "my") { window.open("portal.aspx", "_self"); } else { window.open("portal.aspx?fn=my", "_self"); }
}
//function clickMin() {
//    if (getValue("t") == "10") {
//        $('.tile1 a').text('開微店');
//        $('.PortalCreat .navbar-btn2 span.changtext:contains(微創作)').text('開微店');
//    }
//}
//clickMin();

//抓網址位置function
function getValue(varname) {
    var url = window.location.href;
    try {
        var qparts = url.split('?');
        if (qparts.length === 0) {
            return '';
        }
        var query = qparts[1];
        var vars = query.split('&');
        var value = '';
        for (var i = 0; i < vars.length; i++) {
            var parts = vars[i].split('=');
            if (parts[0] == varname) {
                value = parts[1];
                break;
            }
        }
        value = unescape(value);
        value.replace(/\+/g, ' ');
        return value;
    } catch (err) {
        return '';
    }
}
