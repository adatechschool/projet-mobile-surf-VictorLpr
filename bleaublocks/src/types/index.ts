export interface Comment {
  id: number;
  user: string;
  text: string;
  date: string;
  rating?: number;
}

export interface Location {
  lat: number;
  lng: number;
  area: string;
}

export interface Bloc {
  id: number;
  name: string;
  image: string;
  level: string;
  startPosition: string;
  description: string;
  location: Location;
  comments: Comment[];
  completed?: boolean;
  completedDate?: string;
  difficulty?: "easy" | "medium" | "hard" | "extreme";
  tags?: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  completedBlocs: number[];
  favoriteBlocs: number[];
}
