$(function() {
    getUserInfo();





})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: "/my/userinfo",
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败！")
            }
            layui.layer.msg("获取用户信息成功！")
            randAvater(res.data)
        }
    })
}

function randAvater(user) {
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
        $(".layui-nav-img").hide()
    }
}

$("#btnLogout").on("click", function() {
    layer.confirm('确认退出登录吗？', { icon: 3, title: '提示' }, function(index) {
        localStorage.removeItem("token")
        location.href = "login.html";
        layer.close(index);
    });
})