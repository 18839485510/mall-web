(function(w, d) {
    var page = {
        init: function() {
            this.cartCount = d.querySelector('.cart-count')
            this.cartBox = d.querySelector('.cart-box')
            this.cartContent = d.querySelector('.cart-content')
            this.handleCart()
        },
        loadCartsCount: function() {
            var _this = this
            utils.ajax({
                url: '/carts/count',
                success: function(data) {
                    _this.cartCount.innerHTML = data.data
                }
            })
        },
        handleCart: function() {
            var _this = this
            this.loadCartsCount()
            this.cartBox.onmouseenter = function() {
                utils.show(_this.cartContent)
                _this.cartContent.innerHTML = '<div class="loader"></div>'
                utils.ajax({
                    url: '/carts',
                    success: function(data) {
                        if (data.code == 0) {
                            _this.renderCart(data.data.cartList)
                        } else {
                            _this.cartContent.innerHTML = '<span class="empty-cart">获取购物车失败，请稍后重试！</span>'
                        }

                    },
                    error: function() {
                        _this.cartContent.innerHTML = '<span class="empty-cart">获取购物车失败，请稍后重试！</span>'
                    }
                })
            }
            this.cartBox.onmouseleave = function() {
                utils.hide(_this.cartContent)
            }
        },
        // <span class="cart-tip" > 最近加入的宝贝</span>
        // <ul>
        //     <li class="cart-item clearfix">
        //         <a href="#" target="_blank">
        //             <img src="" alt="">
        //             <span class="text-ellipsis">商品名称</span>
        //         </a>
        //         <span class="product-count">x 9 </span><span class="product-price">1719</span>
        //     </li>
        // </ul>
        // <span class="line"></span>
        // <a href="/cart.html" class="btn cart-btn">查看我的购物车</a>
        renderCart: function(list) {
            var len = list.length
            if (len > 0) {
                var html = ''
                html += '<span class="cart-tip" > 最近加入的宝贝</span>'
                html += '<ul>'
                for (var i = 0; i < len; i++) {
                    html += '<li class="cart-item clearfix">'
                    html += '<a href="#" target="_blank">'
                    html += '<img src="' + list[i].product.mainImage + '" alt="">'
                    html += '<span class="text-ellipsis">' + list[i].product.name + '</span>'
                    html += '</a>'
                    html += '<span class="product-count">x ' + list[i].count + ' </span><span class="product-price">' + list[i].product.price + '</span>'
                    html += '</li>'
                }
                html += '</ul>'
                html += '<span class="line"></span>'
                html += '<a href="/cart.html" class="btn cart-btn">查看我的购物车</a>'
                this.cartContent.innerHTML = html
            } else {
                this.cartContent.innerHTML = '<span class="empty-cart">购物车中还没有商品,赶紧来购买吧!</span>'
            }
        }
    }
    page.init()
})(window, document)