$(document).ready(function () {
    var i = 0;
    var dragging = false;
    $('#dragbar').mousedown(function (e) {
        e.preventDefault();

        dragging = true;
        var main = $('#main');
        var ghostbar = $('<div>',
                         {
                             id: 'ghostbar',
                             css: {
                                 height: main.outerHeight(),
                                 top: main.offset().top,
                                 left: main.offset().left
                             }
                         }).appendTo('body');

        $(document).mousemove(function (e) {
            ghostbar.css("left", e.pageX + 2);
        });
    });

    $(document).mouseup(function (e) {
        if (dragging) {
            $('#sidebar').css("width", e.pageX + 2);
            $('#main').css("left", e.pageX + 2);
            $('#ghostbar').remove();
            $(document).unbind('mousemove');
            dragging = false;
        }
    });

    var CurrentPlayingRow;

    $("tbody tr").dblclick(function (e) {
        $("#" + CurrentPlayingRow + " td").css('background-color', '');
        $("#" + $(this).attr('id') + " td").css('background-color', '#0066aa');
        CurrentPlayingRow = $(this).attr('id');
    });

    $("#SearchSongs").keydown(function (e) {
        if (e.keyCode == 13)
        {
            return false;
        }
    });

    $(window).resize(function () {
        AdjustSizes();
    });

    $(window).load(function () {
        $("#searchclear").css("display", "none");
        AdjustSizes();
    });

    $("#SearchSongs").change(function () {
        if($(this).val() == '')
            $("#searchclear").css("display", "none");
        else
            $("#searchclear").css("display", "block");
    });

    $("#searchclear").click(function () {
        $("#SearchSongs").val('');
        $("#searchclear").css("display", "none");
        $('#SearchSongs').keyup();
    });

    (function ($) {
        $('#SearchSongs').keyup(function () {
            AdjustSizes();
            if ($(this).val() == '')
                $("#searchclear").css("display", "none");
            else
                $("#searchclear").css("display", "block");
            var rex = new RegExp($(this).val(), 'i');
            $('#TableBody tr').hide();
            $('#TableBody tr').filter(function () {
                
                return rex.test($(this).text());
            }).show();
        })
    }(jQuery));

    function AdjustSizes()
    {
        var WindowWidth = window.innerWidth;
        if (WindowWidth <= 767) {
            $("#Content").css('height', window.innerHeight - $("#HeaderBar").height() - 67);
        }
        else
        {
            $("#Content").css('height', window.innerHeight - $("#HeaderBar").height() - 2);
        }

        var TableHeight = $("#TableWrapper").height();
        $("#TableBody").css('height', TableHeight - 32);
        if (!$("#TableBody").hasScrollBar())
        {
            $("thead th").css('width', 20 + "%");
        }
        else
        {
            $("thead th").css('width', 19.81 + "%");
        }
    }

    (function () {
        var taskItemClassName = 'columnTitles';
        var taskItemInContext;
        var menu = document.querySelector("#context-menu");
        var menuItems = menu.querySelectorAll(".context-menu__item");
        var menuState = 0;

        var contextMenuClassName = "context-menu";
        var contextMenuItemClassName = "context-menu__item";
        var contextMenuLinkClassName = "context-menu__link";
        var contextMenuActive = "context-menu--active";

        var menuWidth;
        var menuHeight;

        var windowWidth;
        var windowHeight;

        var clickCoords;
        var clickCoordsX;
        var clickCoordsY;

        function init() {
            contextListener();
            clickListener();
            keyupListener();
            resizeListener();
        }

        function resizeListener() {
            window.onresize = function (e) {
                toggleMenuOff();
            };
        }

        function contextListener() {
            document.addEventListener("contextmenu", function (e) {
                if (clickInsideElement(e, taskItemClassName)) {
                    e.preventDefault();
                    toggleMenuOn();
                    positionMenu(e);
                } else {
                    toggleMenuOff();
                }
            });
        }

        function clickInsideElement(e, className) {
            var el = e.srcElement || e.target;

            if (el.classList.contains(className)) {
                return el;
            } else {
                while (el = el.parentNode) {
                    if (el.classList && el.classList.contains(className)) {
                        return el;
                    }
                }
            }

            return false;
        }

        function menuItemListener(link) {
            console.log("Task action - " + link.getAttribute("data-action"));
            toggleMenuOff();
        }

        function clickListener() {
            document.addEventListener("click", function (e) {
                var clickeElIsLink = clickInsideElement(e, contextMenuLinkClassName);

                if (clickeElIsLink) {
                    e.preventDefault();
                    menuItemListener(clickeElIsLink);
                } else {
                    var button = e.which || e.button;
                    if (button === 1) {
                        toggleMenuOff();
                    }
                }
            });
        }

        function keyupListener() {
            window.onkeyup = function (e) {
                if (e.keyCode === 27) {
                    toggleMenuOff();
                }
            }
        }

        function toggleMenuOn() {
            if (menuState !== 1) {
                menuState = 1;
                menu.classList.add(contextMenuActive);
            }
        }

        function toggleMenuOff() {
            if (menuState !== 0) {
                menuState = 0;
                menu.classList.remove(contextMenuActive);
            }
        }

        function positionMenu(e) {
            clickCoords = getPosition(e);
            clickCoordsX = clickCoords.x;
            clickCoordsY = clickCoords.y;

            menuWidth = menu.offsetWidth + 4;
            menuHeight = menu.offsetHeight + 4;

            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;

            if ((windowWidth - clickCoordsX) < menuWidth) {
                menu.style.left = windowWidth - menuWidth + "px";
            } else {
                menu.style.left = clickCoordsX + "px";
            }

            if ((windowHeight - clickCoordsY) < menuHeight) {
                menu.style.top = windowHeight - menuHeight + "px";
            } else {
                menu.style.top = clickCoordsY + "px";
            }
        }

        function getPosition(e) {
            var posx = 0;
            var posy = 0;

            if (!e) var e = window.event;

            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            } else if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft +
                                   document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop +
                                   document.documentElement.scrollTop;
            }

            return {
                x: posx,
                y: posy
            }
        }

        init();
    })();
    
    (function ($) {
        $.fn.hasScrollBar = function () {
            return this.get(0) ? this.get(0).scrollHeight > this.innerHeight() : false;
        }
    })(jQuery);
});


