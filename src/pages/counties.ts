
export interface County {
  id: string;
  name: string;
  circuit: string;
  description: string;
  courts?: string[];
  lat: number;
  lng: number;
}

export const counties: County[] = [
  { id: 'washington', name: 'Washington County', circuit: 'Circuit 24', description: 'Primary service in Potosi and Washington County courts.', lat: 37.93, lng: -90.78 },
  { id: 'st-francois', name: 'St. Francois County', circuit: 'Circuit 24', description: 'Fast release services in Farmington and St. Francois County.', lat: 37.78, lng: -90.42 },
  { id: 'ste-genevieve', name: 'Ste. Genevieve County', circuit: 'Circuit 24', description: 'Serving Ste. Genevieve with integrity and speed.', lat: 37.97, lng: -90.04 },
  { id: 'madison', name: 'Madison County', circuit: 'Circuit 24', description: 'Providing bail assistance in Fredericktown and Madison County.', lat: 37.55, lng: -90.29 },
  { id: 'franklin', name: 'Franklin County', circuit: 'Circuit 20', description: 'Fast jail release and bail assistance in Union and Franklin County area.', lat: 38.41, lng: -90.98 },
  { id: 'iron', name: 'Iron County', circuit: 'Circuit 42', description: 'Expert bail services in Ironton and all of Iron County.', lat: 37.59, lng: -90.62 },
  { id: 'dent', name: 'Dent County', circuit: 'Circuit 42', description: 'Bail bonds in Salem and throughout Dent County.', lat: 37.64, lng: -91.53 },
  { id: 'wayne', name: 'Wayne County', circuit: 'Circuit 42', description: 'Securing release in Greenville and Wayne County courts.', lat: 37.12, lng: -90.45 },
  { id: 'reynolds', name: 'Reynolds County', circuit: 'Circuit 42', description: 'Serving Centerville and Reynolds County with professional care.', lat: 37.44, lng: -90.95 },
  { id: 'stoddard', name: 'Stoddard County', circuit: 'Circuit 35', description: '24/7 bail bond support in Bloomfield, Dexter, and Stoddard County.', lat: 36.88, lng: -89.92 },
  { id: 'dunklin', name: 'Dunklin County', circuit: 'Circuit 35', description: 'Fast bail release in Kennett, Malden, and Dunklin County.', lat: 36.23, lng: -90.05 },
];

