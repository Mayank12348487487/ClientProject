const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-6 border-b border-gray-700">
          <div>
            <h3 className="text-xl font-semibold mb-3">About Us</h3>
            <p className="text-sm text-gray-400 cursor-pointer">We provide the latest articles and insights on income and finance. Stay informed with expert advice.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li className="cursor-pointer">Home</li>
              <li className="cursor-pointer">Articles</li>
              <li className="cursor-pointer">Contact</li>
              <li className="cursor-pointer">About</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Support</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li className="cursor-pointer">FAQs</li>
              <li className="cursor-pointer">Privacy Policy</li>
              <li className="cursor-pointer">Terms of Service</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a  className="hover:text-gray-300">Facebook</a>
              <a  className="hover:text-gray-300">Twitter</a>
              <a  className="hover:text-gray-300">LinkedIn</a>
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} Income Articles. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
