(() => {
    "use strict";
    function t(e) {
        return (
            (t =
                "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                    ? function (t) {
                          return typeof t;
                      }
                    : function (t) {
                          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                      }),
            t(e)
        );
    }
    function e(e, n) {
        for (var o = 0; o < n.length; o++) {
            var r = n[o];
            (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(
                    e,
                    ((a = r.key),
                    (i = void 0),
                    (i = (function (e, n) {
                        if ("object" !== t(e) || null === e) return e;
                        var o = e[Symbol.toPrimitive];
                        if (void 0 !== o) {
                            var r = o.call(e, "string");
                            if ("object" !== t(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return String(e);
                    })(a)),
                    "symbol" === t(i) ? i : String(i)),
                    r
                );
        }
        var a, i;
    }
    function n(t, e) {
        return (
            (n = Object.setPrototypeOf
                ? Object.setPrototypeOf.bind()
                : function (t, e) {
                      return (t.__proto__ = e), t;
                  }),
            n(t, e)
        );
    }
    function o(t) {
        return (
            (o = Object.setPrototypeOf
                ? Object.getPrototypeOf.bind()
                : function (t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  }),
            o(t)
        );
    }
    function r(t, e, o) {
        return (
            (r = (function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
                } catch (t) {
                    return !1;
                }
            })()
                ? Reflect.construct.bind()
                : function (t, e, o) {
                      var r = [null];
                      r.push.apply(r, e);
                      var a = new (Function.bind.apply(t, r))();
                      return o && n(a, o.prototype), a;
                  }),
            r.apply(null, arguments)
        );
    }
    function a(t) {
        var e = "function" == typeof Map ? new Map() : void 0;
        return (
            (a = function (t) {
                if (
                    null === t ||
                    !(function (t) {
                        try {
                            return -1 !== Function.toString.call(t).indexOf("[native code]");
                        } catch (e) {
                            return "function" == typeof t;
                        }
                    })(t)
                )
                    return t;
                if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
                if (void 0 !== e) {
                    if (e.has(t)) return e.get(t);
                    e.set(t, a);
                }
                function a() {
                    return r(t, arguments, o(this).constructor);
                }
                return (a.prototype = Object.create(t.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } })), n(a, t);
            }),
            a(t)
        );
    }
    function i(e) {
        var n = (function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
            } catch (t) {
                return !1;
            }
        })();
        return function () {
            var r,
                a = o(e);
            if (n) {
                var i = o(this).constructor;
                r = Reflect.construct(a, arguments, i);
            } else r = a.apply(this, arguments);
            return (function (e, n) {
                if (n && ("object" === t(n) || "function" == typeof n)) return n;
                if (void 0 !== n) throw new TypeError("Derived constructors may only return object or undefined");
                return (function (t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t;
                })(e);
            })(this, r);
        };
    }
    var c = (function (t) {
        !(function (t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } })), Object.defineProperty(t, "prototype", { writable: !1 }), e && n(t, e);
        })(c, t);
        var o,
            r,
            a = i(c);
        function c() {
            var t;
            return (
                (function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                })(this, c),
                ((t = a.call(this)).isInitialized = !1),
                t
            );
        }
        return (
            (o = c),
            (r = [
                {
                    key: "connectedCallback",
                    value: function () {
                        var t,
                            e = this;
                        this.isInitialized ||
                            (this.renderInitialHTML(),
                            "cover" == productCardProps.imageObject
                                ? (this.productCardObject = "object-cover")
                                : "contain" == productCardProps.imageObject
                                ? (this.productCardObject = "object-contain")
                                : "fill" == productCardProps.imageObject
                                ? (this.productCardObject = "object-fill")
                                : (this.productCardObject = "object-none"),
                            (this.horizontal = "true" === this.getAttribute("horizontal")),
                            (this.showWishlist = "true" === this.getAttribute("show-wishlist")),
                            (this.isSlider = "true" === this.getAttribute("isSlider")),
                            (this.product = this.product || JSON.parse(this.getAttribute("product"))),
                            (this.random = Math.floor(2112 * Math.random()) + 21),
                            this.product.is_on_sale && (this.discount = ((this.product.regular_price - this.product.sale_price) / this.product.regular_price) * 100 + "%"),
                            this.classList.add("product-block"),
                            (this.id = "product_".concat(this.product.id)),
                            this.product.is_out_of_stock && this.classList.add("is-out"),
                            "ready" === (null === (t = window.app) || void 0 === t ? void 0 : t.status)
                                ? salla.onReady(function () {
                                      salla.config.get("product_card_image_object_fit"), salla.config.get("store.settings.product_title_size"), salla.config.get("theme"), e.renderUpdatedHTML();
                                  })
                                : document.addEventListener("theme::ready", function () {
                                      salla.onReady(function () {
                                          salla.config.get("product_card_image_object_fit"),
                                              salla.config.get("store.settings.product_title_size"),
                                              salla.config.get("theme"),
                                              (e.isDiscounted = 0 != e.product.sale_price),
                                              (e.discountPercentage = 0),
                                              e.isDiscounted &&
                                                  ((e.discountPercentage = 100 * (1 - e.product.sale_price / e.product.regular_price)),
                                                  (e.discountPercentage = (Math.round(100 * e.discountPercentage) / 100).toFixed(0)),
                                                  (e.discountValue = salla.money(e.product.regular_price - e.product.sale_price))),
                                              e.renderUpdatedHTML();
                                      });
                                  }),
                            (this.isInitialized = !0));
                    },
                },
                {
                    key: "renderInitialHTML",
                    value: function () {
                        this.innerHTML =
                            '\n        <div class="rounded-md shadow-lg h-80 lg:h-[28rem] w-full bg-white border border-gray-200 flex flex-col justify-between">\n        <div class="m-4 bg-gray-200 rounded-md h-52 lg:h-64 animate-pulse"></div>\n        <div class="m-4 bg-gray-200 h-6 rounded-md animate-pulse"></div>\n        <div class="m-4 bg-gray-200 h-4 rounded-md animate-pulse"></div>\n        <div class="m-4 bg-gray-200 h-10 rounded-md animate-pulse"></div>\n    </div>\n        ';
                    },
                },
                {
                    key: "renderUpdatedHTML",
                    value: function () {
                        var t;
                        (this.source = salla.config.get("page.slug")),
                            "landing-page" == this.source && ((this.hideAddBtn = !0), (this.showQuantity = !0)),
                            salla.lang.get("pages.products.remained"),
                            salla.lang.get("pages.products.donation_placeholder");
                        var e = salla.lang.get("pages.products.starting_price"),
                            n = (salla.lang.get("pages.products.out_of_stock"), salla.lang.get("pages.products.calories"), Math.random(21, 2121));
                        (this.innerHTML = '\n        <div class="animate-fade animate-duration-1000 relative flex w-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg h-full justify-between">\n        <div class="flex flex-col gap-2 md:gap-4">\n        <a class="relative mx-2 mt-3 flex overflow-hidden rounded-xl aspect-square  product-card-image-'
                            .concat(this.random, '" href="')
                            .concat(this.product.url, '" >\n          <img class=" ')
                            .concat(this.productCardObject, ' w-full" src="')
                            .concat(this.product.image.url, '" alt="')
                            .concat(this.product.image.alt, '" loading="lazy" />\n          ')
                            .concat(
                                this.product.promotion_title && this.isDiscounted
                                    ? '<span class="absolute top-3 right-3"> <span class="bg-primary  rounded-full flex h-10 w-10 items-center justify-center"> <span class="text-white font-normal py-1 text-[12px]">'
                                          .concat(this.discountPercentage, '%-</span></span>  <span class="text-xs w-fit block px-3 font-medium py-1 my-2 bg-gray-100 rounded-md">')
                                          .concat(this.product.promotion_title, " </span> </span>  ")
                                    : this.product.promotion_title
                                    ? '<span class="absolute top-3 right-3">   <span class="text-xs w-fit block px-3 font-thin py-1 my-2 bg-gray-100 rounded-md">'.concat(this.product.promotion_title, " </span>  </span> ")
                                    : this.isDiscounted
                                    ? '<span class="absolute top-3 right-3"> <span class="bg-primary  rounded-full flex h-10 w-10 items-center justify-center"> <span class="text-white font-normal py-1 text-[12px]">'.concat(
                                          this.discountPercentage,
                                          "%-</span></span>   </span>  "
                                      )
                                    : "",
                                '\n          <button id="wishlist-button-'
                            )
                            .concat(this.product.id, "-")
                            .concat(n, '"\n            onclick="app.addToFavourite(\'')
                            .concat(this.product.id, "', '")
                            .concat(
                                n,
                                '\')" type="button"\n            aria-label="Add product to favorites"\n            class="text-primary grow p-2 font-bold rounded-full hover:text-white hover:bg-primary hover:opacity-80 dark:bg-slate-800 shadow-md transition-all active:scale-95 text-sm absolute top-3 left-3">\n\n            <span class="sr-only">Add product to favorites</span>\n            <svg class="w-5 h-5" aria-hidden="true" viewBox="0 0 24 20"\n                xmlns="http://www.w3.org/2000/svg" color="currentColor">\n                <path\n                    d="M3.97914 9.00971L11.8032 16.8338L19.6273 9.00971C20.3191 8.31796 20.7077 7.37975 20.7077 6.40147C20.7077 5.42319 20.3191 4.48498 19.6273 3.79323C19.2848 3.45071 18.8782 3.17901 18.4307 2.99364C17.9831 2.80827 17.5035 2.71286 17.0191 2.71286C16.0408 2.71286 15.1026 3.10148 14.4109 3.79323L11.8032 6.40085L9.19562 3.79446C8.50211 3.11199 7.56702 2.73121 6.59403 2.73506C5.62105 2.7389 4.68899 3.12707 4.0009 3.815C3.31281 4.50293 2.92443 5.43489 2.92035 6.40787C2.91628 7.38086 3.29684 8.31604 3.97914 9.00971ZM10.934 2.05359L11.8032 2.92279L12.6724 2.05359C13.2424 1.47867 13.9202 1.02197 14.6671 0.709729C15.414 0.397484 16.2152 0.235835 17.0247 0.234062C17.8342 0.23229 18.6361 0.390428 19.3843 0.6994C20.1326 1.00837 20.8124 1.46209 21.3848 2.03451C21.9573 2.60693 22.411 3.28677 22.7199 4.03501C23.0289 4.78325 23.1871 5.58514 23.1853 6.39466C23.1835 7.20418 23.0219 8.00538 22.7096 8.75226C22.3974 9.49914 21.9407 10.177 21.3658 10.7469L12.6737 19.4402C12.5595 19.5545 12.4239 19.6452 12.2747 19.7071C12.1254 19.7689 11.9654 19.8008 11.8039 19.8008C11.6423 19.8008 11.4823 19.7689 11.3331 19.7071C11.1838 19.6452 11.0482 19.5545 10.934 19.4402L2.24072 10.7481C1.65799 10.18 1.19385 9.50192 0.875231 8.75307C0.556614 8.00423 0.389862 7.19957 0.384648 6.38577C0.379434 5.57198 0.535861 4.76525 0.844856 4.01238C1.15385 3.25951 1.60926 2.57549 2.18467 2C2.76009 1.42451 3.44404 0.969001 4.19687 0.659899C4.94969 0.350797 5.7564 0.194256 6.57019 0.199355C7.38399 0.204454 8.18867 0.371092 8.93756 0.689603C9.68646 1.00811 10.3646 1.47216 10.9328 2.05481L10.934 2.05359Z"\n                    fill="currentColor" />\n            </svg>\n\n\n        </button>\n       </a>\n       <a href="'
                            )
                            .concat(this.product.url, '" class="px-4">\n                <h5 class="text-lg text-center opacity-95 ')
                            .concat("truncate" == productCardProps.titleLength ? "truncate" : "", " ")
                            .concat("bold" == productCardProps.titleWeight ? "font-semibold" : "font-medium", ' " style=" ')
                            .concat(productCardProps.titleSize ? "font-size: ".concat(productCardProps.titleSize, "px !important ") : "", ' ">')
                            .concat(
                                this.product.name,
                                '</h5>\n            </a>\n       </div>\n        \n        <div class="flex flex-col justify-between h-min">\n            \n            <div class="flex flex-col px-4">\n            <div class="mt-1 mb-3 w-full text-center flex items-center justify-between">\n                <p class="w-full text-center">\n                '
                            )
                            .concat(
                                this.product.is_on_sale
                                    ? '<span class="text-base font-medium text-red-400">'
                                          .concat(salla.money(this.product.sale_price), '</span> <span class="text-gray-400 line-through truncate">')
                                          .concat(salla.money(this.product.regular_price), "</span>")
                                    : this.product.starting_price
                                    ? "".concat(e, '<span class="text-base font-medium">').concat(salla.money(this.product.starting_price), "</span> ")
                                    : '<span class="text-base font-medium">'.concat(salla.money(this.product.price), "</span>"),
                                "\n                </p>\n                \n            </div>\n          \n            <button "
                            )
                            .concat(
                                this.product.is_out_of_stock ? "disabled" : "",
                                ' class="mb-3 flex w-full items-center justify-center rounded-md bg-primary px-2 py-1 text-center text-[14px] font-normal text-white hover:opacity-95 focus:outline-none  hover:text-white " id="addToCart-'
                            )
                            .concat(this.product.id, '" onclick="app.quickAddToCart(\'')
                            .concat(this.product.id, '\')" type="button" aria-label="Add product to cart">\n                    \n                    ')
                            .concat(
                                this.product.is_out_of_stock
                                    ? '<span class="mt-1 ml-2">نفدت الكمية</span> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 48 48"><g fill="currentColor"><path d="M27.707 7.707a1 1 0 0 0-1.414-1.414L24 8.586l-2.293-2.293a1 1 0 1 0-1.414 1.414L22.586 10l-2.293 2.293a1 1 0 0 0 1.414 1.414L24 11.414l2.293 2.293a1 1 0 1 0 1.414-1.415L25.414 10l2.293-2.293Z"/><path fill-rule="evenodd" d="M6.684 26.449L10 27.554V36a1 1 0 0 0 .673.945l12.992 4.497a.99.99 0 0 0 .637.011l.014-.004l.015-.005l12.996-4.499A1 1 0 0 0 38 36v-8.446l3.316-1.105a1 1 0 0 0 .465-1.574l-4-5a1 1 0 0 0-.456-.32l-12.998-4.5a1 1 0 0 0-.654 0l-12.998 4.5a.999.999 0 0 0-.456.32l-4 5a1 1 0 0 0 .465 1.574Zm14.635 4.124l1.681-2.4v10.923l-11-3.808V28.22l8.184 2.728a1 1 0 0 0 1.135-.376ZM14.057 20.5L24 23.942l9.943-3.442L24 17.058L14.057 20.5Zm12.624 10.073L25 28.174v10.923l11-3.808V28.22l-8.184 2.728a1 1 0 0 1-1.135-.376ZM11.34 21.676l-2.663 3.329l5.511 1.837l5.92 1.973l2.313-3.303l-.135-.047l-10.946-3.79Zm27.983 3.329l-2.663-3.33l-11.081 3.837l2.313 3.303l11.431-3.81Z" clip-rule="evenodd"/></g></svg>'
                                    : '<span class="mt-1 ml-2">اضف للسلة</span> <svg id="add-to-cart-icon-'
                                          .concat(this.product.id, '" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 add-to-cart-icon-')
                                          .concat(
                                              this.product.id,
                                              '" viewBox="0 0 24 24" color="currentColor">\n                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\n                        <path d="M3.977 9.84A2 2 0 0 1 5.971 8h12.058a2 2 0 0 1 1.994 1.84l.803 10A2 2 0 0 1 18.833 22H5.167a2 2 0 0 1-1.993-2.16l.803-10Z" />\n                        <path d="M16 11V6a4 4 0 0 0-4-4v0a4 4 0 0 0-4 4v5" />\n                    </g>\n                </svg>\n                <svg id="add-to-cart-loader-'
                                          )
                                          .concat(this.product.id, '" aria-hidden="true" role="status" style="display: none;" class="custom-product-card-loader fill-primary add-to-cart-loader-')
                                          .concat(
                                              this.product.id,
                                              ' h-4 w-4 animate-spin text-gray-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />\n                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" class="fill-primary hover:fill-white" /> \n                </svg>'
                                          ),
                                "\n                    \n            </button>\n            </div>\n        </div>\n      </div>\n      "
                            )
                            .concat(
                                this.isSlider
                                    ? "\n            <style>\n                .product-card-image-"
                                          .concat(this.random, " {\n                    height: ")
                                          .concat(
                                              productCardProps.sliderImagesHeight,
                                              "px !important;\n                    \n                }\n                @media screen and (max-width: 768px) {\n                    .product-card-image-"
                                          )
                                          .concat(this.random, " {\n                        height: ")
                                          .concat(productCardProps.sliderImagesHeightMobile, "px !important;\n                    }\n                }\n            </style>\n      ")
                                    : "\n            <style>\n                .product-card-image-"
                                          .concat(this.random, " {\n                    height: ")
                                          .concat(productCardProps.gridImagesHeight, "px !important;\n                }\n                @media screen and (max-width: 768px) {\n                    .product-card-image-")
                                          .concat(this.random, " {\n                        height: ")
                                          .concat(productCardProps.gridImagesHeightMobile, "px !important;\n                    }\n                }\n            </style>\n      "),
                                "  "
                            )
                            .concat(productCardProps.imageSquared ? "<style>\n      .product-card-image-".concat(this.random, " {\n          height: min-content !important;\n      }\n  </style>") : "", "\n      \n        ")),
                            null === (t = document.lazyLoadInstance) || void 0 === t || t.update(document.querySelectorAll(".product-block__thumb .lazy-load"));
                    },
                },
            ]) && e(o.prototype, r),
            Object.defineProperty(o, "prototype", { writable: !1 }),
            c
        );
    })(a(HTMLElement));
    customElements.define("custom-salla-product-card", c);
    
custom-salla-product-card
})();
