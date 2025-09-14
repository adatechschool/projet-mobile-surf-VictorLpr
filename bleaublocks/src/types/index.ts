export interface Comment {
  id: number;
  user_username: string;
  text: string;
  created_at: string;
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


export interface Area {
  id: number;
  name: string;
  description: string;
  blocs_count: number;
}

export interface UserBlocData {
  id: number;
  name: string;
  level: string;
  area: string;
  img_url: string;
}

export interface UserWithBlocs {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  blocs_completed: UserBlocData[];
  blocs_in_progress: UserBlocData[];
  stats: {
    blocs_completed_count: number;
    blocs_in_progress_count: number;
    blocs_created_count: number;
  };
}