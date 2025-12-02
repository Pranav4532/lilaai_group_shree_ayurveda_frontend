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
      description: "We use only authentic, chemical-free Ayurvedic herbs with maximum potency."
    },
    {
      icon: <Heart className="h-8 w-8 text-danger" />,
      title: "Care",
      description: "Every product is crafted with deep concern for complete well-being and healing."
    },
    {
      icon: <Award className="h-8 w-8 text-warning" />,
      title: "Innovation",
      description: "Modern research blends with ancient wisdom to treat the root cause of diseases."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Trust",
      description: "We work with honesty and transparency to earn the trust of every customer."
    }
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
          It gives us immense pleasure to introduce an innovative Ayurvedic product range
          from Lilaai Group Shree Ayurveda. Ayurveda, the science of life, focuses on
          identifying the root cause of illness and offering long-lasting healing solutions.
          We use the best species of herbs and scientifically proven formulations to deliver
          effective results naturally.
        </p>

        <div className="mt-4">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1528272252360-5efd274e36fb?crop=entropy&fit=max&w=900&q=80"
            alt="Ayurvedic Concept"
            className="img-fluid rounded shadow-lg"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="row text-center mb-5">
        <div className="col-md-6 mb-4">
          <Card className="shadow-sm">
            <CardContent>
              <Heart className="h-8 w-8 text-danger mb-3" />
              <h2 className="h4 fw-bold">Our Mission</h2>
              <p className="text-muted small">
                To bring the ancient wisdom of Ayurveda into every home through pure,
                effective, and affordable wellness solutions — empowering people to live
                a healthier and more natural life.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="col-md-6 mb-4">
          <Card className="shadow-sm">
            <CardContent>
              <Globe className="h-8 w-8 text-primary mb-3" />
              <h2 className="h4 fw-bold">Our Vision</h2>
              <p className="text-muted small">
                To become a trusted global name in Ayurvedic healthcare by promoting
                natural healing, holistic wellness, and innovative herbal formulations.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="text-center mb-5">
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
          India is blessed with countless Ayurvedic herbs containing incredible medicinal
          power. Proper combinations of these herbs can treat even challenging conditions.
          At Lilaai Group Shree Ayurveda, we focus on selecting the **best herb species**
          and using them in the **most effective form** to preserve the true healing benefits
          of Ayurveda.
        </p>

        <p className="text-muted mx-auto mt-3" style={{ maxWidth: "850px" }}>
          We are dedicated to presenting safe, effective, and innovative treatment
          solutions — and your trust motivates us to keep improving Ayurvedic healthcare
          for the world.
        </p>

        <p className="fw-bold mt-4 text-success">
          Together, let’s embrace natural healing and build a healthier future. 🌿
        </p>
      </section>

    </div>
  );
}
