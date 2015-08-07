//ie9以下添加bind方法
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}

$(function(){
    $('.banner').slide({effect:'fold',mainCell:".bd",titCell:'.hd',autoPlay:true,autoPage:'<li class="iconpic inblock vm"></li>',interTime:4000});
    $('.products_box').slide({effect:'leftLoop',mainCell:'ul',autoPlay:true, interTime:4000, vis:5, scroll:1});
    $('.topinfo').slide({effect:'topLoop',mainCell:'.notice_box',autoPlay:true,interTime:4000});
    $('.pro_imgs').slide({effect:'left',mainCell:'.bd',titCell:'.hd li',autoPlay:true,interTime:4000});
    $(window).resize(function(){
        var w_w = $(window).width();
        if(w_w<1200){
            $(".banner .bd,.banner .bd li").width(1200);
        }else{
            $(".banner .bd,.banner .bd li").width(w_w);
        }
    });
    var advantage = new HoverSiblings('.adva_li','on',true,false).hoverRemoveSiblings();
    var nav = new HoverSiblings('.nav li','h').hoverRemoveSiblings();
    nav.enterFunc = function(i,t){
        var t_h = $(t).find('dl').height();
        $(t).find('dl').slideDown(300);
        //$(t).find('dl').animate({'bottom':-t_h+10},200).css('z-index',3);
    };
    nav.leaveFunc = function(i,t){
        var t_h = $(t).find('dl').height();
        $(t).find('dl').slideUp(100);
        //$(t).find('dl').animate({'bottom':0},100).css('z-index',1);
    };
    var top_qccode = new HoverSiblings('.top_qccode','on').hoverRemoveSiblings();
    var footqr = new HoverSiblings('.footer_icons .foot_icon','on').hoverRemoveSiblings();
    var softlist = new HoverSiblings('.soft_li','on').hoverRemoveSiblings();
    //var softli = new HoverSiblings('.artical_list_li','on').hoverRemoveSiblings();
    //var pro_li = new HoverSiblings('.pro_li','on').hoverRemoveSiblings();
    var newsyear = new HoverSiblings('.morebtn','on').hoverRemoveSiblings();

    SettimeAddClass('#o2o_banner',200);

    //index dragbar
    if($('#solution').length>0){
        (function(index_drag){
            var bar = $('.tagbar');
            var line = $('.solu_targ_line');
            var box = $('.solution');
            var tar_li = $('.solu_li');
            var w_bar = bar.width();
            var w_line = line.width();
            var lineleft = line[0].offsetLeft;
            var w_left;
            var left;
            var x;
            var Ddrag = false;

            var init = function(){
                bar.mousedown(mouseDown);
                box.mousemove(moveTo).mouseup(mouseUp);
                var barhover = new HoverSiblings(tar_li,'on',true,false).hoverRemoveSiblings();
                barhover.enterFunc = function(i,e){moveTo(event,i)}
            };

            function mouseDown(event){
                $(this).addClass('down');
                var e=event || window.event;
                Ddrag = true;
                w_left = bar[0].offsetLeft;
                x = e.pageX - lineleft - w_left;
                return false;
            }
            function mouseUp(){
                bar.removeClass('down');
                Ddrag = false;
                return false;
            }

            function moveTo(event,j){
                if(arguments[1]>=0){
                    left = arguments[1]*w_line/4;
                    bar.css('left',left);
                }
                if(!Ddrag){ return false}
                var e=event || window.event;
                if((e.pageX-x-lineleft) < 0){
                    left = 0;
                }else if((e.pageX-x-lineleft) > (w_line - w_bar)){
                    left = w_line - w_bar;
                }else{
                    left = e.pageX-lineleft-x;
                }

                bar.css('left',left);
                for(var i=0; i<4;i++){
                    if(left > (w_line-w_bar)/4*i && left < (w_line-w_bar)/4*(i+1)){
                        tar_li.eq(i).addClass('on').siblings('.solu_li').removeClass('on');
                    }
                }
                return false;
            }

            index_drag.init = init;
        })(window.i_drag=window.i_drag||{});
        i_drag.init();
    }

    //QQ online
    $('.qqnum').each(function(){
        var qnum = $(this).data('qnum');
        new QQonline($(this),qnum).online();
    });

    //productlist toggle show/hide
    $('.pro_content dt').click(function(){
        if($(this).find('span').hasClass('togg')){
            $(this).find('span').removeClass('togg').parent().next('dd').hide();
        }else{
            $(this).find('span').addClass('togg').parent().next('dd').show();
        }
    });

    //tab
    if($('#hardwareTab').length> 0) new TabSlide('#hardwareTab','.pro_content dt').movetoTar();
    if($('.parameters .tab').length> 0) new TabSlide('.parameters .tab').tab();
    if($("#filter").length> 0) new TabSlide('#filter','.artical_list dl').movetoTar();

    //scroll top
    btop();
    $(window).scroll(function(){
        btop()
    });

    //zyb_circle
    $('.play_circle').click(function(){
        $('.videobox').fadeIn(200);
        var  bg = $('<div class="bg_layer"></div>');
        $('.zyb_video').append(bg);
        bg.fadeIn(200);
    });
    $('.videobox .close').click(function(){
        $('.videobox').hide();
        $('.bg_layer').fadeOut(100).remove();
    });

    $('.s2b').animate({"width":"150px","height":"150px","top":"4px","left":"4px"},900,circleBig);
    function circleSmall(){
        $('.s2b').animate({"width":"150px","height":"150px","top":"4px","left":"4px"},900,circleBig);
    }
    function circleBig(){
        $('.s2b').animate({"width":"158px","height":"158px","top":"0","left":"0"},900,circleSmall);
    }

    $('.soft_list').on('mouseover','.artical_list_li',function(){
        $(this).addClass('on');
    });
    $('.soft_list').on('mouseleave','.artical_list_li',function(){
        $(this).removeClass('on')
    });

    if($(".filter").length>0){
        var yearsel = $(".filter .w_limt").find('a');
        if(yearsel.length>10){
            $('.morebtn').show();
        }else{
            $('.morebtn').hide();
        }
    }
    // index page ChineseMap
    if($(".sendinfo_map").length>0){
        var arrPosition = {"zy":{"top":"230px","left":"375px"},"hb":{"top":"145px","left":"395px"},"xb":{"top":"130px","left":"125px"},"hd":{"top":"265px","left":"445px"},"hn":{"top":"355px","left":"385px"},"gz":{"top":"315px","left":"315px"}};
        //var map = new HoverSiblings('.artical_list_li','on').hoverRemoveSiblings();
        $('.sendinfo_map .area').hover(function(){
            var area = $(this).data('area');
            $(this).addClass('on').siblings('.area').removeClass('on');
            $('#'+area).children('path').attr("fill","#7aa5c6").parent().siblings().children('path').attr("fill","#c3d3e4");
            $('.maplocation').show().animate(arrPosition[area],0,"swing");
        },function(){});
        $("#chineseMap").find('g').hover(function(){
            var area = $(this).attr('id');
            $(this).children('path').attr("fill","#7aa5c6").parent().siblings().children('path').attr("fill","#c3d3e4");
            if(area){$('.maplocation').show().animate(arrPosition[area],0,"swing");}else{$('.maplocation').hide()}
            $('.sendinfo_map .area').each(function(){
                if(area&&area==$(this).data("area")){
                    $(this).addClass('on').siblings().removeClass('on');
                }else{
                    $(this).removeClass('on')
                }
            });
        })
    }

    //先选出 textarea 和 统计字数 dom 节点
    var wordCount = $("#textarea_common"),
        textArea = wordCount.find("textarea"),
        word = wordCount.find(".word");
    //调用
    if(textArea.length){statInputNum(textArea,word);}

});

function btop(){
    var wh = $(window).height();
    var st = $(document).scrollTop();
    var tp = $('.backTop');
    if(st > wh){
        tp.show();
    }
    else{
        tp.hide()
    }
    tp.click(function(){
        $(window).scrollTop(0);
    })
}

//destination
function SettimeAddClass(tar,delay){
    var t = $(tar);
    if(t.length>0){
        setTimeout(function(){
            t.addClass('on')
        },delay);
    }
}

//tab
function TabSlide(self,tar){
    this.div = $(self);
    this.tar = $(tar);
}

TabSlide.prototype.tab = function(){
    this.div.find("a").click(function(e){
        var itmeId=$(this).attr("href");
        if(itmeId.substr(0,1)=="#"){
            e.preventDefault();
        }
        $(itmeId).addClass('active').siblings().removeClass("active");
        $(this).parent().addClass('on').siblings().removeClass("on");
    });
    return this
};
TabSlide.prototype.movetoTar = function(){
    var t = this;
    var self = this.div;
    var tar  = this.tar;
    var divtop = self[0].offsetTop;
    var scrollTop = $(window).scrollTop();
    var tur = true;
    $(window).scroll(function(){
        scrollTop = $(window).scrollTop();
        if(tur){
            setTimeout(srcoll,300);
            tur = false;
        }
    });

    this.div.find("a").click(function(e){
        var itmeId=$(this).attr("href");
        var tarTop = $(itmeId)[0].offsetTop;
        if(itmeId.substr(0,1)=="#"){
            e.preventDefault();
        }
        $(this).parent().addClass('on').siblings().removeClass("on");
        $("html,body").animate({scrollTop:tarTop-80},200);
    });

    function srcoll(){
        if(scrollTop>divtop){
            $(t.div).addClass('fixed');
            for(var i=0; i<tar.length; i++){
                if(tar[i+1]==undefined){
                    tarH = Number.POSITIVE_INFINITY;
                }else{
                    tarH = tar[i+1].offsetTop
                }
                if(scrollTop+120 > tar[i].offsetTop && scrollTop+220 < tarH){
                    if($(window).scrollTop()+$(window).height()>= $(document).height()){
                        self.find('li').eq(-2).addClass('on').siblings().removeClass('on');
                    }else{
                        self.find('li').eq(i).addClass('on').siblings().removeClass('on');
                    }
                }
            }
        }else{
            $(t.div).removeClass('fixed')
        }
        tur = true;
    }
    return this
};

//collect
function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
            alert("您使用的浏览器不支持，请使用Ctrl+D收藏");
        }
    }
}
//qq online
var online = [];
function QQonline(tar,num) {
    this.tar = tar;
    this.num = num;
}
QQonline.prototype.online = function(){
    var url ="http://webpresence.qq.com/getonline?Type=1&"+this.num+":";
    var t = this;
    $.getScript(url,function () {
        $(t.tar).attr('href','http://wpa.qq.com/msgrd?v=3&uin='+ t.num+'&site=qq&menu=yes');
        if(online[0] == 1){
            $(t.tar).addClass('kfon').removeClass('kfoff');
        }else{
            $(t.tar).removeClass('kfon').addClass('kfoff');
        }
    });
};

//  hover  and hover siblings
function HoverSiblings(tar,classname,siblings,leaveh){
    this.t = tar;
    this.hname = classname;
    this.delay = 100;
    this.siblings = siblings==false?false:true;
    this.leave = leaveh==false?false:true;
    this.enterFunc = null;
    this.leaveFunc = null;
}

HoverSiblings.prototype.hoverRemoveSiblings = function(){
    var $t = this;

    $(this.t).each(function(i,e){
        var hoverTimer, outTimer;
        var hoverfun = function(){
            if($.isFunction($t.enterFunc)){
                $t.enterFunc(i,e)
            }
        };
        var hleavefun = function(){
            if($.isFunction($t.leaveFunc)){
                $t.leaveFunc(i,e)
            }
        };

        $(this).hover(function(){
            var index = i;
            var elm = e;
            clearTimeout(outTimer);
            hoverTimer = setTimeout(adClass.bind(this),$t.delay);
        },function(){
            clearTimeout(hoverTimer);
            outTimer = setTimeout(removClass.bind(this),$t.delay);
        });

        function adClass(){
            if($t.siblings){
                $(this).addClass($t.hname).siblings().removeClass($t.hname);
                hoverfun();
            }else{
                $(this).addClass($t.hname);
                hoverfun();
            }
        }

        function removClass(){
            if($t.leave){
                $(this).removeClass($t.hname);
                hleavefun();
            }
        }
    });
    return this
};

//剩余字数
function statInputNum(textArea,numItem) {
    var max = numItem.text(),
        curLength;
    textArea[0].setAttribute("maxlength", max);
    curLength = textArea.val().length;
    numItem.text(max - curLength);
    textArea.on('input propertychange', function () {
        numItem.text(max - $(this).val().length);
    });
}