import React from "react";
import { Award, Users, Leaf, Heart, Globe } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import ImageWithFallback from "./figma/ImageWithFallback";

export default function AboutPage() {
  const values = [
    {
      icon: <Leaf className="h-8 w-8 text-success" />,
      title: "Purity",
      description:
        "We use only authentic, chemical-free Ayurvedic herbs with maximum potency.",
    },
    {
      icon: <Heart className="h-8 w-8 text-danger" />,
      title: "Care",
      description:
        "Every product is crafted with deep concern for complete well-being and healing.",
    },
    {
      icon: <Award className="h-8 w-8 text-warning" />,
      title: "Innovation",
      description:
        "Modern research blends with ancient wisdom to treat the root cause of diseases.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Trust",
      description:
        "We work with honesty and transparency to earn the trust of every customer.",
    },
  ];

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <section className="text-center mb-5">
        <Badge className="bg-success text-white mb-3">Our Story</Badge>
        <h1 className="display-5 fw-bold mb-3 text-success">
          Lilaai Group Shree Ayurveda
        </h1>

        <h5 className="fw-semibold text-muted mb-3">
          Established on 30th August 2019
        </h5>

        <p className="lead text-muted mx-auto" style={{ maxWidth: "850px" }}>
          It gives us immense pleasure to introduce an innovative Ayurvedic
          product range from Lilaai Group Shree Ayurveda. Ayurveda, the science
          of life, focuses on identifying the root cause of illness and offering
          long-lasting healing solutions. We use the best species of herbs and
          scientifically proven formulations to deliver effective results
          naturally.
        </p>

        <div className="mt-4">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1528272252360-5efd274e36fb?crop=entropy&fit=max&w=900&q=80"
            alt="Ayurvedic Concept"
            className="img-fluid rounded shadow-lg"
          />
        </div>
      </section>

      <section className="text-center mb-5 doctors-section">
        <h2 className="h3 mb-4 text-success fw-bold">Our Team</h2>

        <div className="row justify-content-center">
          {/* Doctor 1 */}
          <div className="col-md-4 col-sm-6 mb-4">
            <Card className="shadow-sm h-100 text-center p-3 doctor-card">
              <img
                src="/images/Mayur.jpeg"
                alt="Dr. Mayur"
                className="doctor-profile-img mx-auto d-block"
              />
              <CardContent className="doctor-info mt-3">
                <h5 className="fw-bold text-success">
                  Dr. Mayur Borse (Patil)
                </h5>

                <span className="badge bg-success-subtle text-success mb-2">
                  Founder
                </span>

                <p className="text-muted small mb-1">BAMS (Ayurveda)</p>

                <ul
                  className="text-muted small ps-3 mb-2"
                  style={{ listStyle: "disc" }}
                >
                  <li>Aayush International Global Award - 2023</li>
                  <li>Global Prestigious Award - 2024</li>
                  <br />
                  <p>Specialist in Agnikarma & Vidhakarma Therapy</p>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="col-md-4 col-sm-6 mb-4">
            <Card className="shadow-sm h-100 text-center p-3 doctor-card">
              <img
                src="/images/Rajeshree.jpg"
                alt="Dr. Rajeshree Patil"
                className="doctor-profile-img mx-auto d-block"
              />
              <CardContent className="doctor-info">
                <h5 className="fw-bold text-success mt-3">
                  Dr. Rajeshree Patil
                </h5>
                <p className="text-muted small mb-1">Co-Founder</p>
                <p className="small">
                  Women’s health specialist • Ayurvedic wellness & lifestyle
                  healing.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="col-md-4 col-sm-6 mb-4">
            <Card className="shadow-sm h-100 text-center p-3 doctor-card">
              <img
                src="/images/T.S.Borse.jpeg"
                alt="Dr. T.S. Borse"
                className="doctor-profile-img mx-auto d-block"
              />
              <CardContent className="doctor-info">
                <h5 className="fw-bold text-success mt-3">
                  Dr. T.S. Borse (Patil)
                </h5>
                <p className="text-muted small mb-1">Director</p>
                <p className="small">
                  30+ years experience in chronic disease management & herbal
                  research.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="row justify-content-center">
        {/* Management Team Section */}
        <div className="col-md-10">
          <Card className="shadow-sm p-4">
            <CardContent className="text-start">
              <h4 className="fw-bold text-success">
                Management & Support Team
              </h4>

              <ul className="mt-3">
                <li className="mb-3 fs-5">
                  <strong>Pranav Patil</strong> — Marketing & Branding Lead
                  <br />
                  <strong>Work:</strong> Social Media, Brand Creation, Customer
                  Communication
                  <br />
                  <strong>Experience:</strong> Health Brand Promotion, Digital
                  Marketing
                </li>

                <li className="mb-3 fs-5">
                  <strong>Nikhil Borse (Patil)</strong> — Customer Care &
                  Support Executive
                  <br />
                  <strong>Work:</strong> Follow-up, Customer Support
                  <br />
                  <strong>Specialty:</strong> Human Communication, Query
                  Handling
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Values */}
      <section className="text-center mb-5 doctors-section">
        <h2 className="h3 mb-4 text-success fw-bold">Our Core Beliefs</h2>
        <div className="row">
          {values.map((value, index) => (
            <div key={index} className="col-md-3 mb-4">
              <Card className="h-100 shadow-sm">
                <CardContent className="text-center">
                  <div className="mb-3">{value.icon}</div>
                  <h5 className="fw-bold">{value.title}</h5>
                  <p className="text-muted small">{value.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Message */}
      <section className="text-center py-4 px-3 bg-light rounded shadow-sm mb-5">
        <h2 className="h3 text-success fw-bold mb-3">
          Warm Regards from Lilaai Group Shree Ayurveda
        </h2>

        <p className="text-muted mx-auto" style={{ maxWidth: "850px" }}>
          India is blessed with countless Ayurvedic herbs containing incredible
          medicinal power. Proper combinations of these herbs can treat even
          challenging conditions. At Lilaai Group Shree Ayurveda, we focus on
          selecting the **best herb species** and using them in the **most
          effective form** to preserve the true healing benefits of Ayurveda.
        </p>

        <p className="text-muted mx-auto mt-3" style={{ maxWidth: "850px" }}>
          We are dedicated to presenting safe, effective, and innovative
          treatment solutions — and your trust motivates us to keep improving
          Ayurvedic healthcare for the world.
        </p>

        <p className="fw-bold mt-4 text-success">
          Together, let’s embrace natural healing and build a healthier future.
          🌿
        </p>
      </section>
    </div>
  );
}
