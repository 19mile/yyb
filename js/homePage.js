// 初始化页面
$(function() {
    init();
});
//细化初始化页面函数
function init() {
    initBanner(); //初始化banner部分
    initNav(); //初始化nav部分
    initShade(); //初始化shade的高度
    initList(); //初始化list部分
}

//储存公司数据的数组，分别是：0：名字，1:介绍，2：logo链接，3：综合评估，4：服务能力:5：技术能力:6：内容能力:7：行业口碑:8：点击链接
//9：电商:10：旅游，11：生活，12：直播，13：工具，14：社交，15：摄影，16：娱乐，17：音乐，18：新闻，19：理财，20教育
//21：阅读，22：视频，23：游戏，24：服务能力综合，25：应用市场服务经验，26客户服务团队能力，
//27：运营能力，28：技术能力综合，29：技术能力，30：数据能力，31：内容能力综合，32：内容策划能力
//33：整合策划能力，34：行业口碑
var sArr = [
    ["上海创神网络科技有限公司", "专业游戏娱乐产品服务", "./images/homePage_img/chuangshen_logo.png", 3.5, 3, 3, 3, 3.5, "./htmls/introduce_chuangshen.html",
        0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 3, 8, 2, 3, 3, 6, 3, 3, 6, 3, 3, 3
    ],
    ["北京乐思创信", "移动领域多家厂商核带服务商", "./images/homePage_img/lesi_logo.png", 4, 4, 3, 3, 4, "./htmls/introduce_lesi.html",
        1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 4, 1, 1, 1, 4, 10, 3, 4, 3, 6, 3, 3, 6, 3, 3, 4
    ],
    ["品众互动", "内容策划服务能力行业领先", "./images/homePage_img/pinzhong_logo.png", 4.5, 4, 3, 4, 4, "./htmls/introduce_pinzhong.html",
        3, 3, 1, 1, 2, 1, 0, 0, 0, 1, 1, 2, 1, 1, 2, 10, 3, 4, 3, 6, 3, 3, 8, 4, 4, 4
    ],
    ["深圳赢时通网络有限公司", "金融证件与贷款优势服务商", "images/homePage_img/yingshitong_logo.png", 3.5, 3, 3, 3, 3.5, "./htmls/introduce_yingshitong.html",
        1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 4, 1, 1, 1, 4, 8, 2, 3, 3, 6, 3, 3, 6, 3, 3, 3
    ],
    ["派瑞", "老牌上市整合服务商", "./images/homePage_img/pairui_logo.png", 4, 4, 3, 3, 4, "./htmls/introduce_pairui.html",
        3, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 5, 3, 3, 6, 3, 3, 6, 3, 3, 4
    ],
    ["重庆隆讯科技有限公司", "老牌上市整合服务商", "./images/homePage_img/longxun_logo.png", 3, 3, 3, 3, 3, "./htmls/introduce_longxun.html",
        3, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 5, 3, 3, 6, 3, 3, 6, 3, 3, 4
    ]
];

//根据参数对数组排序(x代表排序参数，p代表从大到小（0）还是从小到大（1）)
function sortArr(x, p) {
    if (p == 1) {
        sArr.sort(function(a, b) {
            return (a[x] - b[x]) * 10 + (a[3] - b[3]); //若所选指标大小相同，则按综合评估排序
        });
    } else {
        sArr.sort(function(a, b) {
            return (b[x] - a[x]) * 10 + (b[3] - a[3]);
        });
    }
}


//初始化banner函数
function initBanner() {
    var iLiLength = $(".bannerUl>li").length; //banner的li的个数
    //根据li的个数生成span（下方圆点）
    for (var i = 0; i < iLiLength; i++) {
        $(".subscript").append("<span></span>");
    }
    $(".subscript>span:eq(0)").css("opacity", "1");
    var subLeft = (parseFloat($("#banner").css("width")) - parseFloat($(".subscript").css("width"))) / 2;
    $(".subscript").css("left", subLeft + "px"); //使sub部分居中
    $(".bannerUl").html($(".bannerUl").html() + $(".bannerUl").html()); //将bannerUl里的元素复制用于动画
    iLiLength = $(".bannerUl>li").length; //重新获取banner的li的个数

    $(".bannerUl").css("width", iLiLength + "00%") //初始化ul的宽度
        .find("li").css("width", 1 / iLiLength * 100 + "%"); //初始化每个li的宽度

    bannerMove(); //调用bannerMove函数添加动画及点击事件
    initSearch(); //调用initSearch()函数初始化搜索框
}

//为banner添加动画和点击事件
function bannerMove() {
    var nowLi = 0; //记录当前显示的图片
    var timer = null; //储存定时器
    var sigW = parseFloat($(".bannerUl>li").css("width")); //单个li的宽度
    //轮播
    timer = setInterval(function() {
        $(".subscript>span:eq(" + nowLi + ")").fadeTo(500, 0.6);
        $(".bannerUl").animate({ "left": -1 * (++nowLi) * sigW + "px" }, 1000);
        if (nowLi == $(".bannerUl>li").length / 2) {
            nowLi = 0;
            $(".bannerUl").animate({ "left": 0 + "px" }, 0);
        }
        $(".subscript>span:eq(" + nowLi + ")").fadeTo(500, 1);
    }, 4000);

    //触摸事件
    var startABX = 0;
    var way = 0;
    $(".bannerUl").bind("touchstart", function(event) {
        $("#searchText").blur();
        way = 0;
        event.preventDefault();
        $(this).stop(); //停止当前动画
        clearInterval(timer);
        startABX = event.changedTouches[0].pageX - this.offsetLeft; //最开始点击的横向位置差
    }).bind("touchmove", function(event) {
        way = event.touches[0].pageX - startABX - this.offsetLeft;
        $(this).css("left", event.touches[0].pageX - startABX + "px"); //bannerUl随鼠标拖动
        if (this.offsetLeft > 0) {
            $(".bannerUl").animate({ "left": this.offsetLeft - sigW * $(".bannerUl>li").length / 2 + "px" }, 0);
        }
    }).bind("touchend", function(event) {
        if (way > 0.5) {
            nowLi--;
        } else if (way < -0.5) {
            nowLi++;
        }
        if (nowLi < 0) {
            nowLi += $(".bannerUl>li").length / 2;
        }
        $(".subscript>span").fadeTo(0, 0.6);
        $(".bannerUl").animate({ "left": -1 * nowLi * sigW + "px" }, 200);
        nowLi = nowLi % ($(".bannerUl>li").length / 2);

        $(".bannerUl").animate({ "left": -1 * nowLi * sigW + "px" }, 0);
        $(".subscript>span:eq(" + nowLi + ")").fadeTo(300, 1);
        timer = setInterval(function() {
            $(".subscript>span:eq(" + nowLi + ")").fadeTo(0, 0.6);
            $(".bannerUl").animate({ "left": -1 * (++nowLi) * sigW + "px" }, 500);
            if (nowLi == $(".bannerUl>li").length / 2) {
                nowLi = 0;
                $(".bannerUl").animate({ "left": 0 + "px" }, 0);
            }
            $(".subscript>span:eq(" + nowLi + ")").fadeTo(500, 1);
        }, 4000);
    });
    var startTime = 0
    $(".bannerUl>li").bind("touchstart", function() {
        startTime = new Date().getTime();
    }).bind("touchend", function() {
        var endTime = new Date().getTime();
        if (endTime - startTime < 120 && way == 0) {
            var sHref = $(this).find("a").get(0).href;
            $(window).attr('location', sHref);
        }
    });
}
//初始化搜索
function initSearch() {
    $(".showHid").hide(); //初始时隐藏搜索框右边部分
    var oSpan = $(".search").find("span"); //储存搜索框左边图标
    $("#searchText").on("touchstart", function(event) {
        $(".showHid").show();
        $(".search").find("span").detach();
    })
    $("#searchText").on("input", function() {

        $("#searchText").css("color", "#000");

    }).on("blur", function() {
        $(".showHid").hide();
        if ($(".search").find("span").length == 0) {
            $(this).before(oSpan);
        }
    });
    //点击叉叉图标清空value
    $(".fork").on("touchstart", function(event) {
        event.preventDefault();
        $("#searchText").val("");

    });
}
//初始化nav部分
function initNav() {
    var iLiLength = $(".navUl>li").length; //获取navUl的li的个数
    var sigW = parseFloat($(".navUl>li").css("width")); //获取单个li的宽度
    for (var j = 0, len = $(".down_menu li").length; j < len; j++) {
        $(".down_menu li:eq(" + j + ")").get(0).index = j + 9;
    }

    $(".navUl").css("width", iLiLength * (sigW + 1) + "px"); //初始化ul的宽度
    $(".navUl").bind("touchstart", function(event) {
        startABX = event.changedTouches[0].pageX - this.offsetLeft; //最开始点击的位置
    }).bind("touchmove", function(event) {
        event.preventDefault();
        if ((this.offsetLeft >= 0 && event.touches[0].pageX - startABX - this.offsetLeft < 0) ||
            (this.offsetLeft <= 0 && this.offsetLeft >= document.documentElement.clientWidth - 1 * iLiLength * sigW) ||
            (this.offsetLeft <= document.documentElement.clientWidth - 1 * iLiLength * sigW &&
                event.touches[0].pageX - startABX - this.offsetLeft > 0)) {
            $(this).css("left", event.touches[0].pageX - startABX + "px");
        }
    });
    $(".navUl>li").bind("click", function() {
        if ($(this).is(".navUl>li:eq(4)")) {
            $(".navUl").find(".active").removeClass();
            $(this).addClass("active");
            $(".down_menu>ul").css("display", "none");
            $("#shade").css("display", "none");
            $(".down_menu>ul>li").removeClass();
            sortArr(34, 0);
            showList();
        } else if ($(".down_menu>ul:eq(" + $(this).prevAll().length + ")").css("display") == "block") {
            $(".down_menu>ul").css("display", "none");
            $("#shade").css("display", "none");
        } else if ($(".down_menu>ul:eq(" + $(this).prevAll().length + ")").css("display") == "none") {
            $(".down_menu>ul").css("display", "none");
            $(".down_menu>ul:eq(" + $(this).prevAll().length + ")").css("display", "block");
            $("#shade").css("display", "block");
        }
        // } else if ($(this).is(".active")) {
        //     $(".down_menu>ul:eq(" + $(this).prevAll().length + ")").css("display", "block");
        //     $("#shade").css("display", "block");
        // } else {
        //     $("#shade").css("display", "block");
        //     $(".navUl").find(".active").removeClass();
        //     $(".down_menu>ul").css("display", "none");
        //     $(this).addClass("active");
        //     $(".down_menu>ul:eq(" + $(this).prevAll().length + ")").css("display", "block");
        // }

    });
    $("#shade").bind("click", function() {
        $(".down_menu>ul").css("display", "none");
        $("#shade").css("display", "none");
    });
    $(".down_menu>ul>li").bind("click", function() {
        if (!$(this).is(".active")) {
            $(".down_menu>ul>li").removeClass();
            $(this).addClass("active");
            $(".navUl>li").removeClass();
            $(".navUl>li:eq(" + $(this).parent().prevAll().length + ")").addClass("active");
            sortArr(this.index, 0);
            showList();

        }
        $(".down_menu>ul").css("display", "none");
        $("#shade").css("display", "none");
    });
}

//初始化shade的高度
function initShade() {
    var iH = parseFloat($("body").css("height")) - parseFloat($("#banner").css("height")) - parseFloat($("#nav").css("height"));
    $("#shade").css("height", iH + "px");
}

//初始化list部分
function initList() {
    sortArr(3, 0); //初始对arr排序
    showList(); //用arr里的数据渲染list
    initShade();
}
//用arr里的数据渲染list
function showList() {
    $(".listUl").html("<span></span>");
    for (var i = 0, len = sArr.length; i < len; i++) {
        var starcount = 5;
        var starNum = sArr[i][3];
        $(".listUl").append("<li></li>").append("<span></span>");
        $(".listUl>li:eq(" + i + ")").append("<a href=" + sArr[i][8] + "></a>").find("a:eq(0)")
            .append("<div class='listLeft fl'><img src=" + sArr[i][2] + " alt='logo'></div>")
            .append("<div class='listRight fl'></div>").find(".listRight")
            .append("<h2>" + sArr[i][0] + "</h2>")
            .append("<p>" + sArr[i][1] + "</p>")
            .append("<em class='fl'>综合评估</em>")
            .append("<div class='showAsse fl'></div>");
        while (starcount != 0) {
            if (starNum >= 1) {
                $(".listUl>li:eq(" + i + ")").find(".showAsse").append("<img src='./images/homePage_img/light_star.jpg'>");
            } else if (starNum > 0) {
                $(".listUl>li:eq(" + i + ")").find(".showAsse").append("<img src='./images/homePage_img/half_star.jpg'>");
            } else {
                $(".listUl>li:eq(" + i + ")").find(".showAsse").append("<img src='./images/homePage_img/dark_star.jpg'>");
            }
            starNum--;
            starcount--;
        }
        //alert($(".listUl>li").length);
    }
}