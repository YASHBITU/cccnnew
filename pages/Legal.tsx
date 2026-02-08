
import React from 'react';

type LegalType = 'privacy' | 'terms' | 'refund' | 'shipping';

interface LegalProps {
  type: LegalType;
}

export const Legal: React.FC<LegalProps> = ({ type }) => {
  const content = {
    privacy: {
      title: "Privacy Policy",
      body: `Career Craft Consultancy (CCC) values your privacy. We collect information necessary to provide our career services, including contact details, professional background, and resume data. Your information is strictly used for service optimization and outreach purposes. We do not sell your personal data to third parties. By using our services, you consent to the data practices described in this policy.`
    },
    terms: {
      title: "Terms & Conditions",
      body: `Use of the CCC platform and services is subject to these terms. All intellectual property, frameworks, and strategies shared during the mentorship are owned by Career Craft Consultancy. Users are prohibited from redistributing or reselling any proprietary materials provided. We reserve the right to modify services or pricing at our discretion.`
    },
    refund: {
      title: "Cancellation & Refund Policy",
      body: `At CCC, we stand by our results. Our refund policy is straightforward: If you follow our provided system, complete all recommended steps, and do not receive at least one (1) interview call within 15 days of your profile optimization completion, you are eligible for a 100% refund. Cancellation of service after profile optimization has begun but before the 15-day period is not eligible for a refund.\n\nNo Cancellation are available once payment is done. And for refund, you should keep track on keep notes about your job hunting process. Follow the all the steps neatly.`
    },
    shipping: {
      title: "Shipping & Delivery Policy",
      body: `All services provided by Career Craft Consultancy are digital in nature. Service delivery commences immediately upon payment verification. Access to 1-on-1 portals, strategy documents, and optimization guides will be delivered via email or whatsapp or provided through the user dashboard. There are no physical goods shipped for these services.`
    }
  };

  const current = content[type];

  return (
    <div className="pt-32 pb-24 md:pt-48 md:pb-40 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-950 mb-12 text-depth-hero">{current.title}</h1>
        <div className="prose prose-lg prose-slate max-w-none bg-white p-12 md:p-20 rounded-[3rem] border border-gray-100 shadow-sm leading-relaxed text-gray-600 font-medium whitespace-pre-line">
          {current.body}
        </div>
      </div>
    </div>
  );
};
