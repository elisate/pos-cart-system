import React from 'react'

function Footer() {
  return (
    <div>
      {/* Small Footer */}
      <footer className="bg-[#093A3E] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} ATradezone™️ Cloud. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer