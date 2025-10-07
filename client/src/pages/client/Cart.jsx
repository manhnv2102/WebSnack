import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CartPage = () => {
  const navigate = useNavigate();

  // Giả lập dữ liệu giỏ hàng - thay bằng Context/Redux thực tế
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Bánh tráng trộn",
      price: 25000,
      image: "/products/banhtrang.jpg",
      quantity: 2,
      maxQuantity: 10,
    },
    {
      id: 2,
      name: "Xúc xích que",
      price: 15000,
      image: "/products/xucxich.jpg",
      quantity: 1,
      maxQuantity: 20,
    },
    {
      id: 3,
      name: "Chân gà sả tắc",
      price: 35000,
      image: "/products/changa.jpg",
      quantity: 3,
      maxQuantity: 15,
    },
  ]);

  const [selectedItems, setSelectedItems] = useState(
    cartItems.map((item) => item.id)
  );
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Tính toán
  const calculateSubtotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const shippingFee = 15000;
  const subtotal = calculateSubtotal();
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal + shippingFee - discountAmount;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Handlers
  const handleQuantityChange = (id, newQuantity) => {
    const item = cartItems.find((i) => i.id === id);
    if (newQuantity < 1 || newQuantity > item.maxQuantity) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      setCartItems(cartItems.filter((item) => item.id !== id));
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const handleApplyPromoCode = () => {
    // Giả lập áp dụng mã giảm giá
    const validCodes = {
      ANVATNOW10: 10,
      SALE20: 20,
      GIAMGIA15: 15,
    };

    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()]);
      alert(
        `Áp dụng mã giảm giá thành công! Giảm ${
          validCodes[promoCode.toUpperCase()]
        }%`
      );
    } else {
      alert("Mã giảm giá không hợp lệ!");
    }
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }
    // Chuyển đến trang thanh toán
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="text-sm">
              <a href="/" className="text-gray-500 hover:text-orange-600">
                Trang chủ
              </a>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Giỏ hàng</span>
            </nav>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Giỏ hàng của bạn
            </h1>
            <button
              onClick={() => navigate("/products")}
              className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Tiếp tục mua sắm
            </button>
          </div>

          {cartItems.length === 0 ? (
            // Empty Cart
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Giỏ hàng trống
              </h2>
              <p className="text-gray-600 mb-6">
                Bạn chưa có sản phẩm nào trong giỏ hàng
              </p>
              <button
                onClick={() => navigate("/products")}
                className="bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-700 font-medium"
              >
                Khám phá sản phẩm
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm">
                  {/* Select All Header */}
                  <div className="p-4 border-b border-gray-200">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === cartItems.length}
                        onChange={handleSelectAll}
                        className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        Chọn tất cả ({cartItems.length} sản phẩm)
                      </span>
                    </label>
                  </div>

                  {/* Cart Items List */}
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start">
                          {/* Checkbox */}
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            className="mt-1 w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                          />

                          {/* Product Image */}
                          <div
                            onClick={() => navigate(`/products/${item.id}`)}
                            className="ml-4 w-24 h-24 flex-shrink-0 cursor-pointer"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                e.target.src = "/logoSnack.png";
                              }}
                            />
                          </div>

                          {/* Product Info */}
                          <div className="ml-4 flex-1">
                            <h3
                              onClick={() => navigate(`/products/${item.id}`)}
                              className="font-semibold text-gray-900 hover:text-orange-600 cursor-pointer"
                            >
                              {item.name}
                            </h3>
                            <p className="text-lg font-bold text-orange-600 mt-1">
                              {formatPrice(item.price)}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center mt-3 space-x-4">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                  disabled={item.quantity >= item.maxQuantity}
                                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>

                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-red-600 hover:text-red-700 p-2"
                                title="Xóa sản phẩm"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>

                            <p className="text-sm text-gray-500 mt-2">
                              Còn lại: {item.maxQuantity} sản phẩm
                            </p>
                          </div>

                          {/* Item Total */}
                          <div className="ml-4 text-right">
                            <p className="text-sm text-gray-500 mb-1">Tổng</p>
                            <p className="text-xl font-bold text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Tổng đơn hàng</h2>

                  {/* Promo Code */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mã giảm giá
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) =>
                          setPromoCode(e.target.value.toUpperCase())
                        }
                        placeholder="Nhập mã giảm giá"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <button
                        onClick={handleApplyPromoCode}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                      >
                        Áp dụng
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Gợi ý: ANVATNOW10, SALE20, GIAMGIA15
                    </p>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex justify-between text-gray-700">
                      <span>Tạm tính ({selectedItems.length} sản phẩm)</span>
                      <span className="font-medium">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Phí vận chuyển</span>
                      <span className="font-medium">
                        {formatPrice(shippingFee)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Giảm giá ({discount}%)</span>
                        <span className="font-medium">
                          -{formatPrice(discountAmount)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold text-gray-900">
                      Tổng cộng
                    </span>
                    <span className="text-2xl font-bold text-orange-600">
                      {formatPrice(total)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={selectedItems.length === 0}
                    className="w-full bg-orange-600 text-white py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Tiến hành thanh toán
                  </button>

                  {/* Additional Info */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      ✓ Miễn phí vận chuyển cho đơn hàng từ 200.000đ
                    </p>
                    <p className="text-sm text-blue-800 mt-1">
                      ✓ Đảm bảo hoàn tiền 100% nếu có vấn đề
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Suggested Products */}
          {cartItems.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Có thể bạn cũng thích</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    id: 5,
                    name: "Khoai tây chiên",
                    price: 18000,
                    image: "/products/khoaitay.jpg",
                  },
                  {
                    id: 6,
                    name: "Trà sữa trân châu",
                    price: 30000,
                    image: "/products/trasua.jpg",
                  },
                  {
                    id: 7,
                    name: "Bánh bông lan",
                    price: 35000,
                    image: "/products/banhbonglan.jpg",
                  },
                  {
                    id: 8,
                    name: "Nem chua rán",
                    price: 28000,
                    image: "/products/nemchua.jpg",
                  },
                ].map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="h-40 bg-gray-200">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/logoSnack.png";
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-orange-600 font-bold">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
