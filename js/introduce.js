$(function() {

    function getAddress(address, key) {
        $.ajax({
            type: 'get',
            url: 'https://apis.map.qq.com/ws/geocoder/v1/?address=' + address + '&key=' + key + '&output=jsonp',
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(data) {
                var posi = data.result.location;
                $('.addressSkip').attr("href", "https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + posi.lat + "," + posi.lng + ";title :" + $('.messages1').text() + "&referer=June&key=YZBBZ-NXICG-YRGQL-IAK6W-2U3DJ-AHFUG");
            },
            error: function() {
                alert('fail');
            }
        });
    }



    //拨号部分

    $('.phoneSkip').attr("href", "tel:" + $(".phoneCode").text());



    //跳转地图定位部分

    getAddress($('.messages1').text(), 'YZBBZ-NXICG-YRGQL-IAK6W-2U3DJ-AHFUG');



    //公司介绍显示部分

    $show_hidden = true;
    $('.show').on(
        "touchmove",
        function() {
            this.isMove = true;
            //自定义属性判断是否移动。防止误触跳转。
        });
    $('.show').on(
        "touchend",
        function(event) {
            event.preventDefault();
            if (!this.isMove) {
                if ($show_hidden) {
                    $('.introduction p').removeClass('active');
                    $('.show img').attr("src", "../images/introduce_img/Bottom_arrow_hidden.png");
                    $show_hidden = false;
                } else {
                    $('.introduction p').addClass('active');
                    $('.show img').attr("src", "../images/introduce_img/Bottom_arrow_show.png");
                    $show_hidden = true;
                }
            }
            this.isMove = false;

        });

})