import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { MessageSquare, Plus, Menu, Send, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

import useLogout from '../hook/logout.js'


const SideBar = ({isSidebarOpen}) => {
  const logout = useLogout()
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Tạo tài liệu', to: '/home' },
    { id: 2, title: 'Tạo Collections', to: '/collections' },
    { id: 3, title: 'Tạo Communities', to: '/communities' },
    { id: 4, title: 'Tạo Sub-Communities', to: '/subCommunities' }
  ])

  return (
    <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} h-full transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}>
      <div className="flex-1 overflow-y-auto p-2">
        <div className="text-xs font-semibold text-gray-500 px-3 py-2 uppercase">
          Chức năng
        </div>
        {conversations.map((conv) => (
          <button
            key={conv.id}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition group"
          >
            <div className="flex items-start gap-3">
              <MessageSquare size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {conv.title}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="p-3 border-t border-gray-200">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition border border-red-200"
        >
          <LogOut size={18} />
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </div>
  )
}

export default SideBar