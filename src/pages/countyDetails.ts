import { tier1Data } from './tier1Content';

export interface DetailedCountyInfo {
  id: string;
  name: string;
  countySeat: string;
  jailName: string;
  jailAddress: string;
  sheriffOffice: string;
  highways: string;
  nearbyStreets: string;
  localCourts: string[];
  majorCities: string[];
  customIntro: string;
  localProcedures: string;
  extendedContent?: {
    overview: string;
    jailInfo: string;
    courtInfo: string;
    localBondProcess: string;
    faqs: { question: string; answer: string }[];
  };
}

export const countyDetailsMap: Record<string, DetailedCountyInfo> = {
  washington: {
    id: 'washington',
    name: 'Washington County',
    countySeat: 'Potosi',
    jailName: 'Washington County Jail',
    jailAddress: '116 W High St, Potosi, MO 63664',
    sheriffOffice: "Washington County Sheriff's Department",
    highways: 'Missouri Route 21, Missouri Route 8, and Missouri Route 185',
    nearbyStreets: 'W High St, N Mine St, Missouri St, and Breton St',
    localCourts: ['24th Judicial Circuit Court - Washington County', 'Potosi Municipal Court'],
    majorCities: ['Potosi', 'Mineral Point', 'Caledonia', 'Irondale', 'Belgrade'],
    customIntro: "Washington County, Missouri, is our home base at Jody Story Bail Bonds. Rooted right here in Potosi, our strong local connections help us provide the fastest service possible. Whether you're in Mineral Point, Caledonia, Irondale, or Belgrade, we know the area and the local system inside and out.",
    localProcedures: 'Bail bonds are processed 24/7 directly at the Washington County Jail in Potosi. Once a judge sets a bail amount, our licensed agents lodge certified paperwork immediately to secure fast inmate release.',
    extendedContent: tier1Data['washington']
  },
  'st-francois': {
    id: 'st-francois',
    name: 'St. Francois County',
    countySeat: 'Farmington',
    jailName: 'St. Francois County Detention Center',
    jailAddress: '1550 Doubet Rd, Farmington, MO 63640',
    sheriffOffice: "St. Francois County Sheriff's Department",
    highways: 'U.S. Route 67, Missouri Route 32, and Missouri Route 8',
    nearbyStreets: 'Doubet Rd, Karsch Blvd, Liberty St, and Columbia St',
    localCourts: ['24th Judicial Circuit Court - St. Francois County', 'Farmington Municipal Court', 'Park Hills Municipal Court'],
    majorCities: ['Farmington', 'Park Hills', 'Bonne Terre', 'Desloge', 'Leadington'],
    customIntro: "St. Francois County is one of our key service hubs covering Farmington, Park Hills, Bonne Terre, Desloge, and Leadington. Our local bondsmen are standing by 24/7 to handle the 24th Judicial Circuit and St. Francois County Detention Center paperwork quickly.",
    localProcedures: 'Bail processing occurs 24/7 at the St. Francois County Detention Center on Doubet Road. Upon bail determination, our bondsmen file certified surety forms for prompt release.',
    extendedContent: tier1Data['st-francois']
  },
  'ste-genevieve': {
    id: 'ste-genevieve',
    name: 'Ste. Genevieve County',
    countySeat: 'Ste. Genevieve',
    jailName: 'Ste. Genevieve County Detention Center',
    jailAddress: '119 N 3rd St, Ste. Genevieve, MO 63670',
    sheriffOffice: "Ste. Genevieve County Sheriff's Office",
    highways: 'Interstate 55, U.S. Route 61, and Missouri Route 32',
    nearbyStreets: 'N 3rd St, Market St, Centre St, and Washington St',
    localCourts: ['24th Judicial Circuit Court - Ste. Genevieve County', 'Ste. Genevieve Municipal Court'],
    majorCities: ['Ste. Genevieve', 'Bloomsdale', 'St. Mary', 'Weingarten'],
    customIntro: "Serving Ste. Genevieve, Bloomsdale, St. Mary, and Weingarten, Jody Story Bail Bonds offers immediate, confidential 24-hour bail services. We coordinate directly with the Ste. Genevieve Detention Center to ensure rapid jail release.",
    localProcedures: 'Bail bonds are submitted 24 hours a day at the Ste. Genevieve Detention Center downtown. Our licensed team files official paperwork promptly upon court bail authorization.',
    extendedContent: tier1Data['ste-genevieve']
  },
  madison: {
    id: 'madison',
    name: 'Madison County',
    countySeat: 'Fredericktown',
    jailName: 'Madison County Jail',
    jailAddress: '124 S Market St, Fredericktown, MO 63645',
    sheriffOffice: "Madison County Sheriff's Office",
    highways: 'U.S. Route 67, Missouri Route 72, and Missouri Route 00',
    nearbyStreets: 'S Market St, E Main St, Court St, and Mine La Motte Ave',
    localCourts: ['24th Judicial Circuit Court - Madison County', 'Fredericktown Municipal Court'],
    majorCities: ['Fredericktown', 'Marquand', 'Junction City', 'Higdon'],
    customIntro: "Jody Story Bail Bonds provides fast 24/7 bail bond assistance across Fredericktown, Marquand, and all of Madison County. We navigate local 24th Judicial Circuit Court rules efficiently to help families get fast results.",
    localProcedures: 'Inmates booked into the Madison County Jail in Fredericktown are released once approved bail documentation is lodged by our licensed agent.',
    extendedContent: tier1Data['madison']
  },
  franklin: {
    id: 'franklin',
    name: 'Franklin County',
    countySeat: 'Union',
    jailName: 'Franklin County Adult Detention Center',
    jailAddress: '1 Bruns Ln, Union, MO 63084',
    sheriffOffice: "Franklin County Sheriff's Office",
    highways: 'Interstate 44, U.S. Route 50, and Missouri Route 47',
    nearbyStreets: 'Bruns Ln, E Main St, Washington Ave, and Highway 50',
    localCourts: ['20th Judicial Circuit Court - Franklin County', 'Union Municipal Court', 'Washington Municipal Court'],
    majorCities: ['Union', 'Washington', 'Pacific', 'Sullivan', 'St. Clair'],
    customIntro: "In Union, Washington, Pacific, Sullivan, and St. Clair, Jody Story Bail Bonds delivers round-the-clock bail release services. We work closely with the Franklin County Adult Detention Center to guarantee quick dispatch.",
    localProcedures: 'Bail bonds are lodged 24/7 at the Franklin County Adult Detention Center in Union. Our bondsmen submit state-compliant surety bonds to minimize wait time.',
    extendedContent: tier1Data['franklin']
  },
  iron: {
    id: 'iron',
    name: 'Iron County',
    countySeat: 'Ironton',
    jailName: 'Iron County Jail',
    jailAddress: '220 S Main St, Ironton, MO 63650',
    sheriffOffice: "Iron County Sheriff's Department",
    highways: 'Missouri Route 21, Missouri Route 72, and Missouri Route 49',
    nearbyStreets: 'S Main St, Wayne St, Knob St, and Marble St',
    localCourts: ['42nd Judicial Circuit Court - Iron County', 'Ironton Municipal Court'],
    majorCities: ['Ironton', 'Pilot Knob', 'Arcadia', 'Viburnum', 'Belleview'],
    customIntro: "In Ironton, Pilot Knob, Arcadia, and Viburnum, Jody Story Bail Bonds is available 24/7. We provide compassionate, fast bail services for the 42nd Judicial Circuit Court and Iron County Jail.",
    localProcedures: 'Bail postings are accepted 24/7 at the Iron County Jail in Ironton. Our agents file certified paperwork directly with jail deputies.',
    extendedContent: tier1Data['iron']
  },
  dent: {
    id: 'dent',
    name: 'Dent County',
    countySeat: 'Salem',
    jailName: 'Dent County Jail',
    jailAddress: '112 E 5th St, Salem, MO 65560',
    sheriffOffice: "Dent County Sheriff's Office",
    highways: 'Missouri Route 19, Missouri Route 32, and Missouri Route 68',
    nearbyStreets: 'E 5th St, S Main St, E Scenic Rivers Blvd, and S Iron St',
    localCourts: ['42nd Judicial Circuit Court - Dent County', 'Salem Municipal Court'],
    majorCities: ['Salem', 'Bangs', 'Gladden', 'Jadwin', 'Lenox'],
    customIntro: "For immediate jail release in Salem and Dent County, Jody Story Bail Bonds offers 24/7 professional support. We navigate 42nd Judicial Circuit procedures to ensure seamless inmate discharge.",
    localProcedures: 'Bail bonds are processed around the clock at the Dent County Jail in Salem upon presentation of approved surety documentation by our agent.',
    extendedContent: tier1Data['dent']
  },
  wayne: {
    id: 'wayne',
    name: 'Wayne County',
    countySeat: 'Greenville',
    jailName: 'Wayne County Jail',
    jailAddress: '109 Piedmont Rd, Greenville, MO 63944',
    sheriffOffice: "Wayne County Sheriff's Department",
    highways: 'U.S. Route 67, Missouri Route 34, and Missouri Route 172',
    nearbyStreets: 'Piedmont Rd, Main St, Walnut St, and Court St',
    localCourts: ['42nd Judicial Circuit Court - Wayne County'],
    majorCities: ['Greenville', 'Piedmont', 'Patterson', 'Williamsville', 'Hiram'],
    customIntro: "Jody Story Bail Bonds provides 24-hour bail services in Greenville, Piedmont, and Wayne County. We coordinate with the 42nd Judicial Circuit and Wayne County Sheriff staff for immediate release.",
    localProcedures: 'Bail forms are submitted 24/7 at the Wayne County Jail on Piedmont Road in Greenville to start the release process immediately.',
    extendedContent: tier1Data['wayne']
  },
  reynolds: {
    id: 'reynolds',
    name: 'Reynolds County',
    countySeat: 'Centerville',
    jailName: 'Reynolds County Jail',
    jailAddress: '2311 Green St, Centerville, MO 63633',
    sheriffOffice: "Reynolds County Sheriff's Office",
    highways: 'Missouri Route 21, Missouri Route 72, and Missouri Route 106',
    nearbyStreets: 'Green St, Main St, Pine St, and Elm St',
    localCourts: ['42nd Judicial Circuit Court - Reynolds County'],
    majorCities: ['Centerville', 'Ellington', 'Lesterville', 'Bunker', 'Redford'],
    customIntro: "Serving Centerville, Ellington, Lesterville, and Bunker, Jody Story Bail Bonds offers prompt 24/7 bail assistance throughout Reynolds County.",
    localProcedures: 'Bail bonds are accepted 24 hours a day at the Reynolds County Jail in Centerville once bail terms are finalized.',
    extendedContent: tier1Data['reynolds']
  },
  stoddard: {
    id: 'stoddard',
    name: 'Stoddard County',
    countySeat: 'Bloomfield',
    jailName: 'Stoddard County Jail',
    jailAddress: '207 S Sisson St, Bloomfield, MO 63825',
    sheriffOffice: "Stoddard County Sheriff's Office",
    highways: 'U.S. Highway 60, Missouri Route 25, and Missouri Route 114',
    nearbyStreets: 'S Sisson St, E Center St, and Missouri St',
    localCourts: ['35th Judicial Circuit Court - Stoddard County', 'Dexter Municipal Court'],
    majorCities: ['Bloomfield', 'Dexter', 'Bernie', 'Advance', 'Puxico', 'Bell City'],
    customIntro: "For rapid, 24/7 bail bond assistance in Bloomfield, Dexter, and throughout Stoddard County, Jody Story is your trusted local expert. We work directly with the 35th Judicial Circuit Court and Stoddard County Sheriff deputies to process paperwork immediately and secure fast inmate release.",
    localProcedures: 'Bail postings are accepted 24/7 at the Stoddard County Jail on S Sisson St in Bloomfield. Our licensed bondsmen submit electronic or certified surety forms to start immediate discharge.',
    extendedContent: tier1Data['stoddard']
  },
  dunklin: {
    id: 'dunklin',
    name: 'Dunklin County',
    countySeat: 'Kennett',
    jailName: 'Dunklin County Justice Center',
    jailAddress: '1175 County Road 521, Kennett, MO 63857',
    sheriffOffice: "Dunklin County Sheriff's Department",
    highways: 'U.S. Route 412, Missouri Route 25, and Missouri Route 84',
    nearbyStreets: 'County Road 521, St Francis St, and Independence Ave',
    localCourts: ['35th Judicial Circuit Court - Dunklin County', 'Kennett Municipal Court', 'Malden Municipal Court'],
    majorCities: ['Kennett', 'Malden', 'Senath', 'Campbell', 'Clarkton', 'Holcomb'],
    customIntro: "When you need immediate bail bond help in Kennett, Malden, or anywhere in Dunklin County, Jody Story offers fast, confidential 24-hour service. We know the 35th Judicial Circuit rules and coordinate directly with the Dunklin County Justice Center to bring your loved one home quickly.",
    localProcedures: 'Bail bonds are processed at the Dunklin County Justice Center in Kennett. Once a bond amount is determined by the court or schedule, our agent submits approved documents directly to jail staff for rapid release.',
    extendedContent: tier1Data['dunklin']
  }
};
