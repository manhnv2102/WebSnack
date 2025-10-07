// Header.jsx
import React, { useState } from "react";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Giả lập dữ liệu - thay bằng Context thật
  const cartItemsCount = 3;
  const isAuthenticated = false;
  const userName = "Nguyễn Văn A";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    // Xử lý logout
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer"
          >
            <img
              src="/logoSnack.png"
              alt="Ăn Vặt Now"
              className="w-16 h-16 object-contain"
            />
            <span className="ml-2 text-xl font-bold text-orange-600 hidden sm:block">
              Ăn Vặt Now
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Trang chủ
            </a>
            <a
              href="/products"
              className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Sản phẩm
            </a>
            {isAuthenticated && (
              <a
                href="/orders"
                className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Đơn hàng
              </a>
            )}
            <a
              href="/about"
              className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Giới thiệu
            </a>
            <a
              href="/contact"
              className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Liên hệ
            </a>
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop */}
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2"
            >
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm món ăn..."
                className="bg-transparent outline-none text-sm w-48"
              />
            </form>

            <div className="flex items-center justify-between gap-5">
              {/* Cart */}
              <button
                onClick={() => navigate("/cart")}
                className="p-2 text-gray-600 hover:text-orange-600 relative transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* User */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-gray-700">
                    Xin chào, <span className="font-semibold">{userName}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
                    title="Đăng xuất"
                  >
                    <User className="h-6 w-6" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="hidden md:flex items-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full font-medium transition-colors"
                >
                  <User className="h-5 w-5 mr-2" />
                  Đăng nhập
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-orange-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4"
            >
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm món ăn..."
                className="bg-transparent outline-none text-sm w-full"
              />
            </form>

            <nav className="flex flex-col space-y-2">
              <a
                href="/"
                className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium"
              >
                Trang chủ
              </a>
              <a
                href="/products"
                className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium"
              >
                Sản phẩm
              </a>
              {isAuthenticated && (
                <a
                  href="/orders"
                  className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium"
                >
                  Đơn hàng
                </a>
              )}
              <a
                href="/about"
                className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium"
              >
                Giới thiệu
              </a>
              <a
                href="/contact"
                className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium"
              >
                Liên hệ
              </a>

              {isAuthenticated ? (
                <div className="border-t border-gray-200 pt-2">
                  <div className="px-3 py-2 text-sm text-gray-700">
                    Xin chào, <span className="font-semibold">{userName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full font-medium transition-colors mt-2"
                >
                  Đăng nhập
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
