import React from "react";
import {
  ArrowRight,
  Shield,
  Heart,
  Award,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

export default function HomePage({ onNavigate }) {
  const healthGoals = [
    {
      icon: Shield,
      title: "Immunity & Wellness",
      description:
        "Boost your body's natural strength with herbal nutrition.",
    },
    {
      icon: Award,
      title: "Mental Clarity",
      description:
        "Calm the mind and enhance focus with Ayurvedic balance.",
    },
    {
      icon: Heart,
      title: "Heart Wellness",
      description:
        "Support blood circulation and overall heart function.",
    },
    {
      icon: RefreshCw,
      title: "Energy & Vitality",
      description:
        "Rebuild stamina and strength using pure herbal extracts.",
    },
  ];

  return (
    <div className="w-100">

      {/* Hero Section */}
      <section className="bg-light py-5 text-center text-md-start">
        <div className="container d-flex flex-column flex-md-row align-items-center gap-4">
          <div className="col-md-6">
            <div className="badge bg-success text-white mb-3">
              🌿 Pure Herbal Care
            </div>
            <h1 className="fw-bold mb-3">
              Ancient Wisdom,
              <br />
              <span className="text-success">Modern Wellness</span>
            </h1>
            <p className="text-muted">
              Discover authentic Ayurvedic solutions made with real herbs,
              carefully prepared to support your everyday health naturally.
            </p>
            <div className="mt-4">
              <button
                onClick={() => onNavigate("products")}
                className="btn btn-success me-3"
              >
                Explore Products <ArrowRight size={18} className="ms-1" />
              </button>
              <button className="btn btn-outline-success">
                Watch Our Story
              </button>
            </div>
          </div>

          <div className="col-md-6 text-center">
            <div className="position-relative">
              <img
                src="https://images.unsplash.com/photo-1730130596425-197566414dc4?auto=format&fit=crop&w=800&q=80"
                alt="Ayurvedic Wellness"
                className="img-fluid rounded-3 shadow"
              />
              <div className="position-absolute top-0 end-0 m-3 bg-white rounded-pill px-3 py-1 shadow-sm small">
                <CheckCircle size={16} className="text-success me-1" />
                100% Natural
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Goals */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Your Wellness Journey Starts Here</h2>
          <p className="text-muted mb-5">
            Choose your health focus and begin with nature’s best remedies.
          </p>

          <div className="row gy-4">
            {healthGoals.map((goal, index) => {
              const Icon = goal.icon;
              return (
                <div className="col-12 col-md-6 col-lg-3" key={index}>
                  <div className="card h-100 border-0 shadow-sm p-3">
                    <div className="text-success mb-3">
                      <Icon size={36} />
                    </div>
                    <h5 className="fw-bold">{goal.title}</h5>
                    <p className="small text-muted">{goal.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Herbal Promise */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Our Herbal Promise</h2>
          <p className="text-muted mb-5">
            Blending the purity of Ayurveda with strict quality standards to
            support your complete wellness.
          </p>

          <div className="row gy-4">
            <div className="col-12 col-md-4">
              <div className="card border-0 h-100 shadow-sm p-4">
                <Shield size={40} className="text-success mb-3" />
                <h5 className="fw-bold mb-2">Pure Ingredients</h5>
                <p className="small text-muted">
                  No harmful chemicals — only authentic Ayurvedic herbs.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card border-0 h-100 shadow-sm p-4">
                <Heart size={40} className="text-success mb-3" />
                <h5 className="fw-bold mb-2">Ayurvedic Care</h5>
                <p className="small text-muted">
                  Crafted with love & ancient healing knowledge.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card border-0 h-100 shadow-sm p-4">
                <Award size={40} className="text-success mb-3" />
                <h5 className="fw-bold mb-2">Quality Assured</h5>
                <p className="small text-muted">
                  Processed scientifically to ensure purity & safety.
                </p>
              </div>
            </div>
          </div>

          <button
            className="btn btn-success mt-4"
            onClick={() => onNavigate("products")}
          >
            View Products <ArrowRight size={18} className="ms-1" />
          </button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-5 bg-success text-white text-center">
        <div className="container">
          <h3 className="fw-bold mb-3">Stay Connected to Ayurveda</h3>
          <p className="small mb-4">
            Join the Lilaai Ayurvedic family for wellness updates & offers.
          </p>
          <form className="d-flex justify-content-center">
            <input
              type="email"
              className="form-control w-auto me-2"
              placeholder="Enter your email"
            />
            <button className="btn btn-light text-success">Subscribe</button>
          </form>
        </div>
      </section>

    </div>
  );
}
