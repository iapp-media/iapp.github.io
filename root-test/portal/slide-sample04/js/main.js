(function($, window, document, undefined) {
    var $window = $(window);
    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: window,
            data_attribute: "original",
            skip_invisible: true,
            appear: null,
            load: null,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;
            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return
                }
                if ($.abovethetop(this, settings) || $.leftofbegin(this, settings)) {} else {
                    if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        counter = 0
                    } else {
                        if (++counter > settings.failure_limit) {
                            return false
                        }
                    }
                }
            })
        }
        if (options) {
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed
            }
            $.extend(settings, options)
        }
        $container = (settings.container === undefined || settings.container === window) ? $window : $(settings.container);
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update()
            })
        }
        this.each(function() {
            var self = this;
            var $self = $(self);
            self.loaded = false;
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder)
                }
            }
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings)
                    }
                    $("<img />").bind("load", function() {
                        var original = $self.attr("data-" + settings.data_attribute);
                        $self.hide();
                        if ($self.is("img")) {
                            $self.attr("src", original)
                        } else {
                            $self.css("background-image", "url('" + original + "')")
                        }
                        $self[settings.effect](settings.effect_speed);
                        self.loaded = true;
                        var temp = $.grep(elements, function(element) {
                            return !element.loaded
                        });
                        elements = $(temp);
                        if (settings.load) {
                            var elements_left = elements.length;
                            settings.load.call(self, elements_left, settings)
                        }
                    }).attr("src", $self.attr("data-" + settings.data_attribute))
                }
            });
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear")
                    }
                })
            }
        });
        $window.bind("resize", function() {
            update()
        });
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear")
                    })
                }
            })
        }
        $(document).ready(function() {
            update()
        });
        return this
    };
    $.belowthefold = function(element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop()
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height()
        }
        return fold <= $(element).offset().top - settings.threshold
    };
    $.rightoffold = function(element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft()
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width()
        }
        return fold <= $(element).offset().left - settings.threshold
    };
    $.abovethetop = function(element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop()
        } else {
            fold = $(settings.container).offset().top
        }
        return fold >= $(element).offset().top + settings.threshold + $(element).height()
    };
    $.leftofbegin = function(element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft()
        } else {
            fold = $(settings.container).offset().left
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width()
    };
    $.inviewport = function(element, settings) {
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings)
    };
    $.extend($.expr[":"], {
        "below-the-fold": function(a) {
            return $.belowthefold(a, {
                threshold: 0
            })
        },
        "above-the-top": function(a) {
            return !$.belowthefold(a, {
                threshold: 0
            })
        },
        "right-of-screen": function(a) {
            return $.rightoffold(a, {
                threshold: 0
            })
        },
        "left-of-screen": function(a) {
            return !$.rightoffold(a, {
                threshold: 0
            })
        },
        "in-viewport": function(a) {
            return $.inviewport(a, {
                threshold: 0
            })
        },
        "above-the-fold": function(a) {
            return !$.belowthefold(a, {
                threshold: 0
            })
        },
        "right-of-fold": function(a) {
            return $.rightoffold(a, {
                threshold: 0
            })
        },
        "left-of-fold": function(a) {
            return !$.rightoffold(a, {
                threshold: 0
            })
        }
    })
})(jQuery, window, document);
var Swiper = function(a, b) {
    "use strict";

    function c(a, b) {
        return document.querySelectorAll ? (b || document).querySelectorAll(a) : jQuery(a, b)
    }

    function d(a) {
        return "[object Array]" === Object.prototype.toString.apply(a) ? !0 : !1
    }

    function e() {
        var a = F - I;
        return b.freeMode && (a = F - I), b.slidesPerView > C.slides.length && !b.centeredSlides && (a = 0), 0 > a && (a = 0), a
    }

    function f() {
        function a(a) {
            var c = new Image;
            c.onload = function() {
                C && C.imagesLoaded && C.imagesLoaded++, C.imagesLoaded === C.imagesToLoad.length && (C.reInit(), b.onImagesReady && C.fireCallback(b.onImagesReady, C))
            }, c.src = a
        }
        var d = C.h.addEventListener,
            e = "wrapper" === b.eventTarget ? C.wrapper : C.container;
        if (C.browser.ie10 || C.browser.ie11 ? (d(e, C.touchEvents.touchStart, p), d(document, C.touchEvents.touchMove, q), d(document, C.touchEvents.touchEnd, r)) : (C.support.touch && (d(e, "touchstart", p), d(e, "touchmove", q), d(e, "touchend", r)), b.simulateTouch && (d(e, "mousedown", p), d(document, "mousemove", q), d(document, "mouseup", r))), b.autoResize && d(window, "resize", C.resizeFix), g(), C._wheelEvent = !1, b.mousewheelControl) {
            void 0 !== document.onmousewheel && (C._wheelEvent = "mousewheel");
            try {
                new WheelEvent("wheel"), C._wheelEvent = "wheel"
            } catch (f) {}
            C._wheelEvent || (C._wheelEvent = "DOMMouseScroll"), C._wheelEvent && d(C.container, C._wheelEvent, j)
        }
        if (b.keyboardControl && d(document, "keydown", i), b.updateOnImagesReady) {
            C.imagesToLoad = c("img", C.container);
            for (var h = 0; h < C.imagesToLoad.length; h++) a(C.imagesToLoad[h].getAttribute("src"))
        }
    }

    function g() {
        var a, d = C.h.addEventListener;
        if (b.preventLinks) {
            var e = c("a", C.container);
            for (a = 0; a < e.length; a++) d(e[a], "click", n)
        }
        if (b.releaseFormElements) {
            var f = c("input, textarea, select", C.container);
            for (a = 0; a < f.length; a++) d(f[a], C.touchEvents.touchStart, o, !0)
        }
        if (b.onSlideClick)
            for (a = 0; a < C.slides.length; a++) d(C.slides[a], "click", k);
        if (b.onSlideTouch)
            for (a = 0; a < C.slides.length; a++) d(C.slides[a], C.touchEvents.touchStart, l)
    }

    function h() {
        var a, d = C.h.removeEventListener;
        if (b.onSlideClick)
            for (a = 0; a < C.slides.length; a++) d(C.slides[a], "click", k);
        if (b.onSlideTouch)
            for (a = 0; a < C.slides.length; a++) d(C.slides[a], C.touchEvents.touchStart, l);
        if (b.releaseFormElements) {
            var e = c("input, textarea, select", C.container);
            for (a = 0; a < e.length; a++) d(e[a], C.touchEvents.touchStart, o, !0)
        }
        if (b.preventLinks) {
            var f = c("a", C.container);
            for (a = 0; a < f.length; a++) d(f[a], "click", n)
        }
    }

    function i(a) {
        var b = a.keyCode || a.charCode;
        if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey)) {
            if (37 === b || 39 === b || 38 === b || 40 === b) {
                for (var c = !1, d = C.h.getOffset(C.container), e = C.h.windowScroll().left, f = C.h.windowScroll().top, g = C.h.windowWidth(), h = C.h.windowHeight(), i = [
                        [d.left, d.top],
                        [d.left + C.width, d.top],
                        [d.left, d.top + C.height],
                        [d.left + C.width, d.top + C.height]
                    ], j = 0; j < i.length; j++) {
                    var k = i[j];
                    k[0] >= e && k[0] <= e + g && k[1] >= f && k[1] <= f + h && (c = !0)
                }
                if (!c) return
            }
            M ? ((37 === b || 39 === b) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), 39 === b && C.swipeNext(), 37 === b && C.swipePrev()) : ((38 === b || 40 === b) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), 40 === b && C.swipeNext(), 38 === b && C.swipePrev())
        }
    }

    function j(a) {
        var c = C._wheelEvent,
            d = 0;
        if (a.detail) d = -a.detail;
        else if ("mousewheel" === c)
            if (b.mousewheelControlForceToAxis)
                if (M) {
                    if (!(Math.abs(a.wheelDeltaX) > Math.abs(a.wheelDeltaY))) return;
                    d = a.wheelDeltaX
                } else {
                    if (!(Math.abs(a.wheelDeltaY) > Math.abs(a.wheelDeltaX))) return;
                    d = a.wheelDeltaY
                } else d = a.wheelDelta;
        else if ("DOMMouseScroll" === c) d = -a.detail;
        else if ("wheel" === c)
            if (b.mousewheelControlForceToAxis)
                if (M) {
                    if (!(Math.abs(a.deltaX) > Math.abs(a.deltaY))) return;
                    d = -a.deltaX
                } else {
                    if (!(Math.abs(a.deltaY) > Math.abs(a.deltaX))) return;
                    d = -a.deltaY
                } else d = Math.abs(a.deltaX) > Math.abs(a.deltaY) ? -a.deltaX : -a.deltaY;
        if (b.freeMode) {
            var f = C.getWrapperTranslate() + d;
            if (f > 0 && (f = 0), f < -e() && (f = -e()), C.setWrapperTransition(0), C.setWrapperTranslate(f), C.updateActiveSlide(f), 0 === f || f === -e()) return
        } else(new Date).getTime() - U > 60 && (0 > d ? C.swipeNext() : C.swipePrev()), U = (new Date).getTime();
        return b.autoplay && C.stopAutoplay(!0), a.preventDefault ? a.preventDefault() : a.returnValue = !1, !1
    }

    function k(a) {
        C.allowSlideClick && (m(a), C.fireCallback(b.onSlideClick, C, a))
    }

    function l(a) {
        m(a), C.fireCallback(b.onSlideTouch, C, a)
    }

    function m(a) {
        if (a.currentTarget) C.clickedSlide = a.currentTarget;
        else {
            var c = a.srcElement;
            do {
                if (c.className.indexOf(b.slideClass) > -1) break;
                c = c.parentNode
            } while (c);
            C.clickedSlide = c
        }
        C.clickedSlideIndex = C.slides.indexOf(C.clickedSlide), C.clickedSlideLoopIndex = C.clickedSlideIndex - (C.loopedSlides || 0)
    }

    function n(a) {
        return C.allowLinks ? void 0 : (a.preventDefault ? a.preventDefault() : a.returnValue = !1, b.preventLinksPropagation && "stopPropagation" in a && a.stopPropagation(), !1)
    }

    function o(a) {
        return a.stopPropagation ? a.stopPropagation() : a.returnValue = !1, !1
    }

    function p(a) {
        if (b.preventLinks && (C.allowLinks = !0), C.isTouched || b.onlyExternal) return !1;
        if (b.noSwiping && (a.target || a.srcElement) && s(a.target || a.srcElement)) return !1;
        if ($ = !1, C.isTouched = !0, Z = "touchstart" === a.type, !Z || 1 === a.targetTouches.length) {
            C.callPlugins("onTouchStartBegin"), Z || C.isAndroid || (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
            var c = Z ? a.targetTouches[0].pageX : a.pageX || a.clientX,
                d = Z ? a.targetTouches[0].pageY : a.pageY || a.clientY;
            C.touches.startX = C.touches.currentX = c, C.touches.startY = C.touches.currentY = d, C.touches.start = C.touches.current = M ? c : d, C.setWrapperTransition(0), C.positions.start = C.positions.current = C.getWrapperTranslate(), C.setWrapperTranslate(C.positions.start), C.times.start = (new Date).getTime(), H = void 0, b.moveStartThreshold > 0 && (W = !1), b.onTouchStart && C.fireCallback(b.onTouchStart, C), C.callPlugins("onTouchStartEnd")
        }
    }

    function q(a) {
        if (C.isTouched && !b.onlyExternal && (!Z || "mousemove" !== a.type)) {
            var c = Z ? a.targetTouches[0].pageX : a.pageX || a.clientX,
                d = Z ? a.targetTouches[0].pageY : a.pageY || a.clientY;
            if ("undefined" == typeof H && M && (H = !!(H || Math.abs(d - C.touches.startY) > Math.abs(c - C.touches.startX))), "undefined" != typeof H || M || (H = !!(H || Math.abs(d - C.touches.startY) < Math.abs(c - C.touches.startX))), H) return void(C.isTouched = !1);
            if (a.assignedToSwiper) return void(C.isTouched = !1);
            if (a.assignedToSwiper = !0, b.preventLinks && (C.allowLinks = !1), b.onSlideClick && (C.allowSlideClick = !1), b.autoplay && C.stopAutoplay(!0), !Z || 1 === a.touches.length) {
                if (C.isMoved || (C.callPlugins("onTouchMoveStart"), b.loop && (C.fixLoop(), C.positions.start = C.getWrapperTranslate()), b.onTouchMoveStart && C.fireCallback(b.onTouchMoveStart, C)), C.isMoved = !0, a.preventDefault ? a.preventDefault() : a.returnValue = !1, C.touches.current = M ? c : d, C.positions.current = (C.touches.current - C.touches.start) * b.touchRatio + C.positions.start, C.positions.current > 0 && b.onResistanceBefore && C.fireCallback(b.onResistanceBefore, C, C.positions.current), C.positions.current < -e() && b.onResistanceAfter && C.fireCallback(b.onResistanceAfter, C, Math.abs(C.positions.current + e())), b.resistance && "100%" !== b.resistance) {
                    var f;
                    if (C.positions.current > 0 && (f = 1 - C.positions.current / I / 2, C.positions.current = .5 > f ? I / 2 : C.positions.current * f), C.positions.current < -e()) {
                        var g = (C.touches.current - C.touches.start) * b.touchRatio + (e() + C.positions.start);
                        f = (I + g) / I;
                        var h = C.positions.current - g * (1 - f) / 2,
                            i = -e() - I / 2;
                        C.positions.current = i > h || 0 >= f ? i : h
                    }
                }
                if (b.resistance && "100%" === b.resistance && (C.positions.current > 0 && (!b.freeMode || b.freeModeFluid) && (C.positions.current = 0), C.positions.current < -e() && (!b.freeMode || b.freeModeFluid) && (C.positions.current = -e())), !b.followFinger) return;
                if (b.moveStartThreshold)
                    if (Math.abs(C.touches.current - C.touches.start) > b.moveStartThreshold || W) {
                        if (!W) return W = !0, void(C.touches.start = C.touches.current);
                        C.setWrapperTranslate(C.positions.current)
                    } else C.positions.current = C.positions.start;
                else C.setWrapperTranslate(C.positions.current);
                return (b.freeMode || b.watchActiveIndex) && C.updateActiveSlide(C.positions.current), b.grabCursor && (C.container.style.cursor = "move", C.container.style.cursor = "grabbing", C.container.style.cursor = "-moz-grabbin", C.container.style.cursor = "-webkit-grabbing"), X || (X = C.touches.current), Y || (Y = (new Date).getTime()), C.velocity = (C.touches.current - X) / ((new Date).getTime() - Y) / 2, Math.abs(C.touches.current - X) < 2 && (C.velocity = 0), X = C.touches.current, Y = (new Date).getTime(), C.callPlugins("onTouchMoveEnd"), b.onTouchMove && C.fireCallback(b.onTouchMove, C), !1
            }
        }
    }

    function r() {
        if (H && C.swipeReset(), !b.onlyExternal && C.isTouched) {
            C.isTouched = !1, b.grabCursor && (C.container.style.cursor = "move", C.container.style.cursor = "grab", C.container.style.cursor = "-moz-grab", C.container.style.cursor = "-webkit-grab"), C.positions.current || 0 === C.positions.current || (C.positions.current = C.positions.start), b.followFinger && C.setWrapperTranslate(C.positions.current), C.times.end = (new Date).getTime(), C.touches.diff = C.touches.current - C.touches.start, C.touches.abs = Math.abs(C.touches.diff), C.positions.diff = C.positions.current - C.positions.start, C.positions.abs = Math.abs(C.positions.diff);
            var a = C.positions.diff,
                c = C.positions.abs,
                d = C.times.end - C.times.start;
            5 > c && 300 > d && C.allowLinks === !1 && (b.freeMode || 0 === c || C.swipeReset(), b.preventLinks && (C.allowLinks = !0), b.onSlideClick && (C.allowSlideClick = !0)), setTimeout(function() {
                b.preventLinks && (C.allowLinks = !0), b.onSlideClick && (C.allowSlideClick = !0)
            }, 100);
            var f = e();
            if (!C.isMoved && b.freeMode) return C.isMoved = !1, b.onTouchEnd && C.fireCallback(b.onTouchEnd, C), void C.callPlugins("onTouchEnd");
            if (!C.isMoved || C.positions.current > 0 || C.positions.current < -f) return C.swipeReset(), b.onTouchEnd && C.fireCallback(b.onTouchEnd, C), void C.callPlugins("onTouchEnd");
            if (C.isMoved = !1, b.freeMode) {
                if (b.freeModeFluid) {
                    var g, h = 1e3 * b.momentumRatio,
                        i = C.velocity * h,
                        j = C.positions.current + i,
                        k = !1,
                        l = 20 * Math.abs(C.velocity) * b.momentumBounceRatio; - f > j && (b.momentumBounce && C.support.transitions ? (-l > j + f && (j = -f - l), g = -f, k = !0, $ = !0) : j = -f), j > 0 && (b.momentumBounce && C.support.transitions ? (j > l && (j = l), g = 0, k = !0, $ = !0) : j = 0), 0 !== C.velocity && (h = Math.abs((j - C.positions.current) / C.velocity)), C.setWrapperTranslate(j), C.setWrapperTransition(h), b.momentumBounce && k && C.wrapperTransitionEnd(function() {
                        $ && (b.onMomentumBounce && C.fireCallback(b.onMomentumBounce, C), C.callPlugins("onMomentumBounce"), C.setWrapperTranslate(g), C.setWrapperTransition(300))
                    }), C.updateActiveSlide(j)
                }
                return (!b.freeModeFluid || d >= 300) && C.updateActiveSlide(C.positions.current), b.onTouchEnd && C.fireCallback(b.onTouchEnd, C), void C.callPlugins("onTouchEnd")
            }
            G = 0 > a ? "toNext" : "toPrev", "toNext" === G && 300 >= d && (30 > c || !b.shortSwipes ? C.swipeReset() : C.swipeNext(!0)), "toPrev" === G && 300 >= d && (30 > c || !b.shortSwipes ? C.swipeReset() : C.swipePrev(!0));
            var m = 0;
            if ("auto" === b.slidesPerView) {
                for (var n, o = Math.abs(C.getWrapperTranslate()), p = 0, q = 0; q < C.slides.length; q++)
                    if (n = M ? C.slides[q].getWidth(!0) : C.slides[q].getHeight(!0), p += n, p > o) {
                        m = n;
                        break
                    }
                m > I && (m = I)
            } else m = E * b.slidesPerView;
            "toNext" === G && d > 300 && (c >= m * b.longSwipesRatio ? C.swipeNext(!0) : C.swipeReset()), "toPrev" === G && d > 300 && (c >= m * b.longSwipesRatio ? C.swipePrev(!0) : C.swipeReset()), b.onTouchEnd && C.fireCallback(b.onTouchEnd, C), C.callPlugins("onTouchEnd")
        }
    }

    function s(a) {
        var c = !1;
        do a.className.indexOf(b.noSwipingClass) > -1 && (c = !0), a = a.parentElement; while (!c && a.parentElement && -1 === a.className.indexOf(b.wrapperClass));
        return !c && a.className.indexOf(b.wrapperClass) > -1 && a.className.indexOf(b.noSwipingClass) > -1 && (c = !0), c
    }

    function t(a, b) {
        var c, d = document.createElement("div");
        return d.innerHTML = b, c = d.firstChild, c.className += " " + a, c.outerHTML
    }

    function u(a, c, d) {
        function e() {
            var c = +new Date,
                d = c - g;
            h += i * d / (1e3 / 60), k = "toNext" === j ? h > a : a > h, k ? (C.setWrapperTranslate(Math.round(h)), C._DOMAnimating = !0, window.setTimeout(function() {
                e()
            }, 1e3 / 60)) : (b.onSlideChangeEnd && C.fireCallback(b.onSlideChangeEnd, C), C.setWrapperTranslate(a), C._DOMAnimating = !1)
        }
        var f = "to" === c && d.speed >= 0 ? d.speed : b.speed,
            g = +new Date;
        if (C.support.transitions || !b.DOMAnimation) C.setWrapperTranslate(a), C.setWrapperTransition(f);
        else {
            var h = C.getWrapperTranslate(),
                i = Math.ceil((a - h) / f * (1e3 / 60)),
                j = h > a ? "toNext" : "toPrev",
                k = "toNext" === j ? h > a : a > h;
            if (C._DOMAnimating) return;
            e()
        }
        C.updateActiveSlide(a), b.onSlideNext && "next" === c && C.fireCallback(b.onSlideNext, C, a), b.onSlidePrev && "prev" === c && C.fireCallback(b.onSlidePrev, C, a), b.onSlideReset && "reset" === c && C.fireCallback(b.onSlideReset, C, a), ("next" === c || "prev" === c || "to" === c && d.runCallbacks === !0) && v(c)
    }

    function v(a) {
        if (C.callPlugins("onSlideChangeStart"), b.onSlideChangeStart)
            if (b.queueStartCallbacks && C.support.transitions) {
                if (C._queueStartCallbacks) return;
                C._queueStartCallbacks = !0, C.fireCallback(b.onSlideChangeStart, C, a), C.wrapperTransitionEnd(function() {
                    C._queueStartCallbacks = !1
                })
            } else C.fireCallback(b.onSlideChangeStart, C, a);
        if (b.onSlideChangeEnd)
            if (C.support.transitions)
                if (b.queueEndCallbacks) {
                    if (C._queueEndCallbacks) return;
                    C._queueEndCallbacks = !0, C.wrapperTransitionEnd(function(c) {
                        C.fireCallback(b.onSlideChangeEnd, c, a)
                    })
                } else C.wrapperTransitionEnd(function(c) {
                    C.fireCallback(b.onSlideChangeEnd, c, a)
                });
        else b.DOMAnimation || setTimeout(function() {
            C.fireCallback(b.onSlideChangeEnd, C, a)
        }, 10)
    }

    function w() {
        var a = C.paginationButtons;
        if (a)
            for (var b = 0; b < a.length; b++) C.h.removeEventListener(a[b], "click", y)
    }

    function x() {
        var a = C.paginationButtons;
        if (a)
            for (var b = 0; b < a.length; b++) C.h.addEventListener(a[b], "click", y)
    }

    function y(a) {
        for (var b, c = a.target || a.srcElement, d = C.paginationButtons, e = 0; e < d.length; e++) c === d[e] && (b = e);
        C.swipeTo(b)
    }

    function z() {
        _ = setTimeout(function() {
            b.loop ? (C.fixLoop(), C.swipeNext(!0)) : C.swipeNext(!0) || (b.autoplayStopOnLast ? (clearTimeout(_), _ = void 0) : C.swipeTo(0)), C.wrapperTransitionEnd(function() {
                "undefined" != typeof _ && z()
            })
        }, b.autoplay)
    }

    function A() {
        C.calcSlides(), b.loader.slides.length > 0 && 0 === C.slides.length && C.loadSlides(), b.loop && C.createLoop(), C.init(), f(), b.pagination && C.createPagination(!0), b.loop || b.initialSlide > 0 ? C.swipeTo(b.initialSlide, 0, !1) : C.updateActiveSlide(0), b.autoplay && C.startAutoplay(), C.centerIndex = C.activeIndex, b.onSwiperCreated && C.fireCallback(b.onSwiperCreated, C), C.callPlugins("onSwiperCreated")
    }
    if (document.body.__defineGetter__ && HTMLElement) {
        var B = HTMLElement.prototype;
        B.__defineGetter__ && B.__defineGetter__("outerHTML", function() {
            return (new XMLSerializer).serializeToString(this)
        })
    }
    if (window.getComputedStyle || (window.getComputedStyle = function(a) {
            return this.el = a, this.getPropertyValue = function(b) {
                var c = /(\-([a-z]){1})/g;
                return "float" === b && (b = "styleFloat"), c.test(b) && (b = b.replace(c, function() {
                    return arguments[2].toUpperCase()
                })), a.currentStyle[b] ? a.currentStyle[b] : null
            }, this
        }), Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
            for (var c = b || 0, d = this.length; d > c; c++)
                if (this[c] === a) return c;
            return -1
        }), (document.querySelectorAll || window.jQuery) && "undefined" != typeof a && (a.nodeType || 0 !== c(a).length)) {
        var C = this;
        C.touches = {
            start: 0,
            startX: 0,
            startY: 0,
            current: 0,
            currentX: 0,
            currentY: 0,
            diff: 0,
            abs: 0
        }, C.positions = {
            start: 0,
            abs: 0,
            diff: 0,
            current: 0
        }, C.times = {
            start: 0,
            end: 0
        }, C.id = (new Date).getTime(), C.container = a.nodeType ? a : c(a)[0], C.isTouched = !1, C.isMoved = !1, C.activeIndex = 0, C.centerIndex = 0, C.activeLoaderIndex = 0, C.activeLoopIndex = 0, C.previousIndex = null, C.velocity = 0, C.snapGrid = [], C.slidesGrid = [], C.imagesToLoad = [], C.imagesLoaded = 0, C.wrapperLeft = 0, C.wrapperRight = 0, C.wrapperTop = 0, C.wrapperBottom = 0, C.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") >= 0;
        var D, E, F, G, H, I, J = {
            eventTarget: "wrapper",
            mode: "horizontal",
            touchRatio: 1,
            speed: 300,
            freeMode: !1,
            freeModeFluid: !1,
            momentumRatio: 1,
            momentumBounce: !0,
            momentumBounceRatio: 1,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerViewFit: !0,
            simulateTouch: !0,
            followFinger: !0,
            shortSwipes: !0,
            longSwipesRatio: .5,
            moveStartThreshold: !1,
            onlyExternal: !1,
            createPagination: !0,
            pagination: !1,
            paginationElement: "span",
            paginationClickable: !1,
            paginationAsRange: !0,
            resistance: !0,
            scrollContainer: !1,
            preventLinks: !0,
            preventLinksPropagation: !1,
            noSwiping: !1,
            noSwipingClass: "swiper-no-swiping",
            initialSlide: 0,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelControlForceToAxis: !1,
            useCSS3Transforms: !0,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            loop: !1,
            loopAdditionalSlides: 0,
            calculateHeight: !1,
            cssWidthAndHeight: !1,
            updateOnImagesReady: !0,
            releaseFormElements: !0,
            watchActiveIndex: !1,
            visibilityFullFit: !1,
            offsetPxBefore: 0,
            offsetPxAfter: 0,
            offsetSlidesBefore: 0,
            offsetSlidesAfter: 0,
            centeredSlides: !1,
            queueStartCallbacks: !1,
            queueEndCallbacks: !1,
            autoResize: !0,
            resizeReInit: !1,
            DOMAnimation: !0,
            loader: {
                slides: [],
                slidesHTMLType: "inner",
                surroundGroups: 1,
                logic: "reload",
                loadAllSlides: !1
            },
            slideElement: "div",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            wrapperClass: "swiper-wrapper",
            paginationElementClass: "swiper-pagination-switch",
            paginationActiveClass: "swiper-active-switch",
            paginationVisibleClass: "swiper-visible-switch"
        };
        b = b || {};
        for (var K in J)
            if (K in b && "object" == typeof b[K])
                for (var L in J[K]) L in b[K] || (b[K][L] = J[K][L]);
            else K in b || (b[K] = J[K]);
        C.params = b, b.scrollContainer && (b.freeMode = !0, b.freeModeFluid = !0), b.loop && (b.resistance = "100%");
        var M = "horizontal" === b.mode,
            N = ["mousedown", "mousemove", "mouseup"];
        C.browser.ie10 && (N = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), C.browser.ie11 && (N = ["pointerdown", "pointermove", "pointerup"]), C.touchEvents = {
            touchStart: C.support.touch || !b.simulateTouch ? "touchstart" : N[0],
            touchMove: C.support.touch || !b.simulateTouch ? "touchmove" : N[1],
            touchEnd: C.support.touch || !b.simulateTouch ? "touchend" : N[2]
        };
        for (var O = C.container.childNodes.length - 1; O >= 0; O--)
            if (C.container.childNodes[O].className)
                for (var P = C.container.childNodes[O].className.split(/\s+/), Q = 0; Q < P.length; Q++) P[Q] === b.wrapperClass && (D = C.container.childNodes[O]);
        C.wrapper = D, C._extendSwiperSlide = function(a) {
            return a.append = function() {
                return b.loop ? a.insertAfter(C.slides.length - C.loopedSlides) : (C.wrapper.appendChild(a), C.reInit()), a
            }, a.prepend = function() {
                return b.loop ? (C.wrapper.insertBefore(a, C.slides[C.loopedSlides]), C.removeLoopedSlides(), C.calcSlides(), C.createLoop()) : C.wrapper.insertBefore(a, C.wrapper.firstChild), C.reInit(), a
            }, a.insertAfter = function(c) {
                if ("undefined" == typeof c) return !1;
                var d;
                return b.loop ? (d = C.slides[c + 1 + C.loopedSlides], d ? C.wrapper.insertBefore(a, d) : C.wrapper.appendChild(a), C.removeLoopedSlides(), C.calcSlides(), C.createLoop()) : (d = C.slides[c + 1], C.wrapper.insertBefore(a, d)), C.reInit(), a
            }, a.clone = function() {
                return C._extendSwiperSlide(a.cloneNode(!0))
            }, a.remove = function() {
                C.wrapper.removeChild(a), C.reInit()
            }, a.html = function(b) {
                return "undefined" == typeof b ? a.innerHTML : (a.innerHTML = b, a)
            }, a.index = function() {
                for (var b, c = C.slides.length - 1; c >= 0; c--) a === C.slides[c] && (b = c);
                return b
            }, a.isActive = function() {
                return a.index() === C.activeIndex ? !0 : !1
            }, a.swiperSlideDataStorage || (a.swiperSlideDataStorage = {}), a.getData = function(b) {
                return a.swiperSlideDataStorage[b]
            }, a.setData = function(b, c) {
                return a.swiperSlideDataStorage[b] = c, a
            }, a.data = function(b, c) {
                return "undefined" == typeof c ? a.getAttribute("data-" + b) : (a.setAttribute("data-" + b, c), a)
            }, a.getWidth = function(b) {
                return C.h.getWidth(a, b)
            }, a.getHeight = function(b) {
                return C.h.getHeight(a, b)
            }, a.getOffset = function() {
                return C.h.getOffset(a)
            }, a
        }, C.calcSlides = function(a) {
            var c = C.slides ? C.slides.length : !1;
            C.slides = [], C.displaySlides = [];
            for (var d = 0; d < C.wrapper.childNodes.length; d++)
                if (C.wrapper.childNodes[d].className)
                    for (var e = C.wrapper.childNodes[d].className, f = e.split(/\s+/), i = 0; i < f.length; i++) f[i] === b.slideClass && C.slides.push(C.wrapper.childNodes[d]);
            for (d = C.slides.length - 1; d >= 0; d--) C._extendSwiperSlide(C.slides[d]);
            c !== !1 && (c !== C.slides.length || a) && (h(), g(), C.updateActiveSlide(), C.params.pagination && C.createPagination(), C.callPlugins("numberOfSlidesChanged"))
        }, C.createSlide = function(a, c, d) {
            c = c || C.params.slideClass, d = d || b.slideElement;
            var e = document.createElement(d);
            return e.innerHTML = a || "", e.className = c, C._extendSwiperSlide(e)
        }, C.appendSlide = function(a, b, c) {
            return a ? a.nodeType ? C._extendSwiperSlide(a).append() : C.createSlide(a, b, c).append() : void 0
        }, C.prependSlide = function(a, b, c) {
            return a ? a.nodeType ? C._extendSwiperSlide(a).prepend() : C.createSlide(a, b, c).prepend() : void 0
        }, C.insertSlideAfter = function(a, b, c, d) {
            return "undefined" == typeof a ? !1 : b.nodeType ? C._extendSwiperSlide(b).insertAfter(a) : C.createSlide(b, c, d).insertAfter(a)
        }, C.removeSlide = function(a) {
            if (C.slides[a]) {
                if (b.loop) {
                    if (!C.slides[a + C.loopedSlides]) return !1;
                    C.slides[a + C.loopedSlides].remove(), C.removeLoopedSlides(), C.calcSlides(), C.createLoop()
                } else C.slides[a].remove();
                return !0
            }
            return !1
        }, C.removeLastSlide = function() {
            return C.slides.length > 0 ? (b.loop ? (C.slides[C.slides.length - 1 - C.loopedSlides].remove(), C.removeLoopedSlides(), C.calcSlides(), C.createLoop()) : C.slides[C.slides.length - 1].remove(), !0) : !1
        }, C.removeAllSlides = function() {
            for (var a = C.slides.length - 1; a >= 0; a--) C.slides[a].remove()
        }, C.getSlide = function(a) {
            return C.slides[a]
        }, C.getLastSlide = function() {
            return C.slides[C.slides.length - 1]
        }, C.getFirstSlide = function() {
            return C.slides[0]
        }, C.activeSlide = function() {
            return C.slides[C.activeIndex]
        }, C.fireCallback = function() {
            var a = arguments[0];
            if ("[object Array]" === Object.prototype.toString.call(a))
                for (var c = 0; c < a.length; c++) "function" == typeof a[c] && a[c](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            else "[object String]" === Object.prototype.toString.call(a) ? b["on" + a] && C.fireCallback(b["on" + a]) : a(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
        }, C.addCallback = function(a, b) {
            var c, e = this;
            return e.params["on" + a] ? d(this.params["on" + a]) ? this.params["on" + a].push(b) : "function" == typeof this.params["on" + a] ? (c = this.params["on" + a], this.params["on" + a] = [], this.params["on" + a].push(c), this.params["on" + a].push(b)) : void 0 : (this.params["on" + a] = [], this.params["on" + a].push(b))
        }, C.removeCallbacks = function(a) {
            C.params["on" + a] && (C.params["on" + a] = null)
        };
        var R = [];
        for (var S in C.plugins)
            if (b[S]) {
                var T = C.plugins[S](C, b[S]);
                T && R.push(T)
            }
        C.callPlugins = function(a, b) {
            b || (b = {});
            for (var c = 0; c < R.length; c++) a in R[c] && R[c][a](b)
        }, !C.browser.ie10 && !C.browser.ie11 || b.onlyExternal || C.wrapper.classList.add("swiper-wp8-" + (M ? "horizontal" : "vertical")), b.freeMode && (C.container.className += " swiper-free-mode"), C.initialized = !1, C.init = function(a, c) {
            var d = C.h.getWidth(C.container),
                e = C.h.getHeight(C.container);
            if ((d !== C.width || e !== C.height || a) && 0 !== d && 0 !== e) {
                C.width = d, C.height = e;
                var f, g, h, i, j, k, l;
                I = M ? d : e;
                var m = C.wrapper;
                if (a && C.calcSlides(c), "auto" === b.slidesPerView) {
                    var n = 0,
                        o = 0;
                    b.slidesOffset > 0 && (m.style.paddingLeft = "", m.style.paddingRight = "", m.style.paddingTop = "", m.style.paddingBottom = ""), m.style.width = "", m.style.height = "", b.offsetPxBefore > 0 && (M ? C.wrapperLeft = b.offsetPxBefore : C.wrapperTop = b.offsetPxBefore), b.offsetPxAfter > 0 && (M ? C.wrapperRight = b.offsetPxAfter : C.wrapperBottom = b.offsetPxAfter), b.centeredSlides && (M ? (C.wrapperLeft = (I - this.slides[0].getWidth(!0)) / 2, C.wrapperRight = (I - C.slides[C.slides.length - 1].getWidth(!0)) / 2) : (C.wrapperTop = (I - C.slides[0].getHeight(!0)) / 2, C.wrapperBottom = (I - C.slides[C.slides.length - 1].getHeight(!0)) / 2)), M ? (C.wrapperLeft >= 0 && (m.style.paddingLeft = C.wrapperLeft + "px"), C.wrapperRight >= 0 && (m.style.paddingRight = C.wrapperRight + "px")) : (C.wrapperTop >= 0 && (m.style.paddingTop = C.wrapperTop + "px"), C.wrapperBottom >= 0 && (m.style.paddingBottom = C.wrapperBottom + "px")), k = 0;
                    var p = 0;
                    for (C.snapGrid = [], C.slidesGrid = [], h = 0, l = 0; l < C.slides.length; l++) {
                        f = C.slides[l].getWidth(!0), g = C.slides[l].getHeight(!0), b.calculateHeight && (h = Math.max(h, g));
                        var q = M ? f : g;
                        if (b.centeredSlides) {
                            var r = l === C.slides.length - 1 ? 0 : C.slides[l + 1].getWidth(!0),
                                s = l === C.slides.length - 1 ? 0 : C.slides[l + 1].getHeight(!0),
                                t = M ? r : s;
                            if (q > I) {
                                if (b.slidesPerViewFit) C.snapGrid.push(k + C.wrapperLeft), C.snapGrid.push(k + q - I + C.wrapperLeft);
                                else
                                    for (var u = 0; u <= Math.floor(q / (I + C.wrapperLeft)); u++) C.snapGrid.push(0 === u ? k + C.wrapperLeft : k + C.wrapperLeft + I * u);
                                C.slidesGrid.push(k + C.wrapperLeft)
                            } else C.snapGrid.push(p), C.slidesGrid.push(p);
                            p += q / 2 + t / 2
                        } else {
                            if (q > I)
                                if (b.slidesPerViewFit) C.snapGrid.push(k), C.snapGrid.push(k + q - I);
                                else
                                    for (var v = 0; v <= Math.floor(q / I); v++) C.snapGrid.push(k + I * v);
                            else C.snapGrid.push(k);
                            C.slidesGrid.push(k)
                        }
                        k += q, n += f, o += g
                    }
                    b.calculateHeight && (C.height = h), M ? (F = n + C.wrapperRight + C.wrapperLeft, m.style.width = n + "px", m.style.height = C.height + "px") : (F = o + C.wrapperTop + C.wrapperBottom, m.style.width = C.width + "px", m.style.height = o + "px")
                } else if (b.scrollContainer) m.style.width = "", m.style.height = "", i = C.slides[0].getWidth(!0), j = C.slides[0].getHeight(!0), F = M ? i : j, m.style.width = i + "px", m.style.height = j + "px", E = M ? i : j;
                else {
                    if (b.calculateHeight) {
                        for (h = 0, j = 0, M || (C.container.style.height = ""), m.style.height = "", l = 0; l < C.slides.length; l++) C.slides[l].style.height = "", h = Math.max(C.slides[l].getHeight(!0), h), M || (j += C.slides[l].getHeight(!0));
                        g = h, C.height = g, M ? j = g : (I = g, C.container.style.height = I + "px")
                    } else g = M ? C.height : C.height / b.slidesPerView, j = M ? C.height : C.slides.length * g;
                    for (f = M ? C.width / b.slidesPerView : C.width, i = M ? C.slides.length * f : C.width, E = M ? f : g, b.offsetSlidesBefore > 0 && (M ? C.wrapperLeft = E * b.offsetSlidesBefore : C.wrapperTop = E * b.offsetSlidesBefore), b.offsetSlidesAfter > 0 && (M ? C.wrapperRight = E * b.offsetSlidesAfter : C.wrapperBottom = E * b.offsetSlidesAfter), b.offsetPxBefore > 0 && (M ? C.wrapperLeft = b.offsetPxBefore : C.wrapperTop = b.offsetPxBefore), b.offsetPxAfter > 0 && (M ? C.wrapperRight = b.offsetPxAfter : C.wrapperBottom = b.offsetPxAfter), b.centeredSlides && (M ? (C.wrapperLeft = (I - E) / 2, C.wrapperRight = (I - E) / 2) : (C.wrapperTop = (I - E) / 2, C.wrapperBottom = (I - E) / 2)), M ? (C.wrapperLeft > 0 && (m.style.paddingLeft = C.wrapperLeft + "px"), C.wrapperRight > 0 && (m.style.paddingRight = C.wrapperRight + "px")) : (C.wrapperTop > 0 && (m.style.paddingTop = C.wrapperTop + "px"), C.wrapperBottom > 0 && (m.style.paddingBottom = C.wrapperBottom + "px")), F = M ? i + C.wrapperRight + C.wrapperLeft : j + C.wrapperTop + C.wrapperBottom, b.cssWidthAndHeight || (parseFloat(i) > 0 && (m.style.width = i + "px"), parseFloat(j) > 0 && (m.style.height = j + "px")), k = 0, C.snapGrid = [], C.slidesGrid = [], l = 0; l < C.slides.length; l++) C.snapGrid.push(k), C.slidesGrid.push(k), k += E, b.cssWidthAndHeight || (parseFloat(f) > 0 && (C.slides[l].style.width = f + "px"), parseFloat(g) > 0 && (C.slides[l].style.height = g + "px"))
                }
                C.initialized ? (C.callPlugins("onInit"), b.onInit && C.fireCallback(b.onInit, C)) : (C.callPlugins("onFirstInit"), b.onFirstInit && C.fireCallback(b.onFirstInit, C)), C.initialized = !0
            }
        }, C.reInit = function(a) {
            C.init(!0, a)
        }, C.resizeFix = function(a) {
            C.callPlugins("beforeResizeFix"), C.init(b.resizeReInit || a), b.freeMode ? C.getWrapperTranslate() < -e() && (C.setWrapperTransition(0), C.setWrapperTranslate(-e())) : (C.swipeTo(b.loop ? C.activeLoopIndex : C.activeIndex, 0, !1), b.autoplay && (C.support.transitions && "undefined" != typeof _ ? "undefined" != typeof _ && (clearTimeout(_), _ = void 0, C.startAutoplay()) : "undefined" != typeof ab && (clearInterval(ab), ab = void 0, C.startAutoplay()))), C.callPlugins("afterResizeFix")
        }, C.destroy = function() {
            var a = C.h.removeEventListener,
                c = "wrapper" === b.eventTarget ? C.wrapper : C.container;
            C.browser.ie10 || C.browser.ie11 ? (a(c, C.touchEvents.touchStart, p), a(document, C.touchEvents.touchMove, q), a(document, C.touchEvents.touchEnd, r)) : (C.support.touch && (a(c, "touchstart", p), a(c, "touchmove", q), a(c, "touchend", r)), b.simulateTouch && (a(c, "mousedown", p), a(document, "mousemove", q), a(document, "mouseup", r))), b.autoResize && a(window, "resize", C.resizeFix), h(), b.paginationClickable && w(), b.mousewheelControl && C._wheelEvent && a(C.container, C._wheelEvent, j), b.keyboardControl && a(document, "keydown", i), b.autoplay && C.stopAutoplay(), C.callPlugins("onDestroy"), C = null
        }, C.disableKeyboardControl = function() {
            b.keyboardControl = !1, C.h.removeEventListener(document, "keydown", i)
        }, C.enableKeyboardControl = function() {
            b.keyboardControl = !0, C.h.addEventListener(document, "keydown", i)
        };
        var U = (new Date).getTime();
        if (b.grabCursor) {
            var V = C.container.style;
            V.cursor = "move", V.cursor = "grab", V.cursor = "-moz-grab", V.cursor = "-webkit-grab"
        }
        C.allowSlideClick = !0, C.allowLinks = !0;
        var W, X, Y, Z = !1,
            $ = !0;
        C.swipeNext = function(a) {
            !a && b.loop && C.fixLoop(), !a && b.autoplay && C.stopAutoplay(!0), C.callPlugins("onSwipeNext");
            var c = C.getWrapperTranslate(),
                d = c;
            if ("auto" === b.slidesPerView) {
                for (var f = 0; f < C.snapGrid.length; f++)
                    if (-c >= C.snapGrid[f] && -c < C.snapGrid[f + 1]) {
                        d = -C.snapGrid[f + 1];
                        break
                    }
            } else {
                var g = E * b.slidesPerGroup;
                d = -(Math.floor(Math.abs(c) / Math.floor(g)) * g + g)
            }
            return d < -e() && (d = -e()), d === c ? !1 : (u(d, "next"), !0)
        }, C.swipePrev = function(a) {
            !a && b.loop && C.fixLoop(), !a && b.autoplay && C.stopAutoplay(!0), C.callPlugins("onSwipePrev");
            var c, d = Math.ceil(C.getWrapperTranslate());
            if ("auto" === b.slidesPerView) {
                c = 0;
                for (var e = 1; e < C.snapGrid.length; e++) {
                    if (-d === C.snapGrid[e]) {
                        c = -C.snapGrid[e - 1];
                        break
                    }
                    if (-d > C.snapGrid[e] && -d < C.snapGrid[e + 1]) {
                        c = -C.snapGrid[e];
                        break
                    }
                }
            } else {
                var f = E * b.slidesPerGroup;
                c = -(Math.ceil(-d / f) - 1) * f
            }
            return c > 0 && (c = 0), c === d ? !1 : (u(c, "prev"), !0)
        }, C.swipeReset = function() {
            C.callPlugins("onSwipeReset"); {
                var a, c = C.getWrapperTranslate(),
                    d = E * b.slidesPerGroup; - e()
            }
            if ("auto" === b.slidesPerView) {
                a = 0;
                for (var f = 0; f < C.snapGrid.length; f++) {
                    if (-c === C.snapGrid[f]) return;
                    if (-c >= C.snapGrid[f] && -c < C.snapGrid[f + 1]) {
                        a = C.positions.diff > 0 ? -C.snapGrid[f + 1] : -C.snapGrid[f];
                        break
                    }
                } - c >= C.snapGrid[C.snapGrid.length - 1] && (a = -C.snapGrid[C.snapGrid.length - 1]), c <= -e() && (a = -e())
            } else a = 0 > c ? Math.round(c / d) * d : 0;
            return b.scrollContainer && (a = 0 > c ? c : 0), a < -e() && (a = -e()), b.scrollContainer && I > E && (a = 0), a === c ? !1 : (u(a, "reset"), !0)
        }, C.swipeTo = function(a, c, d) {
            a = parseInt(a, 10), C.callPlugins("onSwipeTo", {
                index: a,
                speed: c
            }), b.loop && (a += C.loopedSlides);
            var f = C.getWrapperTranslate();
            if (!(a > C.slides.length - 1 || 0 > a)) {
                var g;
                return g = "auto" === b.slidesPerView ? -C.slidesGrid[a] : -a * E, g < -e() && (g = -e()), g === f ? !1 : (d = d === !1 ? !1 : !0, u(g, "to", {
                    index: a,
                    speed: c,
                    runCallbacks: d
                }), !0)
            }
        }, C._queueStartCallbacks = !1, C._queueEndCallbacks = !1, C.updateActiveSlide = function(a) {
            if (C.initialized && 0 !== C.slides.length) {
                if (C.previousIndex = C.activeIndex, "undefined" == typeof a && (a = C.getWrapperTranslate()), a > 0 && (a = 0), "auto" === b.slidesPerView) {
                    if (C.activeIndex = C.slidesGrid.indexOf(-a), C.activeIndex < 0) {
                        for (var c = 0; c < C.slidesGrid.length - 1 && !(-a > C.slidesGrid[c] && -a < C.slidesGrid[c + 1]); c++);
                        var d = Math.abs(C.slidesGrid[c] + a),
                            e = Math.abs(C.slidesGrid[c + 1] + a);
                        C.activeIndex = e >= d ? c : c + 1
                    }
                } else C.activeIndex = Math[b.visibilityFullFit ? "ceil" : "round"](-a / E);
                if (C.activeIndex === C.slides.length && (C.activeIndex = C.slides.length - 1), C.activeIndex < 0 && (C.activeIndex = 0), C.slides[C.activeIndex]) {
                    C.calcVisibleSlides(a);
                    for (var f = new RegExp("\\s*" + b.slideActiveClass), g = new RegExp("\\s*" + b.slideVisibleClass), h = 0; h < C.slides.length; h++) C.slides[h].className = C.slides[h].className.replace(f, "").replace(g, ""), C.visibleSlides.indexOf(C.slides[h]) >= 0 && (C.slides[h].className += " " + b.slideVisibleClass);
                    if (C.slides[C.activeIndex].className += " " + b.slideActiveClass, b.loop) {
                        var i = C.loopedSlides;
                        C.activeLoopIndex = C.activeIndex - i, C.activeLoopIndex >= C.slides.length - 2 * i && (C.activeLoopIndex = C.slides.length - 2 * i - C.activeLoopIndex), C.activeLoopIndex < 0 && (C.activeLoopIndex = C.slides.length - 2 * i + C.activeLoopIndex), C.activeLoopIndex < 0 && (C.activeLoopIndex = 0)
                    } else C.activeLoopIndex = C.activeIndex;
                    b.pagination && C.updatePagination(a)
                }
            }
        }, C.createPagination = function(a) {
            if (b.paginationClickable && C.paginationButtons && w(), C.paginationContainer = b.pagination.nodeType ? b.pagination : c(b.pagination)[0], b.createPagination) {
                var d = "",
                    e = C.slides.length,
                    f = e;
                b.loop && (f -= 2 * C.loopedSlides);
                for (var g = 0; f > g; g++) d += "<" + b.paginationElement + ' class="' + b.paginationElementClass + '"></' + b.paginationElement + ">";
                C.paginationContainer.innerHTML = d
            }
            C.paginationButtons = c("." + b.paginationElementClass, C.paginationContainer), a || C.updatePagination(), C.callPlugins("onCreatePagination"), b.paginationClickable && x()
        }, C.updatePagination = function(a) {
            if (b.pagination && !(C.slides.length < 1)) {
                var d = c("." + b.paginationActiveClass, C.paginationContainer);
                if (d) {
                    var e = C.paginationButtons;
                    if (0 !== e.length) {
                        for (var f = 0; f < e.length; f++) e[f].className = b.paginationElementClass;
                        var g = b.loop ? C.loopedSlides : 0;
                        if (b.paginationAsRange) {
                            C.visibleSlides || C.calcVisibleSlides(a);
                            var h, i = [];
                            for (h = 0; h < C.visibleSlides.length; h++) {
                                var j = C.slides.indexOf(C.visibleSlides[h]) - g;
                                b.loop && 0 > j && (j = C.slides.length - 2 * C.loopedSlides + j), b.loop && j >= C.slides.length - 2 * C.loopedSlides && (j = C.slides.length - 2 * C.loopedSlides - j, j = Math.abs(j)), i.push(j)
                            }
                            for (h = 0; h < i.length; h++) e[i[h]] && (e[i[h]].className += " " + b.paginationVisibleClass);
                            b.loop ? void 0 !== e[C.activeLoopIndex] && (e[C.activeLoopIndex].className += " " + b.paginationActiveClass) : e[C.activeIndex].className += " " + b.paginationActiveClass
                        } else b.loop ? e[C.activeLoopIndex] && (e[C.activeLoopIndex].className += " " + b.paginationActiveClass + " " + b.paginationVisibleClass) : e[C.activeIndex].className += " " + b.paginationActiveClass + " " + b.paginationVisibleClass
                    }
                }
            }
        }, C.calcVisibleSlides = function(a) {
            var c = [],
                d = 0,
                e = 0,
                f = 0;
            M && C.wrapperLeft > 0 && (a += C.wrapperLeft), !M && C.wrapperTop > 0 && (a += C.wrapperTop);
            for (var g = 0; g < C.slides.length; g++) {
                d += e, e = "auto" === b.slidesPerView ? M ? C.h.getWidth(C.slides[g], !0) : C.h.getHeight(C.slides[g], !0) : E, f = d + e;
                var h = !1;
                b.visibilityFullFit ? (d >= -a && -a + I >= f && (h = !0), -a >= d && f >= -a + I && (h = !0)) : (f > -a && -a + I >= f && (h = !0), d >= -a && -a + I > d && (h = !0), -a > d && f > -a + I && (h = !0)), h && c.push(C.slides[g])
            }
            0 === c.length && (c = [C.slides[C.activeIndex]]), C.visibleSlides = c
        };
        var _, ab;
        C.startAutoplay = function() {
            if (C.support.transitions) {
                if ("undefined" != typeof _) return !1;
                if (!b.autoplay) return;
                C.callPlugins("onAutoplayStart"), z()
            } else {
                if ("undefined" != typeof ab) return !1;
                if (!b.autoplay) return;
                C.callPlugins("onAutoplayStart"), ab = setInterval(function() {
                    b.loop ? (C.fixLoop(), C.swipeNext(!0)) : C.swipeNext(!0) || (b.autoplayStopOnLast ? (clearInterval(ab), ab = void 0) : C.swipeTo(0))
                }, b.autoplay)
            }
        }, C.stopAutoplay = function(a) {
            if (C.support.transitions) {
                if (!_) return;
                _ && clearTimeout(_), _ = void 0, a && !b.autoplayDisableOnInteraction && C.wrapperTransitionEnd(function() {
                    z()
                }), C.callPlugins("onAutoplayStop")
            } else ab && clearInterval(ab), ab = void 0, C.callPlugins("onAutoplayStop")
        }, C.loopCreated = !1, C.removeLoopedSlides = function() {
            if (C.loopCreated)
                for (var a = 0; a < C.slides.length; a++) C.slides[a].getData("looped") === !0 && C.wrapper.removeChild(C.slides[a])
        }, C.createLoop = function() {
            if (0 !== C.slides.length) {
                C.loopedSlides = "auto" === b.slidesPerView ? b.loopedSlides || 1 : b.slidesPerView + b.loopAdditionalSlides, C.loopedSlides > C.slides.length && (C.loopedSlides = C.slides.length);
                var a, c = "",
                    d = "",
                    e = "",
                    f = C.slides.length,
                    g = Math.floor(C.loopedSlides / f),
                    h = C.loopedSlides % f;
                for (a = 0; g * f > a; a++) {
                    var i = a;
                    if (a >= f) {
                        var j = Math.floor(a / f);
                        i = a - f * j
                    }
                    e += C.slides[i].outerHTML
                }
                for (a = 0; h > a; a++) d += t(b.slideDuplicateClass, C.slides[a].outerHTML);
                for (a = f - h; f > a; a++) c += t(b.slideDuplicateClass, C.slides[a].outerHTML);
                var k = c + e + D.innerHTML + e + d;
                for (D.innerHTML = k, C.loopCreated = !0, C.calcSlides(), a = 0; a < C.slides.length; a++)(a < C.loopedSlides || a >= C.slides.length - C.loopedSlides) && C.slides[a].setData("looped", !0);
                C.callPlugins("onCreateLoop")
            }
        }, C.fixLoop = function() {
            var a;
            C.activeIndex < C.loopedSlides ? (a = C.slides.length - 3 * C.loopedSlides + C.activeIndex, C.swipeTo(a, 0, !1)) : ("auto" === b.slidesPerView && C.activeIndex >= 2 * C.loopedSlides || C.activeIndex > C.slides.length - 2 * b.slidesPerView) && (a = -C.slides.length + C.activeIndex + C.loopedSlides, C.swipeTo(a, 0, !1))
        }, C.loadSlides = function() {
            var a = "";
            C.activeLoaderIndex = 0;
            for (var c = b.loader.slides, d = b.loader.loadAllSlides ? c.length : b.slidesPerView * (1 + b.loader.surroundGroups), e = 0; d > e; e++) a += "outer" === b.loader.slidesHTMLType ? c[e] : "<" + b.slideElement + ' class="' + b.slideClass + '" data-swiperindex="' + e + '">' + c[e] + "</" + b.slideElement + ">";
            C.wrapper.innerHTML = a, C.calcSlides(!0), b.loader.loadAllSlides || C.wrapperTransitionEnd(C.reloadSlides, !0)
        }, C.reloadSlides = function() {
            var a = b.loader.slides,
                c = parseInt(C.activeSlide().data("swiperindex"), 10);
            if (!(0 > c || c > a.length - 1)) {
                C.activeLoaderIndex = c;
                var d = Math.max(0, c - b.slidesPerView * b.loader.surroundGroups),
                    e = Math.min(c + b.slidesPerView * (1 + b.loader.surroundGroups) - 1, a.length - 1);
                if (c > 0) {
                    var f = -E * (c - d);
                    C.setWrapperTranslate(f), C.setWrapperTransition(0)
                }
                var g;
                if ("reload" === b.loader.logic) {
                    C.wrapper.innerHTML = "";
                    var h = "";
                    for (g = d; e >= g; g++) h += "outer" === b.loader.slidesHTMLType ? a[g] : "<" + b.slideElement + ' class="' + b.slideClass + '" data-swiperindex="' + g + '">' + a[g] + "</" + b.slideElement + ">";
                    C.wrapper.innerHTML = h
                } else {
                    var i = 1e3,
                        j = 0;
                    for (g = 0; g < C.slides.length; g++) {
                        var k = C.slides[g].data("swiperindex");
                        d > k || k > e ? C.wrapper.removeChild(C.slides[g]) : (i = Math.min(k, i), j = Math.max(k, j))
                    }
                    for (g = d; e >= g; g++) {
                        var l;
                        i > g && (l = document.createElement(b.slideElement), l.className = b.slideClass, l.setAttribute("data-swiperindex", g), l.innerHTML = a[g], C.wrapper.insertBefore(l, C.wrapper.firstChild)), g > j && (l = document.createElement(b.slideElement), l.className = b.slideClass, l.setAttribute("data-swiperindex", g), l.innerHTML = a[g], C.wrapper.appendChild(l))
                    }
                }
                C.reInit(!0)
            }
        }, A()
    }
};
Swiper.prototype = {
    plugins: {},
    wrapperTransitionEnd: function(a, b) {
        "use strict";

        function c() {
            if (a(e), e.params.queueEndCallbacks && (e._queueEndCallbacks = !1), !b)
                for (d = 0; d < g.length; d++) e.h.removeEventListener(f, g[d], c)
        }
        var d, e = this,
            f = e.wrapper,
            g = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"];
        if (a)
            for (d = 0; d < g.length; d++) e.h.addEventListener(f, g[d], c)
    },
    getWrapperTranslate: function(a) {
        "use strict";
        var b, c, d, e, f = this.wrapper;
        return "undefined" == typeof a && (a = "horizontal" === this.params.mode ? "x" : "y"), this.support.transforms && this.params.useCSS3Transforms ? (d = window.getComputedStyle(f, null), window.WebKitCSSMatrix ? e = new WebKitCSSMatrix(d.webkitTransform) : (e = d.MozTransform || d.OTransform || d.MsTransform || d.msTransform || d.transform || d.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), b = e.toString().split(",")), "x" === a && (c = window.WebKitCSSMatrix ? e.m41 : parseFloat(16 === b.length ? b[12] : b[4])), "y" === a && (c = window.WebKitCSSMatrix ? e.m42 : parseFloat(16 === b.length ? b[13] : b[5]))) : ("x" === a && (c = parseFloat(f.style.left, 10) || 0), "y" === a && (c = parseFloat(f.style.top, 10) || 0)), c || 0
    },
    setWrapperTranslate: function(a, b, c) {
        "use strict";
        var d, e = this.wrapper.style,
            f = {
                x: 0,
                y: 0,
                z: 0
            };
        3 === arguments.length ? (f.x = a, f.y = b, f.z = c) : ("undefined" == typeof b && (b = "horizontal" === this.params.mode ? "x" : "y"), f[b] = a), this.support.transforms && this.params.useCSS3Transforms ? (d = this.support.transforms3d ? "translate3d(" + f.x + "px, " + f.y + "px, " + f.z + "px)" : "translate(" + f.x + "px, " + f.y + "px)", e.webkitTransform = e.MsTransform = e.msTransform = e.MozTransform = e.OTransform = e.transform = d) : (e.left = f.x + "px", e.top = f.y + "px"), this.callPlugins("onSetWrapperTransform", f), this.params.onSetWrapperTransform && this.fireCallback(this.params.onSetWrapperTransform, this, f)
    },
    setWrapperTransition: function(a) {
        "use strict";
        var b = this.wrapper.style;
        b.webkitTransitionDuration = b.MsTransitionDuration = b.msTransitionDuration = b.MozTransitionDuration = b.OTransitionDuration = b.transitionDuration = a / 1e3 + "s", this.callPlugins("onSetWrapperTransition", {
            duration: a
        }), this.params.onSetWrapperTransition && this.fireCallback(this.params.onSetWrapperTransition, this, a)
    },
    h: {
        getWidth: function(a, b) {
            "use strict";
            var c = window.getComputedStyle(a, null).getPropertyValue("width"),
                d = parseFloat(c);
            return (isNaN(d) || c.indexOf("%") > 0) && (d = a.offsetWidth - parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-left")) - parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-right"))), b && (d += parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-right"))), d
        },
        getHeight: function(a, b) {
            "use strict";
            if (b) return a.offsetHeight;
            var c = window.getComputedStyle(a, null).getPropertyValue("height"),
                d = parseFloat(c);
            return (isNaN(d) || c.indexOf("%") > 0) && (d = a.offsetHeight - parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-top")) - parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-bottom"))), b && (d += parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-top")) + parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-bottom"))), d
        },
        getOffset: function(a) {
            "use strict";
            var b = a.getBoundingClientRect(),
                c = document.body,
                d = a.clientTop || c.clientTop || 0,
                e = a.clientLeft || c.clientLeft || 0,
                f = window.pageYOffset || a.scrollTop,
                g = window.pageXOffset || a.scrollLeft;
            return document.documentElement && !window.pageYOffset && (f = document.documentElement.scrollTop, g = document.documentElement.scrollLeft), {
                top: b.top + f - d,
                left: b.left + g - e
            }
        },
        windowWidth: function() {
            "use strict";
            return window.innerWidth ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : void 0
        },
        windowHeight: function() {
            "use strict";
            return window.innerHeight ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : void 0
        },
        windowScroll: function() {
            "use strict";
            return "undefined" != typeof pageYOffset ? {
                left: window.pageXOffset,
                top: window.pageYOffset
            } : document.documentElement ? {
                left: document.documentElement.scrollLeft,
                top: document.documentElement.scrollTop
            } : void 0
        },
        addEventListener: function(a, b, c, d) {
            "use strict";
            "undefined" == typeof d && (d = !1), a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
        },
        removeEventListener: function(a, b, c, d) {
            "use strict";
            "undefined" == typeof d && (d = !1), a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
        }
    },
    setTransform: function(a, b) {
        "use strict";
        var c = a.style;
        c.webkitTransform = c.MsTransform = c.msTransform = c.MozTransform = c.OTransform = c.transform = b
    },
    setTranslate: function(a, b) {
        "use strict";
        var c = a.style,
            d = {
                x: b.x || 0,
                y: b.y || 0,
                z: b.z || 0
            },
            e = this.support.transforms3d ? "translate3d(" + d.x + "px," + d.y + "px," + d.z + "px)" : "translate(" + d.x + "px," + d.y + "px)";
        c.webkitTransform = c.MsTransform = c.msTransform = c.MozTransform = c.OTransform = c.transform = e, this.support.transforms || (c.left = d.x + "px", c.top = d.y + "px")
    },
    setTransition: function(a, b) {
        "use strict";
        var c = a.style;
        c.webkitTransitionDuration = c.MsTransitionDuration = c.msTransitionDuration = c.MozTransitionDuration = c.OTransitionDuration = c.transitionDuration = b + "ms"
    },
    support: {
        touch: window.Modernizr && Modernizr.touch === !0 || function() {
            "use strict";
            return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
        }(),
        transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
            "use strict";
            var a = document.createElement("div").style;
            return "webkitPerspective" in a || "MozPerspective" in a || "OPerspective" in a || "MsPerspective" in a || "perspective" in a
        }(),
        transforms: window.Modernizr && Modernizr.csstransforms === !0 || function() {
            "use strict";
            var a = document.createElement("div").style;
            return "transform" in a || "WebkitTransform" in a || "MozTransform" in a || "msTransform" in a || "MsTransform" in a || "OTransform" in a
        }(),
        transitions: window.Modernizr && Modernizr.csstransitions === !0 || function() {
            "use strict";
            var a = document.createElement("div").style;
            return "transition" in a || "WebkitTransition" in a || "MozTransition" in a || "msTransition" in a || "MsTransition" in a || "OTransition" in a
        }()
    },
    browser: {
        ie8: function() {
            "use strict";
            var a = -1;
            if ("Microsoft Internet Explorer" === navigator.appName) {
                var b = navigator.userAgent,
                    c = new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/);
                null !== c.exec(b) && (a = parseFloat(RegExp.$1))
            }
            return -1 !== a && 9 > a
        }(),
        ie10: window.navigator.msPointerEnabled,
        ie11: window.navigator.pointerEnabled
    }
}, (window.jQuery || window.Zepto) && ! function(a) {
    "use strict";
    a.fn.swiper = function(b) {
        var c = new Swiper(a(this)[0], b);
        return a(this).data("swiper", c), c
    }
}(window.jQuery || window.Zepto), "undefined" != typeof module && (module.exports = Swiper), "function" == typeof define && define.amd && define([], function() {
    "use strict";
    return Swiper
});
(function() {
    $(document).ready(function(e) {
        function audio_switch() {
            void 0 != $("#music_audio") && (audio_switch_ikea ? ($("#music_audio")[0].pause(), audio_switch_ikea = !1, $("#music_audio")[0].currentTime = 0, ikea_au.find("span").eq(0).css("display", "none"), ikea_au.find("span").eq(1).css("display", "inline-block")) : (audio_switch_ikea = !0, $("#music_audio")[0].play(), ikea_au.find("span").eq(1).css("display", "none"), ikea_au.find("span").eq(0).css("display", "inline-block")))
        }

        function shareFriend() {
            WeixinJSBridge.invoke("sendAppMessage", {
                appid: appid,
                img_url: imgUrl,
                img_width: "200",
                img_height: "200",
                link: lineLink,
                desc: descContent,
                title: shareTitle
            }, function() {})
        }

        function shareTimeline() {
            WeixinJSBridge.invoke("shareTimeline", {
                img_url: imgUrl,
                img_width: "200",
                img_height: "200",
                link: lineLink,
                desc: descContent,
                title: shareTitle
            }, function() {})
        }

        function shareWeibo() {
            WeixinJSBridge.invoke("shareWeibo", {
                content: descContent,
                url: lineLink
            }, function() {})
        }
        var lineLink = window.location.href;
        $("#loading").hide(), $("body").append('<div id="ikea-audio" class="ikea-audio abs"><div class="music"><p class="music_audio"><span class="abs audio_open"></span><span class="abs audio_close"></span></p><audio id="music_audio" loop="loop" preload="preload"><source src="images/music2.mp3" type="audio/mpeg">\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301HTML5\u97f3\u9891\u683c\u5f0f</audio></div></div>');
        var _height = $(window).height(),
            _width = $(window).width();
        _width = _width > 720 ? 720 : _width, _phoneScale = _width / 640, _targetH = 1008 * _phoneScale, _swiperslide = $(".swiper-slide"), $("#device div").css({
            height: _targetH,
            width: _width
        }), $("#device img").css({
            height: _targetH,
            width: _width
        }), $("#device").css({
            height: _targetH,
            width: _width,
            top: 1008 > _height ? -(1008 * _phoneScale - _height) / 2 : _height
        }), $("div.videocontroller, div.video").css({
            height: "42%",
            width: "80%",
            "margin-left": "10%",
            bottom: "5%",
            left: 0,
            top: "auto"
        }), $("#ikea-audio").css({
            height: .0496 * _targetH,
            width: .0781 * _width
        }), $("#ikea-audio .audio_open").css({
            "background-position": .0781 * -_width
        });
        var yourtime = "2014-03-28";
        yourtime = yourtime.replace(/-/g, "/");
        var nowday = new Date,
            tgday = new Date(Date.parse(yourtime));
        nowday > tgday && ($("#cityMain").attr({
            "data-original": "images/ikea_city_1.jpg"
        }), $("#cityMark").attr({
            "data-original": "images/ikea_city_1.png"
        }));
        var ikea_au = $(".ikea-audio").find(".music"),
            audio_switch_ikea = !0;
        ikea_au.on("click", audio_switch);
        var _videostart = !1;
        $("#videocontroller").on("click", function() {
            audio_switch_ikea && ikea_au.trigger("click"), _videostart = !0, $("#video").delay(800).show().find("video")[0].play()
        }), _swiperslide.find("img.lazy").lazyload({
            threshold: _height,
            skip_invisible: !1
        });
        var mySwiper = new Swiper("#swiper-container", {
            pagination: "",
            loop: !1,
            mode: "vertical",
            grabCursor: !0,
            paginationClickable: !1,
            onSlideChangeStart: function(a) {
                1 == a.activeIndex && $("#music_audio").length > 0 && audio_switch_ikea && $("#music_audio")[0].play(), a.activeIndex < 5 ? $("img.lazy").lazyload({
                    threshold: 2 * _height,
                    skip_invisible: !1
                }) : $("img.lazy").lazyload({
                    threshold: 3 * _height,
                    skip_invisible: !1
                }), _videostart && $("#video").delay(800).hide().find("video")[0].pause()
            },
            onSlideChangeEnd: function(a) {
                var b = a.activeSlide();
                $(b).find("img").removeClass("lazy"), $(b).find(".draw").animate({
                    opacity: 1
                }, 1e3), $(b).find(".info").delay(800).animate({
                    opacity: 1,
                    left: 0
                }, {
                    duration: 1200
                })
            }
        });
        lineLink = lineLink.indexOf("?") > 0 ? lineLink.split("?")[0] : lineLink;
        tmpLineLink = lineLink.substring(0, lineLink.lastIndexOf('/') + 1);
        var imgUrl = tmpLineLink + "/images/icon2.jpg",
            descContent = "\u6cd5\u81ea\u7136\u2022\u4e07\u8c61\u5f52",
            shareTitle = "\u8d22\u5bcc\u2022\u96ea\u5c71\u548c\u9662",
            appid = "";
        document.addEventListener("WeixinJSBridgeReady", function() {
            WeixinJSBridge.on("menu:share:appmessage", function() {
                shareFriend()
            }), WeixinJSBridge.on("menu:share:timeline", function() {
                shareTimeline()
            }), WeixinJSBridge.on("menu:share:weibo", function() {
                shareWeibo()
            })
        }, !1);
    })
})();
