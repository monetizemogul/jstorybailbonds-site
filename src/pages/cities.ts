
export interface City {
  id: string;
  name: string;
  countyId: string;
  countyName: string;
  circuit: string;
  description: string;
}

export const cities: City[] = [
  { 
    id: 'potosi', 
    name: 'Potosi', 
    countyId: 'washington', 
    countyName: 'Washington County', 
    circuit: 'Circuit 24', 
    description: 'Fast, professional bail bond services in Potosi, MO. Expert local knowledge to secure immediate jail release in Washington County.' 
  },
  { 
    id: 'farmington', 
    name: 'Farmington', 
    countyId: 'st-francois', 
    countyName: 'St. Francois County', 
    circuit: 'Circuit 24', 
    description: 'Serving Farmington and all of St. Francois County. We provide 24/7 bail support to bring your loved ones home quickly.' 
  },
  { 
    id: 'park-hills', 
    name: 'Park Hills', 
    countyId: 'st-francois', 
    countyName: 'St. Francois County', 
    circuit: 'Circuit 24', 
    description: 'Reliable bail bonds in Park Hills and the Lead Belt area. Rapid response for St. Francois County jail releases.' 
  },
  {
    id: 'bonne-terre',
    name: 'Bonne Terre',
    countyId: 'st-francois',
    countyName: 'St. Francois County',
    circuit: 'Circuit 24',
    description: 'Reliable bail bonds in Bonne Terre. Rapid response for St. Francois County jail releases and comprehensive 24/7 support.'
  },
  {
    id: 'ste-genevieve-city',
    name: 'Ste. Genevieve',
    countyId: 'ste-genevieve',
    countyName: 'Ste. Genevieve County',
    circuit: 'Circuit 24',
    description: 'Fast 24/7 bail bond assistance in historic Ste. Genevieve and surrounding county areas.'
  },
  {
    id: 'fredericktown',
    name: 'Fredericktown',
    countyId: 'madison',
    countyName: 'Madison County',
    circuit: 'Circuit 24',
    description: '24/7 bail bond services in Fredericktown and across Madison County with fast court clearance.'
  },
  {
    id: 'union',
    name: 'Union',
    countyId: 'franklin',
    countyName: 'Franklin County',
    circuit: 'Circuit 20',
    description: 'Immediate bail bonds at the Franklin County Adult Detention Center in Union, MO.'
  },
  {
    id: 'washington-city',
    name: 'Washington',
    countyId: 'franklin',
    countyName: 'Franklin County',
    circuit: 'Circuit 20',
    description: 'Serving Washington, Missouri with professional, confidential 24-hour bail bond assistance.'
  },
  {
    id: 'ironton',
    name: 'Ironton',
    countyId: 'iron',
    countyName: 'Iron County',
    circuit: 'Circuit 42',
    description: 'Expert bail services in Ironton and Arcadia Valley. Fast 24/7 jail release support for Iron County cases.'
  },
  {
    id: 'salem',
    name: 'Salem',
    countyId: 'dent',
    countyName: 'Dent County',
    circuit: 'Circuit 42',
    description: '24/7 bail bond support in Salem and throughout Dent County with affordable payment plans.'
  },
  {
    id: 'greenville',
    name: 'Greenville',
    countyId: 'wayne',
    countyName: 'Wayne County',
    circuit: 'Circuit 42',
    description: 'Fast jail release services in Greenville and Wayne County courts.'
  },
  {
    id: 'ellington',
    name: 'Ellington',
    countyId: 'reynolds',
    countyName: 'Reynolds County',
    circuit: 'Circuit 42',
    description: 'Discreet and rapid bail bonds in Ellington, Centerville, and Reynolds County.'
  },
  {
    id: 'bloomfield',
    name: 'Bloomfield',
    countyId: 'stoddard',
    countyName: 'Stoddard County',
    circuit: 'Circuit 35',
    description: 'Immediate bail bond dispatch to the Stoddard County Jail in Bloomfield.'
  },
  {
    id: 'dexter',
    name: 'Dexter',
    countyId: 'stoddard',
    countyName: 'Stoddard County',
    circuit: 'Circuit 35',
    description: '24-hour bail bond agent serving Dexter, MO and Stoddard County.'
  },
  {
    id: 'kennett',
    name: 'Kennett',
    countyId: 'dunklin',
    countyName: 'Dunklin County',
    circuit: 'Circuit 35',
    description: 'Prompt bail bond services at the Dunklin County Justice Center in Kennett.'
  },
  {
    id: 'malden',
    name: 'Malden',
    countyId: 'dunklin',
    countyName: 'Dunklin County',
    circuit: 'Circuit 35',
    description: 'Reliable 24/7 bail bond assistance in Malden and Dunklin County.'
  }
];

