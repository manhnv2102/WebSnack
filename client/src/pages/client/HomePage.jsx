import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, TrendingUp, Package, Clock } from "lucide-react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sản phẩm nổi bật
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/products/featured"
        );
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Dữ liệu mẫu nếu API lỗi
        setFeaturedProducts([
          {
            id: 1,
            name: "Bánh tráng trộn",
            price: 25000,
            image: "/products/banhtrang.jpg",
            rating: 4.8,
            sold: 150,
          },
          {
            id: 2,
            name: "Xúc xích que",
            price: 15000,
            image: "/products/xucxich.jpg",
            rating: 4.5,
            sold: 200,
          },
          {
            id: 3,
            name: "Chân gà sả tắc",
            price: 35000,
            image: "/products/changa.jpg",
            rating: 4.9,
            sold: 180,
          },
          {
            id: 4,
            name: "Mực nướng",
            price: 45000,
            image: "/products/mucnuong.jpg",
            rating: 4.7,
            sold: 120,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    { id: 1, name: "Đồ chiên", icon: "🍟", color: "bg-yellow-100" },
    { id: 2, name: "Đồ nướng", icon: "🍖", color: "bg-red-100" },
    { id: 3, name: "Đồ trộn", icon: "🥗", color: "bg-green-100" },
    { id: 4, name: "Đồ uống", icon: "🥤", color: "bg-blue-100" },
    { id: 5, name: "Bánh kẹo", icon: "🍬", color: "bg-pink-100" },
    { id: 6, name: "Khác", icon: "🍱", color: "bg-purple-100" },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-500 to-green-500 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Đồ Ăn Vặt Ngon - Giao Nhanh Tận Nơi
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Thưởng thức hàng trăm món ăn vặt đa dạng, tươi ngon
              </p>
              <button
                onClick={() => navigate("/products")}
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Đặt hàng ngay
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="inline-block p-4 bg-orange-100 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Giao hàng nhanh</h3>
                <p className="text-gray-600">Giao trong vòng 30 phút</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="inline-block p-4 bg-orange-100 rounded-full mb-4">
                  <Package className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Đóng gói cẩn thận
                </h3>
                <p className="text-gray-600">Đảm bảo vệ sinh an toàn</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="inline-block p-4 bg-orange-100 rounded-full mb-4">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ưu đãi hấp dẫn</h3>
                <p className="text-gray-600">Giảm giá mỗi ngày</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Danh mục sản phẩm
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => navigate(`/products?category=${category.id}`)}
                  className={`${category.color} p-6 rounded-lg text-center hover:shadow-lg transition-all transform hover:scale-105`}
                >
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <div className="font-semibold text-gray-800">
                    {category.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Sản phẩm nổi bật</h2>
              <button
                onClick={() => navigate("/products")}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Xem tất cả →
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-48 bg-gray-200">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/logoSnack.png";
                        }}
                      />
                      <span className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                        Hot
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">
                          {product.rating} ({product.sold} đã bán)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-orange-600">
                          {formatPrice(product.price)}
                        </span>
                        <button className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-colors">
                          Thêm
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Khách hàng nói gì về chúng tôi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Nguyễn Văn A",
                  comment:
                    "Đồ ăn rất ngon, giao hàng nhanh. Sẽ ủng hộ lâu dài!",
                  rating: 5,
                },
                {
                  name: "Trần Thị B",
                  comment: "Giá cả hợp lý, chất lượng tuyệt vời. Rất hài lòng!",
                  rating: 5,
                },
                {
                  name: "Lê Văn C",
                  comment:
                    "Đóng gói cẩn thận, món ăn còn nóng khi nhận. Tuyệt!",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <p className="font-semibold">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
