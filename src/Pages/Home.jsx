import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useOutletContext } from 'react-router-dom'
import { Menu, ChevronLeft, Upload } from 'lucide-react';
import { toast } from 'react-toastify'

const Home = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useOutletContext()
  const [loading, setLoading] = useState(true)

  const [idCommunities, setIdCommunities] = useState(null)
  const [idCollection, setIdCollection] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const [dataCommunities, setDataCommunities] = useState([])
  const [dataCollections, setDataCollections] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publicationYear, setPublicationYear] = useState('')
  const [description, setDescription] = useState('')


  const handleCommunitiesChange = (e) => {
    setIdCommunities(e.target.value);
    setIdCollection(null);
    // setSelectedWard('');
  };

  const handleCollectionsChange = (e) => {
    setIdCollection(e.target.value);
    // setSelectedWard('');
  }
  const handleCreateDocument = async (e) => {
    e.preventDefault()

    const formData = {
      metadata: [
        {
          key: 'dc.title',
          value: title
        },
        {
          key: 'dc.contributor.author',
          value: author
        },
        {
          key: 'dc.date.issued',
          value: publicationYear
        },
        {
          key: 'dc.description.abstract',
          value: description
        },
      ]
    }
    try {
      const xsrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1]
      const res = await axios.post(`/rest/${idCollection}/items`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': xsrfToken
        },
        withCredentials: true, // 🔥 BẮT BUỘC
        body: JSON.stringify(formData)
      }
      )
      if (!res.ok) {
        throw new Error(`Lỗi tạo item: ${res.status}`);
      }
      const item = await res();
      const itemId = item.uuid;

      console.log('Đã tạo item:', itemId);
      // Bước 2: Upload file
      // console.log('Đang upload file...');
      // const formData = new FormData();
      // formData.append('file', selectedFile);

      // const uploadResponse = await axios(`/rest/items/${itemId}/bitstreams`, {
      //   method: 'POST',
      //   withCredentials: true, // 🔥 BẮT BUỘC
      //   body: formData
      // });

      // if (!uploadResponse.ok) {
      //   throw new Error(`Lỗi upload file: ${uploadResponse.status}`);
      // }
      // const bitstream = await uploadResponse();
      // console.log('Đã upload file:', bitstream);
      // // Bước 3: Update bitstream metadata (đảm bảo format đúng)
      // console.log('Đang cập nhật metadata...');
      // const bitstreamId = bitstream.uuid || bitstream.id;

      // const updateResponse = await axios(`/rest/bitstreams/${bitstreamId}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   withCredentials: true, // 🔥 BẮT BUỘC
      //   body: JSON.stringify({
      //     name: selectedFile.name,
      //     description: 'File tài liệu chính',
      //     mimeType: 'application/pdf',
      //     sequenceId: 1
      //   })
      // });

      // if (!updateResponse.ok) {
      //   console.warn('Cập nhật metadata thất bại, nhưng file đã upload thành công');
      // }

      // Thành công
    } catch (error) {
      toast.error('Tạo tài liệu thất bại!')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getCommunities = async () => {
      try {
        const res = await axios.get('/rest/communities', {
          withCredentials: true // 🔥 BẮT BUỘC
        })
        // console.log(res.data)
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
        // console.log(res.data)
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
          {/* LEFT */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="min-w-full mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cột trái - Chọn Communities & Collections */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 col-span-1">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Chọn bộ sưu tập</h2>
                    <p className="text-sm text-gray-600">Chọn Communities và Collections</p>
                  </div>

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
                      <h3 className="font-semibold text-blue-900 mb-2">Bộ sưu tập bạn chọn:</h3>
                      <p className="text-blue-800">
                        {dataCommunities?.find(w => w.uuid == idCommunities)?.name} {' -> '}
                        {dataCollections?.find(d => d.uuid == idCollection)?.name}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setIdCommunities(null);
                      setIdCollection(null);
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Đặt lại
                  </button>
                </div>

                {/* Cột phải - Form nhập dữ liệu */}
                <form
                  onSubmit={handleCreateDocument}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 col-span-2">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Thông tin tài liệu</h2>
                    <p className="text-sm text-gray-600">Nhập thông tin chi tiết cho tài liệu</p>
                  </div>

                  {/* Input 1 - Tiêu đề */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tiêu đề tài liệu <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      placeholder="Nhập tiêu đề tài liệu"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  {/* Input 2 - Tác giả */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tác giả <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      type="text"
                      placeholder="Nhập tên tác giả"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  {/* Input 3 - Năm xuất bản */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Năm xuất bản
                    </label>
                    <input
                      value={publicationYear}
                      onChange={(e) => setPublicationYear(e.target.value)}
                      type="text"
                      placeholder="Nhập năm xuất bản"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  {/* Input 4 - Mô tả */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mô tả
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      placeholder="Nhập mô tả về tài liệu"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                    />
                  </div>
                  <div className='w-full flex items-center justify-center'>
                    <button
                      // onClick={() => handleCreateDocument}
                      disabled={!idCommunities || !idCollection || !title || !author}
                      className=" px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Tạo tài liệu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="flex-2 overflow-y-auto p-6">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Chọn file PDF</span>
                          <input
                            type="file"
                            className="sr-only"
                            // accept=".pdf,application/pdf"
                            onChange={(e) => {
                              const file = e.target.files[0]
                              setSelectedFile(file)
                            }}
                          />
                        </label>
                      </div>
                      {selectedFile && (
                        <p className="text-sm text-green-600 font-medium mt-2">
                          ✓ {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Nút xác nhận */}
                {/* <div className="flex gap-3 pt-4">
                  <button
                    disabled={!idCommunities || !idCollection}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Upload File
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}


export default Home