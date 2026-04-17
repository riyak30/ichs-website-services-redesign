const servicesData = [
  // ── GENERAL ──────────────────────────────────────────────
  {
    id: 'Primary_Care',
    name: 'Primary Care',
    category: 'general',
    description: "Our medical services include infant and well child checkups, immunizations, health screenings and women's health.",
    funFact: {
      name: 'Acute Care — Same-Day Help, When You Need It',
      text: 'Beyond routine visits, ICHS offers acute care for sudden illness and injuries — so you can get seen quickly without a trip to the ER. Walk-ins are welcome at select locations.',
    },
    subServices: [
      { name: 'Preventive Care', description: 'Stay healthy with routine check-ups, vaccinations, screenings, and personalized wellness plans designed to prevent illness before it starts.' },
      { name: 'After Hours Care', description: 'Need care after 5 pm? Our <a href="https://www.ichs.com/services/after-hours" target="_blank" rel="noopener" style="color:var(--teal-dark);font-weight:700;text-decoration:underline;">After Hours Clinic</a> at Holly Park is open evenings so care fits your schedule, not the other way around.' },
      { name: 'Child Checkups', description: 'Well-child visits, developmental screenings, and immunizations to keep your children healthy and thriving at every age. Nutrition support is also available through <a href="/services/Women_Infants_and_Children_WIC" style="color:var(--teal-dark);font-weight:700;text-decoration:underline;">WIC</a>.' },
      { name: "Women's Health", description: 'Gynecological care, reproductive health support, and dedicated <a href="/services/Pregnancy_Care" style="color:var(--teal-dark);font-weight:700;text-decoration:underline;">pregnancy care</a> — all tailored to your needs and values.' },
      { name: 'Family Planning', description: 'Contraception counseling, fertility awareness, and <a href="/services/Sexual_Health_and_Wellness" style="color:var(--teal-dark);font-weight:700;text-decoration:underline;">sexual health &amp; wellness</a> resources tailored to your needs and values.' },
      { name: 'Geriatrics', description: 'Specialized <a href="/services/Geriatric_Care" style="color:var(--teal-dark);font-weight:700;text-decoration:underline;">geriatric care</a> and wellness support designed for the unique health needs of older adults.' },
      { name: 'Acute Care Services', description: 'Same-day care for sudden illness and injuries — so you can get seen quickly without a trip to the ER. Walk-ins welcome at select locations.' },
      { name: 'Minor Surgical Procedures', description: 'On-site minor surgical care including skin procedures, wound care, and other small interventions performed by our medical team.' },
      { name: 'Select Specialty Care', description: 'Access to specialty services including podiatry, neurology, and psychiatry — coordinated through your primary care provider.' },
      { name: 'Coordination of Care with Specialists', description: 'Our care team works closely with outside specialists to make sure your treatment is connected, informed, and centered on you.' },
    ],
  },
  {
    id: 'Dental_Care',
    name: 'Dental Care',
    category: 'general',
    description: "Our dentists believe in establishing a relationship that values your input. Our entire dental team works together to listen, understand, and take the best course of action for your individual needs. ICHS offers full dental care for the entire family, including check-ups, cleanings, and urgent care.",
    funFact: {
      name: 'Pediatric Dental — Starting at Age 1',
      text: 'ICHS sees children as young as 1 year old for their very first dental checkup — because healthy smiles start early.',
    },
    subServices: [
      { name: 'Comprehensive Examinations', description: 'Thorough dental exams to assess your oral health, identify concerns early, and build a personalized care plan.' },
      { name: 'Pediatric Dental Care', description: 'Child-friendly dental care from the very first tooth, supporting healthy smiles through every stage of childhood.' },
      { name: 'Preventive Dentistry', description: 'Cleanings, sealants, and fluoride treatments that protect teeth and keep decay at bay for patients of all ages.' },
      { name: 'Restorative Services', description: 'Composite and amalgam fillings, dental implants, crowns, and bridges to repair and restore your smile.' },
      { name: 'X-rays', description: 'Digital X-rays for a complete picture of your oral health, helping us catch issues not visible to the naked eye.' },
      { name: 'Minor Oral Surgery', description: 'On-site surgical procedures including tooth extractions performed by experienced dental providers.' },
      { name: 'Emergency Care', description: 'Same-day or next-day appointments for dental pain, broken teeth, and other urgent dental needs.' },
      { name: 'Oral Health Education & Consultation', description: 'Personalized guidance on home care, nutrition, and habits to help you maintain a healthy mouth long-term.' },
      { name: 'Extractions', description: 'Safe, comfortable tooth removal when necessary, with attentive care and clear aftercare instructions.' },
      { name: 'Root Canal Therapies', description: 'Root canal treatment to relieve pain, save infected teeth, and restore your ability to eat and speak comfortably.' },
    ],
  },
  {
    id: 'After_Hours_Clinic',
    name: 'After Hours Clinic',
    category: 'general',
    description: 'For illness and injuries after 5 pm, come to our Holly Park clinic in south Seattle.',
    subServices: [
      { name: 'Urgent Care Visits', description: 'Minor injuries, illnesses, and acute conditions treated after regular hours.' },
      { name: 'Prescription Refills', description: 'Emergency prescription support for ongoing medications.' },
      { name: 'Phone Triage', description: 'Clinical staff available by phone to assess your symptoms and advise next steps.' },
    ],
  },
  {
    id: 'Pharmacy',
    name: 'Pharmacy',
    category: 'general',
    description: 'Services include specialty pharmacy, compliance packaging, vaccines, and immunizations.',
    subServices: [
      { name: 'Prescription Filling', description: 'Fast, affordable prescription services for ICHS patients at our on-site pharmacy.' },
      { name: 'Medication Counseling', description: 'Pharmacist-led education on proper medication use, side effects, and interactions.' },
      { name: 'Vaccines & Immunizations', description: 'Flu shots, travel vaccines, and standard adult and childhood immunizations.' },
      { name: 'Compliance Packaging', description: 'Pre-sorted medication packaging for patients managing multiple prescriptions.' },
    ],
  },
  {
    id: 'Sexual_Health_and_Wellness',
    name: 'Sexual Health & Wellness',
    category: 'general',
    description: 'Sexual health resources: contraception, PrEP, and STI testing, treatment, and prevention.',
    subServices: [
      { name: 'STI Testing & Treatment', description: 'Confidential testing and treatment for sexually transmitted infections.' },
      { name: 'HIV Care & PrEP', description: 'Ongoing HIV management and PrEP prescriptions for prevention.' },
      { name: 'Contraception', description: 'Counseling and prescriptions for a full range of birth control options.' },
    ],
  },
  {
    id: 'Eye_Care',
    name: 'Eye Care',
    category: 'general',
    description: 'Complete eye exam services for adults and children.',
    subServices: [
      { name: 'Vision Exams', description: 'Comprehensive eye exams for all ages including glasses/contact prescriptions.' },
      { name: 'Glasses & Contacts', description: 'Affordable eyewear referrals and contact lens fittings.' },
      { name: 'Eye Disease Screening', description: 'Screening for glaucoma, cataracts, diabetic retinopathy, and other conditions.' },
    ],
  },
  {
    id: 'Behavioral_Health',
    name: 'Behavioral Health',
    category: 'general',
    description: 'Professional consultation and treatment for depression, anxiety, relationship, and lifestyle issues.',
    subServices: [
      { name: 'Individual Therapy', description: 'One-on-one counseling for depression, anxiety, trauma, and other mental health concerns.' },
      { name: 'Group Therapy', description: 'Supportive group sessions for shared experiences and healing.' },
      { name: 'Psychiatric Services', description: 'Psychiatric evaluations and medication management by licensed providers.' },
      { name: 'Crisis Support', description: 'Same-day or next-day appointments for patients in acute mental health distress.' },
      { name: 'Substance Use Treatment', description: 'Assessment, counseling, and referrals for substance use disorders.' },
    ],
  },

  // ── SPECIALIZED ──────────────────────────────────────────
  {
    id: 'Pregnancy_Care',
    name: 'Pregnancy Care',
    category: 'specialized',
    description: 'Care through pregnancy, during childbirth, and following birth for you and your baby.',
    subServices: [
      { name: 'Prenatal Care', description: 'Regular check-ups, ultrasounds, and monitoring throughout your pregnancy.' },
      { name: 'Postpartum Care', description: 'Follow-up visits and support for new mothers after delivery.' },
      { name: 'High-Risk Pregnancy', description: 'Coordinated care with specialists for complex or high-risk pregnancies.' },
      { name: 'Breastfeeding Support', description: 'Lactation consulting and resources for new parents.' },
    ],
  },
  {
    id: 'Geriatric_Care',
    name: 'Geriatric Care',
    category: 'specialized',
    description: 'High-quality, patient-centered care for older adults.',
    subServices: [
      { name: 'Geriatric Assessments', description: 'Comprehensive evaluations of physical, cognitive, and social health for older adults.' },
      { name: 'Memory Care Screening', description: 'Screening and management of dementia and cognitive decline.' },
      { name: 'Fall Prevention', description: 'Risk assessments and programs to reduce fall risk in older patients.' },
      { name: 'Care Coordination', description: 'Coordination with specialists, social services, and home care providers.' },
    ],
  },
  {
    id: 'Medication_Assisted_Treatment',
    name: 'Medication Assisted Treatment',
    category: 'specialized',
    description: 'Compassionate care of prescription pain medication and heroin addiction.',
    subServices: [
      { name: 'Buprenorphine/Suboxone', description: 'Opioid use disorder treatment with buprenorphine (Suboxone) and integrated counseling.' },
      { name: 'Naltrexone', description: 'Treatment for opioid and alcohol use disorder using naltrexone (Vivitrol).' },
      { name: 'Counseling Integration', description: 'Behavioral health counseling integrated alongside medication management.' },
    ],
  },
  {
    id: 'School_Services',
    name: 'School Services',
    category: 'specialized',
    description: 'On-site primary care, behavioral health services and restorative/preventive dental care for students.',
    subServices: [
      { name: 'School-Based Medical', description: 'On-site medical care at partner schools including physicals, sick visits, and immunizations.' },
      { name: 'School-Based Dental', description: 'Dental screenings, cleanings, and fluoride treatments at school sites.' },
      { name: 'School-Based Mental Health', description: 'Counseling and behavioral health support for students on-site.' },
    ],
  },
  {
    id: 'Integrative_Medicine',
    name: 'Integrative Medicine',
    category: 'specialized',
    description: 'Whole person health care that combines conventional medicine with complementary therapies.',
    subServices: [
      { name: 'Acupuncture', description: 'Traditional Chinese acupuncture for pain management, stress, and chronic conditions.' },
      { name: 'Traditional Chinese Medicine', description: 'Consultations incorporating TCM principles and practices.' },
      { name: 'Mind-Body Techniques', description: 'Guided approaches including relaxation, meditation, and stress management.' },
    ],
  },
  {
    id: 'Nutrition_Services',
    name: 'Nutrition Services',
    category: 'specialized',
    description: 'Health education and management with nutrition-based treatment from registered dietitians and nutritionists.',
    subServices: [
      { name: 'Nutrition Counseling', description: 'One-on-one sessions with a registered dietitian for personalized meal planning.' },
      { name: 'Diabetes Nutrition', description: 'Medical nutrition therapy for diabetes prevention and management.' },
      { name: 'Pediatric Nutrition', description: 'Growth assessments and feeding guidance for infants and children.' },
    ],
  },
  {
    id: 'Identity-Support',
    name: 'Identity-Support',
    category: 'specialized',
    description: 'Comprehensive healthcare: primary, hormonal, sexual, and behavioral health.',
    subServices: [
      { name: 'Gender-Affirming Care', description: 'Comprehensive care supporting transgender and non-binary patients, including hormone therapy.' },
      { name: 'LGBTQ+ Mental Health', description: 'Affirming counseling for identity, coming out, and LGBTQ+ specific stressors.' },
      { name: 'HIV Prevention & PrEP', description: 'PrEP prescriptions and HIV prevention for at-risk patients.' },
    ],
  },
  {
    id: 'Acupuncture',
    name: 'Acupuncture',
    category: 'specialized',
    description: 'Our certified practitioners focus on chronic pain, reduction of polypharmacy, cancer side effect treatments, and more.',
    subServices: [
      { name: 'Pain Management', description: 'Acupuncture for back pain, neck pain, headaches, and joint conditions.' },
      { name: 'Stress & Anxiety Relief', description: 'Acupuncture protocols targeting stress, anxiety, and sleep disturbances.' },
      { name: 'Chronic Condition Support', description: 'Integrative acupuncture support for chronic diseases like diabetes and hypertension.' },
    ],
  },

  // ── WELLNESS ─────────────────────────────────────────────
  {
    id: 'Women_Infants_and_Children_WIC',
    name: 'Women, Infants, & Children (WIC)',
    category: 'wellness',
    description: 'Women, Infants, & Children (WIC) nutrition program for qualified families.',
    subServices: [
      { name: 'Nutrition Education', description: 'Guidance on healthy eating during pregnancy and for young children.' },
      { name: 'Food Benefits', description: 'Monthly food packages and benefits for eligible WIC participants.' },
      { name: 'Breastfeeding Support', description: 'Lactation counseling and peer support for breastfeeding mothers.' },
    ],
  },
  {
    id: 'Healthy_Aging_and_Wellness',
    name: 'Healthy Aging & Wellness',
    category: 'wellness',
    description: 'Multi culturally appropriate elder care for the Asian community.',
    subServices: [
      { name: 'Wellness Programs', description: 'Group fitness, yoga, and wellness classes designed for older adults.' },
      { name: 'Social Services', description: 'Connection to community resources, transportation, and support services.' },
      { name: 'Caregiver Support', description: 'Resources and respite for family caregivers of older adults.' },
    ],
  },
  {
    id: 'Health_Education',
    name: 'Health Education',
    category: 'wellness',
    description: 'Our community health specialists will help you access the care you need.',
    subServices: [
      { name: 'Chronic Disease Prevention', description: 'Community workshops on preventing diabetes, heart disease, and hypertension.' },
      { name: 'Health Literacy', description: 'Multilingual education resources helping patients understand their health and navigate the system.' },
      { name: 'Community Workshops', description: 'Free in-person and virtual health education events open to the community.' },
    ],
  },
]

export default servicesData
