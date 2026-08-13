export interface CityExtendedContent {
  overview: string;
  policeInfo: string;
  courtInfo: string;
  localBondProcess: string;
  faqs: { question: string; answer: string }[];
}

export const cityContentMap: Record<string, CityExtendedContent> = {
  potosi: {
    overview: `Potosi is the county seat of Washington County, Missouri, and serves as the operational headquarters for Jody Story Bail Bonds. Positioned at the intersection of Missouri Route 21, Missouri Route 8, and Route 185, Potosi experiences steady local police and county sheriff patrol activity. When an arrest occurs within Potosi or the surrounding Washington County area, our licensed bondsmen respond immediately—often arriving at the jail within minutes.

Because our main office is located right here in Potosi, we maintain unmatched working relationships with the Washington County Sheriff's Department, Potosi Police Department, and 24th Judicial Circuit Court clerks. We handle all bail paperwork on-site, providing rapid, compassionate, 24/7 service to bring your loved ones home without delay.`,
    policeInfo: `Individuals arrested by the Potosi Police Department (121 E High St, Potosi, MO 63664) are processed locally before being transferred to the Washington County Jail located at 116 W High St, Potosi, MO 63664. 

The detention center operates 24/7 under Sheriff's Office supervision. Booking involves identity verification, mugshots, fingerprinting, and warrant checks. Jody Story Bail Bonds has direct access to post bonds at the High Street jail 24 hours a day, 365 days a year.`,
    courtInfo: `Court appearances for offenses originating in Potosi are held at the Washington County Courthouse (102 N Mine St, Potosi, MO 63664), under the authority of the 24th Judicial Circuit Court of Missouri. Potosi Municipal Court handles local traffic and ordinance violations.

Our agents track court calendars on Missouri Case.net to remind co-signers and defendants of upcoming appearance dates, ensuring complete compliance and safeguarding your collateral.`,
    localBondProcess: `Posting a bail bond in Potosi, MO is simple and fast with Jody Story:

1. Call (573) 854-9264 immediately following an arrest in Potosi.
2. We contact the Washington County Jail booking desk to verify exact bail terms.
3. We set up an affordable 10% premium payment plan with low down payments.
4. Our agent walks directly to the jail on High Street to lodge certified surety documents for instant release.`,
    faqs: [
      {
        question: "Where is someone held if arrested in Potosi, MO?",
        answer: "Arrentees in Potosi are held at the Washington County Jail, located at 116 W High St, Potosi, MO 63664. Jody Story Bail Bonds is headquartered right here in Potosi for instant response."
      },
      {
        question: "How fast can Jody Story Bail Bonds post bond in Potosi?",
        answer: "Because Potosi is our home base, our agents can typically arrive at the Washington County Jail in under 15 minutes to file certified bond paperwork once bail is set."
      },
      {
        question: "How much does a bail bond cost in Potosi, Missouri?",
        answer: "By Missouri statutory regulation, standard bail bond premiums are set at 10% of the total bail amount. We offer customizable, flexible payment arrangements and low down payments."
      },
      {
        question: "What courts handle Potosi cases?",
        answer: "Potosi cases are processed at the Washington County Courthouse (24th Judicial Circuit) located at 102 N Mine St, Potosi, MO."
      },
      {
        question: "Is Jody Story Bail Bonds open 24/7 in Potosi?",
        answer: "Yes, our phone line (573) 854-9264 and dispatch agents are active 24 hours a day, 7 days a week, including all weekends and holidays."
      }
    ]
  },

  farmington: {
    overview: `Farmington is the largest city and county seat of St. Francois County, Missouri, situated along U.S. Route 67 and Missouri Route 32. As a major regional commercial and judicial hub, Farmington sees high traffic and active law enforcement presence from the Farmington Police Department, St. Francois County Sheriff's Department, and Missouri State Highway Patrol (Troop C).

Jody Story Bail Bonds provides immediate 24/7 bail bond assistance throughout Farmington. Whether an arrest occurs on Karsch Boulevard, Doubet Road, or downtown Farmington, our agents act instantly to verify bail amounts, explain payment options, and secure swift release from custody.`,
    policeInfo: `Arrestees detained by the Farmington Police Department (310 Ste. Genevieve Ave, Farmington, MO 63640) are transferred directly to the St. Francois County Detention Center at 1550 Doubet Rd, Farmington, MO 63640 (Phone: 573-756-3252).

Booking at the Doubet Road facility includes fingerprinting, criminal history checks, and mugshot recording. Jody Story Bail Bonds maintains continuous dispatch to the Detention Center, filing approved surety bonds around the clock.`,
    courtInfo: `Court proceedings for Farmington arrests occur at the St. Francois County Courthouse (1 N Washington St, Farmington, MO 63640) under the 24th Judicial Circuit Court of Missouri. City ordinance matters are heard at the Farmington Municipal Court.

We provide full docket monitoring and court date notification services so defendants remain compliant with the 24th Circuit Court.`,
    localBondProcess: `Fast 4-step bail process for Farmington arrests:

1. Call Jody Story Bail Bonds 24/7 at (573) 854-9264.
2. We verify inmate status and bail figures with the Doubet Road Detention Center.
3. We arrange an affordable 10% state premium payment plan.
4. Our agent lodges official surety papers at the jail, securing release in 1 to 3 hours.`,
    faqs: [
      {
        question: "Where is the jail located in Farmington, MO?",
        answer: "Individuals arrested in Farmington are held at the St. Francois County Detention Center, located at 1550 Doubet Rd, Farmington, MO 63640."
      },
      {
        question: "How long does inmate release take in Farmington?",
        answer: "Inmate release at the St. Francois County Detention Center generally takes between 1 and 3 hours after our agent lodges approved bail paperwork."
      },
      {
        question: "Are payment plans available for Farmington bail bonds?",
        answer: "Yes, Jody Story Bail Bonds offers low down payment financing options on the standard 10% premium required by state law."
      },
      {
        question: "What court handles Farmington misdemeanor and felony cases?",
        answer: "Cases are heard at the 24th Judicial Circuit Court located at 1 N Washington St, Farmington, MO 63640."
      }
    ]
  },

  'park-hills': {
    overview: `Park Hills is a major city in St. Francois County, Missouri, formed by the merger of Flat River, Elvins, Esther, and Rivermines. Located along U.S. Route 67 and Missouri Route 8, Park Hills relies on the Park Hills Police Department and St. Francois County Sheriff's deputies for public safety.

When an arrest happens in Park Hills, Jody Story Bail Bonds delivers fast, professional 24-hour bail services. We coordinate directly with the Park Hills PD and the St. Francois County Detention Center in nearby Farmington to ensure rapid inmate discharge.`,
    policeInfo: `The Park Hills Police Department is located at 10 Municipal Dr, Park Hills, MO 63601. Following initial booking, detainees are transported to the primary county jail at 1550 Doubet Rd, Farmington, MO 63640.

Our bondsmen work closely with Park Hills officers and county jail intake staff to post certified surety bonds without delay.`,
    courtInfo: `Municipal ordinance violations are processed through the Park Hills Municipal Court (10 Municipal Dr, Park Hills, MO), while state misdemeanor and felony charges proceed to the 24th Judicial Circuit Court in Farmington.

We assist co-signers with court date reminders and compliance tracking via Missouri Case.net.`,
    localBondProcess: `Posting bail in Park Hills, MO:

1. Contact our 24/7 dispatch line at (573) 854-9264.
2. We verify bail settings with Park Hills PD or the St. Francois County Detention Center.
3. Complete the flexible 10% premium financing agreement.
4. Our agent posts the surety bond for immediate release.`,
    faqs: [
      {
        question: "Where are people arrested in Park Hills taken?",
        answer: "Arrestees in Park Hills are processed at the Park Hills Police Department and transferred to the St. Francois County Detention Center on Doubet Road in Farmington."
      },
      {
        question: "Can I get a payment plan for a bail bond in Park Hills?",
        answer: "Yes, Jody Story Bail Bonds offers affordable payment plans with low down payments for Park Hills residents."
      },
      {
        question: "How do I contact a Park Hills bail bondsman?",
        answer: "Call Jody Story Bail Bonds anytime 24/7 at (573) 854-9264 for immediate assistance."
      }
    ]
  },

  'bonne-terre': {
    overview: `Bonne Terre is a prominent historic mining city in northern St. Francois County, Missouri, located along U.S. Highway 67 and Missouri Route 47. Known for the historic Bonne Terre Mine and active local police presence, arrests here require quick local coordination.

Jody Story Bail Bonds offers 24/7 rapid bail bond dispatch to Bonne Terre. We handle all bail paperwork for arrests made by the Bonne Terre Police Department and St. Francois County Sheriff's Office, securing fast release from custody.`,
    policeInfo: `Individuals arrested by the Bonne Terre Police Department (118 N Washington St, Bonne Terre, MO 63628) are booked and transferred to the St. Francois County Detention Center at 1550 Doubet Rd, Farmington, MO 63640.

Jody Story maintains direct contact with booking officers to ensure certified bond documents are submitted immediately upon bail authorization.`,
    courtInfo: `Local municipal ordinance charges are heard at the Bonne Terre Municipal Court (118 N Washington St), while state law violations go to the 24th Judicial Circuit Court in Farmington.

Our agency tracks all docket listings to ensure defendants never miss a mandatory court date.`,
    localBondProcess: `How to post bail for a Bonne Terre arrest:

1. Call (573) 854-9264 for 24/7 emergency bail service.
2. We confirm inmate location and bail details at the county jail.
3. We set up an affordable payment arrangement for the 10% fee.
4. Our agent posts bond at the Doubet Road facility for fast release.`,
    faqs: [
      {
        question: "Where is someone held after an arrest in Bonne Terre, MO?",
        answer: "Inmates arrested in Bonne Terre are booked at Bonne Terre PD and held at the St. Francois County Detention Center in Farmington."
      },
      {
        question: "What is the cost of a bail bond in Bonne Terre?",
        answer: "The cost is 10% of the total bail set by the court. Flexible payment plans and low down payments are available."
      },
      {
        question: "Who do I call for 24/7 bail bonds in Bonne Terre?",
        answer: "Call Jody Story Bail Bonds 24/7 at (573) 854-9264."
      }
    ]
  },

  'ste-genevieve-city': {
    overview: `Ste. Genevieve is Missouri's oldest European settlement and the county seat of Ste. Genevieve County, situated along the Mississippi River near Interstate 55 and Missouri Route 32. With tourists, river trade, and active law enforcement, arrests here are handled promptly by local authorities.

Jody Story Bail Bonds provides fast 24/7 bail bond assistance in Ste. Genevieve, MO. We coordinate directly with the Ste. Genevieve County Sheriff's Office and Police Department to post bonds and bring your loved one home quickly.`,
    policeInfo: `Arrestees in Ste. Genevieve are processed and detained at the Ste. Genevieve County Detention Center, located at 119 N 3rd St, Ste. Genevieve, MO 63670 (Phone: 573-883-5820).

Booking includes fingerprinting, warrant checks, and bail confirmation. Our licensed agents file approved surety bonds on-site 24/7.`,
    courtInfo: `Court cases are conducted at the Ste. Genevieve County Courthouse (55 S Third St, Ste. Genevieve, MO 63670) under the 24th Judicial Circuit Court. Municipal violations are handled at the Ste. Genevieve Municipal Court.

We provide full schedule reminders to protect your bond and guarantee appearance compliance.`,
    localBondProcess: `Bail bond release in Ste. Genevieve:

1. Call Jody Story Bail Bonds at (573) 854-9264.
2. We verify bail settings with the 3rd Street Detention Center.
3. Execute the 10% premium payment agreement.
4. Our agent delivers certified paperwork directly to jail officers.`,
    faqs: [
      {
        question: "Where is the jail in Ste. Genevieve, MO?",
        answer: "The Ste. Genevieve County Detention Center is located at 119 N 3rd St, Ste. Genevieve, MO 63670."
      },
      {
        question: "Do you offer 24-hour bail bonds in Ste. Genevieve?",
        answer: "Yes, Jody Story Bail Bonds operates 24/7/365 across Ste. Genevieve and surrounding areas."
      }
    ]
  },

  fredericktown: {
    overview: `Fredericktown is the county seat of Madison County, Missouri, situated at the junction of U.S. Route 67 and Missouri Route 72 near the St. Francois Mountains. Law enforcement is conducted by the Fredericktown Police Department and Madison County Sheriff's Office.

Jody Story Bail Bonds delivers fast, reliable 24/7 bail bond services in Fredericktown. We work closely with local law enforcement and court officers to ensure immediate jail release.`,
    policeInfo: `Individuals arrested in Fredericktown are booked into the Madison County Jail, located at 124 S Market St, Fredericktown, MO 63645 (Phone: 573-783-2288).

Our agents file official surety bonds directly at the Market Street facility 24 hours a day.`,
    courtInfo: `Court proceedings take place at the Madison County Courthouse (1 N Main St, Fredericktown, MO 63645) in the 24th Judicial Circuit Court.

We assist co-signers with case tracking on Missouri Case.net.`,
    localBondProcess: `Posting bail in Fredericktown:

1. Call (573) 854-9264 immediately.
2. We confirm bail amount with the Madison County Jail.
3. We set up flexible payment terms for the 10% premium.
4. Our agent lodges bond papers for prompt release.`,
    faqs: [
      {
        question: "Where is the Madison County Jail in Fredericktown?",
        answer: "The jail is located at 124 S Market St, Fredericktown, MO 63645."
      },
      {
        question: "How fast can I get someone out of jail in Fredericktown?",
        answer: "Release usually takes 1 to 3 hours after our agent files the approved bond with jail staff."
      }
    ]
  },

  union: {
    overview: `Union is the county seat of Franklin County, Missouri, located along U.S. Route 50 and Missouri Route 47. As the seat of the busy 20th Judicial Circuit, Union sees substantial judicial activity and law enforcement operations.

Jody Story Bail Bonds provides 24/7 bail bond assistance in Union, MO. We dispatch agents directly to the Franklin County Adult Detention Center to post bonds immediately.`,
    policeInfo: `Arrestees in Union are taken to the Franklin County Adult Detention Center, located at 1 Bruns Ln, Union, MO 63084 (Phone: 636-583-2560).

Booking procedures run 24/7. Our licensed agents file surety bonds directly with detention staff for fast release.`,
    courtInfo: `Court cases are held at the Franklin County Judicial Center (401 E Main St, Union, MO 63084) under the 20th Judicial Circuit Court.

We monitor court schedules to ensure defendants fulfill all appearance requirements.`,
    localBondProcess: `Union bail bond steps:

1. Call Jody Story Bail Bonds at (573) 854-9264.
2. We verify details at the Bruns Lane Detention Center.
3. Complete the 10% premium payment agreement.
4. Our agent posts bond at the jail for rapid inmate discharge.`,
    faqs: [
      {
        question: "Where is the Franklin County Jail in Union, MO?",
        answer: "The Franklin County Adult Detention Center is located at 1 Bruns Ln, Union, MO 63084."
      },
      {
        question: "Are payment plans available in Union, MO?",
        answer: "Yes, we offer low down payments and flexible financing on all Franklin County bail bonds."
      }
    ]
  },

  'washington-city': {
    overview: `Washington is the largest city in Franklin County, Missouri, located along the Missouri River and Missouri Route 100. Served by the Washington Police Department, city arrests are coordinated with Franklin County detention.

Jody Story Bail Bonds offers fast 24/7 bail services in Washington, MO, securing release from local holding and the county jail in Union.`,
    policeInfo: `Arrestees detained by Washington PD (301 Jefferson St, Washington, MO 63090) are processed and transferred to the Franklin County Adult Detention Center at 1 Bruns Ln, Union, MO 63084.

Our agents lodge certified bond paperwork directly at the Union facility around the clock.`,
    courtInfo: `Washington Municipal Court handles local city violations, while state charges proceed to the 20th Judicial Circuit Court in Union.`,
    localBondProcess: `Bail process for Washington, MO arrests:

1. Call (573) 854-9264 anytime 24/7.
2. We confirm charges and bail settings.
3. Execute simple 10% payment financing.
4. Bond is posted at the Union jail for fast release.`,
    faqs: [
      {
        question: "Where are people arrested in Washington, MO taken?",
        answer: "They are processed by Washington PD and held at the Franklin County Adult Detention Center in Union, MO."
      }
    ]
  },

  ironton: {
    overview: `Ironton is the county seat of Iron County, Missouri, located in the beautiful Arcadia Valley along Missouri Route 21 and Missouri Route 72. 

Jody Story Bail Bonds provides 24/7 bail bond support in Ironton, posting bonds at the Iron County Jail for fast inmate discharge.`,
    policeInfo: `Inmates are held at the Iron County Jail, located at 220 S Main St, Ironton, MO 63650 (Phone: 573-546-7051). Our agents lodge bonds on-site 24 hours a day.`,
    courtInfo: `Cases are heard at the Iron County Courthouse (250 S Main St, Ironton, MO) in the 42nd Judicial Circuit Court.`,
    localBondProcess: `Call (573) 854-9264 for instant 24/7 bail posting at the Iron County Jail in Ironton.`,
    faqs: [
      {
        question: "Where is the Iron County Jail located?",
        answer: "The Iron County Jail is located at 220 S Main St, Ironton, MO 63650."
      }
    ]
  },

  salem: {
    overview: `Salem is the county seat of Dent County, Missouri, located along Missouri Route 19 and Route 32. Jody Story Bail Bonds offers 24/7 bail bond assistance throughout Salem and Dent County.`,
    policeInfo: `Arrestees are held at the Dent County Jail, 112 E 5th St, Salem, MO 65560 (Phone: 573-729-3241). Our agents post surety bonds directly at the Salem jail.`,
    courtInfo: `Hearings are held at the Dent County Courthouse in Salem under the 42nd Judicial Circuit Court.`,
    localBondProcess: `Call (573) 854-9264 for fast 24/7 bail bond release in Salem, MO.`,
    faqs: [
      {
        question: "Where is the Dent County Jail in Salem?",
        answer: "The Dent County Jail is located at 112 E 5th St, Salem, MO 65560."
      }
    ]
  },

  greenville: {
    overview: `Greenville is the county seat of Wayne County, Missouri, located near Wappapello Lake on U.S. Route 67. Jody Story Bail Bonds provides 24/7 bail bond service in Greenville.`,
    policeInfo: `Inmates are held at the Wayne County Jail, 109 Piedmont Rd, Greenville, MO 63944 (Phone: 573-224-3219).`,
    courtInfo: `Court is held at the Wayne County Courthouse in Greenville (42nd Judicial Circuit).`,
    localBondProcess: `Call (573) 854-9264 to post bail in Greenville, MO anytime 24/7.`,
    faqs: [
      {
        question: "Where is the Wayne County Jail located?",
        answer: "The Wayne County Jail is located at 109 Piedmont Rd, Greenville, MO 63944."
      }
    ]
  },

  ellington: {
    overview: `Ellington is a key city in Reynolds County, Missouri, situated along Missouri Route 21 and Route 106. Jody Story Bail Bonds provides prompt 24/7 bail services in Ellington and Centerville.`,
    policeInfo: `Detainees are held at the Reynolds County Jail, 2311 Green St, Centerville, MO 63633 (Phone: 573-648-2491).`,
    courtInfo: `Proceedings occur at the Reynolds County Courthouse in Centerville (42nd Judicial Circuit).`,
    localBondProcess: `Call (573) 854-9264 for immediate bail posting in Reynolds County.`,
    faqs: [
      {
        question: "Where are Ellington arrestees held?",
        answer: "They are held at the Reynolds County Jail in Centerville, MO."
      }
    ]
  },

  bloomfield: {
    overview: `Bloomfield is the county seat of Stoddard County, Missouri, located along Missouri Route 25. Jody Story Bail Bonds offers fast 24/7 bail bond release at the Stoddard County Jail in Bloomfield.`,
    policeInfo: `Inmates are booked and held at the Stoddard County Jail, 207 S Sisson St, Bloomfield, MO 63825 (Phone: 573-568-4654).`,
    courtInfo: `Hearings occur at the Stoddard County Justice Center (303 S Sisson St, Bloomfield) in the 35th Judicial Circuit Court.`,
    localBondProcess: `Call (573) 854-9264 to dispatch a licensed bondsman to the Bloomfield jail 24/7.`,
    faqs: [
      {
        question: "Where is the Stoddard County Jail located?",
        answer: "The jail is at 207 S Sisson St, Bloomfield, MO 63825."
      }
    ]
  },

  dexter: {
    overview: `Dexter is the largest city in Stoddard County, Missouri, located along U.S. Highway 60 and Missouri Route 25. Jody Story Bail Bonds provides rapid 24/7 bail services for Dexter arrests.`,
    policeInfo: `Arrestees from Dexter PD (305 Cooper St, Dexter, MO 63841) are transported to the Stoddard County Jail in Bloomfield for holding.`,
    courtInfo: `Dexter Municipal Court handles city charges; state charges go to the 35th Judicial Circuit Court in Bloomfield.`,
    localBondProcess: `Call (573) 854-9264 for immediate bail release in Dexter, MO.`,
    faqs: [
      {
        question: "Where are people arrested in Dexter held?",
        answer: "They are transferred to the Stoddard County Jail at 207 S Sisson St, Bloomfield, MO."
      }
    ]
  },

  kennett: {
    overview: `Kennett is the county seat of Dunklin County, Missouri, in the Bootheel region along U.S. Route 412. Jody Story Bail Bonds provides fast 24/7 bail release in Kennett.`,
    policeInfo: `Inmates are held at the Dunklin County Justice Center, 1175 County Road 521, Kennett, MO 63857 (Phone: 573-888-4010).`,
    courtInfo: `Cases are heard at the Dunklin County Courthouse (100 Diver St, Kennett) in the 35th Judicial Circuit Court.`,
    localBondProcess: `Call (573) 854-9264 to post bail at the Dunklin County Justice Center in Kennett 24/7.`,
    faqs: [
      {
        question: "Where is the Dunklin County Justice Center in Kennett?",
        answer: "It is located at 1175 County Road 521, Kennett, MO 63857."
      }
    ]
  },

  malden: {
    overview: `Malden is a major community in northern Dunklin County, Missouri, along Missouri Route 25. Jody Story Bail Bonds offers 24/7 bail bond assistance in Malden.`,
    policeInfo: `Arrestees from Malden PD (201 S Madison St, Malden, MO 63863) are held at the Dunklin County Justice Center in Kennett.`,
    courtInfo: `Malden Municipal Court hears city violations; state charges proceed to the 35th Circuit Court in Kennett.`,
    localBondProcess: `Call (573) 854-9264 for fast 24/7 bail service for Malden arrests.`,
    faqs: [
      {
        question: "Where are Malden arrestees taken?",
        answer: "They are processed and held at the Dunklin County Justice Center in Kennett, MO."
      }
    ]
  }
};
