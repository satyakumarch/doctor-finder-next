
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl 
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "MedicalSpecialty",
            "name": "General Physician & Internal Medicine",
            "description": "Find and book appointments with General Physicians and Internal Medicine specialists.",
            "medicalSpecialty": {
              "@type": "MedicalSpecialty",
              "name": "Internal Medicine"
            }
          }
        `}
      </script>
    </Helmet>
  );
};

export default SEO;
