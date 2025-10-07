import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Star, Filter, X, ChevronDown } from "lucide-react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const categories = [
    { id: "all", name: "Tất cả", icon: "🍱" },
    { id: 1, name: "Đồ chiên", icon: "🍟" },
    { id: 2, name: "Đồ nướng", icon: "🍖" },
    { id: 3, name: "Đồ trộn", icon: "🥗" },
    { id: 4, name: "Đồ uống", icon: "🥤" },
    { id: 5, name: "Bánh kẹo", icon: "🍬" },
    { id: 6, name: "Khác", icon: "🎁" },
  ];

  const priceRanges = [
    { id: "all", label: "Tất cả mức giá" },
    { id: "under20", label: "Dưới 20.000đ", min: 0, max: 20000 },
    { id: "20to50", label: "20.000đ - 50.000đ", min: 20000, max: 50000 },
    { id: "50to100", label: "50.000đ - 100.000đ", min: 50000, max: 100000 },
    { id: "over100", label: "Trên 100.000đ", min: 100000, max: Infinity },
  ];

  const sortOptions = [
    { id: "default", label: "Mặc định" },
    { id: "price-asc", label: "Giá tăng dần" },
    { id: "price-desc", label: "Giá giảm dần" },
    { id: "name-asc", label: "Tên A-Z" },
    { id: "rating-desc", label: "Đánh giá cao nhất" },
    { id: "sold-desc", label: "Bán chạy nhất" },
  ];

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/products", {
          params: {
            category: selectedCategory !== "all" ? selectedCategory : undefined,
            search: searchQuery || undefined,
            priceRange: priceRange !== "all" ? priceRange : undefined,
            sort: sortBy !== "default" ? sortBy : undefined,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Dữ liệu mẫu
        setProducts([
          {
            id: 1,
            name: "Bánh tráng trộn",
            price: 25000,
            image: "/products/banhtrang.jpg",
            rating: 4.8,
            sold: 150,
            category: 3,
          },
          {
            id: 2,
            name: "Xúc xích que",
            price: 15000,
            image: "/products/xucxich.jpg",
            rating: 4.5,
            sold: 200,
            category: 1,
          },
          {
            id: 3,
            name: "Chân gà sả tắc",
            price: 35000,
            image: "/products/changa.jpg",
            rating: 4.9,
            sold: 180,
            category: 2,
          },
          {
            id: 4,
            name: "Mực nướng",
            price: 45000,
            image: "/products/mucnuong.jpg",
            rating: 4.7,
            sold: 120,
            category: 2,
          },
          {
            id: 5,
            name: "Khoai tây chiên",
            price: 18000,
            image: "/products/khoaitay.jpg",
            rating: 4.6,
            sold: 300,
            category: 1,
          },
          {
            id: 6,
            name: "Trà sữa trân châu",
            price: 30000,
            image: "/products/trasua.jpg",
            rating: 4.8,
            sold: 250,
            category: 4,
          },
          {
            id: 7,
            name: "Bánh bông lan trứng muối",
            price: 35000,
            image: "/products/banhbonglan.jpg",
            rating: 4.7,
            sold: 180,
            category: 5,
          },
          {
            id: 8,
            name: "Nem chua rán",
            price: 28000,
            image: "/products/nemchua.jpg",
            rating: 4.5,
            sold: 160,
            category: 1,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, priceRange, sortBy, searchQuery]);

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category === parseInt(selectedCategory)
      );
    }

    // Filter by price range
    if (priceRange !== "all") {
      const range = priceRanges.find((r) => r.id === priceRange);
      if (range) {
        filtered = filtered.filter(
          (p) => p.price >= range.min && p.price < range.max
        );
      }
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating-desc":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "sold-desc":
        filtered.sort((a, b) => b.sold - a.sold);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    // Xử lý thêm vào giỏ hàng
    console.log("Add to cart:", product);
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setPriceRange("all");
    setSortBy("default");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="text-sm">
              <a href="/" className="text-gray-500 hover:text-orange-600">
                Trang chủ
              </a>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Sản phẩm</span>
            </nav>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tất cả sản phẩm
            </h1>
            <p className="text-gray-600">
              Khám phá {filteredProducts.length} món ăn vặt ngon
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Bộ lọc</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-orange-600 hover:text-orange-700"
                  >
                    Xóa tất cả
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-900">Danh mục</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() =>
                          setSelectedCategory(category.id.toString())
                        }
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                          selectedCategory === category.id.toString()
                            ? "bg-orange-100 text-orange-600 font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-900">Khoảng giá</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label
                        key={range.id}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="priceRange"
                          checked={priceRange === range.id}
                          onChange={() => setPriceRange(range.id)}
                          className="mr-2 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="font-medium mb-3 text-gray-900">Sắp xếp</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setShowFilterMenu(true)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center text-gray-700 hover:bg-gray-50"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Bộ lọc & Sắp xếp
                </button>
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                  <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg">
                    Không tìm thấy sản phẩm nào
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
                    >
                      <div className="relative h-56 bg-gray-200 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "/logoSnack.png";
                          }}
                        />
                        {product.sold > 150 && (
                          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Hot
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center mb-3">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">
                            {product.rating}
                          </span>
                          <span className="mx-2 text-gray-300">|</span>
                          <span className="text-sm text-gray-600">
                            Đã bán {product.sold}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-orange-600">
                            {formatPrice(product.price)}
                          </span>
                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-colors text-sm font-medium"
                          >
                            Thêm vào giỏ
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Menu */}
        {showFilterMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-lg">Bộ lọc</h3>
                  <button
                    onClick={() => setShowFilterMenu(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Same filter content as desktop sidebar */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-900">Danh mục</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id.toString());
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                          selectedCategory === category.id.toString()
                            ? "bg-orange-100 text-orange-600 font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-900">Khoảng giá</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label
                        key={range.id}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="priceRangeMobile"
                          checked={priceRange === range.id}
                          onChange={() => setPriceRange(range.id)}
                          className="mr-2 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-900">Sắp xếp</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={clearFilters}
                    className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50"
                  >
                    Xóa bộ lọc
                  </button>
                  <button
                    onClick={() => setShowFilterMenu(false)}
                    className="flex-1 bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
