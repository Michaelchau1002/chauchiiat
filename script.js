$(document).ready(function() {
    // 页面加载动画
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.getElementById('loader').classList.add('hidden');
        }, 800);
    });
   
    // 导航栏滚动效果
    $(window).bind('scroll', function() {
        var navHeight = $(window).height() - 100;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default').addClass('on');
        } else {
            $('.navbar-default').removeClass('on');
        }
       
        // 滚动触发动画
        checkScrollAnimation();
    });
   
    // 平滑滚动
    $('a.scroll-nav').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 80
                }, 800);
                return false;
            }
        }
    });
   
    // 联系表单提交
    $('#contactform').submit(function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
   
    // 图片模态框
    var modal = document.getElementById('imageModal');
    var imgElements = document.querySelectorAll('.gallery-image, .award-img-placeholder, .certificate-img-placeholder, .project-img-placeholder');
    var modalImg = document.getElementById("modalImage");
    var captionText = document.getElementById("caption");
   
    imgElements.forEach(function(item) {
        item.addEventListener('click', function() {
            var src = this.getAttribute('data-src') || this.getAttribute('data-img');
            var title = this.getAttribute('data-title') || this.nextElementSibling.textContent;
            modal.style.display = "block";
            modalImg.src = src;
            captionText.textContent = title;
        });
    });
   
    // 关闭模态框
    document.getElementById("imageModal").querySelector('.close').addEventListener('click', function() {
        modal.style.display = "none";
    });
   
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
   
    // 滚动动画检测
    function checkScrollAnimation() {
        var windowHeight = $(window).height();
        var scrollPosition = $(window).scrollTop();
       
        // 为所有带有动画类的元素添加可见类
        $('.animated').each(function() {
            var elementTop = $(this).offset().top;
            if (elementTop < scrollPosition + windowHeight - 100) {
                $(this).addClass('visible');
            }
        });
       
        // 触发技能进度条动画
        if ($('#about').offset().top < scrollPosition + windowHeight - 100 && !$('#about').hasClass('animated-started')) {
            $('#about').addClass('animated-started');
            setTimeout(function() {
                $('.skill-progress').each(function() {
                    var width = $(this).attr('style').split('width:')[1].split(';')[0];
                    $(this).css('width', '0');
                    setTimeout(function() {
                        $(this).css('width', width);
                    }.bind(this), 100);
                });
            }, 500);
        }
    }
   
    // 初始化动画检测
    checkScrollAnimation();
});
