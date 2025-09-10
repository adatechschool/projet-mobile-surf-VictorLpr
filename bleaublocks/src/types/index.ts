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
  user_completion_status?: 'none' | 'en projet' | 'complété' | null;
  completedDate?: string;
  difficulty?: "easy" | "medium" | "hard" | "extreme";
  tags?: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;

}

export interface UserBlocData {
  id: number;
  name: string;
  level: string;
  area: string;
  img_url: string;
}