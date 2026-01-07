import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useOutletContext } from 'react-router-dom'
import { MessageSquare, Plus, Menu, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { use } from 'react';

const Home = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useOutletContext()
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [loading, setLoading] = useState(true)
  const [idCommunities, setIdCommunities] = useState(null)
  const [idCollection, setIdCollection] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const [dataCommunities, setDataCommunities] = useState([])
  const [dataCollections, setDataCollections] = useState(null)


  const handleCommunitiesChange = (e) => {
    setIdCommunities(e.target.value);
    setIdCollection(null);
    // setSelectedWard('');
  };

  const handleCollectionsChange = (e) => {
    setIdCollection(e.target.value);
    // setSelectedWard('');
  };

  useEffect(() => {
    const getCommunities = async () => {
      try {
        const res = await axios.get('/rest/communities', {
          withCredentials: true // 🔥 BẮT BUỘC
        })
        console.log(res.data)
        setDataCommunities(res.data)
      } catch (error) {
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
    getCommunities()
  }, []);

  useEffect(() => {
    if (!idCommunities) return
    const getCollections = async () => {
      try {
        const res = await axios.get(`/rest/communities/${idCommunities}/collections`, {
          withCredentials: true // 🔥 BẮT BUỘC
        })
        console.log(res.data)
        setDataCollections(res.data)
      } catch (error) {
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
    getCollections()
  }, [idCommunities]);

  return (
    <div className="flex h-screen bg-gray-50 w-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between cursor-pointer w-fit" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
          <div className="text-sm font-medium text-gray-700">
            Dspace
          </div>
          <div className="w-10"></div>
        </div>
        <div>Tạo tài liệu</div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-row overflow-y-auto">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="min-w-full mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 w-[100%]">
                {/* Communities */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Communities <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={idCommunities}
                    onChange={handleCommunitiesChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    <option value="">-- Chọn Communities --</option>
                    {dataCommunities.map((item) => (
                      <option key={item.uuid} value={item.uuid}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Collections */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Collections <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={idCollection}
                    onChange={handleCollectionsChange}
                    disabled={!idCommunities}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">-- Chọn Collections --</option>
                    {dataCommunities &&
                      dataCollections?.map((item) => (
                        <option key={item.uuid} value={item.uuid}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Hiển thị kết quả */}
                {idCommunities && idCollection && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Bộ sưu tập bạn chọn để tạo tài liệu:</h3>
                    <p className="text-blue-800">
                      {dataCommunities?.find(w => w.uuid == idCommunities)?.name} {' -> '}
                      {dataCollections?.find(d => d.uuid == idCollection)?.name} {' '}
                      {/* {provinces.find(p => p.id == selectedProvince)?.name} */}
                    </p>
                  </div>
                )}

                {/* Nút xác nhận */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setIdCommunities(null);
                      setIdCollection(null);
                      // setSelectedWard('');
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Đặt lại
                  </button>
                  <button
                    disabled={!idCommunities || !idCollection}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Tạo tài liệu
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="min-w-full mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 w-[100%]">
                {/* Communities */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Communities đã chọn <span className="text-red-500">*</span>
                  </label>
                  <input
                    disabled
                    value={
                      dataCommunities?.find(w => w.uuid === idCommunities)?.name || 'Bạn chưa chọn Communities'
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Collections */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Collections đã chọn <span className="text-red-500">*</span>
                  </label>
                  <input
                    disabled
                    value={
                      dataCollections?.find(d => d.uuid === idCollection)?.name || 'Bạn chưa chọn Collections'
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                {/* Upload file */}
                <div>
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      setSelectedFile(file)
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer"
                  />

                  {selectedFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: <span className="font-medium">{selectedFile.name}</span>
                    </p>
                  )}
                </div>

                {/* Nút xác nhận */}
                <div className="flex gap-3 pt-4">
                  <button
                    disabled={!idCommunities || !idCollection}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Upload File
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home