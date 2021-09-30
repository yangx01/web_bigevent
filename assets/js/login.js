$(function() {
    $("#link-reg").on("click", function() {
        $(".reg-box").show();
        $(".login-box").hide();
    })
    $("#link-login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        repwd: function(value) {
            var pwd = $(".reg-box [name=password]").val();
            if (value !== pwd) {
                return "密码不一致";
            }
        }
    })

    $(".form-reg").on("submit", function(e) {
        e.preventDefault();
        var data = { username: $(".form-reg [name=username]").val(), password: $(".form-reg [name=password]").val() }
        $.post("/api/reguser", data, function(res) {
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            $("#link-login").click();
        })
    })

    $(".form-login").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(".form-login").serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                localStorage.setItem("token", res.token);
                location.href = "/index.html";
            }
        })
    })





})