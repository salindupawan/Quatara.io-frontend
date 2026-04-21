

export default function SamplePdfPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header */}
      <header className="h-16 bg-gray-800 text-white flex items-center px-4">
        Header Content
      </header>

      {/* 2. PDF Viewer Container */}
      {/* 'relative' allows the button to stay within these bounds */}
      <main className="relative flex-1 bg-gray-100 p-8">
        
        {/* Your PDF Content Area */}
        <div className="max-w-4xl mx-auto bg-white min-h-[1500px] shadow-md p-10">
          <h1 className="text-2xl font-bold">PDF Viewer Content</h1>
          <p>The button will stay visible as you scroll through this section...</p>
        </div>

        {/* 3. The Sticky Floating Button */}
        {/* 'sticky' + 'bottom' + 'self-end' pins it to the viewer bounds */}
        <div className="sticky bottom-36  float-right mr-32 h-0">
           <button 
             className="flex h-14 w-14 mb-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl transition-transform hover:scale-110 active:scale-95"
             onClick={() => console.log("Action triggered")}
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
             </svg>
           </button>
        </div>

      </main>

      {/* 4. Footer */}
      <footer className="h-32 mt-5 bg-gray-800 text-white flex items-center px-4">
        Footer Content
      </footer>
    </div>
  )
}