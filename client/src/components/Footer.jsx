// Footer.jsx
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/logoSnack.png"
                alt="logo"
                className="w-12 h-12 object-contain"
              />
              <h4 className="text-2xl font-bold ml-2 text-orange-400">
                Ăn Vặt Now
              </h4>
            </div>
            <p className="text-gray-300 mb-3 leading-relaxed">
              Chuyên cung cấp đồ ăn vặt đa dạng, tươi ngon, đảm bảo vệ sinh an
              toàn thực phẩm.
            </p>
            <p className="text-gray-300 mb-3 leading-relaxed">
              Mang đến trải nghiệm mua sắm trọn vẹn và tiện lợi cho khách hàng.
            </p>
            <p className="text-gray-300 font-semibold">
              Hãy đến với chúng tôi và thưởng thức ngay!
            </p>
          </div>

          {/* Support Links */}
          <div>
            <h5 className="font-semibold text-lg mb-4 text-orange-400">
              Hỗ trợ khách hàng
            </h5>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a
                  href="/guide"
                  className="hover:text-orange-400 transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> Hướng dẫn đặt hàng
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:text-orange-400 transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a
                  href="/policy"
                  className="hover:text-orange-400 transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> Chính sách đổi trả
                </a>
              </li>
              <li>
                <a
                  href="/feedback"
                  className="hover:text-orange-400 transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> Góp ý khiếu nại
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-semibold text-lg mb-4 text-orange-400">
              Liên hệ
            </h5>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-orange-400" />
                <div>
                  <p className="font-semibold">Hotline</p>
                  <a
                    href="tel:0394170850"
                    className="hover:text-orange-400 transition-colors"
                  >
                    0394 170 850
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-orange-400" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a
                    href="mailto:anvatNow@gmail.com"
                    className="hover:text-orange-400 transition-colors"
                  >
                    anvatNow@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-orange-400" />
                <div>
                  <p className="font-semibold">Địa chỉ</p>
                  <p>Hà Nội, Việt Nam</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4">
                <p className="font-semibold mb-3">Kết nối với chúng tôi</p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-400 transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-400 transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="mailto:anvatNow@gmail.com"
                    className="hover:text-orange-400 transition-colors"
                  >
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2025 Ăn Vặt Now. Tất cả quyền được bảo lưu.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="/terms"
                className="hover:text-orange-400 transition-colors"
              >
                Điều khoản sử dụng
              </a>
              <span>|</span>
              <a
                href="/privacy"
                className="hover:text-orange-400 transition-colors"
              >
                Chính sách bảo mật
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
