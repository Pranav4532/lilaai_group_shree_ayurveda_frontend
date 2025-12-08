import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Headphones,
  Instagram,
  Facebook,
} from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Phone className="text-success" size={26} />,
      title: "Phone",
      details: ["+91 7666642167"],
      availability: "Mon-Sat, 9 AM - 7 PM",
    },
    {
      icon: <Mail className="text-success" size={26} />,
      title: "Email",
      details: ["lilaaigroupshreeayurveda@gmail.com"],
      availability: "24/7 Response",
    },
    {
      icon: <MapPin className="text-success" size={26} />,
      title: "Address",
      details: [
        "Shree Samarth Krupa Clinic, Shop No. 2,",
        "Bhal Bus Stop, Shree Malangad Road,",
        "Kalyan East, Maharashtra",
      ],
      availability: "Visit us anytime",
    },
    {
      icon: <Clock className="text-success" size={26} />,
      title: "Business Hours",
      details: ["Mon - Sat: 9 AM - 7 PM", "Sunday: 10 AM - 5 PM"],
      availability: "IST Zone",
    },
  ];

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <section
        className="row align-items-center mb-5 p-4 rounded"
        style={{
          background:
            "linear-gradient(135deg, #ccf1d0 0%, #ffffff 50%, #ccf1d0 100%)",
        }}
      >
        <div className="col-md-6">
          <h1 className="fw-bold mb-3">
            We're Always <span className="text-success">Here for You</span>
          </h1>
          <p className="text-muted mb-4">
            From expert Ayurvedic consultations to smooth order support — we
            ensure a joyful wellness journey with us.
          </p>

          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex align-items-center fw-semibold text-muted">
              <Headphones size={20} className="me-2 text-success" /> 24/7
              Support
            </div>
            <div className="d-flex align-items-center fw-semibold text-muted">
              <Users size={20} className="me-2 text-success" /> Health Experts
            </div>
            <div className="d-flex align-items-center fw-semibold text-muted">
              <MessageCircle size={20} className="me-2 text-success" /> Quick
              Response
            </div>
          </div>
        </div>

        <div className="col-md-6 text-center">
          <img
            src="https://images.unsplash.com/photo-1560264418-c4445382edbc"
            alt="Support Team"
            className="img-fluid rounded shadow"
          />
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="mb-5">
        <div className="row gy-4">
          {contactInfo.map((info, index) => (
            <div className="col-md-3" key={index}>
              <div
                className="card shadow-sm h-100"
                style={{ transition: "0.3s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div className="card-body text-center">
                  <div className="mb-2">{info.icon}</div>
                  <h5 className="fw-bold">{info.title}</h5>

                  {info.details.map((line, i) => (
                    <p key={i} className="small text-muted mb-0">
                      {line}
                    </p>
                  ))}

                  <p className="text-success small mt-2">{info.availability}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="row gy-5 mb-5">
        <div className="col-md-8 mx-auto">
          <div className="card shadow-sm border-success border-opacity-25">
            <div className="card-header bg-success bg-opacity-10 fw-bold text-success">
              ✉ Send us a Message
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col">
                    <label className="form-label fw-semibold">First Name</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="col">
                    <label className="form-label fw-semibold">Last Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>

                <label className="form-label mt-3 fw-semibold">Email</label>
                <input type="email" className="form-control" />

                <label className="form-label mt-3 fw-semibold">Phone</label>
                <input type="tel" className="form-control" />

                <label className="form-label mt-3 fw-semibold">Message</label>
                <textarea className="form-control" rows="4" />

                <button className="btn btn-success w-100 mt-3" type="button">
                  <Send size={16} className="me-2" /> Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Store + Social + Map */}
      <section className="text-center py-5 mb-5 bg-light rounded shadow-sm">
        <h3 className="fw-bold mb-3">
          🌿 Visit Our <span className="text-success">Experience Store</span>
        </h3>

        <p className="text-muted mb-4">
          Explore products hands-on with expert Ayurvedic guidance.
        </p>

        {/* Social + WhatsApp */}
        <div className="d-flex justify-content-center gap-4 mb-4">
          <a
            href="https://www.instagram.com/ayurv.eda?igsh=ZmR5MzkyN3FqM3Bw"
            className="text-success"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={28} />
          </a>

          <a
            href="https://www.facebook.com/share/1BNHvYeX4o/"
            className="text-success"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size={28} />
          </a>

          <a
            href="https://wa.me/917666642167"
            className="text-success"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={28} />
          </a>
        </div>

        {/* Google Map */}
        <div className="mx-auto" style={{ maxWidth: 500 }}>
          <iframe
            title="Store Location"
            width="100%"
            height="250"
            className="rounded border"
            loading="lazy"
            allowFullScreen
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62271.964043793575!2d73.14846373013542!3d19.227047842341224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be793d4e79e1f1b%3A0xfee416c97dbeed06!2sKalyan%20East%2C%20Kalyan%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1733090000000!5m2!1sen!2sin"
          ></iframe>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="text-center p-5 bg-danger bg-opacity-10 rounded shadow-sm">
        <h3 className="fw-bold text-danger">🚨 Emergency?</h3>
        <p className="text-muted">Available 24/7 — Medical emergencies only</p>
        <button className="btn btn-danger">
          <Phone size={16} className="me-2" /> +91 7666642167
        </button>
      </section>
    </div>
  );
}
