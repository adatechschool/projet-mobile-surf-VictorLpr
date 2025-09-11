export const STARTING_POSITION_OPTIONS = [
  { value: 'assis', label: 'Assis' },
  { value: 'debout', label: 'Debout' }
];

export const STYLE_OPTIONS = [
  { value: 'dalle', label: 'Dalle' },
  { value: 'devers', label: 'Dévers' },
  { value: 'vertical', label: 'Vertical' },
  { value: 'toit', label: 'Toit' },
  { value: 'traverse', label: 'Traversée' },
  { value: 'mantle', label: 'Mantle' },
  { value: 'crimps', label: 'Réglettes' },
  { value: 'slopers', label: 'Boules' },
  { value: 'jugs', label: 'Prises franches' }
];

export const LEVEL_OPTIONS = [
  { value: '3a', label: '3a' },
  { value: '3b', label: '3b' },
  { value: '3c', label: '3c' },
  { value: '4a', label: '4a' },
  { value: '4b', label: '4b' },
  { value: '4c', label: '4c' },
  { value: '5a', label: '5a' },
  { value: '5b', label: '5b' },
  { value: '5c', label: '5c' },
  { value: '6a', label: '6a' },
  { value: '6b', label: '6b' },
  { value: '6c', label: '6c' },
  { value: '7a', label: '7a' },
  { value: '7a+', label: '7a+' },
  { value: '7b', label: '7b' },
  { value: '7b+', label: '7b+' },
  { value: '7c', label: '7c' },
  { value: '7c+', label: '7c+' },
  { value: '8a', label: '8a' },
  { value: '8a+', label: '8a+' },
  { value: '8b', label: '8b' },
  { value: '8b+', label: '8b+' },
  { value: '8c', label: '8c' },
  { value: '8c+', label: '8c+' }
];

export interface BlocFormData {
  name: string;
  description: string;
  starting_position: string;
  style: string;
  level: string;
  area: string;
  lat: string;
  lng: string;
  img_url: string;
}

export const INITIAL_FORM_DATA: BlocFormData = {
  name: '',
  description: '',
  starting_position: '',
  style: '',
  level: '',
  area: '',
  lat: '',
  lng: '',
  img_url: ''
};
