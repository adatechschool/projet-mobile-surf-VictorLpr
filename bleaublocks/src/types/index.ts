export interface Comment {
  id: number;
  user_username: string;
  text: string;
  date: string;
  rating?: number;
}

export interface Bloc {
  id: number;
  name: string;
  img_url: string;
  level: string;
  starting_position: string;
  description: string;
  lng: number;
  lat: number;
  area_name: string;
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
