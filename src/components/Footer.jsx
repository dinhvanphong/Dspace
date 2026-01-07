import React from 'react'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'


const Footer = () => {
  return (
    <footer className="bg-[#2D3748] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0052CC] to-[#00B4D8] rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-sm">SC</span>
              </div>
              <div>
                <div className="font-bold text-white">SCEI</div>
                <div className="text-xs text-gray-400">Innovation Center</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Trung tâm Khởi nghiệp & Đổi mới Sáng tạo - Nơi kết nối, hỗ trợ và phát triển hệ sinh thái startup Việt Nam.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Liên kết</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                  Về SCEI
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                  Chương trình
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                  Startup Directory
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                  Sự kiện
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold mb-4">Chương trình</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                  Tăng tốc
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                  Ươm tạo
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                  Coworking Space
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                  Mentorship
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                  Kết nối vốn
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  123 Innovation Street,<br />District 1, TP.HCM
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#FF6B35] flex-shrink-0" />
                <a href="mailto:hello@scei.vn" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                  hello@scei.vn
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#FF6B35] flex-shrink-0" />
                <a href="tel:+84123456789" className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                  +84 123 456 789
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © 2025 SCEI. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-9 h-9 bg-gray-700 hover:bg-[#FF6B35] rounded-full flex items-center justify-center transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 bg-gray-700 hover:bg-[#FF6B35] rounded-full flex items-center justify-center transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 bg-gray-700 hover:bg-[#FF6B35] rounded-full flex items-center justify-center transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 bg-gray-700 hover:bg-[#FF6B35] rounded-full flex items-center justify-center transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer