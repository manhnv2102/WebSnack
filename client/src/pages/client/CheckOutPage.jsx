import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  Wallet,
  Truck,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
} from "lucide-react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CheckoutPage = () => {
  const navigate = useNavigate();

  // Giả lập dữ liệu giỏ hàng - thay bằng Context/Redux thực tế
  const [cartItems] = useState([
    {
      id: 1,
      name: "Bánh tráng trộn",
      price: 25000,
      image: "/products/banhtrang.jpg",
      quantity: 2,
    },
    {
      id: 3,
      name: "Chân gà sả tắc",
      price: 35000,
      image: "/products/changa.jpg",
      quantity: 3,
    },
  ]);

  // Form states
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    ward: "",
    district: "",
    city: "Hà Nội",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [note, setNote] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Tính toán
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFees = {
    standard: 15000,
    fast: 25000,
    express: 35000,
  };
  const deliveryFee = deliveryFees[deliveryMethod];
  const total = subtotal + deliveryFee;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!deliveryInfo.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    }

    if (!deliveryInfo.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10}$/.test(deliveryInfo.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (
      deliveryInfo.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deliveryInfo.email)
    ) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!deliveryInfo.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    if (!deliveryInfo.ward.trim()) {
      newErrors.ward = "Vui lòng nhập phường/xã";
    }

    if (!deliveryInfo.district.trim()) {
      newErrors.district = "Vui lòng nhập quận/huyện";
    }

    if (!agreeTerms) {
      newErrors.terms = "Vui lòng đồng ý với điều khoản";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);

    try {
      // Gọi API tạo đơn hàng
      const response = await axios.post("http://localhost:8080/api/orders", {
        items: cartItems,
        deliveryInfo,
        paymentMethod,
        deliveryMethod,
        note,
        subtotal,
        deliveryFee,
        total,
      });

      console.log("Order created:", response.data);

      // Chuyển đến trang thành công
      navigate("/order-success", {
        state: { orderId: response.data.orderId },
      });
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setDeliveryInfo({ ...deliveryInfo, [field]: value });
    // Xóa lỗi khi người dùng nhập
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
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
              <a href="/cart" className="text-gray-500 hover:text-orange-600">
                Giỏ hàng
              </a>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Thanh toán</span>
            </nav>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Thanh toán đơn hàng
            </h1>
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Quay lại giỏ hàng
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Delivery Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-6 w-6 text-orange-600 mr-2" />
                    <h2 className="text-xl font-semibold">
                      Thông tin giao hàng
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={deliveryInfo.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Nhập họ và tên"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={deliveryInfo.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="0123456789"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email (tùy chọn)
                      </label>
                      <input
                        type="email"
                        value={deliveryInfo.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Địa chỉ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={deliveryInfo.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          errors.address ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Số nhà, tên đường"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phường/Xã <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={deliveryInfo.ward}
                          onChange={(e) =>
                            handleInputChange("ward", e.target.value)
                          }
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                            errors.ward ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Phường/Xã"
                        />
                        {errors.ward && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.ward}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quận/Huyện <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={deliveryInfo.district}
                          onChange={(e) =>
                            handleInputChange("district", e.target.value)
                          }
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                            errors.district
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Quận/Huyện"
                        />
                        {errors.district && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.district}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tỉnh/Thành phố
                        </label>
                        <input
                          type="text"
                          value={deliveryInfo.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ghi chú (tùy chọn)
                      </label>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Ghi chú cho đơn hàng (ví dụ: giao giờ hành chính)"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Method */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <Truck className="h-6 w-6 text-orange-600 mr-2" />
                    <h2 className="text-xl font-semibold">
                      Phương thức vận chuyển
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                      <input
                        type="radio"
                        name="delivery"
                        value="standard"
                        checked={deliveryMethod === "standard"}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="mt-1 text-orange-600 focus:ring-orange-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">
                              Giao hàng tiêu chuẩn
                            </p>
                            <p className="text-sm text-gray-500">
                              Giao trong 60-90 phút
                            </p>
                          </div>
                          <p className="font-bold text-orange-600">
                            {formatPrice(15000)}
                          </p>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                      <input
                        type="radio"
                        name="delivery"
                        value="fast"
                        checked={deliveryMethod === "fast"}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="mt-1 text-orange-600 focus:ring-orange-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">
                              Giao hàng nhanh
                            </p>
                            <p className="text-sm text-gray-500">
                              Giao trong 30-45 phút
                            </p>
                          </div>
                          <p className="font-bold text-orange-600">
                            {formatPrice(25000)}
                          </p>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                      <input
                        type="radio"
                        name="delivery"
                        value="express"
                        checked={deliveryMethod === "express"}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="mt-1 text-orange-600 focus:ring-orange-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">
                              Giao hàng hỏa tốc
                            </p>
                            <p className="text-sm text-gray-500">
                              Giao trong 15-20 phút
                            </p>
                          </div>
                          <p className="font-bold text-orange-600">
                            {formatPrice(35000)}
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <CreditCard className="h-6 w-6 text-orange-600 mr-2" />
                    <h2 className="text-xl font-semibold">
                      Phương thức thanh toán
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 text-orange-600 focus:ring-orange-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center">
                          <Wallet className="h-5 w-5 text-gray-600 mr-2" />
                          <div>
                            <p className="font-medium text-gray-900">
                              Thanh toán khi nhận hàng (COD)
                            </p>
                            <p className="text-sm text-gray-500">
                              Thanh toán bằng tiền mặt khi nhận hàng
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 text-orange-600 focus:ring-orange-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 text-gray-600 mr-2" />
                          <div>
                            <p className="font-medium text-gray-900">
                              Chuyển khoản ngân hàng
                            </p>
                            <p className="text-sm text-gray-500">
                              Chuyển khoản qua QR Code hoặc số tài khoản
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-500 transition-colors opacity-50">
                      <input
                        type="radio"
                        name="payment"
                        value="momo"
                        disabled
                        className="mt-1 text-orange-600 focus:ring-orange-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center">
                          <Wallet className="h-5 w-5 text-gray-600 mr-2" />
                          <div>
                            <p className="font-medium text-gray-900">Ví MoMo</p>
                            <p className="text-sm text-gray-500">
                              Đang cập nhật...
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">
                    Đơn hàng của bạn
                  </h2>

                  {/* Products List */}
                  <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start">
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "/logoSnack.png";
                            }}
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            x{item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Price Summary */}
                  <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex justify-between text-gray-700">
                      <span>Tạm tính</span>
                      <span className="font-medium">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Phí vận chuyển</span>
                      <span className="font-medium">
                        {formatPrice(deliveryFee)}
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold">Tổng cộng</span>
                    <span className="text-2xl font-bold text-orange-600">
                      {formatPrice(total)}
                    </span>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="mb-4">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => {
                          setAgreeTerms(e.target.checked);
                          if (e.target.checked && errors.terms) {
                            setErrors({ ...errors, terms: "" });
                          }
                        }}
                        className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Tôi đã đọc và đồng ý với{" "}
                        <a
                          href="/terms"
                          className="text-orange-600 hover:underline"
                        >
                          điều khoản và điều kiện
                        </a>
                      </span>
                    </label>
                    {errors.terms && (
                      <p className="text-red-500 text-sm mt-1 ml-6">
                        {errors.terms}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-600 text-white py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Đặt hàng
                      </>
                    )}
                  </button>

                  {/* Security Note */}
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-green-800">
                        Thông tin của bạn được bảo mật và an toàn
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
