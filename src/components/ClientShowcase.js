import React from "react";

export default function ClientShowcase() {
  const features = [
    { title: "Multi-Page Website", description: "Complete website with Home, Products, About, and Contact pages", icon: "🏠" },
    { title: "Product Management", description: "12 Ayurvedic products with detailed information, ratings, and pricing", icon: "🌿" },
    { title: "Search & Filter", description: "Advanced search functionality with category filters and sorting options", icon: "🔍" },
    { title: "Mobile Responsive", description: "Fully responsive design that works perfectly on all devices", icon: "📱" },
    { title: "Shopping Cart", description: "Complete cart functionality for a seamless shopping experience", icon: "🛒" },
    { title: "Professional Design", description: "Natural green color scheme perfect for herbal/Ayurvedic products", icon: "🎨" }
  ];

  const pages = [
    { name: "Home Page", description: "Welcoming landing page with hero section and key information", mockup: "Modern homepage with hero banner and product highlights" },
    { name: "Products Page", description: "Complete product catalog with filtering and search capabilities", mockup: "Grid layout showing all 12 Ayurvedic products with ratings and prices" },
    { name: "About Page", description: "Company information and brand story", mockup: "Professional about page highlighting company values and mission" },
    { name: "Contact Page", description: "Contact information and inquiry form", mockup: "Clean contact page with form and business details" }
  ];

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="d-inline-flex align-items-center mb-3">
          <div className="bg-success bg-opacity-10 rounded-circle p-3 me-2">
            <span className="fw-bold text-success fs-4">KH</span>
          </div>
          <h1 className="fw-bold text-success">Kaveri Herbals</h1>
        </div>
        <p className="text-muted mb-1">Professional E-commerce Website</p>
        <h5 className="fw-semibold">Complete Ayurvedic Products Marketplace</h5>
      </div>

      {/* Features */}
      <section className="mb-5">
        <h2 className="fw-bold text-center mb-4">Key Features</h2>
        <div className="row gy-4">
          {features.map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="card h-100 shadow-sm border-success border-opacity-25">
                <div className="card-body text-center">
                  <div className="fs-1 mb-2">{feature.icon}</div>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="text-muted small">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Website Pages */}
      <section className="mb-5">
        <h2 className="fw-bold text-center mb-4">Website Pages</h2>
        <div className="row gy-4">
          {pages.map((page, index) => (
            <div className="col-md-6" key={index}>
              <div className="card border-success border-opacity-25 shadow-sm">
                <div className="card-header bg-success bg-opacity-10 fw-bold text-success">{page.name}</div>
                <div className="card-body">
                  <p>{page.description}</p>
                  <div className="border border-dashed rounded p-3 bg-light small fst-italic">
                    {page.mockup}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="mb-5">
        <h2 className="fw-bold text-center mb-4">Technical Specifications</h2>
        <div className="row gy-4">
          <div className="col-md-6">
            <div className="card border-success border-opacity-25 shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Frontend Technology</h5>
                <ul className="list-unstyled small">
                  <li>• React (converted to plain JS)</li>
                  <li>• Bootstrap for styling</li>
                  <li>• Responsive design principles</li>
                  <li>• Reusable components</li>
                  <li>• State management using React Hooks</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-success border-opacity-25 shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Key Functionality</h5>
                <ul className="list-unstyled small">
                  <li>• Product search and filtering</li>
                  <li>• Shopping cart management</li>
                  <li>• Mobile responsive navigation</li>
                  <li>• Product showcase layout</li>
                  <li>• Contact form integration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="mb-5">
        <h2 className="fw-bold text-center mb-4">Sample Products</h2>
        <div className="row gy-4">
          {[
            "Ashwagandha Capsules",
            "Brahmi Oil",
            "Turmeric Tablets",
            "Neem Face Wash",
            "Amla Juice",
            "Triphala Powder",
            "Giloy Tablets",
            "Arjuna Capsules"
          ].map((product, index) => (
            <div className="col-md-3 col-sm-6" key={index}>
              <div className="card text-center shadow-sm border-success border-opacity-25 h-100">
                <div className="card-body">
                  <div className="fs-1 text-success mb-2">🌿</div>
                  <h6 className="fw-bold">{product}</h6>
                  <div className="text-warning mb-1">★★★★☆</div>
                  <p className="fw-semibold mb-0">₹{Math.floor(Math.random() * 500) + 200}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Preview */}
      <section className="mb-5">
        <h2 className="fw-bold text-center mb-4">Mobile Experience</h2>
        <div className="d-flex justify-content-center">
          <div className="card border-success border-opacity-25 shadow-sm" style={{ width: "300px" }}>
            <div className="card-header text-center bg-success bg-opacity-10 fw-bold text-success">
              Mobile Preview
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center border-bottom mb-2 pb-2">
                <div className="bg-light rounded me-3" style={{ width: "50px", height: "50px" }}></div>
                <div>
                  <p className="mb-0 small fw-semibold">Product Name</p>
                  <small>₹299</small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-light rounded me-3" style={{ width: "50px", height: "50px" }}></div>
                <div>
                  <p className="mb-0 small fw-semibold">Product Name</p>
                  <small>₹399</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center card border-success border-opacity-25 shadow-sm p-4">
        <h3 className="fw-bold mb-2">Ready for Launch</h3>
        <p className="mb-3">Complete, professional e-commerce website for Kaveri Herbals</p>
        <div className="small d-flex flex-wrap justify-content-center gap-3">
          <span>✅ Fully Responsive</span>
          <span>✅ SEO Optimized</span>
          <span>✅ Fast Loading</span>
          <span>✅ User Friendly</span>
        </div>
      </footer>
    </div>
  );
}
